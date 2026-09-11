const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 let data={version:1,collapsed:{fees:true}},sha=1,writes=0,fail=0;
 const errors=[];
 async function page(){
  const p=await browser.newPage({viewport:{width:1440,height:1000}});
  p.on('pageerror',e=>errors.push(e.message));
  await p.route('https://api.github.com/repos/possbb/sp/contents/sarria_school_comparison_columns.json**',async route=>{
   const req=route.request();
   if(req.method()==='PUT'){
    if(fail)return route.fulfill({status:fail,json:{}});
    assert.equal(req.headers().authorization,'Bearer test-only-token');
    const body=req.postDataJSON();assert.equal(body.sha,String(sha));assert.equal(body.branch,'main');
    data=JSON.parse(Buffer.from(body.content,'base64').toString());sha++;writes++;
    return route.fulfill({json:{content:{sha:String(sha)}}});
   }
   await route.fulfill({json:{sha:String(sha),content:Buffer.from(JSON.stringify(data)).toString('base64')}});
  });
  await p.goto(pathToFileURL(path.resolve(__dirname,'../Barcelona_sarria_school_comparison.html')).href);
  await p.getByText('已读取线上折叠记录；修改后请点击保存到线上。',{exact:true}).waitFor();
  return p;
 }
 try{
  const p=await page();
  assert.equal(await p.locator('.column-toggle').count(),22);
  assert(await p.locator('#col-fees').evaluate(el=>el.classList.contains('is-collapsed')));
  const initial=await p.locator('#comparison').evaluate(el=>el.scrollWidth);
  await p.locator('#col-english button').click();
  assert(await p.locator('#comparison').evaluate((el)=>el.scrollWidth)<initial);
  await p.selectOption('#scope','priority');
  assert.equal(await p.locator('tbody td:nth-child(11).is-collapsed').count(),5);
  await p.click('#save-columns');assert(await p.locator('#column-token').isVisible());
  assert.equal(writes,0);
  await p.fill('#column-token','test-only-token');
  // A separate device edits a different column after this page loaded.
  data.collapsed.sports=true;sha++;
  await p.click('#save-columns');
  await p.getByText('已保存到线上，并读取核对成功；其他设备重新打开或读取线上记录即可同步。',{exact:true}).waitFor();
  assert.equal(writes,1);assert(data.collapsed.english&&data.collapsed.fees&&data.collapsed.sports);
  assert(!JSON.stringify(data).includes('test-only-token'));
  const second=await page();
  assert.equal(await second.locator('thead .is-collapsed').count(),3);
  await second.locator('#col-name button').click();
  assert.equal(await second.locator('tbody th.is-collapsed').count(),22);
  await second.locator('#col-name button').click();
  await second.setViewportSize({width:390,height:900});
  assert(await second.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await second.screenshot({path:path.resolve(__dirname,'../../school-columns-mobile.png'),fullPage:true});
  await p.locator('#col-english button').click();fail=409;
  await p.click('#save-columns');await p.getByText(/未确认保存成功：线上版本已变化/).waitFor();
  assert.equal(writes,1);assert.equal(await p.locator('#col-english button').getAttribute('aria-expanded'),'true');
  fail=401;await p.click('#save-columns');await p.getByText(/未确认保存成功：令牌无效/).waitFor();
  assert.equal(writes,1);fail=0;
  await p.click('#save-columns');await p.getByText(/已保存到线上，并读取核对成功/).waitFor();
  assert.equal(data.collapsed.english,false);
  await p.click('#clear-column-token');assert.equal(await p.locator('#column-token').inputValue(),'');
  await p.reload();await p.getByText(/已读取线上折叠记录/).waitFor();
  assert.equal(await p.locator('#col-english button').getAttribute('aria-expanded'),'true');
  assert.equal(await p.locator('#col-fees button').getAttribute('aria-expanded'),'false');
  await p.click('#expand-columns');assert.equal(await p.locator('thead .is-collapsed').count(),0);
  assert.deepEqual(errors,[]);
  console.log('PASS: 22 column toggles, widths, filtered rows, online read/write/readback, separate-device restore, unrelated edit merge, 401/409 preserve edits, token clearing, mobile');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
