// DARE v2 — Main Entry Point
const { compile } = require('./src/parser');
const { renderPdf } = require('./src/renderers/pdf');
const fs = require('fs').promises;
const path = require('path');

/**
 * Convert a .dare file to PDF.
 * @param {string} inputPath - Path to .dare file
 * @param {string} outputPath - Path for output file (.pdf)
 * @returns {Promise<string>} Output path
 */
async function convertFile(inputPath, outputPath, dataPath) {
    const source = await fs.readFile(inputPath, 'utf8');
    
    let contextData = {};
    if (dataPath) {
        try {
            const resolvedDataPath = path.resolve(process.cwd(), dataPath);
            const dataStr = await fs.readFile(resolvedDataPath, 'utf8');
            contextData = JSON.parse(dataStr);
        } catch(e) {
            console.error(`❌ Error: Failed to read or parse data file ${dataPath}`);
            console.error(e.message);
            process.exit(1);
        }
    }

    const astData = await compile(source, contextData, inputPath);
    await renderPdf(astData, outputPath);
    return { outputPath, astData };
}

/**
 * Convert a DARE code string directly to a PDF buffer. (legacy support, simplified)
 * @param {string} dareCode - DARE source code
 * @param {object} [options] - Optional settings
 * @returns {Promise<Buffer>}
 */
async function convertString(dareCode, options = {}) {
    const contextData = options.data || {};
    const basePath = options.basePath || '';
    const astData = await compile(dareCode, contextData, basePath);
    const tmpPath = `/tmp/dare_render_tmp_${Date.now()}_${Math.floor(Math.random()*1000)}.pdf`;
    await renderPdf(astData, tmpPath);
    const buffer = await fs.readFile(tmpPath);
    // Clean up temp file
    try { await fs.unlink(tmpPath); } catch (e) {}
    return buffer;
}

module.exports = { convertFile, convertString };
