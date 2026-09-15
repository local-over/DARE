const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

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

function parseSize(val) {
    if (!val) return 0;
    if (typeof val === 'number') return val;
    const str = val.toString();
    if (str.endsWith('mm')) return parseFloat(str) * 2.83465;
    if (str.endsWith('px')) return parseFloat(str) * 0.75;
    return parseFloat(str);
}

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

function hexToRgb(hex) {
    if (!hex) return rgb(0, 0, 0);
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    return rgb(parseInt(r, 16)/255, parseInt(g, 16)/255, parseInt(b, 16)/255);
}

class PDFRenderer {
    constructor() {
        this.cursorY = 0;
        this.defaultMargin = 20; // pt
        this.currentMargin = { top: 20, right: 20, bottom: 20, left: 20 };
    }

    async init(options) {
        this.doc = await PDFDocument.create();
        this.pageWidth = options.format[0] || 595.28;
        this.pageHeight = options.format[1] || 841.89; // A4
        this.fontNormal = await this.doc.embedFont(StandardFonts.Helvetica);
        this.fontBold = await this.doc.embedFont(StandardFonts.HelveticaBold);
        this.fontItalic = await this.doc.embedFont(StandardFonts.HelveticaOblique);
    }
    
    addPage() {
        this.page = this.doc.addPage([this.pageWidth, this.pageHeight]);
        this.cursorY = this.currentMargin.top;
    }

