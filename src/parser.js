// DARE v2 — compiler facade
const { compileToDocument } = require('./document');
const { renderHtml } = require('./renderers-html');
async function compile(sourceCode) { const document = compileToDocument(sourceCode); return renderHtml(document); }
module.exports = { compile, compileToDocument };
