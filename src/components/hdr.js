// DARE v2 — Header Region Component
// Usage: hdr { txt{Title} }
function renderHdr(props, css, innerHtml) {
    const defaults = 'display:flex;align-items:center;justify-content:space-between;padding:5mm 10mm;flex-shrink:0;';
    return `<div class="dare-hdr" style="${defaults}${css}">${innerHtml}</div>`;
}

module.exports = renderHdr;
