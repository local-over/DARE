<p align="center">
  <img src="./docs/logo.png" alt="DARE Engine Logo" width="400">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/built%20with-Node.js-brightgreen.svg" alt="Node.js">
</p>

> **DARE** is an AI-native, token-efficient markup language designed for generating pixel-perfect PDF documents.

---

## 📘 Documentation

For the full language reference, component list, and advanced examples, please visit the documentation site:

👉 **[Read the Official Documentation](https://dare.pages.dev/)**

---

## Why DARE?

HTML was designed for the fluid web, not for rigid documents. Using HTML to generate PDFs is often verbose and prone to rendering issues.

**DARE** solves this by rebuilding the workflow specifically for AI agents and automated systems. It operates on two core principles:

1. **Extreme Token Economy:** AI context windows are valuable. DARE's syntax is 5–10x more compact than HTML, allowing you to generate longer documents within token limits.
2. **Deterministic Output:** A box defined as `h=50mm` is **always** 50mm high. There are no cascading style conflicts or random page breaks.

### DARE vs. HTML

| Feature | DARE (Optimized) | HTML (Traditional) |
| --- | --- | --- |
| **Syntax** | `box(bg=#eee, p=10mm, rounded=2mm) {}` | `<div style="background-color:#eee; padding:10mm; border-radius:2mm;"></div>` |
| **Token Cost** | **~10 tokens** | **~30+ tokens** |
| **Charts** | `bar(data="A:10;B:20", color=blue) {}` | Requires heavy JS libraries (Chart.js) + Canvas rendering. |
| **Output** | **Vector PDF** | **Rasterized Image / Unstable Layout** |

## Core Features

* ✅ **AI-Native Syntax:** No closing tags and concise attributes reduce hallucinations and token usage.
* ✅ **Deterministic Layout:** The `page {}` and `h=fill` system guarantees predictable pagination.
* ✅ **Built-in Components:** Native support for vector charts (`bar`), tables (`tbl`), and QR codes (`qr`).
* ✅ **High-Fidelity Engine:** Powered by Headless Chrome in `screen` emulation mode to ensure styles render exactly as defined.
* ✅ **Flexible Interface:** Use it via CLI, REST API, or as a Node.js library.

## Getting Started

The DARE Engine is a self-contained Node.js project.

**1. Clone the repository**

```bash
git clone https://github.com/local-over/DARE.git
cd DARE

```

**2. Install dependencies**
*(This includes a local version of Chromium required for rendering)*

```bash
npm install

```

**3. Run a test compilation**

```bash
node cli.js examples/ultimate.dare report.pdf

```

## Usage

DARE provides three ways to integrate into your workflow:

### 1. Command Line (CLI)

Ideal for testing scripts or local generation.

```bash
node cli.js <input-file.dare> <output-file.pdf>

```

### 2. REST API

Run DARE as a microservice for your application.

```bash
node server.js
# Server runs on http://localhost:3000

```

*Send a `POST` request to `/api/render` containing your DARE code.*

### 3. Node.js Library

Directly import the engine into your backend.

```javascript
const dare = require('./index.js');

const dareCode = '@doc{ page{ txt{Hello World} } }';

// Returns a PDF buffer
const pdfBuffer = await dare.convertString(dareCode);

```

## Syntax Preview

```dare
// 1. Global settings
@setup {
  format: A4;
  $brand_color: color=#0ea5e9;
}

// 2. Document content
@doc {
  page {
    box(p=20mm, h=fill) {
      txt(size=24, bold, $brand_color) {
        This is a title.
      }
      
      // Native bar chart
      bar(data="Q1:40;Q2:60", h=100mm) {}
    }
  }
}

```

## Support the Project

If DARE helps your workflow or saves you time, consider supporting its development. Your support keeps this project alive and helps me continue improving it.

**USDT (TON Network):**
`UQBEJwLa4EGPRmUKw4O1i9d_JjJGmjkJ2myqR5lborzgceT-`

## Author

**DARE** is designed and built by **Hassan Elkady**.

* **GitHub:** [local-over](https://github.com/local-over)

## License

This project is licensed under the **MIT License**.
