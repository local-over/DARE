// DARE v2 — REST API Server
const express = require('express');
const { compile } = require('./src/parser');
const { renderPdf, closeBrowser } = require('./src/renderer');

const app = express();
const PORT = process.env.PORT || 3000;

// Accept both text and JSON bodies
app.use(express.text({ type: 'text/*', limit: '5mb' }));
app.use(express.json({ limit: '5mb' }));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', engine: 'DARE v2.0' });
});

// Render DARE to PDF
app.post('/api/render', async (req, res) => {
    try {
        // Accept DARE code from body text or JSON { code: "..." }
        const dareCode = typeof req.body === 'string' ? req.body : req.body?.code;
        if (!dareCode) {
            return res.status(400).json({ error: 'No DARE code provided. Send code as text body or JSON { "code": "..." }' });
        }

        const { html, format } = await compile(dareCode);
        const buffer = await renderPdf(html, format);

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="output.pdf"');
        res.send(buffer);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Compile DARE to HTML (for preview)
app.post('/api/preview', async (req, res) => {
    try {
        const dareCode = typeof req.body === 'string' ? req.body : req.body?.code;
        if (!dareCode) {
            return res.status(400).json({ error: 'No DARE code provided.' });
        }
        const { html, format } = await compile(dareCode);
        res.json({ html, format });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const server = app.listen(PORT, () => {
    console.log(`\n  ⚡ DARE Engine v2.0 — API Server`);
    console.log(`  ─────────────────────────────────`);
    console.log(`  🌐 http://localhost:${PORT}`);
    console.log(`  📡 POST /api/render  → PDF`);
    console.log(`  📡 POST /api/preview → HTML`);
    console.log(`  💚 GET  /health      → Status\n`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    await closeBrowser();
    server.close();
});
