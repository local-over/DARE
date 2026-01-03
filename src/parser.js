const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const CSS_MAP = {
    w: 'width', h: 'height', bg: 'background-color', p: 'padding',
    m: 'margin', mb: 'margin-bottom', mt: 'margin-top',
    rounded: 'border-radius', cols: 'grid-template-columns',
    align: 'align-items', justify: 'justify-content',
    flex: 'flex', display: 'display', border: 'border',
    gap: 'gap', z: 'z-index', opacity: 'opacity'
};

// --- ATTRIBUTE RESOLVER ---
// Recursively unpacks variables ($var) and cleans up keys
function resolveAttributes(attrStr, styleMap) {
    let combined = {};
    if (!attrStr) return combined;

    // Split by comma or space, but keep quotes intact
    const parts = attrStr.match(/(?:[^\s,"]+|"[^"]*")+/g) || [];

    parts.forEach(p => {
        p = p.replace(/,/g, ''); // Clean commas
        
        if (p.startsWith('$')) {
            // Variable Found: Recursively resolve
            const resolved = resolveAttributes(styleMap[p] || "", styleMap);
            Object.assign(combined, resolved);
        } else if (p.includes('=')) {
            let [k, v] = p.split('=');
            v = v.replace(/"/g, ''); // Strip quotes
            combined[k] = v;
        } else {
            combined[p] = true; // Flags (bold, italic)
        }
    });
    return combined;
}

// --- CSS GENERATOR ---
function generateCSS(props) {
    let css = "";
    Object.keys(props).forEach(k => {
        let v = props[k];
        if (v === true) {
            if (k === 'bold') css += "font-weight:bold;";
            if (k === 'italic') css += "font-style:italic;";
            return;
        }
        // Skip custom props
        if (['data', 'cols', 'format', 'src', 'color'].includes(k)) return;

        const isNum = /^\d+(\.\d+)?$/.test(v);
        const noUnit = ['flex', 'line', 'opacity', 'z-index'].includes(k);
        const val = (isNum && !noUnit) ? v + 'mm' : v;

        if (CSS_MAP[k]) css += `${CSS_MAP[k]}:${val};`;
        else if (k === 'size') css += `font-size:${v}pt;`;
        else if (k === 'font') css += `font-family:${v}, sans-serif;`;
        else if (k === 'shadow') css += `box-shadow:${v};`;
        else css += `${k}:${v};`;
    });
    if (props.color) css += `color:${props.color};`;
    return css;
}

// --- MEDIA PROCESSOR ---
function processImage(src) {
    try {
        if (src.startsWith('http')) return src;
        const fullPath = path.resolve(process.cwd(), src);
        if (fs.existsSync(fullPath)) {
            const fileData = fs.readFileSync(fullPath);
            const mimeType = mime.lookup(fullPath) || 'image/png';
            return `data:${mimeType};base64,${fileData.toString('base64')}`;
        }
        return src;
    } catch(e) { return src; }
}

// --- MAIN COMPILER ---
async function compile(sourceCode) {
    let styleMap = {};
    let paperFormat = 'A4';
    
    // 1. Remove Comments
    const cleanCode = sourceCode.replace(/\/\/.*$/gm, '');

    // 2. Extract Setup
    const setupMatch = cleanCode.match(/@setup\s*\{([\s\S]*?)\}(?=\s*@doc)/);
    if (setupMatch) {
        setupMatch[1].split(';').forEach(line => {
            let [k, v] = line.split(':');
            if (k && v) {
                k = k.trim(); v = v.trim();
                if (k === 'format') paperFormat = v;
                else styleMap[k] = v;
            }
        });
    }

    // 3. ROBUST BLOCK PARSER
    // This finds tags even if they have newlines or weird formatting
    async function parseBlock(str) {
        let output = '';
        let i = 0;
        
        while (i < str.length) {
            // Look for the start of a tag: word + optional (...) + {
            const tail = str.substring(i);
            const match = tail.match(/^([a-z0-9]+)\s*(?:\(([\s\S]*?)\))?\s*\{/);
            
            if (match) {
                // IT IS A TAG
                const tag = match[1];
                const attrStr = match[2] || "";
                const openBraceIndex = i + match[0].length - 1;
                
                // Find matching closing brace with counter
                let bal = 1;
                let j = openBraceIndex + 1;
                while (j < str.length && bal > 0) {
                    if (str[j] === '{') bal++;
                    if (str[j] === '}') bal--;
                    j++;
                }

                // Recursive step
                const innerContent = str.substring(openBraceIndex + 1, j - 1);
                const props = resolveAttributes(attrStr, styleMap);
                const css = generateCSS(props);

                // --- RENDERER LOGIC ---
                if (tag === 'page') {
                    output += `<div class="dare-page" style="${css}">${await parseBlock(innerContent)}</div>`;
                }
                else if (tag === 'txt') {
                    output += `<div class="dare-txt" style="${css}">${innerContent.trim()}</div>`;
                }
                else if (tag === 'img') {
                    const safeSrc = processImage(props.src || '');
                    output += `<img src="${safeSrc}" style="display:block; ${css}" />`;
                }
                else if (tag === 'qr') {
                    try {
                        const qrData = await QRCode.toDataURL(props.data || 'DARE', { margin: 0, width: 500 });
                        const size = props.w || props.h || '30mm';
                        output += `<img src="${qrData}" style="display:block; width:${size}; height:${size}; ${css}" />`;
                    } catch (e) {}
                }
                else if (tag === 'bar') {
                    // SVG CHART
                    const barColor = props.color || props.bg || '#38bdf8'; 
                    let items = props.data.split(';').map(x => x.split(':'));
                    let max = Math.max(...items.map(x => parseFloat(x[1])));
                    
                    let svg = `<svg width="100%" height="100%" preserveAspectRatio="none" style="overflow:visible;">`;
                    let barW = 100 / items.length;
                    
                    items.forEach(([l, v], idx) => {
                        let h = (parseFloat(v)/max) * 100;
                        let x = (idx * barW);
                        let finalW = barW - (barW * 0.2); 
                        
                        svg += `<rect x="${x}%" y="${100-h}%" width="${finalW}%" height="${h}%" fill="${barColor}" rx="2" ry="2" />`;
                        
                        // Text Labels (Inside SVG for absolute position)
                        let valY = h > 15 ? (100-h+8) : (100-h-2);
                        let valColor = h > 15 ? 'white' : barColor;
                        svg += `<text x="${x + finalW/2}%" y="${valY}%" fill="${valColor}" font-size="12" font-family="Arial" font-weight="bold" text-anchor="middle">${v}</text>`;
                    });
                    svg += `</svg>`;
                    
                    let labels = items.map(([l, v]) => `<div style="flex:1; text-align:center; font-size:9pt; margin-top:5px; opacity:0.8;">${l}</div>`).join('');
                    
                    output += `
                    <div class="dare-chart-wrap" style="${css} display:flex; flex-direction:column;">
                        <div style="flex:1; width:100%;">${svg}</div>
                        <div style="display:flex; width:100%; height:20px;">${labels}</div>
                    </div>`;
                }
                else if (tag === 'tbl') {
                    let rows = innerContent.split(';').map(r => {
                        if(!r.trim()) return '';
                        let cells = r.split(',').map(c => `<div class="cell">${c.trim()}</div>`).join('');
                        return cells;
                    }).join('');
                    let cols = props.cols ? `grid-template-columns:${props.cols};` : '';
                    output += `<div class="dare-tbl" style="${css}${cols}">${rows}</div>`;
                }
                else {
                    let classes = "dare-box";
                    if (props.h === 'fill') classes += " flex-fill";
                    output += `<div class="${classes}" style="${css}">${await parseBlock(innerContent)}</div>`;
                }

                // Advance cursor
                i = j;
            } else {
                // Skip whitespace/text outside tags (or handle raw text if needed)
                i++;
            }
        }
        return output;
    }

    const docMatch = cleanCode.match(/@doc\s*\{([\s\S]*)\}/);
    let htmlBody = docMatch ? await parseBlock(docMatch[1].trim()) : "";

    // HTML WRAPPER
    return {
        format: paperFormat,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                * { box-sizing: border-box; }
                html, body { margin: 0; padding: 0; }
                
                body { 
                    font-family: 'Helvetica Neue', Arial, sans-serif; 
                    -webkit-print-color-adjust: exact !important; 
                    background: #555; /* Editor BG */
                }

                .dare-page { 
                    /* CRITICAL: A4 Dimensions for PDF */
                    width: 210mm; 
                    height: 297mm;
                    page-break-after: always; 
                    position: relative; 
                    overflow: hidden; 
                    background: white; 
                    display: flex; 
                    flex-direction: column;
                    margin: 0 auto; /* Center in dev view */
                }

                /* Layout Utilities */
                .dare-box { display: block; position: relative; }
                .dare-txt { white-space: pre-wrap; position: relative; }
                .flex-fill { flex: 1; } 

                /* Tables & Charts */
                .dare-tbl { display: grid; width: 100%; border-top: 1px solid #ddd; border-left: 1px solid #ddd; }
                .cell { padding: 4px; border-bottom: 1px solid #eee; border-right: 1px solid #eee; font-size: 10pt; }
                .dare-chart-wrap { page-break-inside: avoid; }
            </style>
        </head>
        <body>${htmlBody}</body>
        </html>`
    };
}

module.exports = { compile };
