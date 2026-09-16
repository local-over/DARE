// DARE v2 — REST API Server
const express = require('express');
const { convertString } = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve human documentation site
app.use(express.static('public'));

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
        let dareCode = '';
        let data = {};
        
        if (typeof req.body === 'string') {
            dareCode = req.body;
        } else if (req.body?.code) {
            dareCode = req.body.code;
            data = req.body.data || {};
        }

        if (!dareCode) {
            return res.status(400).json({ error: 'No DARE code provided. Send code as text body or JSON { "code": "...", "data": {...} }' });
        }

        const buffer = await convertString(dareCode, { data });

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="output.pdf"');
        res.send(buffer);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Legacy Endpoint
app.post('/api/preview', (req, res) => {
    res.status(410).json({ error: 'HTML Preview is deprecated in v2.0. The engine is now 100% native PDF. Please use /api/render.' });
});

const server = app.listen(PORT, () => {
    console.log(`\n  ⚡ DARE Engine v2.0 — API Server running on port ${PORT}`);
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
