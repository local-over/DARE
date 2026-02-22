// DARE v2 — Page Component
function renderPage(props, css, innerHtml) {
    return `<div class="dare-page" style="${css}">${innerHtml}</div>`;
}
module.exports = renderPage;
