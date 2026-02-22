// DARE v2 — Horizontal Rule / Line / Divider Component
// Usage: hr {}  — thin gray line
// Usage: line(color=#333, thick=2) {} — custom divider
function renderLine(props, css) {
    const color = props.color || '#e2e8f0';
    const thick = props.thick || '1';
    return `<div style="width:100%;height:0;border:none;border-top:${thick}px solid ${color};margin:4mm 0;${css}"></div>`;
}

module.exports = renderLine;
