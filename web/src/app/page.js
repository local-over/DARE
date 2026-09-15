'use client';

import React, { useState } from 'react';
import { Play, Code, Layout, Sparkles, BookOpen, ExternalLink, Bot } from 'lucide-react';

export default function Home() {
    const [dareCode, setDareCode] = useState('@setup {\n    format: a4;\n    $main: bold size=20 color=white;\n    $subtitle: color=muted size=12;\n}\n\n@data {\n    "title": "Welcome to DARE v3",\n    "user": "Developer"\n}\n\n@doc {\n    page(bg=surface) {\n        box(p=30 bg=primary) {\n            txt($main) { {{ title }} }\n            txt($subtitle mt=5) { Generated dynamically on the Edge. }\n        }\n        cols(mt=20) {\n            txt(w=50%) { Hello, {{ user }}! }\n            img(w=50% src=https://picsum.photos/200) {}\n        }\n    }\n}');
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/render', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: dareCode })
            });
            if (res.ok) {
                const blob = await res.blob();
                setPdfUrl(URL.createObjectURL(blob));
            } else {
                alert("Compilation failed.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            
            {/* Glass Navigation */}
            <nav className="fixed top-0 w-full px-8 py-4 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/10 z-50">
                <div className="font-black text-xl tracking-tighter">DARE v3</div>
                <div className="flex gap-8 text-sm font-medium text-neutral-400">
                    <a href="#playground" className="hover:text-white transition-colors">Playground</a>
                    <a href="#api" className="hover:text-white transition-colors">Edge API</a>
                    <a href="#agents" className="hover:text-white transition-colors">AI Agents</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-8 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold mb-8">
                    <Sparkles size={14} /> Now Live on Cloudflare Edge Runtimes
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                    Write Code.<br />
                    <span className="text-neutral-500">Get PDFs.</span>
                </h1>
                <p className="text-xl text-neutral-400 max-w-2xl mb-10">
                    DARE is a token-efficient, declarative markup language. It compiles directly to native PDFs natively on the Edge—no headless browsers required.
                </p>
                <div className="flex gap-4">
                    <a href="#playground" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                        <Play size={20} /> Try Live Compiler
                    </a>
                    <a href="#api" className="bg-neutral-900 border border-neutral-800 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2">
                        <Code size={20} /> View API Docs
                    </a>
                </div>
            </header>

            {/* Live Compiler Playground */}
            <section id="playground" className="py-20 px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Layout className="text-neutral-500" />
                    <h2 className="text-3xl font-bold tracking-tight">Live Edge Compiler</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]">
                    {/* Editor */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-black/50">
                            <span className="text-sm font-mono text-neutral-400">input.dare</span>
                            <button 
                                onClick={handleRun}
                                disabled={loading}
                                className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Compiling...' : <><Play size={16} /> Compile</>}
                            </button>
                        </div>
                        <textarea
                            value={dareCode}
                            onChange={(e) => setDareCode(e.target.value)}
                            className="w-full h-full bg-transparent p-6 font-mono text-sm text-green-400 outline-none resize-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Preview */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col relative">
                        <div className="px-6 py-4 border-b border-neutral-800 bg-black/50">
                            <span className="text-sm font-mono text-neutral-400">output.pdf</span>
                        </div>
                        <div className="flex-1 bg-neutral-950 p-4 relative">
                            {pdfUrl ? (
                                <iframe src={pdfUrl} className="w-full h-full rounded-xl bg-white" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-medium">
                                    Click Compile to render PDF
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features / API */}
            <section id="api" className="py-20 px-8 bg-neutral-950">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <Code className="text-neutral-500" />
                        <h2 className="text-3xl font-bold tracking-tight">The Edge API</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Stateless & Blazing Fast</h3>
                            <p className="text-neutral-400 mb-6">
                                The DARE API runs on Cloudflare Workers/Pages. It is fully stateless, meaning it processes your markup in memory and streams the PDF buffer back instantly. No permanent storage, zero cold starts.
                            </p>
                            <pre className="bg-black border border-neutral-800 p-6 rounded-2xl overflow-x-auto text-sm text-green-400 font-mono">
{`POST /api/render
Content-Type: application/json

{
    "code": "@doc { page { txt { Hello } } }"
}`}
                            </pre>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-black border border-neutral-800 p-6 rounded-2xl">
                                <h4 className="font-bold mb-2">Native Data Binding</h4>
                                <p className="text-sm text-neutral-400">Pass JSON data into the API payload, and it will automatically inject into `{{ variables }}` in your DARE code.</p>
                            </div>
                            <div className="bg-black border border-neutral-800 p-6 rounded-2xl">
                                <h4 className="font-bold mb-2">Control Structures</h4>
                                <p className="text-sm text-neutral-400">Use `each(item in list)` and `if(condition)` directives right in your markup to dynamically build tables, invoices, and reports.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Agents */}
            <section id="agents" className="py-32 px-8 max-w-4xl mx-auto text-center border-t border-neutral-900">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8">
                    <Bot size={32} />
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Built for Autonomous Agents</h2>
                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                    DARE is designed specifically to be written by AI. It is highly token-efficient compared to HTML/CSS. We provide a native `SKILL.md` that teaches your agent exactly how to write DARE code and hit the Live API.
                </p>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl text-left inline-block max-w-xl w-full">
                    <div className="text-sm font-mono text-neutral-500 mb-4">~/.gemini/config/skills/dare-engine/SKILL.md</div>
                    <code className="text-green-400 font-mono text-sm block whitespace-pre">
{`---
name: dare-engine
description: Generate PDFs via live API
---
# DARE Engine v3
...`}
                    </code>
                </div>
            </section>
            
            <footer className="py-8 text-center text-neutral-600 text-sm border-t border-neutral-900">
                DARE Engine v3.0 &copy; 2026. Legendary production-grade tools.
            </footer>
        </div>
    );
}
