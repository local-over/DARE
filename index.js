// DARE v2 — Main Entry Point
const { compile } = require('./src/parser');
const { renderPdf } = require('./src/renderer');
const fs = require('fs').promises;

/**
 * Convert a .dare file to PDF.
 * @param {string} inputPath - Path to .dare file
 * @param {string} outputPath - Path for output PDF
 * @returns {Promise<string>} Output path
 */
async function convertFile(inputPath, outputPath) {
    const source = await fs.readFile(inputPath, 'utf8');
    const { html, format } = await compile(source);
    await renderPdf(html, format, outputPath);
    return outputPath;
}

/**
 * Convert a DARE code string directly to a PDF buffer.
 * @param {string} dareCode - DARE source code
 * @param {object} [options] - Optional settings
 * @param {string} [options.format] - Override paper format (A4, Letter, etc.)
 * @returns {Promise<Buffer>} PDF buffer
 */
async function convertString(dareCode, options = {}) {
    const { html, format } = await compile(dareCode);
    return await renderPdf(html, options.format || format);
}

module.exports = { convertFile, convertString };
