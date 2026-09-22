// DARE v2 — REST API Server
const express = require('express');
const { convertString } = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

// Accept both text and JSON bodies
app.use(express.text({ type: 'text/*', limit: '5mb' }));
app.use(express.json({ limit: '5mb' }));

// Strict CORS headers for the Web App only
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && (origin.endsWith('.dare.pages.dev') || origin === 'https://dare.pages.dev' || origin === 'http://localhost:3000' || origin === 'http://localhost:3001')) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    // Preflight request handling
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
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
            return res.status(400).json({ error: 'No DARE code provided.' });
        }

        const buffer = await convertString(dareCode, { data });

        res.set('Content-Type', 'application/pdf');
        res.set('Content-Disposition', 'inline; filename="output.pdf"');
        res.send(buffer);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const server = app.listen(PORT, () => {
    console.log(`\n  ⚡ DARE Engine v3.1.0 — API Server running on port ${PORT}`);
    console.log(`  ─────────────────────────────────`);
    console.log(`  🌐 http://localhost:${PORT}`);
    console.log(`  📡 POST /api/render  → PDF`);
    console.log(`  💚 GET  /health      → Status\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close();
});
