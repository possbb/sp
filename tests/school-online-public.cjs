const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
  try {
    const page = await browser.newPage({viewport:{width:390,height:844}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('https://possbb.github.io/sp/Barcelona_sarria_primary_schools.html?v=online-' + Date.now());
    await page.waitForFunction(() => document.querySelector('#onlineStatus')?.textContent.includes('已读取线上公开数据'), {timeout:60000});
    assert.equal(await page.locator('.school-priority').count(),42);
    assert(await page.locator('.school-note').evaluateAll(inputs => inputs.every(el => el.readOnly)));
    assert(await page.locator('#saveOnline').isDisabled());
    await page.click('#connectOnline');
    assert(await page.locator('#onlineAuth').isVisible());
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({path:'../school-profile-checks/online-auth-mobile.png'});
    await page.click('#cancelAuth');
    assert.deepEqual(errors,[]);
    console.log('PASS: live Pages, real unauthenticated GitHub data read, 42 priorities, public read-only and mobile auth dialog. No live writes performed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
