const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  const root = path.resolve(__dirname,'..');
  const base = process.argv[2] || pathToFileURL(root + path.sep).href;
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const directory = fs.readFileSync(path.join(root,'Barcelona_sarria_primary_schools.html'),'utf8');
    assert(directory.includes('href="Barcelona_school_contact_checklist.html"'));
    await page.goto(new URL('Barcelona_school_contact_checklist.html?v=contact-' + Date.now(),base).href);
    assert.equal(await page.locator('#first-round article').count(),5);
    assert.equal(await page.locator('#first-round blockquote').count(),5);
    assert.equal(await page.locator('tbody tr').count(),8);
    assert.equal(await page.locator('#decisions li').count(),2);
    const text = await page.locator('main').innerText();
    for (const value of ['2020 年 6 月','Weiyiyi','自愿项目','加泰罗尼亚语水平尚未确认']) assert(text.includes(value),value);
    for (const value of ['两个地址','Carrer d’Hurtado','Carrer de Lluís Marià Vidal','empadronamiento','三个决定性答案','6 件']) assert(!text.includes(value),value);
    assert.deepEqual((await page.locator('#first-round h3').allTextContents()).map(value => value[0]),['1','2','3','4','5']);
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:900});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({path:path.resolve(root,'../school-profile-checks/contact-'+width+'.png'),fullPage:true});
    }
    await page.locator('nav a[href="#second-round"]').click();
    assert.equal(new URL(page.url()).hash,'#second-round');
    assert.equal(await page.locator('.back').getAttribute('href'),'Barcelona_sarria_primary_schools.html');
    assert.deepEqual(errors,[]);
    console.log('PASS: 5 questions, 8 follow-ups, 2 decisions, removed address section, numbering, links and desktop/mobile layout.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
