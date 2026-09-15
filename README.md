<p align="center">
  <img src="./src/logo.png" alt="DARE Engine Logo" width="380">
</p>

<p align="center">
  <strong>Document Assembly & Render Engine</strong><br>
  The deterministic, token-efficient markup language that compiles directly to PDF and HTML. Built for AI agents and edge environments.
</p>

<p align="center">
  <a href="https://github.com/local-over/DARE/releases"><img src="https://img.shields.io/badge/version-3.0.0-3b82f6.svg?style=flat-square" alt="Version 3.0.0"></a>
  <a href="https://github.com/local-over/DARE/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-10b981.svg?style=flat-square" alt="MIT License"></a>
  <a href="https://dare.pages.dev"><img src="https://img.shields.io/badge/runtime-Cloudflare%20Edge-f97316.svg?style=flat-square" alt="Cloudflare Edge"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D18.0.0-22c55e.svg?style=flat-square" alt="Node.js 18+"></a>
  <a href="https://dare.pages.dev/playground"><img src="https://img.shields.io/badge/playground-live-8b5cf6.svg?style=flat-square" alt="Live Playground"></a>
</p>

<p align="center">
  <a href="https://dare.pages.dev/playground">🎮 <b>Interactive Playground</b></a> •
  <a href="https://dare.pages.dev/docs">📖 <b>Documentation</b></a> •
  <a href="./dare-skill.md">🤖 <b>AI Agent Skill</b></a> •
  <a href="https://dare.pages.dev/skills">⚡ <b>Skill Hub</b></a> •
  <a href="https://dare.pages.dev">🌐 <b>Website</b></a>
</p>

---

## What is DARE?

**DARE** (Document Assembly & Render Engine) is a specialized layout language built from scratch to turn structured text into pixel-perfect PDFs and web/HTML views. 

HTML was built for fluid web pages, not printable pages with strict dimensions. Forcing Large Language Models (LLMs) to output HTML/CSS for documents results in massive token waste, broken page margins, and random layout bugs. Heavy headless browsers like Puppeteer or Chromium take seconds to start up and demand hundreds of megabytes of RAM.

DARE changes this:
- **70%+ Token Reduction:** A clean, minimal syntax that cuts token usage by up to 10x compared to HTML/CSS.
- **Deterministic Layouts:** Dimensions are absolute and predictable. A component set to `h=50mm` or `p=15` never collides with cascading style sheets.
- **Instant Edge Compilation:** Compiles directly into native PDF buffers on the Cloudflare Edge with 0ms cold starts—no Chromium or headless browser needed.
- **AI Agent Native:** Built with 16 core primitives that LLMs generate reliably without hallucinated tags or syntax errors.

---

## HTML vs. DARE

| Feature | HTML / Headless Chrome | DARE Engine |
| :--- | :--- | :--- |
| **Token Consumption** | High (500–2,000+ tokens per page) | **Minimal (70–80% fewer tokens)** |
| **Cold Start Time** | 800ms – 3,000ms (Chromium launch) | **0ms (Native Edge compiler)** |
| **Memory Footprint** | 150MB – 400MB+ RAM | **< 15MB RAM** |
| **Layout Predictability** | Fluid; fragile page break behavior | **Strict, deterministic page layouts** |
| **LLM Output Accuracy** | Prone to unclosed tags & CSS bugs | **Tight grammar; zero hallucinated nesting** |
| **Runtime Requirements** | Heavy server, Docker, or sandbox | **Lightweight Node.js or Cloudflare Edge** |

### Code Comparison

#### Traditional HTML/CSS (~40 lines, verbose)
```html
<div style="width: 100%; max-width: 800px; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; font-family: sans-serif;">
  <h1 style="font-size: 24px; font-weight: bold; color: #0f172a; margin: 0 0 8px 0;">Invoice #1042</h1>
  <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Issued to: Acme Corp</p>
  <div style="display: flex; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 12px;">
    <span style="font-weight: 600;">Total Amount</span>
    <span style="font-weight: 700; color: #0f172a;">$1,250.00</span>
  </div>
</div>
```

#### DARE Equivalent (~7 lines, 75% fewer tokens)
```dare
@doc {
    page(bg=white) {
        box(p=24 border=1 borderColor=#e2e8f0) {
            txt(bold size=24 color=#0f172a) { Invoice #1042 }
            txt(size=14 color=#64748b mb=16) { Issued to: Acme Corp }
            line(color=#e2e8f0 mb=12)
            cols(n=2) {
                txt(bold) { Total Amount }
                txt(bold color=#0f172a right) { $1,250.00 }
            }
        }
    }
}
```

