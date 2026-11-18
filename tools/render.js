// Usage: node tools/render.js a/<slug>
// Makes poster.pdf, label.pdf and preview PNGs (poster + phone screenshots).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const dir = path.resolve(process.argv[2]);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const name of ['poster', 'label']) {
    const f = path.join(dir, name + '.html');
    if (!fs.existsSync(f)) continue;
    await page.goto('file://' + f, { waitUntil: 'networkidle' });
    await page.pdf({ path: path.join(dir, name + '.pdf'), preferCSSPageSize: true, printBackground: true });
  }
  if (fs.existsSync(path.join(dir, 'poster.html'))) {
    const p = await browser.newPage({ viewport: { width: 794, height: 1123 } });
    await p.goto('file://' + path.join(dir, 'poster.html'), { waitUntil: 'networkidle' });
    await p.screenshot({ path: path.join(dir, 'poster-preview.png') });
  }
  const prev = path.join(dir, 'preview');
  fs.mkdirSync(prev, { recursive: true });
  const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const h of ['', 'ar', 'tr']) {
    await phone.goto('file://' + path.join(dir, 'index.html') + (h ? '#' + h : ''), { waitUntil: 'networkidle' });
    await phone.screenshot({ path: path.join(prev, 'phone-' + (h || 'picker') + '.png'), fullPage: true });
  }
  await browser.close();
})();
