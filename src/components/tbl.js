// DARE v2 — Table Component (Professional)
// First row = header. Alternating row colors. Clean grid.
function renderTbl(props, css, innerContent) {
    const rawRows = innerContent.split(';').filter(r => r.trim());
    const colCount = rawRows.length > 0 ? rawRows[0].split(',').length : 1;

    let html = '';
    rawRows.forEach((row, rowIdx) => {
        const cells = row.split(',').map(c => c.trim());
        cells.forEach(cell => {
            if (rowIdx === 0) {
                html += `<div class="tc th">${cell}</div>`;
            } else {
                const stripe = rowIdx % 2 === 0 ? ' ts' : '';
                html += `<div class="tc${stripe}">${cell}</div>`;
            }
        });
    });

    const colsCSS = props.cols ? `grid-template-columns:${props.cols};` : `grid-template-columns:repeat(${colCount}, 1fr);`;
    return `<div class="dare-tbl" style="${css}${colsCSS}">${html}</div>`;
}

module.exports = renderTbl;
