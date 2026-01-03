const { compile } = require('./src/parser');
const { renderPdf } = require('./src/renderer');
const fs = require('fs').promises;

async function convertFile(inputPath, outputPath) {
    try {
        const source = await fs.readFile(inputPath, 'utf8');
        const { html, format } = await compile(source);
        await renderPdf(html, format, outputPath);
        return true;
    } catch (e) { console.error(e); throw e; }
}
module.exports = { convertFile };
