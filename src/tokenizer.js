// DARE v2 — Tokenizer
// Parses DARE source into a structured AST with error tracking

/**
 * Resolve attribute string into a props object.
 * Recursively unpacks $variables from the style map.
 */
function resolveAttributes(attrStr, styleMap) {
    const combined = {};
    if (!attrStr) return combined;

    // Split by comma or space, preserving quoted strings
    const parts = attrStr.match(/(?:[^\s,"]+|"[^"]*")+/g) || [];

    for (let p of parts) {
        p = p.replace(/,/g, '');

        if (p.startsWith('$')) {
            // Variable: recursively resolve
            const varDef = styleMap[p];
            if (varDef) {
                Object.assign(combined, resolveAttributes(varDef, styleMap));
            }
        } else if (p.includes('=')) {
            const eqIdx = p.indexOf('=');
            const k = p.substring(0, eqIdx);
            const v = p.substring(eqIdx + 1).replace(/"/g, '');
            combined[k] = v;
        } else {
            // Boolean flag (bold, italic, center, etc.)
            combined[p] = true;
        }
    }
    return combined;
}

/**
 * Parse @setup block into styleMap and config.
 */
function parseSetup(cleanCode) {
    const styleMap = {};
    let paperFormat = 'A4';
    let fonts = [];

    const setupMatch = cleanCode.match(/@setup\s*\{([\s\S]*?)\}(?=\s*@doc)/);
    if (setupMatch) {
        setupMatch[1].split(';').forEach(line => {
            const colonIdx = line.indexOf(':');
            if (colonIdx === -1) return;
            const k = line.substring(0, colonIdx).trim();
            const v = line.substring(colonIdx + 1).trim();
            if (!k || !v) return;

            if (k === 'format') paperFormat = v;
            else if (k === 'font' || k === 'fonts') {
                fonts.push(...v.split(',').map(f => f.trim()));
            }
            else styleMap[k] = v;
        });
    }

    return { styleMap, paperFormat, fonts };
}

/**
 * Find the matching closing brace for an opening brace.
 */
function findClosingBrace(str, openIndex) {
    let bal = 1;
    let j = openIndex + 1;
    while (j < str.length && bal > 0) {
        if (str[j] === '{') bal++;
        if (str[j] === '}') bal--;
        j++;
    }
    if (bal !== 0) {
        throw new Error(`DARE Syntax Error: Unmatched brace near position ${openIndex}`);
    }
    return j;
}

/**
 * Parse a block of DARE code, finding tags and their content.
 * Yields { tag, attrStr, innerContent } for each found tag.
 */
function* tokenize(str) {
    let i = 0;
    while (i < str.length) {
        const tail = str.substring(i);
        const match = tail.match(/^([a-z][a-z0-9]*)\s*(?:\(([\s\S]*?)\))?\s*\{/);

        if (match) {
            const tag = match[1];
            const attrStr = match[2] || '';
            const openBraceIndex = i + match[0].length - 1;
            const closeIndex = findClosingBrace(str, openBraceIndex);
            const innerContent = str.substring(openBraceIndex + 1, closeIndex - 1);

            yield { tag, attrStr, innerContent, start: i, end: closeIndex };
            i = closeIndex;
        } else {
            i++;
        }
    }
}

/**
 * Extract the @doc body from clean source code.
 */
function extractDocBody(cleanCode) {
    const docMatch = cleanCode.match(/@doc\s*\{([\s\S]*)\}/);
    if (!docMatch) {
        throw new Error('DARE Error: Missing @doc block. Every DARE file must have @doc { ... }');
    }
    return docMatch[1].trim();
}

/**
 * Remove comments from source code.
 */
function removeComments(source) {
    return source.replace(/\/\/.*$/gm, '');
}

module.exports = {
    resolveAttributes,
    parseSetup,
    findClosingBrace,
    tokenize,
    extractDocBody,
    removeComments,
};
