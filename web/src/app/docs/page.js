'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DOC_SECTIONS = [
    { id: 'intro', title: 'Introduction' },
    { id: 'setup', title: 'Setup Block' },
    { id: 'data', title: 'Data Binding' },
    { id: 'components', title: 'Components' },
    { id: 'api', title: 'Edge API' },
];

export default function Docs() {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex-1 flex w-full max-w-[1200px] mx-auto bg-black">
            {/* Sidebar */}
            <aside className="w-64 border-r hidden md:block flex-shrink-0 pt-8 pr-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="sticky top-24">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-4 px-3">Documentation</h3>
                    <nav className="flex flex-col gap-1">
                        {DOC_SECTIONS.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => scrollTo(sec.id)}
                                className={`sidebar-link text-left ${activeSection === sec.id ? 'active' : ''}`}
                            >
                                {sec.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0 py-8 md:px-12 px-6">
                <div className="max-w-3xl">
                    
                    <section id="intro" className="mb-20 pt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-4">DARE Language Reference</h1>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            DARE (Document Assembly & Render Engine) is a deterministic markup language designed specifically for AI generation. 
                            It strips away the complexities of HTML/CSS, providing a token-efficient syntax that compiles natively into PDFs at the Edge.
                        </p>
                    </section>

                    <section id="setup" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Setup Block</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            The <code>@setup</code> block configures the document's global properties and lets you define reusable style aliases (variables).
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-kw">@setup</span> {'{'}
    <span className="syn-prop">format</span>: a4;
    <span className="syn-prop">orientation</span>: portrait;
    <span className="syn-kw">$h1</span>: bold size=24 color=#ffffff;
    <span className="syn-kw">$card</span>: bg=#18181b p=20 rounded=8;
{'}'}</pre>
                        </div>
                    </section>

                    <section id="data" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Data Binding</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            Use the <code>@data</code> block to mock JSON data directly in your DARE file. In production, this data is passed dynamically via the API payload. 
                            Access data inside components using double curly braces: <code>{`{{ variable }}`}</code>.
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-kw">@data</span> {'{'}
    <span className="syn-str">"user"</span>: <span className="syn-str">"Alice"</span>,
    <span className="syn-str">"stats"</span>: {'{'} <span className="syn-str">"score"</span>: <span className="syn-num">100</span> {'}'}
{'}'}

<span className="syn-kw">@doc</span> {'{'}
    <span className="syn-fn">page</span> {'{'}
        <span className="syn-fn">txt</span> {'{'} Hello, <span className="syn-var">{`{{ user }}`}</span>! Score: <span className="syn-var">{`{{ stats.score }}`}</span> {'}'}
    {'}'}
{'}'}</pre>
                        </div>
                    </section>

                    <section id="components" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Components</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            The <code>@doc</code> block contains the actual layout hierarchy. DARE uses a simple function-like syntax with inline properties.
                        </p>
                        <div className="space-y-4 text-[14px] text-neutral-300">
                            <div className="p-4 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white">page(bg, p, mt, mb)</strong>
                                <p className="mt-1 text-neutral-500">The root element of every document. Can span multiple PDF pages.</p>
                            </div>
                            <div className="p-4 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white">box(bg, p, rounded, border, borderColor)</strong>
                                <p className="mt-1 text-neutral-500">A standard container block (like a div).</p>
                            </div>
                            <div className="p-4 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white">txt(size, color, bold, italic, center)</strong>
                                <p className="mt-1 text-neutral-500">Text node. Supports inline variables.</p>
                            </div>
                            <div className="p-4 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white">cols(n, gap)</strong>
                                <p className="mt-1 text-neutral-500">Grid layout. `n` specifies the number of equal-width columns.</p>
                            </div>
                        </div>
                    </section>

                    <section id="api" className="mb-32 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Edge API</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            DARE provides a stateless API deployed on Cloudflare Workers. It accepts a JSON payload and returns a native PDF buffer instantly.
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-cm"># Compile DARE code to PDF</span>
curl -X POST https://dare.pages.dev/api/render \
  -H <span className="syn-str">"Content-Type: application/json"</span> \
  -d <span className="syn-str">{`'{
    "code": "@doc { page { txt { Hello {{ name }} } } }",
    "data": { "name": "World" }
  }'`}</span> \
  --output result.pdf</pre>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
