// DARE v2 — Optional Chromium/Puppeteer backend
const puppeteer = require('puppeteer');
let browserInstance = null;
const FORMATS = new Set(['A3', 'A4', 'A5', 'Letter', 'Legal', 'Tabloid']);
async function getBrowser() {
  if (!browserInstance || !browserInstance.connected) browserInstance = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  return browserInstance;
}
async function renderPdf(html, format = 'A4', outputPath = null) {
  const browser = await getBrowser(); const page = await browser.newPage();
  try { await page.setContent(html, { waitUntil: 'networkidle0' }); await page.emulateMediaType('screen'); const options = { printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, format: FORMATS.has(format) ? format : 'A4' }; if (outputPath) options.path = outputPath; return await page.pdf(options); }
  finally { await page.close(); }
}
async function closeBrowser() { if (browserInstance) { await browserInstance.close(); browserInstance = null; } }
module.exports = { renderPdf, closeBrowser };