    async renderNode(node, context) {
        const { tag, props = {}, children, content, qrData, imgData } = node;
        
        let x = context.x;
        let y = context.y;
        let width = context.width;
        let height = 0;

        const ml = parseSize(props.ml) || 0;
        const mt = parseSize(props.mt) || 0;
        const mr = parseSize(props.mr) || 0;
        const mb = parseSize(props.mb) || 0;
        
        const pt = parseSize(props.pt) || parseSize(props.p) || 0;
        const pb = parseSize(props.pb) || parseSize(props.p) || 0;
        const pl = parseSize(props.pl) || parseSize(props.p) || 0;
        const pr = parseSize(props.pr) || parseSize(props.p) || 0;
        
        x += ml;
        y += mt;
        width -= (ml + mr);

        if (tag === 'page') {
            if (props._pageIndex > 0 || !this.page) {
                this.addPage();
            }
            if (props.bg) {
                this.page.drawRectangle({
                    x: 0,
                    y: 0,
                    width: this.pageWidth,
                    height: this.pageHeight,
                    color: hexToRgb(parseColor(props.bg)),
                });
            }
            const innerContext = { x: this.currentMargin.left, y: this.cursorY, width: this.pageWidth - this.currentMargin.left - this.currentMargin.right, parentBg: props.bg };
            if (children) {
                for (const child of children) {
                    const childHeight = await this.renderNode(child, innerContext);
                    innerContext.y += childHeight;
                }
                this.cursorY = innerContext.y;
            }
            return 0;
        }
        
        if (tag === 'box') {
            const innerWidth = width - (pl + pr);
            let childContext = { x: x + pl, y: y + pt, width: innerWidth, parentBg: props.bg || context.parentBg };
            let totalChildHeight = 0;
            
            if (children) {
                if (props.row) {
                   const n = props.n || children.length;
                   const gap = parseSize(props.gap) || 0;
                   const colWidth = (innerWidth - gap * (n - 1)) / n;
                   let currentX = childContext.x;
                   let maxHeight = 0;
                   for (const child of children) {
                       const cContext = { ...childContext, x: currentX, width: colWidth };
                       const h = await this.renderNode(child, cContext);
                       if (h > maxHeight) maxHeight = h;
                       currentX += colWidth + gap;
                   }
                   totalChildHeight = maxHeight;
                } else {
                   const gap = parseSize(props.gap) || 0;
                   for (const child of children) {
                       const h = await this.renderNode(child, childContext);
                       childContext.y += h + gap;
                       totalChildHeight += h + gap;
                   }
                   if (children.length > 0) totalChildHeight -= gap;
                }
            }
            
            height = totalChildHeight + pt + pb;
            
            if (props.bg || props.border) {
                const rectArgs = {
                    x: x,
                    y: this.pageHeight - (y + height), // pdf-lib coordinates are from bottom-left
                    width: width,
                    height: height,
                };
                if (props.bg) rectArgs.color = hexToRgb(parseColor(props.bg));
                if (props.border) {
                    rectArgs.borderColor = hexToRgb(parseColor(props.borderColor));
                    rectArgs.borderWidth = 1;
                }
                this.page.drawRectangle(rectArgs);
            }
            
            height += mt + mb;
            return height;
        }

        if (tag === 'cols') {
             const gap = parseSize(props.gap) || 0;
             const n = props.n || (children ? children.length : 1);
             const colWidth = (width - gap * (n - 1)) / n;
             let currentX = x;
             let maxHeight = 0;
             if (children) {
                 for (const child of children) {
                     const cContext = { x: currentX, y: y, width: colWidth, parentBg: context.parentBg };
                     const h = await this.renderNode(child, cContext);
                     if (h > maxHeight) maxHeight = h;
                     currentX += colWidth + gap;
                 }
             }
             height = maxHeight + mt + mb;
             return height;
        }

        if (tag === 'txt') {
            const fontSize = parseSize(props.size) || 12;
            let fontColor = parseColor(props.color);
            if (!fontColor && context.parentBg && isDarkColor(parseColor(context.parentBg))) {
                fontColor = '#ffffff';
            } else if (!fontColor) {
                fontColor = '#000000';
            }
            
            let text = content || '';
            if (props.uppercase) text = text.toUpperCase();
            
            const font = props.bold ? this.fontBold : (props.italic ? this.fontItalic : this.fontNormal);
            
            // Simple text wrapping for pdf-lib (crude approximation)
            const words = text.split(' ');
            let lines = [];
            let currentLine = '';
            for (let word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (testWidth > width && currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            if (currentLine) lines.push(currentLine);

            const lineHeight = fontSize * 1.2;
            const textHeight = lines.length * lineHeight;
            
            for (let i=0; i<lines.length; i++) {
                this.page.drawText(lines[i], {
                    x: x,
                    y: this.pageHeight - (y + (i+1)*lineHeight), // From bottom
                    size: fontSize,
                    font: font,
                    color: hexToRgb(fontColor)
                });
            }
            
            height = textHeight + mt + mb;
            return height;
        }

        if (tag === 'sp') {
            return parseSize(props.h) || 10;
        }

        if (tag === 'hr' || tag === 'line') {
            this.page.drawLine({
                start: { x: x, y: this.pageHeight - y },
                end: { x: x + width, y: this.pageHeight - y },
                thickness: 1,
                color: hexToRgb(parseColor(props.color) || '#e2e8f0'),
            });
            return (parseSize(props.mt) || 5) + (parseSize(props.mb) || 5);
        }

        if (tag === 'img' || tag === 'qr' || tag === 'bar' || tag === 'pie') {
            let imgWidth = parseSize(props.w) || parseSize(props.h) || 100;
            let imgHeight = imgWidth;
            let data = imgData || qrData;
            
            if (data) {
                try {
                    let image;
                    if (data.includes('image/png')) {
                        image = await this.doc.embedPng(data);
                    } else if (data.includes('image/jpeg')) {
                        image = await this.doc.embedJpg(data);
                    } else {
                        // fallback or skip unsupported
                        this.page.drawText(`[${tag} unsupported format]`, { x: x, y: this.pageHeight - (y + 10), size: 10 });
                        return 15 + mt + mb;
                    }
                    this.page.drawImage(image, {
                        x: x,
                        y: this.pageHeight - (y + imgHeight),
                        width: imgWidth,
                        height: imgHeight,
                    });
                } catch(e) {
                     console.error(e);
                     this.page.drawText(`[${tag} error]`, { x: x, y: this.pageHeight - (y + 10), size: 10 });
                     imgHeight = 15;
                }
            } else {
                this.page.drawText(`[${tag} missing]`, { x: x, y: this.pageHeight - (y + 10), size: 10 });
                imgHeight = 15;
            }
            return imgHeight + mt + mb;
        }

        return 10;
    }

    async render(astData) {
        let options = { format: [595.28, 841.89] };
        await this.init(options);

        let pageIndex = 0;
        if (!astData.ast || astData.ast.length === 0) {
            this.addPage();
        } else {
            for (const node of astData.ast) {
                if (node.tag === 'page') {
                    node.props = node.props || {};
                    node.props._pageIndex = pageIndex;
                    await this.renderNode(node, { x: 0, y: 0, width: this.pageWidth });
                    pageIndex++;
                } else {
                    if (!this.page) this.addPage();
                    const h = await this.renderNode(node, { x: this.currentMargin.left, y: this.cursorY, width: this.pageWidth - this.currentMargin.left - this.currentMargin.right });
                    this.cursorY += h;
                }
            }
        }
        
        return await this.doc.save();
    }
}

async function renderPdf(astData, outputPath) {
    const renderer = new PDFRenderer();
    const pdfBytes = await renderer.render(astData);
    const pdfBuffer = Buffer.from(pdfBytes);
    
    if (outputPath) {
        const fs = eval("require('fs')");
        fs.writeFileSync(outputPath, pdfBuffer);
        return outputPath;
    }
    return pdfBuffer;
}

module.exports = { renderPdf };
