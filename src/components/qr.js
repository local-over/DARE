// DARE v2 — QR Code Component
const QRCode = require('qrcode');

async function renderQr(props, css) {
    try {
        const qrData = await QRCode.toDataURL(props.data || 'DARE', { margin: 0, width: 500 });
        const size = props.w || props.h || '30mm';
        return `<img src="${qrData}" style="display:block;width:${size};height:${size};${css}" />`;
    } catch (e) {
        return `<div style="${css}color:red;">[QR Error]</div>`;
    }
}

module.exports = renderQr;
