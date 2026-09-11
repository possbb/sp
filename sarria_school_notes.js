const schoolNotePrefix = "sp:sarria:school-note:v1:";
const schoolDraftKey = "sp:sarria:online-drafts:v1";
const schoolApi = "https://api.github.com/repos/possbb/sp/contents/sarria_school_annotations.json";
let schoolOnline = {}, schoolDrafts = {}, schoolToken = "", schoolReady = false, schoolSaving = false;
try { schoolDrafts = JSON.parse(localStorage.getItem(schoolDraftKey) || "{}"); } catch {}
if (!schoolDrafts || typeof schoolDrafts !== "object" || Array.isArray(schoolDrafts)) schoolDrafts = {};

function schoolId(school) { return school.code && school.code !== "—" ? school.code : school.name; }
function schoolValue(records, id, field) { return typeof records[id]?.[field] === "string" ? records[id][field] : ""; }

function renderSchoolField(school, escape, field) {
  const id = schoolId(school), draft = schoolDrafts[id]?.[field];
  const value = draft ? draft.value : schoolValue(schoolOnline, id, field);
  const attrs = `data-school-id="${escape(id)}" data-field="${field}" aria-label="${escape(school.name)}的${field === "note" ? "备注" : "优先级"}" ${schoolToken && schoolReady && !schoolSaving ? "" : "readonly"}`;
  return (field === "note" ? `<textarea class="school-note" ${attrs}>${escape(value)}</textarea>` : `<input class="school-priority" ${attrs} value="${escape(value)}" maxlength="100">`) + `<small class="note-status">${draft ? "草稿，尚未发布" : value ? "线上公开" : ""}</small>`;
}
function renderSchoolNote(school, escape) { return renderSchoolField(school, escape, "note"); }
function renderSchoolPriority(school, escape) { return renderSchoolField(school, escape, "priority"); }
function schoolStatus(message) { document.querySelector("#onlineStatus").textContent = message; }
function schoolRefresh() {
  if (typeof render === "function") render();
  document.querySelector("#saveOnline").disabled = !schoolToken || !schoolReady || schoolSaving || !Object.keys(schoolDrafts).length;
  document.querySelector("#connectOnline").textContent = schoolToken ? "退出编辑" : "开启编辑";
  document.querySelector("#importNotes").disabled = !schoolToken || !schoolReady || schoolSaving;
}
function persistSchoolDrafts() {
  try { localStorage.setItem(schoolDraftKey, JSON.stringify(schoolDrafts)); return true; }
  catch { schoolStatus("本机草稿保存失败，请勿关闭或刷新；可尝试保存到线上。"); return false; }
}

function saveSchoolNote(input) {
  if (!schoolToken || !schoolReady || schoolSaving) return;
  const { schoolId: id, field } = input.dataset;
  const base = schoolDrafts[id]?.[field]?.base ?? schoolValue(schoolOnline, id, field);
  schoolDrafts[id] ||= {};
  if (input.value === base) delete schoolDrafts[id][field];
  else schoolDrafts[id][field] = { base, value: input.value };
  if (!Object.keys(schoolDrafts[id]).length) delete schoolDrafts[id];
  input.nextElementSibling.textContent = schoolDrafts[id]?.[field] ? "草稿，尚未发布" : "";
  if (persistSchoolDrafts()) schoolStatus("修改尚未发布。");
  document.querySelector("#saveOnline").disabled = !Object.keys(schoolDrafts).length;
}

