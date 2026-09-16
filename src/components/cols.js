// DARE v2 — Quick Columns Component — NEW
// Usage: cols(n=3, gap=5mm) { box{...} box{...} box{...} }
function renderCols(props, css, innerHtml) {
    const n = props.n || '2';
    const gap = props.gap || '5mm';
    const colTemplate = Array(parseInt(n)).fill('1fr').join(' ');
    return `<div style="display:grid;grid-template-columns:${colTemplate};gap:${gap};${css}">${innerHtml}</div>`;
}

module.exports = renderCols;
