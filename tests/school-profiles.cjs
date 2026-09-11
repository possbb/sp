const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.resolve(root, '../school-profile-checks');
const context = vm.createContext({});
const html = fs.readFileSync(path.join(root, 'Barcelona_sarria_primary_schools.html'), 'utf8');
vm.runInContext(fs.readFileSync(path.join(root, 'sarria_school_profiles.js'), 'utf8'), context);
const inline = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
vm.runInContext(inline.slice(0, inline.indexOf('    let schools=')), context);
const names = [...JSON.parse(fs.readFileSync(path.join(root, 'sarria_primary_schools.json'), 'utf8')).map(s => s.name), ...vm.runInContext('privateSchools.map(s => s.name)', context)];
assert.equal(names.length, 42);
assert.equal(new Set(names).size, 42);
assert.deepEqual(Array.from(vm.runInContext('Object.keys(schoolProfiles)', context)).sort(), [...names].sort());
for (const name of names) {
  const profile = vm.runInContext(`schoolProfiles[${JSON.stringify(name)}]`, context);
  assert(profile.focus && profile.teaching && profile.ask && profile.sources.length, name);
  for (const [label, url] of profile.sources) assert(label && new URL(url).protocol === 'https:', name);
}

(async () => {
  let server;
  let base = process.argv[2];
  if (!base) {
    server = http.createServer((req, res) => {
      const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
      if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
      try {
        res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' : file.endsWith('.json') ? 'application/json' : 'text/html; charset=utf-8');
        res.end(fs.readFileSync(file));
      } catch { res.writeHead(404).end(); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}/`;
  }
  let browser;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(new URL('Barcelona_sarria_primary_schools.html?v=profiles-' + Date.now(), base).href);
    await page.waitForFunction(() => document.querySelectorAll('.school-profile details').length === 42);
    assert.equal(await page.locator('thead th').count(), 11);
    assert.equal(await page.locator('#rows td').count(), 462);
    assert.equal(await page.locator('.school-note').count(), 42);
    const firstNote = page.locator('.school-note').first();
    const noteKey = await firstNote.getAttribute('data-school-note');
    const noteName = await page.locator('#rows tr td:nth-child(3)').first().innerText();
    const noteText = '已联系，等待回复\n</textarea><img src=x onerror="window.noteInjection=true">';
    await firstNote.fill(noteText);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), noteKey), noteText);
    await page.click('#sortDistance');
    await page.fill('#query', noteName);
    assert.equal(await page.locator('.school-note').inputValue(), noteText);
    assert.equal(await page.evaluate(() => window.noteInjection), undefined);
    await page.reload();
    await page.waitForFunction(() => document.querySelectorAll('.school-note').length === 42);
    await page.fill('#query', noteName);
    assert.equal(await page.locator('.school-note').inputValue(), noteText);
    await page.evaluate(() => { window.originalNoteSetItem = Storage.prototype.setItem; Storage.prototype.setItem = () => { throw new Error('Storage unavailable'); }; });
    await page.locator('.school-note').fill('未持久化的草稿');
    assert.match(await page.locator('.note-status').innerText(), /保存失败/);
    await page.click('#sortDistance');
    assert.equal(await page.locator('.school-note').inputValue(), '未持久化的草稿');
    await page.evaluate(() => { Storage.prototype.setItem = window.originalNoteSetItem; delete window.originalNoteSetItem; });
    await page.locator('.school-note').fill('');
    assert.equal(await page.evaluate(key => localStorage.getItem(key), noteKey), null);
    await page.reload();
    await page.waitForFunction(() => document.querySelectorAll('.school-note').length === 42);
    assert((await page.locator('.school-note').evaluateAll(inputs => inputs.map(input => input.value))).every(value => value === ''));
    assert.equal(await page.locator('.school-profile dt').count(), 252);
    assert.equal(await page.locator('.fees').count(), 42);
    assert.equal(await page.locator('.distance').count(), 42);
    fs.mkdirSync(output, {recursive:true});
    for (const width of [1440,1920]) {
      await page.setViewportSize({width,height:1000});
      await page.evaluate(() => {const box=document.querySelector('.table-box');box.scrollLeft=0;box.scrollIntoView({block:'start'});});
      assert.equal(await page.locator('table').evaluate(el => getComputedStyle(el).minWidth), '1460px');
      assert(await page.locator('th,td').evaluateAll(cells => cells.every(el => el.scrollWidth <= el.clientWidth + 1)));
      if(width===1920) assert(await page.locator('.table-box').evaluate(el => el.scrollWidth <= el.clientWidth+1));
      await page.screenshot({path:path.join(output,`compact-${width}.png`)});
    }
    await page.setViewportSize({width:1440,height:1000});
    const distanceData = JSON.parse(fs.readFileSync(path.join(root, 'sarria_school_distances.json'), 'utf8'));
    const distances = new Map(distanceData.schools.map(s => [s.name, s.distanceKm]));
    async function checkOrder(ascending) {
      const shown = await page.locator('#rows tr td:nth-child(3)').allTextContents();
      const values = shown.map(name => distances.get(name));
      assert(values.every(Number.isFinite));
      assert(values.every((value, i) => !i || (ascending ? value >= values[i-1] : value <= values[i-1])));
      assert.equal(await page.locator('#distanceHeader').getAttribute('aria-sort'), ascending ? 'ascending' : 'descending');
      assert(await page.evaluate(() => compareDistance({distanceKm:null},{distanceKm:1}) > 0 && compareDistance({distanceKm:1},{}) < 0 && compareDistance({},{}) === 0));
    }
    await checkOrder(true);
    await page.locator('.pick').first().check();
    const selected = await page.locator('.pick:checked').getAttribute('data-email');
    await page.click('#sortDistance');
    await checkOrder(false);
    assert.equal(await page.locator('.pick:checked').getAttribute('data-email'), selected);
    await page.selectOption('#type', {label:'公立'});
    await checkOrder(false);
    await page.locator('#sortDistance').focus();
    await page.keyboard.press('Enter');
    await checkOrder(true);
    await page.selectOption('#type', 'all');
    await page.click('#clearSelected');
    await page.selectOption('#type', { label: '公立' });
    assert.equal(await page.locator('#rows tr').count(), 8);
    await page.selectOption('#type', { label: '私立（非协约）' });
    assert.equal(await page.locator('#rows tr').count(), 5);
    await page.click('#selectVisible');
    assert.match(await page.locator('#selectedCount').innerText(), /5/);
    await page.fill('#query', 'Oak House');
    assert.equal(await page.locator('#rows tr').count(), 1);
    const summary = page.locator('.school-profile summary');
    await summary.click();
    assert(await page.locator('.school-profile details').evaluate(el => el.open));
    assert.match(await page.locator('.school-profile').innerText(), /一对一/);
    await summary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.school-profile details').evaluate(el => el.open), false);
    await page.keyboard.press('Enter');
    assert(await page.locator('.school-profile details').evaluate(el => el.open));
    fs.mkdirSync(output, { recursive: true });
    for (const [label, width, height] of [['desktop',1440,1000], ['mobile',390,844], ['small',320,740]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => { document.querySelector('.school-profile').scrollIntoView({block:'nearest',inline:'end'}); document.querySelector('.table-box').scrollIntoView({block:'start'}); });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), label);
      assert(await page.locator('.school-profile').evaluate(el => el.scrollWidth <= el.clientWidth), label);
      assert(await page.locator('.school-profile').evaluate(el => {
        const cell = el.getBoundingClientRect();
        const box = document.querySelector('.table-box').getBoundingClientRect();
        return cell.left >= box.left && cell.right <= box.right;
      }), label + ' full profile column visible at right edge');
      await page.screenshot({ path: path.join(output, label + '.png') });
      await page.locator('.school-note').fill('等待学校确认十月插班名额\n需询问语言支持。');
      await page.evaluate(() => { const table = document.querySelector('.table-box'); table.scrollLeft = table.scrollWidth; table.scrollIntoView({block:'start'}); });
      assert(await page.locator('.school-note').evaluate(el => {
        const input = el.getBoundingClientRect();
        const box = document.querySelector('.table-box').getBoundingClientRect();
        return input.left >= box.left && input.right <= box.right;
      }), label + ' note fully visible');
      await page.screenshot({ path: path.join(output, label + '-notes.png') });
      await page.locator('.school-note').fill('');
    }
    await page.setViewportSize({width:1440,height:1000});
    await page.fill('#query', '');
    await page.selectOption('#type', 'all');
    await page.click('#selectVisible');
    assert.match(await page.locator('#selectedCount').innerText(), /42/);
    await page.click('#openComposer');
    assert(await page.locator('#mailPanel').isVisible());
    await page.fill('#mailSubject', 'Draft verification only');
    assert.equal(await page.locator('#mailSubject').inputValue(), 'Draft verification only');
    // Do not launch a real mail client or transmit email during this test.
    assert(await page.evaluate(() => {
      const emails = [...document.querySelectorAll('.pick')].map(el => el.dataset.email);
      const uri = `mailto:?bcc=${encodeURIComponent(emails.join(','))}&subject=${encodeURIComponent(document.querySelector('#mailSubject').value)}&body=${encodeURIComponent(document.querySelector('#mailBody').value)}`;
      return uri.length < 7500;
    }));
    await page.click('#clearSelected');
    assert.match(await page.locator('#selectedCount').innerText(), /0/);
    assert.deepEqual(errors, []);
    console.log('PASS: notes persist across reload/sort/filter, clear, escape HTML and report storage errors; sorting, 42 records, 11 columns, details, mail and 1440/390/320px layouts.');
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