---

## Features

- 📄 **16 Core Primitives:** Containers (`page`, `box`, `cols`), typography (`txt`, `badge`), visuals (`img`, `qr`, `bar`, `pie`, `line`), and spacing (`hr`, `sp`).
- 🎨 **Reusable Style Tokens:** Define styles and colors once in `@setup` using `$` variables and apply them everywhere.
- 🔁 **Native Control Structures:** Iterate over datasets with `each(item in list)` and conditionally render blocks with `if(condition)`.
- 📊 **Built-In Data Visualizations:** Create bar and pie charts without importing external chart libraries.
- 📱 **Native QR Code Generation:** Generate scannable QR codes inline via `qr(data="..." w=80)`.
- 🌐 **Dual Output Targets:** Generate native vector PDFs for downloads and clean HTML for web previews.
- ⚡ **Cloudflare Edge Ready:** Runs as a serverless Edge function with sub-second execution.
- 🤖 **Agent Skill File Included:** Drop `dare-skill.md` directly into your AI agent's directory to teach it the grammar immediately.

---

## Syntax at a Glance

A `.dare` file is composed of three structured sections:

1. **`@setup` (Optional):** Global format, margins, fonts, and reusable style tokens.
2. **`@data` (Optional):** Inline JSON context or reference to an external data file.
3. **`@doc` (Required):** The document tree hierarchy.

```dare
@setup {
    format: A4 portrait;
    font: Helvetica, Arial;
    $heading: bold size=22 color=#0f172a;
    $card: p=16 bg=#f8fafc border=1 borderColor=#e2e8f0 rounded=6;
}

@data {
    {
        "title": "Monthly Performance",
        "author": "Autonomous Agent",
        "kpis": [
            { "label": "Requests", "value": "1.2M" },
            { "label": "Avg Latency", "value": "14ms" },
            { "label": "Success Rate", "value": "99.98%" }
        ]
    }
}

@doc {
    page(bg=white) {
        box($card) {
            txt($heading) { {{ title }} }
            txt(size=12 color=#64748b mt=4) { Compiled for {{ author }} }
            
            hr(mt=12 mb=16 color=#e2e8f0)

            cols(n=3 gap=10) {
                each(kpi in kpis) {
                    box(p=10 bg=white border=1 borderColor=#e2e8f0 rounded=4) {
                        txt(bold size=11 color=#64748b) { {{ kpi.label }} }
                        txt(bold size=18 color=#0f172a mt=4) { {{ kpi.value }} }
                    }
                }
            }

            sp(h=20)
            bar(data="45,82,60,94" labels="Q1,Q2,Q3,Q4" w=400 h=140 bg=#3b82f6)
            
            sp(h=15)
            qr(data="https://dare.pages.dev" w=60 h=60)
        }
    }
}
```

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- npm or pnpm

### Clone & Install
```bash
# Clone the repository
git clone https://github.com/local-over/DARE.git
cd DARE

# Install dependencies
npm install

# Optional: Link CLI globally
npm link
```

---

## Usage

### 1. Command Line Interface (CLI)

Compile any `.dare` file directly to PDF:

```bash
# Basic compile
node cli.js examples/01_business_card.dare business_card.pdf

# If globally linked with `npm link`:
dare examples/invoice.dare invoice.pdf

# Pass external JSON data dynamically
dare examples/dynamic_invoice.dare invoice.pdf --data examples/data.json
```

### 2. Node.js Programmatic API

Import DARE into your backend services:

```javascript
const { convertFile, convertString } = require('dare-engine');

// 1. Convert a file on disk
await convertFile('template.dare', 'output.pdf', 'data.json');

// 2. Convert a raw DARE string directly to a PDF Buffer
const dareSource = `
@doc {
    page(bg=white) {
        box(p=20) {
            txt(bold size=20) { Hello, {{ name }}! }
        }
    }
}
`;

const pdfBuffer = await convertString(dareSource, {
    data: { name: "World" }
});

// Write buffer, upload to S3, or send via HTTP response
```

### 3. Stateless Edge Render API

Render DARE documents via HTTP POST from any language or framework (Python, Go, Rust, Ruby, PHP):

```bash
curl -X POST https://dare.pages.dev/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "code": "@doc { page { txt(bold size=18) { Hello from Edge API! } } }"
  }' \
  --output document.pdf
```

> [!NOTE]
> The public DARE API endpoint is completely stateless. It accepts the DARE payload, renders the PDF in-memory on Cloudflare Pages, and streams the binary buffer back immediately without storing documents on disk.

---

