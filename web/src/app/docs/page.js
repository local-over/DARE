'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOC_SECTIONS = [
    { id: 'intro', title: '1. Introduction' },
    { id: 'philosophy', title: '2. Design Philosophy' },
    { id: 'structure', title: '3. Document Structure' },
    { id: 'setup', title: '4. The @setup Block' },
    { id: 'data', title: '5. The @data Block' },
    { id: 'containers', title: '6. Containers & Layout' },
    { id: 'typography', title: '7. Typography & Leafs' },
    { id: 'visuals', title: '8. Visuals & Charts' },
    { id: 'styling', title: '9. Exhaustive Properties' },
    { id: 'logic', title: '10. Control Structures' },
    { id: 'examples', title: '11. Comprehensive Examples' },
    { id: 'agent', title: '12. AI Agent Guidelines' },
    { id: 'api', title: '13. Edge API Reference' },
];

export default function Docs() {
    const [activeSection, setActiveSection] = useState('intro');

    const scrollTo = (id) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex-1 flex w-full max-w-[1400px] mx-auto bg-[#000000]">
            {/* Sidebar */}
            <aside className="w-72 border-r border-[#27272A] hidden lg:block flex-shrink-0 pt-8 pr-6 overflow-y-auto h-screen sticky top-0">
                <div className="sticky top-8 pl-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-6 px-3">DARE Encyclopedia</h3>
                    <nav className="flex flex-col gap-1">
                        {DOC_SECTIONS.map(sec => (
                            <button
                                key={sec.id}
                                onClick={() => scrollTo(sec.id)}
                                className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                    activeSection === sec.id 
                                    ? 'bg-[#FAFAFA] text-[#000000] font-medium' 
                                    : 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#000000]'
                                }`}
                            >
                                {sec.title}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0 py-12 md:px-16 px-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-32">
                    
                    <section id="intro">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="inline-block px-3 py-1 rounded-full bg-[#000000] border border-[#27272A] text-[#FAFAFA] text-xs font-bold tracking-wider mb-6">
                                DARE ENGINE v3.0
                            </div>
                            <h1 className="text-5xl font-black tracking-tight text-[#FAFAFA] mb-6">Encyclopedic Reference</h1>
                            <p className="text-xl text-[#A1A1AA] leading-relaxed font-light">
                                The Document Assembly & Render Engine (DARE) is a deterministic, highly-compressed layout language designed explicitly for Artificial Intelligence agents and edge environments.
                            </p>
                        </motion.div>
                    </section>

                    <section id="philosophy">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">2. Design Philosophy</h2>
                        <div className="prose prose-invert max-w-none text-[#D4D4D8]">
                            <p className="text-lg leading-relaxed mb-6">
                                Traditional document generation relies on HTML/CSS or verbose JSON structures (like pdfmake). These approaches are token-heavy, prone to hallucination by AI, and slow to render. DARE solves this by enforcing a strict, hierarchical, and extremely compact syntax.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                    <h4 className="text-[#FAFAFA] font-bold mb-2">Zero Ambiguity</h4>
                                    <p className="text-sm text-[#A1A1AA]">DARE maps 1:1 to an Abstract Syntax Tree (AST). There are no cascading side-effects or unpredictable layouts.</p>
                                </div>
                                <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                    <h4 className="text-[#FAFAFA] font-bold mb-2">Token Efficient</h4>
                                    <p className="text-sm text-[#A1A1AA]">By utilizing a custom syntax and macro aliases, DARE reduces the token footprint by up to 85% compared to HTML equivalents.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="structure">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">3. Document Structure</h2>
                        <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8">
                            A DARE file is strictly divided into three root blocks. Every DARE file must end with a <code>@doc</code> block.
                        </p>
                        <div className="bg-[#000000] rounded-2xl border border-[#27272A] p-6 font-mono text-sm">
                            <div className="text-[#52525B] mb-2">// 1. Metadata and Styling Aliases (Optional but recommended)</div>
                            <div className="text-[#FAFAFA] font-bold">@setup {'{'}</div>
                            <div className="pl-6 text-[#D4D4D8]">
                                format: A4;<br/>
                                $heading: size=24 bold color=#000000;
                            </div>
                            <div className="text-[#FAFAFA] font-bold mb-4">{'}'}</div>

                            <div className="text-[#52525B] mb-2">// 2. Embedded JSON Data (Optional, for testing)</div>
                            <div className="text-[#FAFAFA] font-bold">@data {'{'}</div>
                            <div className="pl-6 text-[#D4D4D8]">
                                "title": "Quarterly Report",<br/>
                                "revenue": 15000
                            </div>
                            <div className="text-[#FAFAFA] font-bold mb-4">{'}'}</div>

                            <div className="text-[#52525B] mb-2">// 3. The Document Body (Required)</div>
                            <div className="text-[#FAFAFA] font-bold">@doc {'{'}</div>
                            <div className="pl-6 text-[#D4D4D8]">
                                <span className="text-[#A1A1AA]">page</span>(bg=#ffffff) {'{'}
                                <div className="pl-6">
                                    <span className="text-[#A1A1AA]">txt</span>($heading) {'{'} {`{{ title }}`} {'}'}
                                </div>
                                {'}'}
                            </div>
                            <div className="text-[#FAFAFA] font-bold">{'}'}</div>
                        </div>
                    </section>

                    <section id="setup">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">4. The @setup Block</h2>
                        <p className="text-[#D4D4D8] mb-6">
                            The <code>@setup</code> block initializes the document context. You define the page format, orientation, embedded fonts, and CSS-like utility aliases.
                        </p>
                        <ul className="space-y-4 text-[#D4D4D8]">
                            <li className="flex gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <code className="text-[#FAFAFA] font-bold shrink-0">format</code>
                                <div>
                                    <p>Sets the page size. Accepts standard names (<code>A4</code>, <code>LETTER</code>, <code>LEGAL</code>) or custom dimensions (<code>500 800</code>). Combined with orientation: <code>A4 landscape</code>.</p>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <code className="text-[#FAFAFA] font-bold shrink-0">fonts</code>
                                <div>
                                    <p>Comma-separated list of fonts to embed (e.g., <code>Helvetica, Times-Roman</code>).</p>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <code className="text-[#FAFAFA] font-bold shrink-0">$alias</code>
                                <div>
                                    <p>Define a reusable property bundle starting with <code>$</code>. E.g., <code>$primaryBtn: bg=#000 p=10 rounded color=white;</code>. You can then apply this alias in any component: <code>box($primaryBtn)</code>.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section id="data">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">5. The @data Block</h2>
                        <p className="text-[#D4D4D8] mb-4">
                            The <code>@data</code> block binds context directly into the AST. It accepts raw JSON.
                        </p>
                        <div className="bg-[#000000] rounded-xl p-4 font-mono text-sm text-[#D4D4D8] border border-[#27272A] mb-4">
                            <span className="text-[#FAFAFA] font-bold">@data</span> {'{'} <br/>
                            &nbsp;&nbsp;"user": {'{'} "name": "Alice", "role": "Admin" {'}'},<br/>
                            &nbsp;&nbsp;"items": ["Sword", "Shield", "Potion"]<br/>
                            {'}'}
                        </div>
                        <p className="text-[#D4D4D8] mb-4">
                            Alternatively, link an external source (only works in local CLI environments):
                        </p>
                        <div className="bg-[#000000] rounded-xl p-4 font-mono text-sm text-[#D4D4D8] border border-[#27272A] mb-4">
                            <span className="text-[#FAFAFA] font-bold">@data</span> {'{'} src: "./mock_data.json" {'}'}
                        </div>
                    </section>

                    <section id="containers">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">6. Containers & Layout</h2>
                        <div className="space-y-6 text-[#D4D4D8]">
                            
                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-[#FAFAFA]">page</h3>
                                    <span className="text-xs px-2 py-1 bg-[#000000] border border-[#27272A] rounded-md">Container</span>
                                </div>
                                <p className="mb-4 text-sm text-[#A1A1AA]">The absolute root. Automatically handles page breaks if content overflows (based on engine rules). If multiple <code>page</code> tags exist, they generate separate pages.</p>
                                <div className="font-mono text-xs text-[#52525B]">Props: bg, p, pt, pb, pl, pr, mt, mb, ml, mr</div>
                            </div>

                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-[#FAFAFA]">box</h3>
                                    <span className="text-xs px-2 py-1 bg-[#000000] border border-[#27272A] rounded-md">Container</span>
                                </div>
                                <p className="mb-4 text-sm text-[#A1A1AA]">The most common structural element. Acts like a flexbox column by default. If the <code>row</code> flag is passed, it arranges children horizontally.</p>
                                <div className="font-mono text-xs text-[#52525B] mb-2">Props: bg, border, borderColor, row, n, gap, p, pt, pb, pl, pr, mt, mb, ml, mr</div>
                                <code className="text-xs bg-[#000000] p-2 rounded block border border-[#27272A]">box(bg=#f1f5f9 border=1 borderColor=#e2e8f0 p=10) {'{ ... }'}</code>
                            </div>

                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-[#FAFAFA]">cols</h3>
                                    <span className="text-xs px-2 py-1 bg-[#000000] border border-[#27272A] rounded-md">Container</span>
                                </div>
                                <p className="mb-4 text-sm text-[#A1A1AA]">Dedicated grid layout. Distributes children into equal-width columns.</p>
                                <div className="font-mono text-xs text-[#52525B] mb-2">Props: n (number of columns), gap, mt, mb</div>
                                <code className="text-xs bg-[#000000] p-2 rounded block border border-[#27272A]">cols(n=3 gap=5mm) {'{ box(){...} box(){...} box(){...} }'}</code>
                            </div>

                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-[#FAFAFA]">hdr / ftr</h3>
                                    <span className="text-xs px-2 py-1 bg-[#000000] border border-[#27272A] rounded-md">Container</span>
                                </div>
                                <p className="mb-4 text-sm text-[#A1A1AA]">Specialized containers that instruct the renderer to affix content to the top (hdr) or bottom (ftr) of the page bounds.</p>
                            </div>

                        </div>
                    </section>

                    <section id="typography">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">7. Typography & Leafs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <h3 className="text-xl font-bold text-[#FAFAFA] mb-2">txt</h3>
                                <p className="text-sm text-[#A1A1AA] mb-4">Renders strings. Evaluates mustache tags for data interpolation.</p>
                                <div className="font-mono text-xs text-[#52525B] mb-2">Props: size, color, bold, italic, uppercase, center, right, mt, mb</div>
                                <code className="text-xs bg-[#000000] p-2 rounded block text-[#FAFAFA] border border-[#27272A]">txt(size=14 bold color=#ef4444) {'{ WARNING: {{ error }} }'}</code>
                            </div>

                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <h3 className="text-xl font-bold text-[#FAFAFA] mb-2">tbl</h3>
                                <p className="text-sm text-[#A1A1AA] mb-4">Renders tabular data natively (supported by engine extensions). Uses CSV-like internal syntax separated by semicolons and commas.</p>
                                <div className="font-mono text-xs text-[#52525B] mb-2">Props: cols (e.g. "1fr 2fr 1fr")</div>
                                <code className="text-xs bg-[#000000] p-2 rounded block text-[#FAFAFA] border border-[#27272A]">tbl(cols="1fr 2fr") {'{\n  ID, Name;\n  1, Alice;\n  2, Bob\n}'}</code>
                            </div>

                            <div className="p-6 bg-[#000000] rounded-2xl border border-[#27272A]">
                                <h3 className="text-xl font-bold text-[#FAFAFA] mb-2">list / badge / link</h3>
                                <p className="text-sm text-[#A1A1AA] mb-4">Semantic leaf nodes. <code>badge</code> creates an inline pill. <code>link</code> wraps text in a hyperlink. <code>list</code> formats content with bullets.</p>
                            </div>

                        </div>
                    </section>

                    <section id="visuals">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">8. Visuals & Charts (Voids)</h2>
                        <p className="text-[#D4D4D8] mb-6">Void components do not take children and are self-closing (empty braces <code>{'{ }'}</code>).</p>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <div className="w-48 shrink-0"><code className="text-[#FAFAFA] font-bold text-lg">img</code></div>
                                <div>
                                    <p className="text-[#D4D4D8] text-sm mb-2">Embeds an image from a URL or local path. Supports JPG/PNG.</p>
                                    <code className="text-xs text-[#52525B]">img(src="https://example.com/logo.png" w=100 h=50) {'{}'}</code>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <div className="w-48 shrink-0"><code className="text-[#FAFAFA] font-bold text-lg">qr</code></div>
                                <div>
                                    <p className="text-[#D4D4D8] text-sm mb-2">Generates a native high-res QR code on the fly.</p>
                                    <code className="text-xs text-[#52525B]">qr(data="https://mars.gov/auth" w=40mm) {'{}'}</code>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <div className="w-48 shrink-0"><code className="text-[#FAFAFA] font-bold text-lg">bar / pie / line</code></div>
                                <div>
                                    <p className="text-[#D4D4D8] text-sm mb-2">Compiles beautiful native charts dynamically using QuickChart API under the hood.</p>
                                    <ul className="text-xs text-[#A1A1AA] mb-2 list-disc list-inside">
                                        <li><code>labels</code>: comma-separated string</li>
                                        <li><code>data</code>: comma-separated numbers</li>
                                        <li><code>data2</code>, <code>label2</code>: optional second series</li>
                                        <li><code>title</code> or <code>label</code>: Legend title</li>
                                    </ul>
                                    <code className="text-xs text-[#52525B]">bar(labels="Q1,Q2,Q3" data="10,20,30" label="Revenue" bg=#000) {'{}'}</code>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-[#000000] rounded-xl border border-[#27272A]">
                                <div className="w-48 shrink-0"><code className="text-[#FAFAFA] font-bold text-lg">hr / sp / shape</code></div>
                                <div>
                                    <p className="text-[#D4D4D8] text-sm mb-2">Layout utilities. <code>hr</code> draws a line. <code>sp</code> adds precise vertical space.</p>
                                    <code className="text-xs text-[#52525B]">hr(color=#000000 mt=5 mb=5) {'{}'}<br/>sp(h=15mm) {'{}'}</code>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="styling">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">9. Exhaustive Properties</h2>
                        <div className="overflow-x-auto rounded-xl border border-[#27272A]">
                            <table className="w-full text-left text-sm text-[#A1A1AA] border-collapse bg-[#09090B]">
                                <thead className="text-[#FAFAFA] border-b border-[#27272A] bg-[#000000]">
                                    <tr>
                                        <th className="p-4 font-semibold">Property Type</th>
                                        <th className="p-4 font-semibold">Keys</th>
                                        <th className="p-4 font-semibold">Values & Rules</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#27272A]">
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Spacing</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">m, mt, mb, ml, mr, p, pt, pb, pl, pr</code></td>
                                        <td className="p-4">Integers (pts) or units like <code>5mm</code> or <code>20px</code>. Evaluated as precise layout bounds.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Dimensions</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">w, h</code></td>
                                        <td className="p-4">Size constraints. Applicable to voids (img, qr, charts) and box containers.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Colors</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">bg, color, borderColor</code></td>
                                        <td className="p-4">Hex (e.g., <code>#000000</code>), short-hex (<code>#000</code>), or premium palette names (<code>black, white</code>). No quotes!</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Typography</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">size</code>, flags: <code>bold, italic, uppercase, center, right</code></td>
                                        <td className="p-4"><code>size</code> sets font size. Flags are boolean attributes (just write their name).</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Structural</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">border, rounded, row, n, gap</code></td>
                                        <td className="p-4"><code>border=1</code> adds outline. <code>row</code> converts box to flex-row. <code>n</code> sets columns.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 text-[#FAFAFA] font-mono">Data</td>
                                        <td className="p-4"><code className="text-[#D4D4D8]">src, data, labels, label</code></td>
                                        <td className="p-4">Use double quotes for string values that contain spaces or commas: <code>labels="Jan, Feb, Mar"</code>.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="logic">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">10. Control Structures</h2>
                        <p className="text-[#D4D4D8] mb-6">DARE handles looping and conditional rendering natively, making it a powerful templating engine.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-[#09090B] rounded-xl border border-[#27272A] p-6">
                                <h4 className="text-[#FAFAFA] font-bold mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    Iteration: each
                                </h4>
                                <div className="font-mono text-sm text-[#D4D4D8] whitespace-pre bg-[#000000] p-4 rounded-lg border border-[#27272A]">
<span className="text-[#FAFAFA]">each</span>(item in invoice.items) {'{\n'}
{'  '}<span className="text-[#A1A1AA]">box</span>(row border=1 mb=2 p=2) {'{\n'}
{'    '}<span className="text-[#A1A1AA]">txt</span>(w=50%) {'{'} {`{{ item.name }}`} {'}\n'}
{'    '}<span className="text-[#A1A1AA]">txt</span>(w=50% right) {'{'} ${`{{ item.price }}`} {'}\n'}
{'  }\n}'}
                                </div>
                            </div>

                            <div className="bg-[#09090B] rounded-xl border border-[#27272A] p-6">
                                <h4 className="text-[#FAFAFA] font-bold mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Conditionals: if
                                </h4>
                                <div className="font-mono text-sm text-[#D4D4D8] whitespace-pre bg-[#000000] p-4 rounded-lg border border-[#27272A]">
<span className="text-[#FAFAFA]">if</span>(user.isPremium) {'{\n'}
{'  '}<span className="text-[#A1A1AA]">badge</span>(bg=#000000 color=#FAFAFA) {'{'} VIP MEMBER {'}\n'}
{'}'}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="examples">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">11. Comprehensive Examples</h2>
                        <div className="bg-[#09090B] rounded-2xl border border-[#27272A] p-6">
                            <p className="text-[#A1A1AA] mb-6 text-sm">A full medical report layout demonstrating complex nested structure, styling aliases, and chart voids.</p>
                            <div className="font-mono text-sm text-[#D4D4D8] whitespace-pre-wrap overflow-x-auto bg-[#000000] p-4 rounded-xl border border-[#27272A]">
<span className="text-[#52525B]">// MEDICAL PRESCRIPTION DEMO</span><br/>
<span className="text-[#FAFAFA]">@setup</span> {'{\n'}
{'  '}format: A4;<br/>
{'  '}$hdr: bg=#000000 p=5mm;<br/>
{'  '}$h1: size=24 bold color=#000000 mb=5mm;<br/>
{'  '}$box: p=4mm bg=#ffffff border=1 mb=4mm;<br/>
{'}'}<br/><br/>
<span className="text-[#FAFAFA]">@doc</span> {'{\n'}
{'  '}<span className="text-[#A1A1AA]">page</span> {'{\n'}
{'    '}<span className="text-[#A1A1AA]">hdr</span>() {'{\n'}
{'      '}<span className="text-[#A1A1AA]">box</span>($hdr) {'{\n'}
{'        '}<span className="text-[#A1A1AA]">cols</span>(between) {'{\n'}
{'          '}<span className="text-[#A1A1AA]">txt</span>(size=12 bold color=white) {'{'} MED-X CLINIC {'}\n'}
{'        }\n'}
{'      }\n'}
{'    }\n'}
<br/>
{'    '}<span className="text-[#A1A1AA]">box</span>(p=10mm) {'{\n'}
{'      '}<span className="text-[#A1A1AA]">txt</span>($h1) {'{'} PATIENT DIAGNOSTICS {'}\n'}
{'      '}<span className="text-[#A1A1AA]">cols</span>(n=2 gap=5mm) {'{\n'}
{'        '}<span className="text-[#A1A1AA]">box</span>($box) {'{\n'}
{'          '}<span className="text-[#A1A1AA]">txt</span>(size=10 color=#64748b) {'{'} Blood Pressure {'}\n'}
{'          '}<span className="text-[#A1A1AA]">txt</span>(size=32 bold color=#dc2626) {'{'} 140/90 {'}\n'}
{'        }\n'}
{'        '}<span className="text-[#A1A1AA]">box</span>($box) {'{\n'}
{'          '}<span className="text-[#A1A1AA]">txt</span>(size=10 color=#64748b) {'{'} Heart Rate {'}\n'}
{'          '}<span className="text-[#A1A1AA]">txt</span>(size=32 bold color=#16a34a) {'{'} 72 BPM {'}\n'}
{'        }\n'}
{'      }\n'}
<br/>
{'      '}<span className="text-[#A1A1AA]">sp</span>(h=10mm) {'{}\n'}
{'      '}<span className="text-[#A1A1AA]">txt</span>(size=16 bold mb=3mm) {'{'} Vitals History {'}\n'}
{'      '}<span className="text-[#A1A1AA]">line</span>(labels="Mon,Tue,Wed,Thu,Fri" data="80,85,82,90,72" label="Heart Rate" bg=#000000) {'{}\n'}
{'    }\n'}
{'  }\n'}
{'}'}
                            </div>
                        </div>
                    </section>

                    <section id="agent">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">12. AI Agent Guidelines</h2>
                        <div className="bg-[#09090B] border border-[#FAFAFA] rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-[#FAFAFA] mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Directives for LLMs
                            </h3>
                            <ul className="list-decimal list-inside space-y-4 text-[#D4D4D8] text-lg">
                                <li><strong className="text-[#FAFAFA]">Strict Compliance:</strong> Do not wrap DARE syntax in HTML, markdown tables, or raw JSON. Output native DARE tags.</li>
                                <li><strong className="text-[#FAFAFA]">Avoid Quotes:</strong> Property assignments like colors and dimensions NEVER take quotes. E.g., <code>bg=#000000</code>. Only use quotes for strings with spaces, e.g., <code>labels="A, B, C"</code>.</li>
                                <li><strong className="text-[#FAFAFA]">Macro Efficiency:</strong> Always utilize the <code>@setup</code> block to define global aliases (<code>$h1</code>, <code>$card</code>). This drastically reduces duplication and token usage in the <code>@doc</code> block.</li>
                                <li><strong className="text-[#FAFAFA]">Structural Integrity:</strong> Every <code>@doc</code> must contain at least one <code>page</code> node. Everything else goes inside the page.</li>
                            </ul>
                        </div>
                    </section>

                    <section id="api" className="mb-32">
                        <h2 className="text-3xl font-bold tracking-tight text-[#FAFAFA] mb-6 border-b border-[#27272A] pb-4">13. Edge API Reference</h2>
                        <p className="text-[#D4D4D8] mb-6 text-lg">
                            DARE runs as a stateless Edge Function (Cloudflare Workers / Vercel Edge). It compiles your code directly into a binary PDF buffer in &lt;50ms.
                        </p>
                        <div className="bg-[#09090B] border border-[#27272A] rounded-2xl p-6 font-mono text-sm text-[#D4D4D8] overflow-x-auto">
                            <span className="text-[#52525B]"># Execute compilation via cURL</span><br/>
                            <span className="text-[#FAFAFA]">curl</span> -X POST https://dare-engine.com/api/render \<br/>
                            &nbsp;&nbsp;-H <span className="text-[#A1A1AA]">"Content-Type: application/json"</span> \<br/>
                            &nbsp;&nbsp;-d <span className="text-[#A1A1AA]">'{'{'}</span><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FAFAFA]">"code"</span>: <span className="text-[#A1A1AA]">{"\"@doc { page { box(bg=#000) { txt(color=white) { Hello } } } }\""}</span>,<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#FAFAFA]">"data"</span>: {'{'} <span className="text-[#A1A1AA]">"user"</span>: <span className="text-[#A1A1AA]">"Local Over"</span> {'}'}<br/>
                            &nbsp;&nbsp;<span className="text-[#A1A1AA]">{'}'}'</span> \<br/>
                            &nbsp;&nbsp;--output result.pdf
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
