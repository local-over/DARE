// DARE v2 — Tokenizer

function splitTokens(input, separator = /[\s,]+/) {
  const out = []; let current = ''; let quote = null;
  for (const ch of String(input || '')) {
    if (quote) { current += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; current += ch; continue; }
    if (separator.test(ch)) { if (current) { out.push(current); current = ''; } }
    else current += ch;
  }
  if (quote) throw new Error('DARE Syntax Error: Unclosed quote in attributes');
  if (current) out.push(current);
  return out;
}

function splitOutsideQuotes(input, delimiter) {
  const out = []; let current = ''; let quote = null;
  for (const ch of String(input || '')) {
    if (quote) { current += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; current += ch; continue; }
    if (ch === delimiter) { out.push(current); current = ''; } else current += ch;
  }
  if (quote) throw new Error('DARE Syntax Error: Unclosed quote');
  out.push(current); return out;
}

function unquote(value) { return String(value ?? '').replace(/^(["'])([\s\S]*)\1$/, '$2'); }

function resolveAttributes(attrStr, styleMap, resolving = new Set()) {
  const combined = {};
  for (let token of splitTokens(attrStr)) {
    token = token.replace(/,$/, '');
    if (!token) continue;
    if (token.startsWith('$')) {
      if (resolving.has(token)) throw new Error(`DARE Error: Circular style variable ${token}`);
      if (styleMap[token]) Object.assign(combined, resolveAttributes(styleMap[token], styleMap, new Set([...resolving, token])));
    } else {
      const eq = token.indexOf('=');
      if (eq >= 0) combined[token.slice(0, eq).trim()] = unquote(token.slice(eq + 1).trim());
      else combined[token] = true;
    }
  }
  return combined;
}

function parseSetup(cleanCode) {
  const styleMap = {}; let paperFormat = 'A4'; let fonts = [];
  const match = cleanCode.match(/@setup\s*\{([\s\S]*?)\}(?=\s*@doc)/);
  if (!match) return { styleMap, paperFormat, fonts };
  for (const raw of splitOutsideQuotes(match[1], ';')) {
    const colon = raw.indexOf(':'); if (colon < 0) continue;
    const key = raw.slice(0, colon).trim(); const value = raw.slice(colon + 1).trim(); if (!key || !value) continue;
    if (key === 'format') paperFormat = unquote(value);
    else if (key === 'font' || key === 'fonts') fonts.push(...splitOutsideQuotes(unquote(value), ',').map(v => v.trim()).filter(Boolean));
    else styleMap[key] = value;
  }
  return { styleMap, paperFormat, fonts };
}

function findClosingBrace(str, openIndex) {
  let balance = 1; let quote = null;
  for (let i = openIndex + 1; i < str.length; i++) {
    const ch = str[i];
    if (quote) { if (ch === quote && str[i - 1] !== '\\') quote = null; continue; }
    if (ch === '"') { quote = ch; continue; }
    if (ch === '{') balance++;
    if (ch === '}' && --balance === 0) return i + 1;
  }
  throw new Error(`DARE Syntax Error: Unmatched brace near position ${openIndex}`);
}

function* tokenize(str) {
  let i = 0;
  while (i < str.length) {
    const match = str.slice(i).match(/^\s*([a-z][a-z0-9]*)\s*(?:\(([\s\S]*?)\))?\s*\{/i);
    if (!match) { i++; continue; }
    const start = i + match[0].search(/[a-z]/i); const open = i + match[0].length - 1; const end = findClosingBrace(str, open);
    yield { tag: match[1].toLowerCase(), attrStr: match[2] || '', innerContent: str.slice(open + 1, end - 1), start, end };
    i = end;
  }
}

function extractDocBody(cleanCode) {
  const start = cleanCode.search(/@doc\s*\{/); if (start < 0) throw new Error('DARE Error: Missing @doc block. Every DARE file must have @doc { ... }');
  const open = cleanCode.indexOf('{', start); const end = findClosingBrace(cleanCode, open); return cleanCode.slice(open + 1, end - 1).trim();
}

function removeComments(source) {
  return String(source).replace(/(^|\s)\/\/.*$/gm, '$1');
}

module.exports = { resolveAttributes, parseSetup, findClosingBrace, tokenize, extractDocBody, removeComments, splitOutsideQuotes };
