const pdfmake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts && pdfFonts.vfs) {
    pdfmake.vfs = pdfFonts.vfs;
} else if (pdfFonts) {
    pdfmake.vfs = pdfFonts;
}

pdfmake.setFonts({
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
});

function parseColor(val) {
    if (!val) return undefined;
    if (val.startsWith('#')) return val;
    const premiumPalette = {
        'white': '#ffffff',
        'black': '#0f172a',
        'primary': '#3b82f6',
        'secondary': '#64748b',
        'surface': '#f8fafc',
        'border': '#e2e8f0',
        'muted': '#94a3b8',
        'danger': '#ef4444',
        'success': '#22c55e'
    };
    return premiumPalette[val] || val;
}

/**
 * Determine if a hex color is "dark" (luminance < 0.4).
 * Used to auto-invert text color for readability.
 */
function isDarkColor(color) {
    if (!color || !color.startsWith('#')) return false;
    let hex = color.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 0.4;
}

function parseSize(val) {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const str = val.toString();
    if (str.endsWith('mm')) {
        return parseFloat(str) * 2.83465;
    }
    if (str.endsWith('px')) {
        return parseFloat(str) * 0.75;
    }
    if (str.endsWith('%')) {
        return str;
    }
    return parseFloat(str);
}

function buildPdfMakeNode(node) {
    const { tag, props = {}, children, content, qrData } = node;

    // Common margins mapping
    const mt = parseSize(props.mt);
    const mb = parseSize(props.mb);
    const ml = parseSize(props.ml);
    const mr = parseSize(props.mr);
    const margin = [ml || 0, mt || 0, mr || 0, mb || 0];

    // Padding mapping
    let px = parseSize(props.px) || parseSize(props.p) || 0;
    let py = parseSize(props.py) || parseSize(props.p) || 0;

    // Smart Padding for boxes with background or borders
    if (tag === 'box' && (props.bg || props.border) && px === 0 && py === 0) {
        px = 10;
        py = 10;
    }

    if (tag === 'page') {
        const pageContent = {
            stack: children ? children.map(buildPdfMakeNode) : [],
            margin: margin
        };
        // If not the first page, insert a page break before
        if (props._pageIndex > 0) {
            pageContent.pageBreak = 'before';
        }
        return pageContent;
    }

    if (tag === 'box' || tag === 'cols') {
        const isRow = props.row || tag === 'cols';
        const mappedChildren = children ? children.map(buildPdfMakeNode) : [];
        
        let container = {};
        
        if (isRow && mappedChildren.length > 0) {
            let widths = [];
            let updatedChildren = [];
            
            // Handle cols(n=N) — auto-distribute equal widths
            const nCols = parseInt(props.n);
            
            if (props.between && mappedChildren.length === 2) {
                let w1 = 'auto', w2 = 'auto';
                if (children[0].props.w) w1 = parseSize(children[0].props.w);
                if (children[1].props.w) w2 = parseSize(children[1].props.w);
                widths = [w1, '*', w2];
                updatedChildren = [mappedChildren[0], { text: '' }, mappedChildren[1]];
            } else if (props.between && mappedChildren.length > 2) {
                // space-between with more than 2 children: use star widths with spacers
                for (let i = 0; i < children.length; i++) {
                    const cProps = children[i].props || {};
                    if (cProps.w) {
                        widths.push(parseSize(cProps.w));
                    } else {
                        widths.push('auto');
                    }
                    updatedChildren.push(mappedChildren[i]);
                    if (i < children.length - 1) {
                        widths.push('*');
                        updatedChildren.push({ text: '' });
                    }
                }
            } else {
                for (let i = 0; i < children.length; i++) {
                    const cProps = children[i].props || {};
                    if (cProps.w) {
                        widths.push(parseSize(cProps.w));
                    } else if (cProps.flex) {
                        widths.push('*');
                    } else if (nCols > 0) {
                        // cols(n=N) means N equal-width columns
                        widths.push('*');
                    } else {
                        widths.push('auto');
                    }
                    updatedChildren.push(mappedChildren[i]);
                }
            }

            container = {
                columns: updatedChildren,
                columnGap: parseSize(props.gap) || 0
            };
            
            if (widths.length > 0) {
                widths = widths.map(w => w === 0 ? 'auto' : w);
                
                for (let i = 0; i < updatedChildren.length; i++) {
                    if (!updatedChildren[i].width && widths[i]) {
                        updatedChildren[i].width = widths[i];
                        // Reset inner table widths to avoid double-percentage scaling
                        if (updatedChildren[i].table && updatedChildren[i].table.widths) {
                            updatedChildren[i].table.widths = ['*'];
                        }
                    }
                }
            }

        } else {
            // Stack (Vertical)
            if (props.gap && mappedChildren.length > 1) {
                const gapPt = parseSize(props.gap);
                for (let i = 0; i < mappedChildren.length - 1; i++) {
                    if (!mappedChildren[i].margin) {
                        mappedChildren[i].margin = [0, 0, 0, gapPt];
                    } else {
                        mappedChildren[i].margin[3] = Math.max(mappedChildren[i].margin[3], gapPt);
                    }
                }
            }
            container = {
                stack: mappedChildren
            };
        }

        // Apply background/border using a single-cell table wrapper
        if (props.bg || props.border || px || py || props.w || props.h) {
            let tableWidths = ['*'];
            let tableHeights = undefined;
            if (props.w) tableWidths = [parseSize(props.w)];
            if (props.h) tableHeights = [parseSize(props.h)];
            
            let finalContainer = {
                table: {
                    widths: tableWidths,
                    heights: tableHeights,
                    body: [[container]]
                },
                layout: {
                    hLineWidth: function () { return props.border ? 1 : 0; },
                    vLineWidth: function () { return props.border ? 1 : 0; },
                    hLineColor: function () { return parseColor(props.borderColor) || '#e2e8f0'; },
                    vLineColor: function () { return parseColor(props.borderColor) || '#e2e8f0'; },
                    fillColor: function () { return parseColor(props.bg) || null; },
                    paddingLeft: function() { return px; },
                    paddingRight: function() { return px; },
                    paddingTop: function() { return py; },
                    paddingBottom: function() { return py; }
                },
                margin: margin
            };
            
            if (props.ta) finalContainer.alignment = props.ta;

            if (props.center) {
                let colW = 'auto';
                if (props.w && props.w.toString().endsWith('%')) {
                    colW = props.w;
                    finalContainer.table.widths = ['100%'];
                }
                return {
                    columns: [
                        { width: '*', text: '' },
                        { width: colW, ...finalContainer, margin: [0, 0, 0, 0] },
                        { width: '*', text: '' }
                    ],
                    margin: margin
                };
            }
            return finalContainer;
        }

        container.margin = margin;
        if (props.ta) container.alignment = props.ta;

        if (props.center) {
            return {
                columns: [
                    { width: '*', text: '' },
                    { width: 'auto', ...container, margin: [0, 0, 0, 0] },
                    { width: '*', text: '' }
                ],
                margin: margin
            };
        }
        return container;
    }

    if (tag === 'txt') {
        // Auto-detect text color based on parent background
        let textColor = parseColor(props.color);
        if (!textColor && props._parentBg && isDarkColor(parseColor(props._parentBg))) {
            textColor = '#ffffff';
        }
        
        let txtSize = parseSize(props.size) || 12;
        let finalMargin = (props.bg || props.border || px || py) ? [0, 0, 0, 0] : [...margin];
        
        if (txtSize > 14 && finalMargin[3] === 0 && !props.mb && !(props.bg || props.border || px || py)) {
            finalMargin[3] = 8;
        }

        let txtObj = {
            text: content || '',
            fontSize: txtSize,
            bold: !!props.bold,
            italics: !!props.italic,
            color: textColor,
            margin: finalMargin
        };
        if (props.ta) txtObj.alignment = props.ta;
        if (props.uppercase) txtObj.text = txtObj.text.toUpperCase();

        if (props.bg || props.border || px || py) {
            let finalContainer = {
                table: {
                    widths: ['*'],
                    body: [[txtObj]]
                },
                layout: {
                    hLineWidth: function () { return props.border ? 1 : 0; },
                    vLineWidth: function () { return props.border ? 1 : 0; },
                    hLineColor: function () { return '#e2e8f0'; },
                    vLineColor: function () { return '#e2e8f0'; },
                    fillColor: function () { return parseColor(props.bg) || null; },
                    paddingLeft: function() { return px; },
                    paddingRight: function() { return px; },
                    paddingTop: function() { return py; },
                    paddingBottom: function() { return py; }
                },
                margin: margin
            };
            if (props.ta) finalContainer.alignment = props.ta;
            return finalContainer;
        }

        return txtObj;
    }

    if (tag === 'link') {
        let textColor = parseColor(props.color) || '#2563eb';
        if (!props.color && props._parentBg && isDarkColor(parseColor(props._parentBg))) {
            textColor = '#93c5fd';
        }
        return {
            text: content || props.url || '',
            link: props.url || '#',
            color: textColor,
            decoration: 'underline',
            fontSize: parseSize(props.size) || 12,
            margin: margin
        };
    }

    if (tag === 'badge') {
        const bg = parseColor(props.bg) || '#e2e8f0';
        const fg = parseColor(props.color) || '#0f172a';
        return {
            table: {
                widths: ['auto'],
                body: [[{ text: content || '', color: fg, fontSize: parseSize(props.size) || 10, bold: true }]]
            },
            layout: {
                hLineWidth: () => 0,
                vLineWidth: () => 0,
                fillColor: () => bg,
                paddingLeft: () => 8,
                paddingRight: () => 8,
                paddingTop: () => 3,
                paddingBottom: () => 3
            },
            margin: margin
        };
    }

    if (tag === 'sp') {
        return {
            text: '',
            margin: [0, parseSize(props.h) || 10, 0, 0]
        };
    }

    if (tag === 'list') {
        const items = content ? content.trim().split('\n').map(s => s.trim()).filter(Boolean) : [];
        const isOrdered = props.type === 'ol' || props.type === 'ordered';
        let textColor = parseColor(props.color) || '#000000';
        if (props._parentBg && isDarkColor(parseColor(props._parentBg))) {
            textColor = '#ffffff';
        }
        const listObj = {
            margin: margin,
            fontSize: parseSize(props.size) || 12,
            color: textColor
        };
        if (isOrdered) {
            listObj.ol = items;
        } else {
            listObj.ul = items;
        }
        return listObj;
    }

    if (tag === 'hr' || tag === 'line') {
        return {
            table: {
                widths: ['*'],
                body: [['']],
            },
            layout: {
                hLineWidth: function(i) { return i === 0 ? 1 : 0; },
                vLineWidth: function() { return 0; },
                hLineColor: function() { return parseColor(props.color) || '#e2e8f0'; },
                paddingTop: function() { return 0; },
                paddingBottom: function() { return 0; }
            },
            margin: [0, parseSize(props.mt) || 5, 0, parseSize(props.mb) || 5]
        };
    }

    if (tag === 'qr') {
        if (qrData) {
            return {
                image: qrData,
                width: parseSize(props.w) || parseSize(props.h) || 100,
                margin: margin
            };
        }
        return { text: '[QR Code]', margin };
    }

    if (tag === 'img' || tag === 'bar' || tag === 'pie') {
        if (node.imgData) {
            const imgObj = {
                image: node.imgData,
                width: parseSize(props.w) || parseSize(props.h) || 200,
                margin: margin
            };
            if (props.ta === 'center' || props.center) {
                imgObj.alignment = 'center';
            }
            return imgObj;
        }
        return { text: `[${tag} missing]`, margin, color: '#94a3b8', italics: true };
    }

    if (tag === 'shape') {
        const shapeType = props.type || 'rect';
        const w = parseSize(props.w) || 50;
        const h = parseSize(props.h) || 50;
        const fillColor = parseColor(props.bg);
        const lineColor = parseColor(props.color) || '#000000';
        const lineWidth = props.border ? parseSize(props.border) : 0;
        
        let shapeDef = { type: 'rect', x: 0, y: 0, w, h };
        if (shapeType === 'triangle') {
            shapeDef = {
                type: 'polyline',
                closePath: true,
                points: [ { x: w/2, y: 0 }, { x: 0, y: h }, { x: w, y: h } ]
            };
        } else if (shapeType === 'circle') {
            shapeDef = {
                type: 'ellipse',
                x: w/2, y: h/2,
                r1: w/2, r2: h/2
            };
        }
        
        if (fillColor) shapeDef.color = fillColor;
        if (lineWidth > 0) {
            shapeDef.lineWidth = lineWidth;
            shapeDef.lineColor = lineColor;
        }

        const canvasObj = {
            table: {
                widths: [w],
                heights: [h],
                body: [[ { canvas: [ shapeDef ], margin: [0,0,0,0] } ]]
            },
            layout: 'noBorders',
            margin: margin
        };
        if (props.ta === 'center' || props.center) canvasObj.alignment = 'center';
        else if (props.ta) canvasObj.alignment = props.ta;
        
        return canvasObj;
    }

    if (tag === 'tbl') {
        if (!content) return { text: '' };
        let validRows = content.trim().split(';').map(r => r.trim()).filter(r => r.length > 0);
        const rows = validRows.map(row => {
            return row.split(',').map(cell => ({
                text: cell.trim(),
                fontSize: 10,
                margin: [6, 5, 6, 5]
            }));
        });

        // Normalize column count: every row must have the same number of cells
        let maxCols = 0;
        rows.forEach(r => { if (r.length > maxCols) maxCols = r.length; });
        rows.forEach(r => {
            while (r.length < maxCols) r.push({ text: '', fontSize: 10, margin: [6, 5, 6, 5] });
        });

        if (rows.length > 0) {
            rows[0].forEach(cell => {
                cell.bold = true;
                cell.fillColor = '#1e293b';
                cell.color = '#ffffff';
            });
        }

        for (let i = 1; i < rows.length; i++) {
            rows[i].forEach(cell => {
                cell.fillColor = i % 2 === 0 ? '#f8fafc' : '#ffffff';
            });
        }

        let widths = [];
        if (props.cols) {
            const parts = props.cols.split(' ');
            
            let totalFr = 0;
            const parsed = parts.map(p => {
                if (p.includes('fr')) {
                    const num = parseFloat(p.replace('fr', '')) || 1;
                    totalFr += num;
                    return { type: 'fr', value: num };
                }
                return { type: 'auto', value: p };
            });

            widths = parsed.map(p => {
                if (p.type === 'fr') {
                    if (totalFr === 0) return '*';
                    return `${(p.value / totalFr * 100).toFixed(2)}%`;
                }
                return 'auto';
            });
        } else if (rows[0]) {
            widths = rows[0].map(() => '*');
        }

        return {
            table: {
                headerRows: 1,
                widths: widths,
                body: rows,
                dontBreakRows: true
            },
            layout: {
                hLineWidth: function (i, node) { return i === 0 || i === node.table.body.length ? 0 : 1; },
                vLineWidth: function () { return 0; },
                hLineColor: function () { return '#e2e8f0'; },
                paddingTop: function () { return 8; },
                paddingBottom: function () { return 8; },
                paddingLeft: function () { return 12; },
                paddingRight: function () { return 12; }
            },
            margin: margin
        };
    }

    return { text: '' };
}

