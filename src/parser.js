// DARE v2 — Main Compiler
// Modular architecture: delegates to tokenizer, css engine, and component registry

const { resolveAttributes, parseSetup, tokenize, extractDocBody, removeComments } = require('./tokenizer');
const { generateCSS } = require('./css');
const { getComponent } = require('./components');

// Page dimension presets
const PAGE_FORMATS = {
    A3: { width: '297mm', height: '420mm' },
    A4: { width: '210mm', height: '297mm' },
    A5: { width: '148mm', height: '210mm' },
    Letter: { width: '216mm', height: '279mm' },
    Legal: { width: '216mm', height: '356mm' },
};

/**
 * Compile DARE source code into HTML + format metadata.
 */
async function compile(sourceCode) {
    // 1. Clean source
    const cleanCode = removeComments(sourceCode);

    // 2. Parse setup block
    const { styleMap, paperFormat, fonts } = parseSetup(cleanCode);

    // 3. Extract @doc body
    const docBody = extractDocBody(cleanCode);

    // 4. Recursively parse blocks into HTML
    const htmlBody = await parseBlock(docBody, styleMap);

    // 5. Build final HTML document
    const pageDims = PAGE_FORMATS[paperFormat] || PAGE_FORMATS.A4;
    const fontImports = buildFontImports(fonts);

    return {
        format: paperFormat,
        html: buildHtmlDocument(htmlBody, pageDims, fontImports),
    };
}

/**
 * Recursively parse a block of DARE code into HTML.
 */
async function parseBlock(str, styleMap) {
    let output = '';

    for (const token of tokenize(str)) {
        const { tag, attrStr, innerContent } = token;
        const props = resolveAttributes(attrStr, styleMap);
        const css = generateCSS(props);
        const component = getComponent(tag);

        let html;
        if (component.type === 'container') {
            // Recursively parse children
            const childHtml = await parseBlock(innerContent, styleMap);
            html = component.render(props, css, childHtml);
        } else if (component.type === 'leaf') {
            // Pass raw inner content (text/table data)
            html = component.render(props, css, innerContent);
        } else {
            // Void or async — no children to parse
            html = component.async
                ? await component.render(props, css)
                : component.render(props, css);
        }

        output += html;
    }

    return output;
}

/**
 * Build Google Fonts import link tags.
 */
function buildFontImports(fonts) {
    if (!fonts.length) return '';
    const families = fonts.map(f => f.replace(/\s+/g, '+')).join('&family=');
    return `<link href="https://fonts.googleapis.com/css2?family=${families}&display=swap" rel="stylesheet">`;
}

/**
 * Build the complete HTML document wrapper.
 */
function buildHtmlDocument(body, pageDims, fontImports) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    ${fontImports}
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { margin: 0; padding: 0; }

        body {
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            background: #555;
            color: #1e293b;
            line-height: 1.4;
        }

        .dare-page {
            width: ${pageDims.width};
            height: ${pageDims.height};
            page-break-after: always;
            position: relative;
            overflow: hidden;
            background: white;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
        }

        /* Layout */
        .dare-box { display: block; position: relative; }
        .dare-txt { white-space: pre-wrap; position: relative; }
        .flex-fill { flex: 1; overflow: hidden; min-height: 0; }

        /* Tables — Professional grid */
        .dare-tbl {
            display: grid;
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            font-size: 9.5pt;
        }
        .tc {
            padding: 6px 10px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
        }
        .th {
            font-weight: 700;
            font-size: 8.5pt;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            background: #1e293b;
            color: white;
            border-bottom: none;
            padding: 8px 10px;
        }
        .ts {
            background: #f8fafc;
        }

        /* Charts */
        .dare-chart-wrap {
            page-break-inside: avoid;
            overflow: hidden;
        }

        /* Lists */
        .dare-list {
            font-size: 10pt;
            color: #334155;
            line-height: 1.5;
        }

        /* Header/Footer */
        .dare-hdr { page-break-inside: avoid; }
        .dare-ftr { page-break-inside: avoid; }
    </style>
</head>
<body>${body}</body>
</html>`;
}

module.exports = { compile };
