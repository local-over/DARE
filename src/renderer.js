const puppeteer = require('puppeteer');
let browserInstance = null;

async function getBrowser() {
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
        });
    }
    return browserInstance;
}

async function renderPdf(html, format = 'A4', outputPath = null) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        // FORCE SCREEN RENDERING (Fixes Color Issues)
        await page.emulateMediaType('screen');

        const options = {
            format: format,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        };

        if (outputPath) {
            options.path = outputPath;
            await page.pdf(options);
            return outputPath;
        } else {
            return await page.pdf(options);
        }
    } catch (e) { throw e; } 
    finally { await page.close(); }
}
module.exports = { renderPdf };
