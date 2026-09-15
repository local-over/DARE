'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DOC_SECTIONS = [
    { id: 'intro', title: 'Introduction' },
    { id: 'syntax', title: 'Language Syntax' },
    { id: 'setup', title: '@setup Block' },
    { id: 'data', title: '@data Block' },
    { id: 'components', title: 'Components & Layout' },
    { id: 'styling', title: 'Styling & Properties' },
    { id: 'logic', title: 'Control Structures' },
    { id: 'agent', title: 'AI Agent Guidelines' },
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
                            DARE (Document Assembly & Render Engine) is a deterministic markup language designed explicitly for AI agents. 
                            HTML is incredibly token-heavy and verbose. PDF generators like `pdfmake` require massive nested JSON structures. 
                            DARE solves this by providing a hyper-compact, declarative syntax that compiles directly into a native PDF buffer on the Cloudflare Edge.
                        </p>
                    </section>

                    <section id="syntax" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Language Syntax</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            A DARE file consists of three primary root blocks: <code>@setup</code>, <code>@data</code>, and <code>@doc</code>.
                            Components use a function-like syntax: <code>componentName(properties) {'{ children }'}</code>.
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-cm">// 1. Define global configuration and styles</span>
<span className="syn-kw">@setup</span> {'{'}
    <span className="syn-prop">format</span>: a4;
    <span className="syn-kw">$title</span>: bold size=24 color=#000000;
{'}'}

<span className="syn-cm">// 2. Bind JSON data (mock data for playground)</span>
<span className="syn-kw">@data</span> {'{'}
    <span className="syn-str">"name"</span>: <span className="syn-str">"Alice"</span>
{'}'}

