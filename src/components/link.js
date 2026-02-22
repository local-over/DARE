// DARE v2 — Link Component (Professional)
// Usage: link(href="url") { Click me }
function renderLink(props, css, innerContent) {
    const href = props.href || '#';
    const defaults = 'color:#6366f1;text-decoration:none;font-weight:600;font-size:10pt;border-bottom:1.5px solid #c7d2fe;padding-bottom:0.5px;';
    return `<a href="${href}" style="${defaults}${css}">${(innerContent || '').trim()}</a>`;
}

module.exports = renderLink;
