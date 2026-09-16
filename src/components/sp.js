// DARE v2 — Spacer Component — NEW
// Usage: sp(10) {}   → 10mm vertical space
// Usage: sp(h=20) {} → 20mm vertical space
function renderSp(props, css) {
    // Support shorthand: sp(10) where 10 is the first positional arg
    let height = props.h || '10mm';
    if (/^\d+(\.\d+)?$/.test(height)) height += 'mm';
    return `<div style="height:${height};${css}"></div>`;
}

module.exports = renderSp;
