// DARE v2 — List Component (Professional)
// Usage: list { Item 1; Item 2; Item 3 }
// Usage: list(type=num) { Step 1; Step 2; Step 3 }
function renderList(props, css, innerContent) {
    const items = innerContent.split(';').map(i => i.trim()).filter(Boolean);
    const isNumbered = props.type === 'num' || props.type === 'numbered' || props.type === 'ol';

    const listItems = items.map((item, idx) => {
        const marker = isNumbered
            ? `<span style="color:#6366f1;font-weight:700;min-width:18px;font-size:inherit;">${idx + 1}.</span>`
            : `<span style="color:#6366f1;font-size:6pt;min-width:14px;margin-top:3px;">●</span>`;
        return `<div style="display:flex;align-items:flex-start;gap:4px;padding:3px 0;">${marker}<span>${item}</span></div>`;
    }).join('');

    return `<div class="dare-list" style="${css}">${listItems}</div>`;
}

module.exports = renderList;
