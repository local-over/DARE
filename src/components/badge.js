// DARE v2 — Badge/Pill Component (Professional)
// Usage: badge { LIVE }
// Usage: badge(bg=#e0f2fe, color=#0369a1) { STATUS }
function renderBadge(props, css, innerContent) {
    const defaults = 'display:inline-flex;align-items:center;padding:1.5mm 4mm;border-radius:100mm;font-size:7.5pt;font-weight:700;letter-spacing:0.3px;line-height:1;white-space:nowrap;';
    return `<span style="${defaults}${css}">${(innerContent || '').trim()}</span>`;
}

module.exports = renderBadge;