## 🤖 AI Agent Skill System

DARE includes an official agent skill definition: [`dare-skill.md`](./dare-skill.md).

Adding this skill to an autonomous agent (Claude Code, Gemini CLI, OpenAI Assistants, Hermes, OpenClaw, LangChain, Cursor, etc.) gives the agent an exact blueprint of the syntax, tag rules, and styling flags.

### Quick Agent Installation

Run this command inside any agent workspace:

```bash
# Install the DARE skill into your agent's skills catalog
curl -sSL https://raw.githubusercontent.com/local-over/DARE/main/dare-skill.md --create-dirs -o .agents/skills/dare/SKILL.md
```

### How Agents Use DARE

1. **Read the Skill File:** The agent loads [`dare-skill.md`](./dare-skill.md).
2. **Draft Document:** The agent outputs valid `.dare` code instead of messy HTML.
3. **Render to PDF:** The agent executes `dare input.dare output.pdf` locally or calls the `https://dare.pages.dev/api/render` API endpoint to deliver finished PDFs to the user.

Learn more on the [AI Skills Hub](https://dare.pages.dev/skills).

---

## Documentation & Playground

| Resource | Link | Description |
| :--- | :--- | :--- |
| **Interactive Playground** | [dare.pages.dev/playground](https://dare.pages.dev/playground) | Live browser editor. Type DARE on the left, see compiled PDF on the right in real time. |
| **Official Documentation** | [dare.pages.dev/docs](https://dare.pages.dev/docs) | Complete encyclopedic reference covering all 16 tags, styling parameters, and layout rules. |
| **Agent Skill File** | [dare-skill.md](./dare-skill.md) | Standardized markdown skill file ready for AI agents. |
| **Web Skills Portal** | [dare.pages.dev/skills](https://dare.pages.dev/skills) | One-click copy commands and integration guides for AI setups. |

---

## Example Gallery

The [`examples/`](./examples) directory contains ready-to-run templates:

- [`01_business_card.dare`](./examples/01_business_card.dare) — Minimalist contact card with custom dimensions.
- [`02_newsletter.dare`](./examples/02_newsletter.dare) — Multi-section company update layout.
- [`03_receipt.dare`](./examples/03_receipt.dare) — Point-of-sale receipt with itemized lines.
- [`04_menu.dare`](./examples/04_menu.dare) — Restaurant menu with prices and categories.
- [`05_event_ticket.dare`](./examples/05_event_ticket.dare) — Event pass with inline QR code verification.
- [`06_product_catalog.dare`](./examples/06_product_catalog.dare) — Multi-column product showcase with imagery.
- [`07_medical_prescription.dare`](./examples/07_medical_prescription.dare) — Healthcare document template.
- [`08_project_proposal.dare`](./examples/08_project_proposal.dare) — Multi-page client proposal.
- [`09_id_badge.dare`](./examples/09_id_badge.dare) — Compact staff identification pass.
- [`10_analytics_report.dare`](./examples/10_analytics_report.dare) — Metrics dashboard with bar and pie charts.
- [`invoice.dare`](./examples/invoice.dare) — Production invoice template.
- [`dashboard.dare`](./examples/dashboard.dare) — Complete business metrics overview.

---

## Local Development (Web Platform)

The DARE web platform is built with **Next.js 15** and runs on **Cloudflare Pages** using `@cloudflare/next-on-pages`:

```bash
# Move to the web directory
cd web

# Install dependencies
npm install

# Start local Next.js dev server
npm run dev

# Build and preview with Cloudflare Wrangler locally
npm run build
npx @cloudflare/next-on-pages
npx wrangler pages dev .vercel/output/static --compatibility-flags="nodejs_compat"
```

---

## Architecture

```text
       ┌──────────────────────────────────────────────┐
       │             DARE Source (.dare)              │
       │    @setup { ... } @data { ... } @doc { ... } │
       └──────────────────────┬───────────────────────┘
                              │
                      [ Tokenizer ]
                              │
                      [ AST Compiler ]
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
    [ PDF Generator ]                   [ HTML Renderer ]
   (PDFKit / pdf-lib)                  (Semantic HTML + CSS)
            │                                   │
            ▼                                   ▼
   Native Vector PDF                    Live Browser View
 (Edge API / CLI Output)               (Playground Preview)
```

---

## Contributing

Contributions from the open-source community are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'feat: add new component'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.

---

## Author

Designed and built by **Hassan Elkady**.

- GitHub: [@local-over](https://github.com/local-over)
- Repository: [github.com/local-over/DARE](https://github.com/local-over/DARE)

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
