// DARE v2 — Image Component
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

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
    } catch (e) { return src; }
}

function renderImg(props, css) {
    const safeSrc = processImage(props.src || '');
    return `<img src="${safeSrc}" style="display:block;${css}" />`;
}

module.exports = renderImg;
