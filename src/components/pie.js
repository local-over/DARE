// DARE v2 — Pie/Donut Chart Component (SVG, Professional)
const PALETTE = [
    '#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#ef4444', '#14b8a6', '#f97316', '#64748b',
];

function renderPie(props, css) {
    if (!props.data) return `<div style="${css}color:#ef4444;padding:8px;border:1px dashed #ef4444;border-radius:4px;font-size:10pt;">[pie: missing data]</div>`;

    const items = props.data.split(';').map(x => {
        const parts = x.trim().split(':');
        return { label: parts[0]?.trim(), value: parseFloat(parts[1]) || 0 };
    }).filter(x => x.label);

    const total = items.reduce((s, i) => s + i.value, 0) || 1;
    const isDonut = props.type === 'donut';
    const cx = 50, cy = 50, r = 42;
    const innerR = isDonut ? 24 : 0;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width:100%;max-height:100%;">`;

    // Optional drop shadow
    svg += `<defs><filter id="ps"><feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.1"/></filter></defs>`;

    let angle = -90; // start at top
    items.forEach((item, idx) => {
        const sweep = (item.value / total) * 360;
        const color = PALETTE[idx % PALETTE.length];

        if (items.length === 1) {
            // Full circle
            svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" filter="url(#ps)"/>`;
            if (isDonut) svg += `<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="white"/>`;
        } else {
            const startRad = (angle * Math.PI) / 180;
            const endRad = ((angle + sweep) * Math.PI) / 180;
            const x1 = cx + r * Math.cos(startRad);
            const y1 = cy + r * Math.sin(startRad);
            const x2 = cx + r * Math.cos(endRad);
            const y2 = cy + r * Math.sin(endRad);
            const large = sweep > 180 ? 1 : 0;

            let d;
            if (isDonut) {
                const ix1 = cx + innerR * Math.cos(startRad);
                const iy1 = cy + innerR * Math.sin(startRad);
                const ix2 = cx + innerR * Math.cos(endRad);
                const iy2 = cy + innerR * Math.sin(endRad);
                d = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${ix2},${iy2} A${innerR},${innerR} 0 ${large} 0 ${ix1},${iy1} Z`;
            } else {
                d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
            }
            svg += `<path d="${d}" fill="${color}" filter="url(#ps)" stroke="white" stroke-width="0.5"/>`;
        }
        angle += sweep;
    });

    // Donut center label
    if (isDonut) {
        svg += `<text x="${cx}" y="${cy + 2}" text-anchor="middle" font-size="8" font-weight="bold" fill="#334155" font-family="Arial,sans-serif">${Math.round(total)}</text>`;
        svg += `<text x="${cx}" y="${cy + 7}" text-anchor="middle" font-size="4" fill="#94a3b8" font-family="Arial,sans-serif">Total</text>`;
    }
    svg += `</svg>`;

    // Legend
    const legend = items.map((item, idx) => {
        const pct = Math.round((item.value / total) * 100);
        const color = PALETTE[idx % PALETTE.length];
        return `<div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;">
            <div style="width:8px;height:8px;border-radius:2px;background:${color};flex-shrink:0;"></div>
            <span style="font-size:8pt;color:#475569;white-space:nowrap;">${item.label} (${pct}%)</span>
        </div>`;
    }).join('');

    return `<div style="${css}display:flex;align-items:center;gap:10mm;overflow:hidden;">
        <div style="flex:1;max-width:55%;">${svg}</div>
        <div style="flex-shrink:0;">${legend}</div>
    </div>`;
}

module.exports = renderPie;
