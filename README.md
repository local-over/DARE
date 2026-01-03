<p align="center">
  <img src="/src/logo.png" alt="DARE Engine Logo" width="400">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/built%20with-Node.js-brightgreen.svg" alt="Node.js">
</p>

> **DARE** is an AI-native, token-efficient markup language for generating pixel-perfect PDF documents.

---

## Why DARE?

HTML is for websites. PDFs are for documents. Using HTML to generate PDFs is a broken process. It's verbose for AI, and the rendering is notoriously unstable.

**DARE fixes this.** It was built from the ground up for AI-driven workflows with two principles:

1.  **Extreme Token Economy:** AI context windows are expensive. DARE's syntax is 5-10x more compact than HTML.
2.  **Deterministic Output:** A box that is `h=50mm` is **always** 50mm high. No more random page breaks or disappearing backgrounds. What you code is what you get.

### DARE vs. HTML: The Difference is Clear

| Feature | DARE (Optimized) | HTML (Verbose & Unstable) |
| :--- | :--- | :--- |
| **A simple card**| `box(bg=#eee, p=10mm, rounded=2mm) {}` | `<div style="background-color:#eee; padding:10mm; border-radius:2mm;"></div>` |
| **Tokens (est.)**| **~10** | **~30** |
| **A bar chart** | `bar(data="A:10;B:20", color=blue) {}` | Requires a 200-line JavaScript library like Chart.js + Canvas rendering. |
| **Result**| **Perfect Vector PDF** | **Pixelated Image, Prone to Failure** |


## Core Features

- ✅ **AI-Native Syntax:** No closing tags, concise attributes.
- ✅ **Deterministic Layout:** The `page {}` and `h=fill` system guarantees perfect pagination.
- ✅ **Built-in Components:** Native vector charts (`bar`), tables (`tbl`), and QR codes (`qr`).
- ✅ **High-Fidelity Engine:** Powered by Headless Chrome in `screen` emulation mode to ensure styles are never dropped.
- ✅ **Multi-Interface:** Use it as a CLI, a REST API, or a Node.js library.

## Getting Started

The DARE Engine is a self-contained Node.js project.

**1. Clone the repository:**
```bash
git clone https://github.com/local-over/DARE.git
cd DARE
```

**2. Install dependencies:**
*(This will download a local version of Chromium needed for rendering).*
```bash
npm install
```

**3. Run your first compilation:**
```bash
node cli.js examples/ultimate.dare report.pdf
```

## How to Use It

DARE ships with three ways to generate PDFs:

### 1. The Command Line (CLI)
For quick tests and automated scripting.

```bash
# General Usage
node cli.js <input-file.dare> <output-file.pdf>
```

### 2. The REST API
For web services and on-demand generation. Start the server:

```bash
node server.js
# Server is now running on http://localhost:3000
```

Then, send a `POST` request with your DARE code to `/api/render`.

### 3. The Node.js Library
For direct integration into your backend applications.

```javascript
const dare = require('./index.js');

const dareCode = '@doc{ page{ txt{Hello from my app!} } }';

// Returns a PDF buffer
const pdfBuffer = await dare.convertString(dareCode);
```

## Syntax at a Glance

```dare
// 1. Define global settings and variables
@setup {
  format: A4;
  $brand_color: color=#0ea5e9;
}

// 2. Define the document content
@doc {
  page {
    box(p=20mm, h=fill) {
      txt(size=24, bold, $brand_color) {
        This is a title.
      }
    }
  }
}
```

## Author

**DARE** was designed and built by **Hassan Elkady**.

- **GitHub:** [local-over](https://github.com/local-over)

## License
This project is licensed under the **MIT License**.