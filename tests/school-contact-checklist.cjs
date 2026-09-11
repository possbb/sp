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
    await page.goto(new URL('Barcelona_school_contact_checklist.html?v=contact-1',base).href);
    assert.equal(await page.locator('#first-round article').count(),6);
    assert.equal(await page.locator('blockquote').count(),6);
    assert.equal(await page.locator('tbody tr').count(),8);
    assert.equal(await page.locator('#decisions li').count(),3);
    const text = await page.locator('main').innerText();
    for (const value of ['2020 年 6 月','Weiyiyi','Carrer d’Hurtado, 31, 2-4, 08022 Barcelona','Carrer de Lluís Marià Vidal, 54, 1-2, 08032 Barcelona','empadronamiento','自愿项目','加泰罗尼亚语水平尚未确认']) assert(text.includes(value),value);
    for (const width of [1440,390,320]) {
      await page.setViewportSize({width,height:900});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({path:path.resolve(root,'../school-profile-checks/contact-'+width+'.png'),fullPage:true});
    }
    await page.locator('nav a[href="#second-round"]').click();
    assert.equal(new URL(page.url()).hash,'#second-round');
    assert.equal(await page.locator('.back').getAttribute('href'),'Barcelona_sarria_primary_schools.html');
    assert.deepEqual(errors,[]);
    console.log('PASS: 6 questions, 8 follow-ups, 3 decisions, addresses, links and desktop/mobile layout.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
