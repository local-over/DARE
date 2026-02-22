// DARE v2 — Footer Region Component
// Usage: ftr { txt{Page 1} txt{Company} }
function renderFtr(props, css, innerHtml) {
    const defaults = 'display:flex;align-items:center;justify-content:space-between;padding:3mm 10mm;font-size:8pt;flex-shrink:0;margin-top:auto;';
    return `<div class="dare-ftr" style="${defaults}${css}">${innerHtml}</div>`;
}

module.exports = renderFtr;
