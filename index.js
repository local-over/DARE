// DARE v2 — Layered public API
const fs = require('fs').promises;
const { compileToDocument } = require('./src/document');
const { renderHtml } = require('./src/renderers-html');
const { renderPdf } = require('./src/renderers-pdf');
const { renderPdf: renderChromiumPdf, closeBrowser } = require('./src/renderers-chromium');

async function compile(sourceCode, options = {}) {
    options = options || {};
    const document = compileToDocument(sourceCode);
    const renderer = options.renderer || 'pdf';
    if (renderer === 'document') return document;
    if (renderer === 'html') return renderHtml(document);
    if (renderer === 'pdf') return { format: options.format || document.format, buffer: await renderPdf(document, null, options) };
    if (renderer === 'chromium' || renderer === 'puppeteer') {
        const html = await renderHtml(document);
        return { format: options.format || document.format, html: html.html, buffer: await renderChromiumPdf(html.html, options.format || document.format) };
    }
    throw new Error(`DARE Error: Unknown renderer "${renderer}". Use document, html, pdf, or chromium.`);
}

async function convertFile(inputPath, outputPath, options = {}) {
    options = options || {};
    const source = await fs.readFile(inputPath, 'utf8');
    const renderer = options.renderer || 'pdf';
    if (renderer === 'chromium' || renderer === 'puppeteer') {
        const result = await compile(source, options);
        await fs.writeFile(outputPath, result.buffer);
    } else {
        await renderPdf(compileToDocument(source), outputPath, options);
    }
    return outputPath;
}

async function convertString(dareCode, options = {}) {
    const result = await compile(dareCode, { ...options, renderer: options.renderer || 'pdf' });
    return result.buffer || result.html || result;
}

module.exports = { compile, compileToDocument, convertFile, convertString, closeBrowser };