async function schoolRequest(url, options = {}) {
  const response = await fetch(url, { ...options, cache: "no-store", signal: AbortSignal.timeout(20000), headers: {
    Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28",
    ...(schoolToken ? { Authorization: "Bearer " + schoolToken } : {}), ...options.headers
  }});
  if (!response.ok) {
    const errors = {401:"令牌无效或已过期",403:"没有权限或 GitHub 请求限额已用尽",404:"线上数据不存在或无权访问",409:"线上版本变化，请重新保存",422:"写入被拒绝，请检查令牌权限或分支保护"};
    throw new Error(errors[response.status] || "GitHub 请求失败（" + response.status + "）");
  }
  return response.json();
}
async function readSchoolOnline() {
  const file = await schoolRequest(schoolApi + "?ref=main");
  const data = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\s/g, "")), c => c.charCodeAt(0))));
  if (data.version !== 1 || !data.schools || typeof data.schools !== "object" || Array.isArray(data.schools)) throw new Error("线上数据格式异常");
  return { file, data };
}
async function loadSchoolOnline() {
  try {
    const { data } = await readSchoolOnline();
    schoolOnline = data.schools; schoolReady = true;
    schoolStatus("已读取线上公开数据" + (Object.keys(schoolDrafts).length ? "；本机有未发布草稿" : ""));
  } catch (error) { schoolReady = false; schoolStatus(error.message + "；暂不可保存，请重试。"); }
  schoolRefresh();
}
async function publishSchoolOnline() {
  if (!schoolToken || !schoolReady || schoolSaving || !Object.keys(schoolDrafts).length) return;
  if (!confirm("将优先级和备注公开到 GitHub，所有人可见，历史版本也会保留。确认发布？")) return;
  schoolSaving = true; schoolRefresh(); schoolStatus("正在保存到 GitHub…");
  try {
    const { file, data } = await readSchoolOnline();
    // Merge only edited fields; reject conflicting edits from another device.
    for (const [id, fields] of Object.entries(schoolDrafts)) for (const [field, draft] of Object.entries(fields)) {
      if (!["note", "priority"].includes(field) || typeof draft.value !== "string" || typeof draft.base !== "string") throw new Error("本机草稿格式异常");
      const current = schoolValue(data.schools, id, field);
      if (current !== draft.base && current !== draft.value) throw new Error("存在冲突：" + id + " 的" + (field === "note" ? "备注" : "优先级") + "已被修改。请复制草稿内容后放弃草稿、刷新再编辑");
      data.schools[id] ||= {}; data.schools[id][field] = draft.value;
    }
    const bytes = new TextEncoder().encode(JSON.stringify(data, null, 2) + "\n");
    let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte);
    await schoolRequest(schoolApi, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message:"Update school priorities and notes", branch:"main", sha:file.sha, content:btoa(binary)})});
    const verified = await readSchoolOnline();
    for (const [id, fields] of Object.entries(schoolDrafts)) for (const [field, draft] of Object.entries(fields)) {
      if (schoolValue(verified.data.schools, id, field) !== draft.value) throw new Error("写入后核对不一致，请重试");
    }
    schoolOnline = verified.data.schools; schoolDrafts = {};
    if (persistSchoolDrafts()) schoolStatus("已保存到线上，并已读取核对。");
  } catch (error) { schoolStatus("未确认保存成功：" + error.message + "。草稿已保留。"); }
  finally { schoolSaving = false; schoolRefresh(); }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#saveOnline").addEventListener("click", publishSchoolOnline);
  document.querySelector("#reloadOnline").addEventListener("click", () => { if (!schoolSaving) loadSchoolOnline(); });
  document.querySelector("#connectOnline").addEventListener("click", () => {
    if (schoolSaving) return;
    if (schoolToken) { schoolToken = ""; schoolRefresh(); schoolStatus("已退出编辑，令牌已从页面内存清除。"); }
    else document.querySelector("#onlineAuth").showModal();
  });
  document.querySelector("#cancelAuth").addEventListener("click", () => document.querySelector("#onlineAuth").close());
  document.querySelector("#onlineAuth").addEventListener("close", () => { document.querySelector("#githubToken").value = ""; });
  document.querySelector("#authForm").addEventListener("submit", async event => {
    event.preventDefault();
    const button = document.querySelector("#authorizeOnline"); button.disabled = true;
    schoolToken = document.querySelector("#githubToken").value.trim();
    document.querySelector("#githubToken").value = "";
    try {
      const repo = await schoolRequest("https://api.github.com/repos/possbb/sp");
      if (!repo.permissions?.push) throw new Error("该账号没有此仓库的写入权限");
      document.querySelector("#onlineAuth").close(); await loadSchoolOnline();
    } catch (error) { schoolToken = ""; document.querySelector("#authStatus").textContent = error.message; }
    finally { button.disabled = false; schoolRefresh(); }
  });
  document.querySelector("#discardDrafts").addEventListener("click", () => {
    if (schoolSaving || !confirm("放弃尚未发布的草稿？线上内容及旧版本机备注不受影响。")) return;
    schoolDrafts = {}; persistSchoolDrafts(); loadSchoolOnline();
  });
  document.querySelector("#importNotes").addEventListener("click", () => {
    if (!schoolToken || !schoolReady || schoolSaving) return;
    let count = 0;
    try {
      for (const school of schools) {
        const id = schoolId(school), value = localStorage.getItem(schoolNotePrefix + id);
        if (!value || schoolDrafts[id]?.note || schoolValue(schoolOnline, id, "note")) continue;
        schoolDrafts[id] ||= {}; schoolDrafts[id].note = {base:"", value}; count++;
      }
      if (persistSchoolDrafts()) schoolStatus("已导入 " + count + " 条旧备注为草稿，尚未发布；已有线上备注或草稿的学校已跳过。");
      schoolRefresh();
    } catch { schoolStatus("无法读取本机旧备注。"); }
  });
  window.addEventListener("beforeunload", event => { if (Object.keys(schoolDrafts).length) { event.preventDefault(); event.returnValue = ""; } });
  loadSchoolOnline();
});
