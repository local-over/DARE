<p align="center">
  <img src="./src/logo.png" alt="DARE Engine Logo" width="400">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-3.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/runtime-Cloudflare%20Edge-orange.svg" alt="Edge">
</p>

# DARE — The Language for AI Documents

**Stop forcing LLMs to write HTML.** DARE is a deterministic, token-efficient markup language designed specifically for the AI era. It generates pixel-perfect PDF documents from simple, structured prompts while using up to **10x fewer tokens** than traditional HTML/CSS workflows.

---

## Why DARE?

HTML was designed for the fluid, responsive web—not for static, rigid PDF documents. When AI agents generate documents using HTML, they encounter:
- **Token Inefficiency:** HTML/CSS boilerplate consumes vast amounts of context window.
- **Rendering Instability:** Tiny CSS mistakes lead to layout breaks and page-overflow nightmares.
- **Non-Deterministic Layouts:** The same HTML can look different depending on the rendering engine.

**DARE** solves this by rebuilding the document workflow from the ground up:
1. **Token Economy:** A syntax so compact that a full professional invoice fits in a single tweet.
2. **Deterministic Layout:** A box defined as `h=50` is exactly that. No cascading conflicts.
3. **AI-Native Construction:** Built with 16 core components that LLMs understand intuitively.

---

## The Vision: V3.0 Cloudflare Edge Engine

With the release of **DARE v3.0**, the engine has moved beyond a local Node CLI and is now a **Legendary Production API**.
- **Edge API:** 100% Stateless Edge compatible. No `fs` required, instant PDF generation via Cloudflare Pages.
- **Data Binding:** Directly pass JSON data payloads to auto-hydrate `{{ variables }}`, `each()` loops, and `if()` statements.
- **Anti-Slop UI Frontend:** A breathtaking React/Next.js interface with a split-screen Live Compiler.
- **pdfmake Core:** Fully natively integrated `pdfmake` renderer that streams raw `Uint8Array` buffers straight to the client.

---

## Documentation & Learning

To keep this repository clean, all technical guides, AI Skills, API references, and the Live Playground are hosted on our official Web App:

👉 **[DARE Live Edge Compiler & API Docs](https://dare.pages.dev/)**

Are you building an AI Agent? Teach your agent how to write DARE code by feeding it our official Skill:
**[DARE Engine SKILL.md](https://raw.githubusercontent.com/local-over/DARE/main/web/public/SKILL.md)**

---

## Contributing & Support

DARE is an open-source project aimed at making automated document generation accessible and efficient.

If you find DARE useful, consider supporting its development:
**USDT (TON Network):** `UQBEJwLa4EGPRmUKw4O1i9d_JjJGmjkJ2myqR5lborzgceT-`

---

## Author
**DARE** is designed and built by **Hassan Elkady**.

* **GitHub:** [local-over](https://github.com/local-over)

## License
Licensed under the **MIT License**.
