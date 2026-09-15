'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILL_CONTENT = `---
name: dare-engine
description: A strict skill to write DARE code and generate native PDFs via the live DARE Edge API.
---

# DARE Engine v3 - Agent Guidelines

The DARE Engine is a declarative, token-efficient markup language that compiles directly into native PDFs on the Cloudflare Edge. You MUST use this skill to generate PDFs for the user.

HTML is incredibly token-heavy and verbose. PDF generators like \`pdfmake\` require massive nested JSON structures. DARE solves this by providing a hyper-compact syntax.

## API Usage

Do not attempt to run \`dare-engine\` locally if you don't have it installed natively. Hit the Live API via HTTP POST instead:

\`\`\`bash
curl -X POST -H "Content-Type: application/json" -d '{
    "code": "@doc { page { txt { Hello {{ user.name }} } } }",
    "data": { "user": { "name": "Human" } }
}' https://dare.pages.dev/api/render --output generated.pdf
\`\`\`
*(Note: The DARE API is fully stateless. It returns a PDF buffer instantly).*

## DARE Language Syntax

A DARE file consists of three primary root blocks: \`@setup\`, \`@data\`, and \`@doc\`.
Components use a function-like syntax: \`componentName(properties) { children }\`.

### 1. @setup Block
Define global configuration and styling aliases (variables) here.
\`\`\`dare
@setup {
    format: a4; // REQUIRED: a4, letter, legal
    orientation: portrait; // portrait or landscape
    $h1: bold size=24 color=#000000 mb=10; // Style alias
    $card: bg=#f4f4f5 p=20 rounded=8 border=1 borderColor=#e4e4e7;
}
\`\`\`

### 2. @data Block (Optional for API)
If testing locally or without API payloads, bind mock JSON data directly within the DARE code. In production, pass data dynamically via the HTTP JSON payload.
\`\`\`dare
@data {
    "invoice": { "id": "104A", "total": 240.50 }
}
\`\`\`

### 3. @doc Block
This is where the actual hierarchy goes.

#### Components
- **\`page(properties)\`**: Root element. Automatically handles page breaks.
- **\`box(properties)\`**: Container element (like \`div\`).
- **\`cols(properties)\`**: Grid layout. Set \`n=X\` for X equal columns. \`gap\` controls spacing.
- **\`txt(properties)\`**: Text node. Use \`{{ var.name }}\` syntax inside.
- **\`img(properties)\`**: Image. Requires \`src\`, \`w\`, \`h\`.
- **\`qr(properties)\`**: QR Code. Requires \`data\`, \`w\`.
- **\`sp(properties)\`**: Vertical spacer. Requires \`h\` (height).

#### Properties (Space-Separated, No Quotes)
Define inside component parens: \`box(p=20 bg=#ff0000)\`.
- **Spacing:** \`p\` (padding), \`mt\` (margin-top), \`mb\` (margin-bottom), \`ml\`, \`mr\`.
- **Dimensions:** \`w\` (width, e.g., \`w=50%\`), \`h\` (height).
- **Typography:** \`size\` (font size), \`color\` (hex or name), \`bold\`, \`italic\`, \`center\`, \`right\`.
- **Borders & Backgrounds:** \`bg\` (background color), \`border\` (border width), \`borderColor\` (hex), \`rounded\` (corner radius).

## Control Structures

You can use logic inside the \`@doc\` block!

**Loops (\`each\`)**
\`\`\`dare
each(item in invoice.items) {
    box(border=1 mb=5 p=10) {
        cols(n=2) {
            txt { {{ item.name }} }
            txt(right) { \${{ item.price }} }
        }
    }
}
\`\`\`

**Conditionals (\`if\` / \`else\`)**
\`\`\`dare
if(invoice.isPaid) {
    txt(color=green bold) { INVOICE PAID }
} else {
    txt(color=red bold) { PAYMENT PENDING }
}
\`\`\`

## Critical Agent Rules
1. **Valid Syntax**: You MUST write valid DARE syntax. Do not output HTML or raw JSON for documents.
2. **Variable Matching**: Ensure variables inside \`{{ }}\` match exactly the schema of the provided JSON payload.
3. **Save Tokens**: Use the \`@setup\` block to define primary colors and text styles to save tokens in the \`@doc\` block.
4. **No Quotes**: Never include quotes around property values (e.g., use \`bg=#000000\`, NOT \`bg="#000000"\`).
5. **Always Return File**: Always run the curl command to generate the PDF and return the saved \`.pdf\` file path to the user!
`;

export default function Skills() {
    const [copied, setCopied] = useState(false);
    const [cliCopied, setCliCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(SKILL_CONTENT);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCliCopy = async () => {
        const cmd = 'curl -s https://dare.pages.dev/dare-skill.md > .agents/skills/dare-engine/SKILL.md';
        await navigator.clipboard.writeText(cmd);
        setCliCopied(true);
        setTimeout(() => setCliCopied(false), 2000);
    };

    return (
        <div className="flex-1 flex flex-col items-center py-16 px-6 max-w-4xl mx-auto w-full">
            
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white mb-4">DARE AI Agent Skill</h1>
                <p className="text-neutral-400 text-[16px] max-w-2xl mx-auto leading-relaxed">
                    DARE was explicitly designed to be written by AI Agents. It requires 10x fewer tokens than HTML and generates deterministic PDFs. Drop this skill into your agent's memory to give it native PDF generation superpowers.
                </p>
            </div>

            <div className="w-full mb-12">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-lg font-semibold text-white">SKILL.md</h2>
                    <button 
                        onClick={handleCopy}
                        className={`copy-btn flex items-center gap-2 ${copied ? 'copied' : ''}`}
                    >
                        {copied ? (
                            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
                        ) : (
                            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy to Clipboard</>
                        )}
                    </button>
                </div>
                <div className="code-block h-[400px] overflow-y-auto">
                    <pre className="text-neutral-300">{SKILL_CONTENT}</pre>
                </div>
            </div>

            <div className="w-full glass-panel p-8 rounded-2xl border border-white/5">
                <h3 className="text-[16px] font-bold text-white mb-2">CLI Installation</h3>
                <p className="text-[14px] text-neutral-400 mb-4">If you are running an AI Agent in a terminal with standard workspace skills configuration, simply run this command:</p>
                <div className="flex items-center gap-3 bg-black p-1.5 rounded-xl border border-white/10">
                    <code className="text-[13px] text-blue-400 font-mono px-4 truncate flex-1">
                        curl -s https://dare.pages.dev/dare-skill.md {'>'} .agents/skills/dare-engine/SKILL.md
                    </code>
                    <button 
                        onClick={handleCliCopy}
                        className="bg-white text-black px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-neutral-200 transition-colors flex-shrink-0"
                    >
                        {cliCopied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

        </div>
    );
}
