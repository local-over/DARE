// DARE v2 — PDF Renderer (Puppeteer)
const puppeteer = require('puppeteer');
let browserInstance = null;

const PAPER_FORMATS = new Set(['A3', 'A4', 'A5', 'Letter', 'Legal', 'Tabloid']);

async function getBrowser() {
    if (!browserInstance || !browserInstance.connected) {
        browserInstance = await puppeteer.launch({
            headless: 'new',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--font-render-hinting=none',
                '--disable-dev-shm-usage',
            ],
        });
    }
    return browserInstance;
}

/**
 * Render HTML to PDF.
 * @param {string} html - Full HTML document
 * @param {string} format - Paper format (A4, Letter, etc.)
 * @param {string} [outputPath] - If provided, saves to file. Otherwise returns Buffer.
 * @returns {Promise<Buffer|string>}
 */
async function renderPdf(html, format = 'A4', outputPath = null) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.emulateMediaType('screen');

        const options = {
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        };

        // Support standard formats and custom dimensions
        if (PAPER_FORMATS.has(format)) {
            options.format = format;
        } else {
            // Default to A4
            options.format = 'A4';
        }

        if (outputPath) {
            options.path = outputPath;
            await page.pdf(options);
            return outputPath;
        } else {
            return await page.pdf(options);
        }
    } finally {
        await page.close();
    }
}

/**
 * Gracefully close the browser instance.
 */
async function closeBrowser() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

module.exports = { renderPdf, closeBrowser };
