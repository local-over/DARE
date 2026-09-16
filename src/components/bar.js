// DARE v2 — Bar Chart Component (SVG Vector, Professional)
function renderBar(props, css) {
    const barColor = props.color || '#6366f1';
    if (!props.data) return `<div style="${css}color:#ef4444;padding:8px;border:1px dashed #ef4444;border-radius:4px;font-size:10pt;">[bar: missing data]</div>`;

    const items = props.data.split(';').map(x => {
        const parts = x.trim().split(':');
        return { label: parts[0]?.trim(), value: parseFloat(parts[1]) || 0 };
    }).filter(x => x.label);

    const max = Math.max(...items.map(x => x.value), 1);
    const count = items.length;
    const barGap = count > 8 ? 2 : 4;
    const totalGaps = (count - 1) * barGap;
    const barW = (100 - totalGaps) / count;

    // Chart area: top 10% for labels above bars, bottom 85% for bars
    const chartTop = 8;
    const chartBottom = 92;
    const chartHeight = chartBottom - chartTop;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet" style="display:block;">`;

    // Grid lines (subtle)
    for (let i = 0; i <= 4; i++) {
        const y = chartTop + (chartHeight / 4) * i;
        svg += `<line x1="0" y1="${y}" x2="200" y2="${y}" stroke="#e2e8f0" stroke-width="0.3" stroke-dasharray="2,2"/>`;
    }

    items.forEach((item, idx) => {
        const rawH = (item.value / max) * chartHeight;
        const h = Math.max(rawH, 2); // Minimum 2px height so bars are always visible
        const barViewW = (barW / 100) * 200;
        const gapViewW = (barGap / 100) * 200;
        const x = idx * (barViewW + gapViewW);
        const barY = chartBottom - h;
        const radius = Math.min(barViewW / 4, h / 2, 3); // Prevent rounding artifacts on tiny bars

        // Bar with rounded top corners
        svg += `<rect x="${x}" y="${barY}" width="${barViewW}" height="${h}" fill="${barColor}" rx="${radius}" ry="${radius}" opacity="0.9"/>`;

        // Value label above bar
        const fontSize = count > 8 ? 4 : count > 5 ? 5 : 6;
        svg += `<text x="${x + barViewW / 2}" y="${barY - 2}" fill="${barColor}" font-size="${fontSize}" font-family="Arial,sans-serif" font-weight="700" text-anchor="middle">${item.value}</text>`;
    });
    svg += `</svg>`;

    // Bottom labels
    const labelSize = count > 8 ? '7pt' : '8pt';
    const labels = items.map(item =>
        `<div style="flex:1;text-align:center;font-size:${labelSize};color:#64748b;padding:3px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.label}</div>`
    ).join('');

    return `<div class="dare-chart-wrap" style="${css}display:flex;flex-direction:column;overflow:hidden;">
        <div style="flex:1;width:100%;min-height:30mm;">${svg}</div>
        <div style="display:flex;width:100%;flex-shrink:0;border-top:1px solid #e2e8f0;">${labels}</div>
    </div>`;
}

module.exports = renderBar;
