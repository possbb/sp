"use strict";
function createComparisonColumns(columns, onChange) {
 const api="https://api.github.com/repos/possbb/sp/contents/sarria_school_comparison_columns.json";
 const keys=columns.map(([key])=>key), validKeys=new Set(keys);
 const status=document.getElementById("column-sync-status"), token=document.getElementById("column-token");
 const save=document.getElementById("save-columns"), reload=document.getElementById("reload-columns"), expand=document.getElementById("expand-columns");
 let base={}, current={}, ready=false, busy=false;
 const value=(record,key)=>record[key]===true;
 const dirty=()=>keys.filter(key=>value(base,key)!==value(current,key));
 function refresh(message){
  if(message)status.textContent=message;
  save.disabled=busy||!ready||!dirty().length;reload.disabled=busy;expand.disabled=busy;token.disabled=busy;
  document.getElementById("clear-column-token").disabled=busy;onChange();
 }
 async function request(url,options={},credential=""){
  const response=await fetch(url,{...options,cache:"no-store",signal:AbortSignal.timeout(20000),headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28",...(credential?{Authorization:"Bearer "+credential}:{}),...options.headers}});
  if(!response.ok){const errors={401:"令牌无效或过期",403:"无写入权限或请求限额已用尽",404:"配置不存在或无访问权限",409:"线上版本已变化，请读取最新记录后重试",422:"写入被拒绝，请检查权限或分支保护"};throw new Error(errors[response.status]||"请求失败（"+response.status+"）");}
  return response.json();
 }
 async function read(credential=""){
  const file=await request(api+"?ref=main",{},credential);
  const data=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(file.content.replace(/\s/g,"")),c=>c.charCodeAt(0))));
  if(data.version!==1||!data.collapsed||typeof data.collapsed!=="object"||Array.isArray(data.collapsed)||Object.values(data.collapsed).some(v=>typeof v!=="boolean"))throw new Error("线上折叠数据格式异常");
  return {file,data};
 }
 async function load(){
  if(busy)return;
  if(dirty().length&&!confirm("读取线上记录将放弃本页尚未保存的折叠修改，继续？"))return;
  busy=true;refresh("正在读取线上折叠记录…");
  try{const {data}=await read(token.value.trim());base={...data.collapsed};current={...base};ready=true;refresh("已读取线上折叠记录；修改后请点击保存到线上。");}
  catch(error){refresh("读取失败："+error.message+"。当前视图保留，请重试；未读取成功时不能保存。");ready=false;}
  finally{busy=false;refresh();}
 }
 async function publish(){
  if(busy||!ready||!dirty().length)return;
  const credential=token.value.trim();
  if(!credential){token.closest("details").open=true;token.focus();refresh("请在授权区输入 GitHub 写入令牌，再点击保存到线上。");return;}
  const changed=dirty();busy=true;refresh("正在保存到线上…");
  try{
   const {file,data}=await read(credential);
   for(const key of changed){
    if(value(data.collapsed,key)!==value(base,key)&&value(data.collapsed,key)!==value(current,key))throw new Error("该列已被其他设备修改，请先读取线上记录");
    data.collapsed[key]=value(current,key);
   }
   const bytes=new TextEncoder().encode(JSON.stringify(data,null,2)+"\n");let binary="";for(const byte of bytes)binary+=String.fromCharCode(byte);
   await request(api,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:"Save comparison column collapse preferences",branch:"main",sha:file.sha,content:btoa(binary)})},credential);
   const verified=await read(credential);
   if(changed.some(key=>value(verified.data.collapsed,key)!==value(current,key)))throw new Error("写入后核对不一致");
   base={...verified.data.collapsed};current={...base};refresh("已保存到线上，并读取核对成功；其他设备重新打开或读取线上记录即可同步。");
  }catch(error){refresh("未确认保存成功："+error.message+"。本页修改保留，请勿关闭页面；可重试。");}
  finally{busy=false;refresh();}
 }
 save.addEventListener("click",publish);reload.addEventListener("click",load);
 expand.addEventListener("click",()=>{if(busy)return;for(const key of keys)current[key]=false;refresh(dirty().length?"折叠修改尚未保存到线上。":"当前折叠状态与已读取的线上记录一致。");});
 document.getElementById("clear-column-token").addEventListener("click",()=>{token.value="";refresh("令牌已清除；折叠状态未改变。");});
 window.addEventListener("beforeunload",event=>{if(dirty().length){event.preventDefault();event.returnValue="";}});
 return {load,isCollapsed:key=>value(current,key),isBusy:()=>busy,toggle(key){if(busy||!validKeys.has(key))return;current[key]=!value(current,key);refresh(dirty().length?"折叠修改尚未保存到线上。":"当前折叠状态与已读取的线上记录一致。");}};
}
