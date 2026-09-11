const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const base=process.argv[2]||pathToFileURL(root+path.sep).href;
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(new URL('Barcelona_sarria_school_comparison.html',base).href);
  assert.equal(await page.locator('thead th').count(),22);
  assert.equal(await page.locator('tr[data-school]').count(),16);
  assert.equal(await page.locator('tbody tr').count(),17);
  assert.equal(await page.locator('.top-choice').count(),22);
  assert.equal(await page.locator('tbody tr:first-child td').count(),21);
  assert((await page.locator('tbody').innerText()).includes('€5,297.80'));
  assert(!(await page.locator('main').innerText()).includes('Lluís Marià Vidal'));
  await page.selectOption('#scope','priority');assert.equal(await page.locator('tr[data-school]').count(),4);
  await page.click('#reset');await page.fill('#search','Rector Ubach');assert.equal(await page.locator('tr[data-school]').count(),1);
  await page.fill('#search','NO-SUCH-SCHOOL');assert.equal(await page.locator('tr[data-school]').count(),0);assert(await page.locator('#empty').isVisible());
  await page.click('#reset');await page.selectOption('#dimension','18');
  assert(await page.locator('#table-box').evaluate(el=>el.scrollLeft>1000));
  await page.click('#reset');
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   assert(await page.locator('#table-box').evaluate(el=>el.scrollWidth>el.clientWidth));
   if(width===1440) await page.screenshot({path:path.resolve(root,'../school-comparison-desktop.png'),fullPage:true});
   if(width===390) await page.screenshot({path:path.resolve(root,'../school-comparison-mobile.png'),fullPage:true});
  }
  for(const href of await page.locator('tbody a').evaluateAll(links=>links.map(a=>a.href)))assert(href.startsWith('https://'));
  await page.locator('nav a').first().click();
  await page.locator('a[href="Barcelona_sarria_school_comparison.html"]').click();
  assert(page.url().includes('Barcelona_sarria_school_comparison.html'));
  assert.deepEqual(errors,[]);
  console.log('PASS: 16 schools / 22 columns / shared checklist / column recommendations / filters / jump / mobile / round-trip links / no JS errors');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