/**
 * Walk the AST and propagate parent background color downward
 * so children can auto-invert text color on dark backgrounds.
 */
function propagateParentBg(nodes, parentBg) {
    if (!nodes) return;
    for (const node of nodes) {
        const bg = (node.props && node.props.bg) ? node.props.bg : parentBg;
        if (bg && node.props) {
            node.props._parentBg = bg;
        }
        if (node.children) {
            propagateParentBg(node.children, bg);
        }
    }
}

async function renderPdf(astData, outputPath) {
    // Pre-pass: propagate background colors for auto-inversion
    propagateParentBg(astData.ast, null);
    
    let headerNode = null;
    let footerNode = null;
    
    const mainContent = [];
    let pageIndex = 0;
    for (const node of astData.ast) {
        if (node.tag === 'page' && node.children) {
            node.props._pageIndex = pageIndex;
            const pageChildren = [];
            for (const child of node.children) {
                if (child.tag === 'hdr') {
                    headerNode = buildPdfMakeNode({ ...child, tag: 'box' });
                } else if (child.tag === 'ftr') {
                    footerNode = buildPdfMakeNode({ ...child, tag: 'box' });
                } else {
                    pageChildren.push(child);
                }
            }
            node.children = pageChildren;
            mainContent.push(buildPdfMakeNode(node));
            pageIndex++;
        } else if (node.tag === 'hdr') {
            headerNode = buildPdfMakeNode({ ...node, tag: 'box' });
        } else if (node.tag === 'ftr') {
            footerNode = buildPdfMakeNode({ ...node, tag: 'box' });
        } else {
            mainContent.push(buildPdfMakeNode(node));
        }
    }

    let pageSize = astData.format || 'A4';
    let isCustomSize = false;
    if (typeof pageSize === 'object' && pageSize.custom) {
        isCustomSize = true;
        pageSize = {
            width: parseSize(pageSize.custom[0]),
            height: parseSize(pageSize.custom[1])
        };
    }

    // Default to edge-to-edge rendering like HTML
    let topMargin = headerNode ? 65 : 0;
    let bottomMargin = footerNode ? 55 : 0;
    let sideMargin = 0;
    
    const docDefinition = {
        pageSize: pageSize,
        pageOrientation: isCustomSize ? undefined : (astData.orientation || 'portrait'),
        pageMargins: [ sideMargin, topMargin, sideMargin, bottomMargin ],
        background: function(currentPage, pageSize) {
            const pages = astData.ast.filter(n => n.tag === 'page');
            const pageNode = pages[currentPage - 1];
            if (pageNode && pageNode.props && pageNode.props.bg) {
                return [
                    {
                        canvas: [
                            {
                                type: 'rect',
                                x: 0,
                                y: 0,
                                w: pageSize.width,
                                h: pageSize.height,
                                color: parseColor(pageNode.props.bg)
                            }
                        ]
                    }
                ];
            }
            return null;
        },
        content: mainContent,
        header: headerNode ? function(currentPage, pageCount) { 
            return { ...headerNode, margin: [sideMargin, 10, sideMargin, 0] }; 
        } : undefined,
        footer: footerNode ? function(currentPage, pageCount) { 
            // Replace {{page}} and {{pages}} placeholders
            const footerCopy = JSON.parse(JSON.stringify(footerNode));
            function replacePlaceholders(obj) {
                if (typeof obj === 'string') {
                    return obj.replace(/\{\{page\}\}/g, String(currentPage)).replace(/\{\{pages\}\}/g, String(pageCount));
                }
                if (Array.isArray(obj)) return obj.map(replacePlaceholders);
                if (obj && typeof obj === 'object') {
                    for (const key of Object.keys(obj)) {
                        obj[key] = replacePlaceholders(obj[key]);
                    }
                }
                return obj;
            }
            replacePlaceholders(footerCopy);
            return { ...footerCopy, margin: [sideMargin, 0, sideMargin, 10] }; 
        } : undefined,
        defaultStyle: {
            font: 'Roboto',
            lineHeight: 1.4
        }
    };

    const pdfDoc = pdfmake.createPdf(docDefinition);
    
    return new Promise((resolve, reject) => {
        try {
            pdfDoc.getBuffer(async (buffer) => {
                try {
                    if (outputPath) {
                        const fs = require('fs');
                        await fs.promises.writeFile(outputPath, buffer);
                        resolve(outputPath);
                    } else {
                        resolve(buffer);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { renderPdf };
