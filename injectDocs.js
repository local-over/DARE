const fs = require('fs');
const marked = require('marked');

// Configure marked
marked.use({
    gfm: true,
    breaks: true
});

const indexMd = fs.readFileSync('docs/index.md', 'utf8');
const componentsMd = fs.readFileSync('docs/components.md', 'utf8');
const stylingMd = fs.readFileSync('docs/styling.md', 'utf8');
const usageMd = fs.readFileSync('docs/usage.md', 'utf8');

// Convert to HTML
const indexHtml = marked.parse(indexMd);
const componentsHtml = marked.parse(componentsMd);
const stylingHtml = marked.parse(stylingMd);
const usageHtml = marked.parse(usageMd);

const combinedHtml = `
<section id="why" class="reveal">
${indexHtml}
</section>
<section id="components" class="reveal">
${componentsHtml}
</section>
<section id="styling" class="reveal">
${stylingHtml}
</section>
<section id="api" class="reveal">
${usageHtml}
</section>
`;

let docsHtml = fs.readFileSync('docs/docs.html', 'utf8');

// Replace the <main class="content">...</main> with our new html, but keeping the <main> tag and author/donate section if possible
// The easiest way is to use regex or string manipulation
const mainStart = docsHtml.indexOf('<main class="content">') + '<main class="content">'.length;
const mainEnd = docsHtml.indexOf('</main>');

// We want to keep the author and donate sections
const authorStart = docsHtml.indexOf('<section id="author">');
if (authorStart !== -1) {
    const originalAuthor = docsHtml.substring(authorStart, mainEnd);
    docsHtml = docsHtml.substring(0, mainStart) + '\n<div class="generated-docs">\n' + combinedHtml + '\n</div>\n' + originalAuthor + docsHtml.substring(mainEnd);
} else {
    docsHtml = docsHtml.substring(0, mainStart) + '\n<div class="generated-docs">\n' + combinedHtml + '\n</div>\n' + docsHtml.substring(mainEnd);
}

fs.writeFileSync('docs/docs.html', docsHtml);
console.log('Successfully injected markdown into docs/docs.html');
