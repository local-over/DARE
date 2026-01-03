const express = require('express');
const { compile } = require('./src/parser');
const { renderPdf } = require('./src/renderer');
const app = express();
app.use(express.text({ type: '*/*' }));

app.post('/api/render', async (req, res) => {
    try {
        const { html, format } = await compile(req.body);
        const buffer = await renderPdf(html, format);
        res.set('Content-Type', 'application/pdf');
        res.send(buffer);
    } catch (e) { res.status(500).send(e.message); }
});
app.listen(3000, () => console.log("DARE API running on 3000"));
