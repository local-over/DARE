// DARE v2 — Direct PDF renderer (no browser required)
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const MM = 72 / 25.4;
const PT = 1;
const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

function num(value, fallback = 0) {
  if (value == null || value === '') return fallback;
  const n = parseFloat(String(value));
  return Number.isFinite(n) ? n * (/mm$/i.test(String(value)) || /^-?\d+(\.\d+)?$/.test(String(value)) ? MM : /pt$/i.test(String(value)) ? PT : 1) : fallback;
}
function color(value, fallback = '#1e293b') { return value || fallback; }
function textValue(value) { return String(value ?? '').trim().replace(/^(["'])([\s\S]*)\1$/, '$2'); }
function parseData(value) {
  return String(value || '').split(';').map(v => v.trim()).filter(Boolean).map(pair => {
    const i = pair.lastIndexOf(':');
    const label = i < 0 ? pair : pair.slice(0, i).trim();
    const n = i < 0 ? 0 : parseFloat(pair.slice(i + 1));
    return { label, value: Number.isFinite(n) ? n : 0 };
  });
}
function isRow(props) { return props.row === true || props.display === 'flex' && props.flex === 'row' || props['flex-direction'] === 'row'; }
function styleBox(props, parent) {
  const x = parent.x + num(props.ml || props.mx, 0);
  const y = parent.y + num(props.mt || props.my, 0);
  const width = props.w && props.w !== 'fill' ? num(props.w) : parent.width - num(props.ml || props.mx, 0) - num(props.mr || props.mx, 0);
  const height = props.h && props.h !== 'fill' ? num(props.h) : null;
  return { x, y, width: Math.max(0, width), height, padX: num(props.px || props.p, 0), padY: num(props.py || props.p, 0) };
}
function drawBorder(doc, box, props) {
  if (props.bg || props.background) doc.save().fillColor(color(props.bg || props.background, '#fff')).rect(box.x, box.y, box.width, box.height).fill().restore();
  if (props.border) doc.lineWidth(num(props.border, 1)).strokeColor(color(props['border-color'], '#cbd5e1')).rect(box.x, box.y, box.width, box.height).stroke();
}
function fitFont(doc, props) { doc.fontSize(num(props.size || props.fs, 10) || 10); }

async function renderPdf(document, outputPath = null, options = {}) {
  const dimensions = document.dimensions;
  const width = num(dimensions.width), height = num(dimensions.height);
  const pdf = new PDFDocument({ size: [width, height], margin: 0, autoFirstPage: false, bufferPages: true, info: { Producer: 'DARE Direct PDF Renderer' } });
  const chunks = [];
  pdf.on('data', c => chunks.push(c));
  const pages = document.children.filter(n => n.type === 'page');
  const roots = pages.length ? pages : [{ type: 'page', props: {}, children: document.children }];
  for (const page of roots) {
    pdf.addPage({ size: [width, height], margin: 0 });
    const addPage = pdf.addPage;
    pdf.addPage = () => pdf;
    const props = page.props || {};
    if (props.bg) pdf.rect(0, 0, width, height).fill(color(props.bg));
    let y = num(props.p, 0);
    for (const child of page.children || []) {
      const result = await drawNode(pdf, child, { x: 0, y, width, height, pageWidth: width, pageHeight: height });
      y += result.height;
    }
    pdf.addPage = addPage;
  }
  pdf.end();
  const buffer = await new Promise((resolve, reject) => { pdf.on('end', () => resolve(Buffer.concat(chunks))); pdf.on('error', reject); });
  if (outputPath) { fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true }); fs.writeFileSync(outputPath, buffer); return outputPath; }
  return buffer;
}

async function drawNode(doc, node, parent) {
  const props = node.props || {};
  const box = styleBox(props, parent);
  const padX = box.padX, padY = box.padY;
  const inner = { x: box.x + padX, y: box.y + padY, width: Math.max(0, box.width - padX * 2), height: Math.max(0, (box.height || parent.height) - padY * 2), pageWidth: parent.pageWidth, pageHeight: parent.pageHeight };
  let used = box.height || 0;

  if (node.type === 'page' || node.type === 'box' || node.type === 'hdr' || node.type === 'ftr' || node.type === 'cols') {
    if (props.bg || props.background || props.border) drawBorder(doc, { ...box, height: box.height || 0 }, props);
    const children = node.children || [];
    const row = node.type === 'cols' || isRow(props) || props.display === 'flex' && props['flex-direction'] !== 'column';
    if (row && children.length) {
      const gap = num(props.gap, 0); const each = (inner.width - gap * (children.length - 1)) / children.length;
      let x = inner.x; let maxH = 0;
      for (const child of children) { const r = await drawNode(doc, child, { ...inner, x, width: each, y: inner.y }); x += each + gap; maxH = Math.max(maxH, r.height); }
      used = used || maxH + padY * 2;
    } else {
      let y = inner.y;
      for (const child of children) { const r = await drawNode(doc, child, { ...inner, y }); y += r.height; }
      used = used || y - box.y + padY;
    }
    if (props.h === 'fill' || props.h === '100%') used = parent.height;
    return { height: used + num(props.mb, 0) };
  }

  if (node.type === 'txt' || node.type === 'badge' || node.type === 'link') {
    fitFont(doc, props); if (props.bold) doc.font('Helvetica-Bold'); else if (props.italic) doc.font('Helvetica-Oblique'); else doc.font('Helvetica');
    const value = textValue(node.content); const textColor = color(props.color);
    const textWidth = box.width || parent.width; const lineGap = props.lh ? num(props.lh, 1.4) : undefined;
    const h = doc.heightOfString(value, { width: textWidth, lineGap });
    const available = Math.max(1, parent.pageHeight - box.y - 1);
    if (node.type === 'badge') doc.save().fillColor(color(props.bg, '#e0f2fe')).roundedRect(box.x, box.y, textWidth, h + padY * 2, num(props.rounded, 2)).fill().restore();
    doc.fillColor(textColor).text(value, box.x, Math.min(box.y, parent.pageHeight - 1), { width: textWidth, height: available, align: props.align || props.ta || 'left', lineGap, lineBreak: true });
    return { height: (box.height || Math.min(h + padY * 2, available)) + num(props.mb, 0) };
  }

  if (node.type === 'sp') return { height: num(props.h || props.w, 10) };
  if (node.type === 'line' || node.type === 'hr') { const h = num(props.thick, 1); doc.save().strokeColor(color(props.color || props['border-color'], '#cbd5e1')).lineWidth(h).moveTo(box.x, box.y + h / 2).lineTo(box.x + box.width, box.y + h / 2).stroke().restore(); return { height: h + num(props.my, 0) * 2 }; }

  if (node.type === 'list') {
    fitFont(doc, props); const items = String(node.content || '').split(';').map(textValue).filter(Boolean); let y = box.y;
    for (let i = 0; i < items.length; i++) { const prefix = props.type === 'num' ? `${i + 1}. ` : '• '; const h = doc.heightOfString(prefix + items[i], { width: box.width }); doc.fillColor(color(props.color)).text(prefix + items[i], box.x, Math.min(y, parent.pageHeight - 1), { width: box.width, height: Math.max(1, parent.pageHeight - y), lineBreak: true }); y += h; }
    return { height: y - box.y + num(props.mb, 0) };
  }

  if (node.type === 'tbl') return drawTable(doc, node, box);
  if (node.type === 'qr') { const data = await QRCode.toDataURL(props.data || 'DARE', { margin: 0, width: 500 }); const size = num(props.w || props.h, 30); doc.image(data, box.x, box.y, { width: size, height: size }); return { height: size + num(props.mb, 0) }; }
  if (node.type === 'img') { try { const source = String(props.src || '').startsWith('data:') ? props.src : path.resolve(String(props.src || '')); const size = { width: box.width, height: box.height || undefined }; doc.image(source, box.x, box.y, size); const h = box.height || (size.width * .66); return { height: h }; } catch (_) { doc.fillColor('#b91c1c').text('[Image unavailable]', box.x, box.y); return { height: 14 }; } }
  if (node.type === 'bar' || node.type === 'pie') return drawChart(doc, node, box);
  return { height: 0 };
}

async function drawTable(doc, node, box) {
  const rows = String(node.content || '').split(';').map(r => r.split(',').map(textValue)).filter(r => r.length && r.some(Boolean));
  const cols = rows[0] ? rows[0].length : 1; const colW = box.width / cols; let y = box.y; const rowH = num(node.props.rowh, 18) || 18; const bottom = box.y + (box.height || doc.page.height - box.y);
  rows.forEach((row, ri) => { row.forEach((cell, ci) => { const drawY = Math.min(y, bottom - rowH); const bg = ri === 0 ? '#1e293b' : ri % 2 === 0 ? '#f8fafc' : '#fff'; doc.save().fillColor(bg).rect(box.x + ci * colW, drawY, colW, rowH).fill().restore(); doc.fontSize(ri === 0 ? 8.5 : 9.5).font(ri === 0 ? 'Helvetica-Bold' : 'Helvetica').fillColor(ri === 0 ? '#fff' : '#334155').text(cell, box.x + ci * colW + 6, Math.min(drawY + 5, doc.page.height - 1), { width: colW - 12, height: Math.max(1, Math.min(rowH - 6, doc.page.height - drawY - 5)), ellipsis: true }); doc.strokeColor('#e2e8f0').lineWidth(.5).rect(box.x + ci * colW, drawY, colW, rowH).stroke(); }); y += rowH; });
  return { height: y - box.y + num(node.props.mb, 0) };
}

async function drawChart(doc, node, box) {
  const items = parseData(node.props.data); const total = items.reduce((a, b) => a + Math.max(0, b.value), 0) || 1; const h = box.height || 150; const w = box.width; 
  if (node.type === 'bar') { const max = Math.max(...items.map(i => i.value), 1); const bw = w / Math.max(items.length, 1) * .65; items.forEach((item, i) => { const bh = (Math.max(0, item.value) / max) * (h - 25); const x = box.x + i * (w / items.length) + (w / items.length - bw) / 2; doc.fillColor(COLORS[i % COLORS.length]).rect(x, box.y + h - bh - 18, bw, bh).fill(); doc.fontSize(7).fillColor('#475569').text(item.label, x, box.y + h - 14, { width: bw, align: 'center', ellipsis: true }); }); }
  else { const cx = box.x + h / 2, cy = box.y + h / 2, r = Math.min(h, w * .55) / 2 - 5; let angle = -Math.PI / 2; items.forEach((item, i) => { const sweep = item.value / total * Math.PI * 2; doc.fillColor(COLORS[i % COLORS.length]).moveTo(cx, cy).arc(cx, cy, r, angle * 180 / Math.PI, (angle + sweep) * 180 / Math.PI).lineTo(cx, cy).fill(); angle += sweep; }); if (node.props.type === 'donut') doc.fillColor('#fff').circle(cx, cy, r * .55).fill(); }
  return { height: h + num(node.props.mb, 0) };
}

module.exports = { renderPdf, closeBrowser: async () => {}, mm: MM };
