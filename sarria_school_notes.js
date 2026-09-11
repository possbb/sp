const schoolNotePrefix = "sp:sarria:school-note:v1:";
const schoolNoteCache = new Map();
const schoolNoteStatus = new Map();

function schoolNoteKey(school) {
  return schoolNotePrefix + (school.code && school.code !== "—" ? school.code : school.name);
}

function renderSchoolNote(school, escape) {
  const key = schoolNoteKey(school);
  if (!schoolNoteCache.has(key)) {
    try {
      const value = localStorage.getItem(key) || "";
      schoolNoteCache.set(key, value);
      schoolNoteStatus.set(key, value ? "已保存到本机" : "");
    } catch {
      schoolNoteCache.set(key, "");
      schoolNoteStatus.set(key, "本机存储不可用，仅保留在当前页面");
    }
  }
  return `<textarea class="school-note" data-school-note="${escape(key)}" aria-label="${escape(school.name)}的备注" rows="5">${escape(schoolNoteCache.get(key))}</textarea><small class="note-status" role="status">${escape(schoolNoteStatus.get(key))}</small>`;
}

function saveSchoolNote(input) {
  const key = input.dataset.schoolNote;
  const value = input.value;
  schoolNoteCache.set(key, value);
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
    schoolNoteStatus.set(key, value ? "已保存到本机" : "已清空");
  } catch {
    schoolNoteStatus.set(key, "保存失败，仅保留在当前页面；请勿关闭或刷新");
  }
  input.nextElementSibling.textContent = schoolNoteStatus.get(key);
}
