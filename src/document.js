// DARE v2 — Renderer-independent document model
const { resolveAttributes, parseSetup, tokenize, extractDocBody, removeComments } = require('./tokenizer');

const PAGE_FORMATS = {
  A3: { width: '297mm', height: '420mm' },
  A4: { width: '210mm', height: '297mm' },
  A5: { width: '148mm', height: '210mm' },
  Letter: { width: '216mm', height: '279mm' },
  Legal: { width: '216mm', height: '356mm' },
  Tabloid: { width: '279mm', height: '432mm' }
};

const CONTAINERS = new Set(['page', 'box', 'cols', 'hdr', 'ftr']);
const LEAVES = new Set(['txt', 'tbl', 'list', 'badge', 'link']);
const VOID = new Set(['img', 'bar', 'pie', 'qr', 'hr', 'line', 'sp']);

function parseNodes(source, styleMap) {
  const nodes = [];
  for (const token of tokenize(source)) {
    const tag = token.tag;
    const props = resolveAttributes(token.attrStr, styleMap);
    const node = { type: tag, props, content: undefined, children: [] };
    if (CONTAINERS.has(tag)) node.children = parseNodes(token.innerContent, styleMap);
    else if (LEAVES.has(tag)) node.content = token.innerContent.trim();
    else if (!VOID.has(tag)) node.children = parseNodes(token.innerContent, styleMap);
    nodes.push(node);
  }
  return nodes;
}

function compileToDocument(sourceCode) {
  if (typeof sourceCode !== 'string' || !sourceCode.trim()) throw new Error('DARE Error: Source must be a non-empty string');
  const cleanCode = removeComments(sourceCode);
  const { styleMap, paperFormat, fonts } = parseSetup(cleanCode);
  const body = extractDocBody(cleanCode);
  const format = PAGE_FORMATS[paperFormat] ? paperFormat : 'A4';
  return {
    version: 1,
    format,
    dimensions: PAGE_FORMATS[format],
    fonts,
    styles: styleMap,
    children: parseNodes(body, styleMap)
  };
}

module.exports = { PAGE_FORMATS, compileToDocument, parseNodes };

// Backwards-compatible aliases used by downstream integrations.
module.exports.compileDocument = compileToDocument;
