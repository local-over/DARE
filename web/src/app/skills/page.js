'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SKILL_CONTENT = `---
name: dare-engine
description: A skill to write DARE code and generate PDFs via the live DARE API.
---

# DARE Engine v3 - Agent Guidelines

The DARE Engine is a declarative markup language that compiles directly into native PDFs. You can use this skill to generate beautiful PDFs for the user dynamically!

## API Usage

Do not attempt to run \`dare-engine\` locally if you don't have it installed. Instead, hit the Live API via HTTP POST:

\`\`\`bash
curl -X POST -H "Content-Type: application/json" -d '{
    "code": "@doc { page { txt { Hello {{ user }} } } }",
    "data": { "user": "Human" }
}' https://dare.pages.dev/api/render --output generated.pdf
\`\`\`

*(Note: The DARE API is fully stateless. It returns a PDF buffer instantly and stores nothing).*

## DARE Syntax Cheat Sheet

1. **Setup Block (\`@setup\`)**: Define page format and semantic aliases.
   \`\`\`dare
   @setup {
       format: a4;
       $header: bold size=20 color=white;
   }
   \`\`\`
2. **Data Block (\`@data\`)**: Bind data if not passing via API.
3. **Doc Block (\`@doc\`)**: Build the hierarchy using components: \`page\`, \`box\`, \`cols\`, \`txt\`, \`img\`, \`hr\`.
   \`\`\`dare
   @doc {
       page(bg=surface) {
           box(p=20 bg=primary) {
               txt($header) { Invoice #{{ invoice.id }} }
           }
           // Use cols for flexbox-like grid
           cols(mt=10) {
               txt(w=50%) { Item }
               txt(w=50% right) { Price }
           }
       }
   }
   \`\`\`

## Control Structures
You can use native loops and conditionals inside the \`@doc\` block based on your JSON data payload!
\`\`\`dare
each(item in invoice.items) {
    txt { {{ item.name }} }
}

if(invoice.is_paid) {
    txt(color=success) { PAID }
}
\`\`\`

**Always return the generated PDF file path directly to the user when finished!**`;

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
