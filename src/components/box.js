// DARE v2 — Box Component
function renderBox(props, css, innerHtml) {
    let classes = 'dare-box';
    if (props.h === 'fill') classes += ' flex-fill';
    return `<div class="${classes}" style="${css}">${innerHtml}</div>`;
}
module.exports = renderBox;
