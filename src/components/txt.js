// DARE v2 — Text Component
function renderTxt(props, css, innerContent) {
    return `<div class="dare-txt" style="${css}">${(innerContent || '').trim()}</div>`;
}
module.exports = renderTxt;
