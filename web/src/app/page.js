'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code, Layout, Sparkles, Box, FileOutput, Server, CheckCircle2 } from 'lucide-react';

const DARE_EXAMPLE = `@setup {
    format: a4;
    $main: bold size=24 color=#ffffff;
    $subtitle: color=#a1a1aa size=12;
    $card: bg=#18181b rounded=4 p=15;
}

@data {
    "title": "Welcome to DARE v3.0",
    "user": "Developer"
}

@doc {
    page(bg=#09090b) {
        box(p=30 bg=#000000 border=1 borderColor=#27272a rounded=6) {
            txt($main) { {{ title }} }
            txt($subtitle mt=5) { Native Edge Rendering for AI Agents }
        }
        
        cols(n=2 gap=15 mt=20) {
            box($card) {
                txt(bold size=14 color=white) { Hello, {{ user }}! }
                txt($subtitle mt=5) { This PDF was generated on the Edge. }
                sp(h=10)
                badge(bg=#27272a color=white size=10) { 0ms Cold Starts }
            }
            box($card center) {
                qr(data="https://dare.pages.dev" w=80)
            }
        }
    }
}`;

export default function Home() {
    const [dareCode, setDareCode] = useState(DARE_EXAMPLE);
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
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black aurora-bg overflow-x-hidden">
            
            {/* Glass Navigation */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 w-full px-6 py-4 flex justify-between items-center glass-panel z-50 border-b-0 border-b border-white/5"
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                    </div>
                    <span className="font-bold text-lg tracking-tight">DARE v3.0</span>
                </div>
                <div className="flex gap-8 text-sm font-medium text-neutral-400">
                    <a href="#playground" className="hover:text-white transition-colors">Playground</a>
                    <a href="#api" className="hover:text-white transition-colors">Edge API</a>
                    <a href="#agents" className="hover:text-white transition-colors">AI Agents</a>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <header className="pt-48 pb-32 px-6 flex flex-col items-center text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-medium mb-10 text-neutral-300"
                >
                    <Sparkles size={14} className="text-blue-400" /> Fully Native Cloudflare Edge Engine
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-glow max-w-5xl"
                >
                    Write code.<br />
                    <span className="text-neutral-500">Get pixel-perfect PDFs.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-neutral-400 max-w-2xl mb-12 font-light leading-relaxed"
                >
                    DARE is a deterministic, token-efficient markup language built for AI. It compiles directly to native PDFs—no HTML or headless browsers required.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a href="#playground" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        <Play size={18} /> Launch Compiler
                    </a>
                    <a href="#api" className="glass-panel text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        <Code size={18} /> Documentation
                    </a>
                </motion.div>
            </header>

            {/* Live Compiler Playground */}
            <section id="playground" className="py-24 px-6 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                            <Layout size={20} className="text-white" />
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight">Live Playground</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
                        {/* Editor Box */}
                        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col relative group">
                            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/40">
                                <div className="flex items-center gap-2">
                                    <FileIcon />
                                    <span className="text-sm font-mono text-neutral-400">document.dare</span>
                                </div>
                                <button 
                                    onClick={handleRun}
                                    disabled={loading}
                                    className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                                >
                                    {loading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                            <Server size={14} />
                                        </motion.div>
                                    ) : <Play size={14} />} 
                                    {loading ? 'Compiling...' : 'Run'}
                                </button>
                            </div>
                            <div className="flex-1 relative">
                                <textarea
                                    value={dareCode}
                                    onChange={(e) => setDareCode(e.target.value)}
                                    className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-[13px] leading-relaxed text-blue-300 outline-none resize-none z-10"
                                    spellCheck={false}
                                />
                            </div>
                        </div>

                        {/* Preview Box */}
                        <div className="glass-panel rounded-3xl overflow-hidden flex flex-col relative">
                            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-black/40">
                                <FileOutput size={16} className="text-neutral-500" />
                                <span className="text-sm font-mono text-neutral-400">output.pdf</span>
                            </div>
                            <div className="flex-1 bg-neutral-950 p-2 relative">
                                <AnimatePresence mode="wait">
                                    {pdfUrl ? (
                                        <motion.iframe 
                                            key="pdf"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            src={pdfUrl} 
                                            className="w-full h-full rounded-2xl bg-white border border-neutral-800" 
                                        />
                                    ) : (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600 font-medium"
                                        >
                                            <Box size={48} className="mb-4 opacity-20" />
                                            <p>Click Run to render your Edge PDF</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* AI Agents & API */}
            <section id="agents" className="py-32 px-6 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Designed for AI. Built for Scale.</h2>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                            HTML is heavy and non-deterministic. DARE is lightweight and exact. Feed the API and let your agents build flawless documents.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard 
                            icon={<Server />} 
                            title="0ms Cold Starts" 
                            desc="The Next.js API route runs entirely on Cloudflare Workers. It processes the AST in memory and streams the PDF buffer instantly." 
                        />
                        <FeatureCard 
                            icon={<Code />} 
                            title="10x Fewer Tokens" 
                            desc="CSS is bloated. DARE uses a highly compressed shorthand syntax (e.g., `p=10`, `rounded=4`) that saves massive LLM context windows." 
                        />
                        <FeatureCard 
                            icon={<CheckCircle2 />} 
                            title="Native Skills" 
                            desc="We provide a ready-to-use SKILL.md file. Drop it into your Agent's memory and it will instantly know how to write perfect DARE code." 
                        />
                    </div>
                </div>
            </section>
            
            <footer className="py-12 text-center text-neutral-600 text-sm border-t border-white/5 relative z-10 bg-black">
                <p className="font-medium">DARE Engine v3.0 &copy; 2026.</p>
                <p className="opacity-50 mt-2">Engineered by Hassan Elkady. Legendary production-grade tools.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-3xl flex flex-col"
        >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-400 font-light leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function FileIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
        </svg>
    );
}
