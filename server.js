// DARE v3 — Express API Server & Direct Compiler Pipeline
const express = require('express');
const { compile } = require('./src/parser');
const { renderPdf } = require('./src/renderers/pdf');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text({ type: 'text/*', limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', engine: 'DARE v3.0 (Node.js Engine)' });
});

// Render DARE to PDF
app.post('/api/render', async (req, res) => {
    try {
        let code = '';
        let data = {};

        if (typeof req.body === 'string') {
            try {
                const parsed = JSON.parse(req.body);
                if (parsed && parsed.code) {
                    code = parsed.code;
                    data = parsed.data || {};
                } else {
                    code = req.body;
                }
            } catch {
                code = req.body;
            }
        } else if (req.body && typeof req.body === 'object') {
            code = req.body.code || '';
            data = req.body.data || {};
        }

        if (!code.trim()) {
            return res.status(400).json({ error: 'No DARE code provided.' });
        }

        const astData = await compile(code, data);
        const buffer = await renderPdf(astData);

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="document.pdf"');
        res.send(buffer);
    } catch (e) {
        console.error("Render Error:", e);
        res.status(500).json({ error: e.message || 'Internal Compiler Error' });
    }
});

// AST Preview
app.post('/api/preview', async (req, res) => {
    try {
        let code = typeof req.body === 'string' ? req.body : req.body?.code;
        let data = req.body?.data || {};

        if (!code) {
            return res.status(400).json({ error: 'No DARE code provided.' });
        }

        const astData = await compile(code, data);
        res.json(astData);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n  ⚡ DARE Engine v3.0 — Core Server`);
        console.log(`  ─────────────────────────────────`);
        console.log(`  🌐 http://localhost:${PORT}`);
        console.log(`  📡 POST /api/render  → PDF Binary`);
        console.log(`  📡 POST /api/preview → AST Structure`);
        console.log(`  💚 GET  /health      → Engine Status\n`);
    });
}

module.exports = app;