<span className="syn-cm">// 3. Build the document hierarchy</span>
<span className="syn-kw">@doc</span> {'{'}
    <span className="syn-fn">page</span>(bg=#ffffff p=40) {'{'}
        <span className="syn-fn">txt</span>(<span className="syn-kw">$title</span>) {'{'} Invoice for <span className="syn-var">{`{{ name }}`}</span> {'}'}
    {'}'}
{'}'}</pre>
                        </div>
                    </section>

                    <section id="setup" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">@setup Block</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            The <code>@setup</code> block configures the PDF document. You MUST define the <code>format</code>. You can also define custom styling aliases starting with <code>$</code>.
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 text-[15px] space-y-2 mb-6">
                            <li><code>format</code>: String. e.g., <code>a4</code>, <code>letter</code>, <code>legal</code>.</li>
                            <li><code>orientation</code>: String. <code>portrait</code> (default) or <code>landscape</code>.</li>
                            <li><code>$aliasName</code>: Define reusable property combinations.</li>
                        </ul>
                    </section>

                    <section id="data" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">@data Block</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            The <code>@data</code> block allows you to mock JSON data directly within the DARE file for testing. In production, AI Agents will pass this data dynamically via the HTTP payload. 
                            You can access any JSON property using mustache syntax: <code>{`{{ user.profile.name }}`}</code>.
                        </p>
                    </section>

                    <section id="components" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Components & Layout</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            DARE supports a strict set of layout components to guarantee pixel-perfect rendering.
                        </p>
                        
                        <div className="space-y-6 text-[14px] text-neutral-300">
                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">page(properties)</strong>
                                <p className="mt-2 text-neutral-400">The root element of every document. Can span multiple PDF pages automatically. Common properties: <code>bg</code>, <code>p</code>, <code>mt</code>, <code>mb</code>.</p>
                            </div>
                            
                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">box(properties)</strong>
                                <p className="mt-2 text-neutral-400">A flexible container block (similar to a div). Common properties: <code>p</code> (padding), <code>bg</code> (background), <code>border</code> (border width), <code>borderColor</code>, <code>rounded</code> (border radius).</p>
                            </div>
                            
                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">txt(properties)</strong>
                                <p className="mt-2 text-neutral-400">Text node. Supports inline text and variables. Common properties: <code>size</code>, <code>color</code>, <code>bold</code>, <code>italic</code>, <code>center</code>, <code>right</code>.</p>
                            </div>
                            
                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">cols(properties)</strong>
                                <p className="mt-2 text-neutral-400">A horizontal grid layout. Properties: <code>n</code> (number of equal columns), <code>gap</code> (spacing between columns).</p>
                            </div>

                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">img(properties)</strong>
                                <p className="mt-2 text-neutral-400">Image block. Properties: <code>src</code> (URL or base64), <code>w</code> (width), <code>h</code> (height).</p>
                            </div>

                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">qr(properties)</strong>
                                <p className="mt-2 text-neutral-400">Generates a native QR code. Properties: <code>data</code> (string/URL), <code>w</code> (size).</p>
                            </div>
                            
                            <div className="p-5 border rounded-xl bg-[#0a0a0a]" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <strong className="text-white text-lg">sp(properties)</strong>
                                <p className="mt-2 text-neutral-400">Vertical spacer. Properties: <code>h</code> (height in pixels).</p>
                            </div>
                        </div>
                    </section>

                    <section id="styling" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Styling & Properties</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            Properties are declared inside the parentheses of a component: <code>box(p=20 bg=#ff0000)</code>. They are space-separated. No quotes are needed for colors or numbers.
                        </p>
                        <ul className="list-disc list-inside text-neutral-400 text-[15px] space-y-2 mb-6">
                            <li><strong>Spacing:</strong> <code>p</code> (padding), <code>mt</code> (margin-top), <code>mb</code> (margin-bottom), <code>ml</code>, <code>mr</code>.</li>
                            <li><strong>Dimensions:</strong> <code>w</code> (width, supports % like <code>w=50%</code>), <code>h</code> (height).</li>
                            <li><strong>Typography:</strong> <code>size</code> (font size in pt), <code>color</code> (hex codes like <code>#ffffff</code> or names like <code>black</code>, <code>white</code>), <code>bold</code>, <code>italic</code>, <code>center</code>, <code>right</code>.</li>
                            <li><strong>Borders & Backgrounds:</strong> <code>bg</code> (background color), <code>border</code> (border width), <code>borderColor</code> (hex), <code>rounded</code> (corner radius).</li>
                        </ul>
                    </section>

                    <section id="logic" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Control Structures</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            DARE supports logic statements directly within the <code>@doc</code> block for conditional rendering and looping over JSON arrays.
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-cm">// Loop over an array in your JSON data</span>
<span className="syn-kw">each</span>(item <span className="syn-kw">in</span> invoice.items) {'{'}
    <span className="syn-fn">box</span>(border=1 mb=5) {'{'}
        <span className="syn-fn">txt</span> {'{'} <span className="syn-var">{`{{ item.name }}`}</span> - $<span className="syn-var">{`{{ item.price }}`}</span> {'}'}
    {'}'}
{'}'}

<span className="syn-cm">// Conditional rendering</span>
<span className="syn-kw">if</span>(invoice.isPaid) {'{'}
    <span className="syn-fn">txt</span>(color=green bold) {'{'} INVOICE PAID {'}'}
{'}'} <span className="syn-kw">else</span> {'{'}
    <span className="syn-fn">txt</span>(color=red bold) {'{'} PAYMENT PENDING {'}'}
{'}'}</pre>
                        </div>
                    </section>

                    <section id="agent" className="mb-20 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">AI Agent Guidelines</h2>
                        <div className="p-6 border rounded-xl bg-blue-500/10 border-blue-500/20 mb-6">
                            <h3 className="text-blue-400 font-bold mb-2">Instructions for LLMs & AI Agents</h3>
                            <ul className="list-decimal list-inside text-neutral-300 text-[14px] space-y-3">
                                <li>You MUST write valid DARE syntax. Do not output HTML, Markdown, or raw JSON unless requested.</li>
                                <li>Ensure variables inside <code>{`{{ }}`}</code> match exactly the schema of the provided JSON payload.</li>
                                <li>Use the <code>@setup</code> block to define primary colors and text styles to save tokens in the <code>@doc</code> block.</li>
                                <li>Always structure documents logically using <code>cols()</code> for grids and <code>box()</code> for grouping.</li>
                                <li>Never include quotes around property values (e.g., use <code>bg=#000000</code>, NOT <code>bg="#000000"</code>).</li>
                            </ul>
                        </div>
                    </section>

                    <section id="api" className="mb-32 pt-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white mb-4">Edge API Reference</h2>
                        <p className="text-neutral-400 text-[15px] leading-relaxed mb-6">
                            The DARE API is fully stateless. It accepts a JSON payload and returns a native PDF buffer instantly.
                        </p>
                        <div className="code-block mb-6">
<pre><span className="syn-cm"># Compile DARE code to PDF</span>
curl -X POST https://dare.pages.dev/api/render \
  -H <span className="syn-str">"Content-Type: application/json"</span> \
  -d <span className="syn-str">{`'{
    "code": "@doc { page { txt { Hello {{ user.name }} } } }",
    "data": { "user": { "name": "Human" } }
  }'`}</span> \
  --output result.pdf</pre>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
