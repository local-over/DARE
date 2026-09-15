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
    let orientation = 'portrait';
    let fonts = [];

    const match = cleanCode.match(/@setup\s*\{/);
    if (match) {
        const openIdx = match.index + match[0].length - 1;
        const closeIdx = findClosingBrace(cleanCode, openIdx);
        const setupContent = cleanCode.substring(openIdx + 1, closeIdx - 1);
        
        setupContent.split(';').forEach(line => {
            const colonIdx = line.indexOf(':');
            if (colonIdx === -1) return;
            const k = line.substring(0, colonIdx).trim();
            const v = line.substring(colonIdx + 1).trim();
            if (!k || !v) return;

            if (k === 'format') {
                const parts = v.toLowerCase().split(' ');
                if (parts.length >= 2 && parts[0].match(/\d/) && parts[1].match(/\d/)) {
                    paperFormat = { custom: [parts[0], parts[1]] };
                } else {
                    paperFormat = parts[0].toUpperCase();
                }
                if (parts.includes('landscape')) orientation = 'landscape';
                if (parts.includes('portrait')) orientation = 'portrait';
            }
            else if (k === 'font' || k === 'fonts') {
                fonts.push(...v.split(',').map(f => f.trim()));
            }
            else styleMap[k] = v;
        });
    }

    return { styleMap, paperFormat, orientation, fonts };
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
    const match = cleanCode.match(/@doc\s*\{/);
    if (!match) {
        throw new Error('DARE Error: Missing @doc block. Every DARE file must have @doc { ... }');
    }
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findClosingBrace(cleanCode, openIdx);
    return cleanCode.substring(openIdx + 1, closeIdx - 1).trim();
}

/**
 * Extract and parse the @data block.
 */
function extractDataBlock(cleanCode) {
    const match = cleanCode.match(/@data\s*\{/);
    if (!match) return null;
    
    const openIdx = match.index + match[0].length - 1;
    const closeIdx = findClosingBrace(cleanCode, openIdx);
    const content = cleanCode.substring(openIdx + 1, closeIdx - 1).trim();
    
    let jsonStr = content;
    if (!content.startsWith('{') && !content.startsWith('[')) {
        const srcMatch = content.match(/src:\s*"([^"]+)"/);
        if (srcMatch) {
            return { _linkedSrc: srcMatch[1] };
        }
        jsonStr = `{ ${content} }`;
    }

    try {
        return JSON.parse(jsonStr);
    } catch(e) {
        console.warn("DARE Warning: Failed to parse embedded @data JSON block.");
        return null;
    }
}

/**
 * Remove comments from source code.
 */
function removeComments(source) {
    return source.replace(/(^|\s)\/\/.*$/gm, '$1');
}

module.exports = {
    resolveAttributes,
    parseSetup,
    extractDataBlock,
    findClosingBrace,
    tokenize,
    extractDocBody,
    removeComments,
};
