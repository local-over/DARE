// DARE v2 — HTML renderer
const { generateCSS } = require('./css');
const { getComponent } = require('./components');
const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escapeText = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
async function renderNode(node) {
  const component = getComponent(node.type); const css = generateCSS(node.props || {});
  if (component.type === 'container') return component.render(node.props || {}, css, (await Promise.all((node.children || []).map(renderNode))).join(''));
  if (component.type === 'leaf') {
    const content = escapeText(node.content || '');
    return component.render(node.props || {}, css, content);
  }
  return component.async ? await component.render(node.props || {}, css) : component.render(node.props || {}, css);
}
function buildHtmlDocument(body, dimensions, fonts = []) {
  const fontImports = fonts.length ? `<link href="https://fonts.googleapis.com/css2?family=${fonts.map(f => encodeURIComponent(f).replace(/%20/g, '+')).join('&family=')}&display=swap" rel="stylesheet">` : '';
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${fontImports}<style>*{box-sizing:border-box;margin:0;padding:0}html,body{margin:0;padding:0}body{font-family:Inter,"Helvetica Neue",Arial,sans-serif;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;text-rendering:optimizeLegibility;background:#555;color:#1e293b;line-height:1.4}.dare-page{width:${dimensions.width};height:${dimensions.height};page-break-after:always;position:relative;overflow:hidden;background:white;display:flex;flex-direction:column;margin:0 auto}.dare-box{display:block;position:relative}.dare-txt{white-space:pre-wrap;position:relative}.flex-fill{flex:1;overflow:hidden;min-height:0}.dare-tbl{display:grid;width:100%;border-radius:4px;overflow:hidden;border:1px solid #e2e8f0;font-size:9.5pt}.tc{padding:6px 10px;border-bottom:1px solid #f1f5f9;color:#334155}.th{font-weight:700;font-size:8.5pt;text-transform:uppercase;letter-spacing:.3px;background:#1e293b;color:white;border-bottom:none;padding:8px 10px}.ts{background:#f8fafc}.dare-chart-wrap{page-break-inside:avoid;overflow:hidden}.dare-list{font-size:10pt;color:#334155;line-height:1.5}.dare-hdr,.dare-ftr{page-break-inside:avoid}</style></head><body>${body}</body></html>`;
}
async function renderHtml(document) { return { html: buildHtmlDocument((await Promise.all(document.children.map(renderNode))).join(''), document.dimensions, document.fonts), format: document.format, document }; }
module.exports = { renderHtml, renderNode, buildHtmlDocument, escapeHtml: esc };
