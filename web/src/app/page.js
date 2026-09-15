'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CodeComparison from './components/CodeComparison';

export default function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(50,50,50,0.4),rgba(0,0,0,0)_50%)]" />
            
            <header className="px-6 flex flex-col items-center text-center relative z-10 w-full max-w-5xl mx-auto pt-32 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        DARE v3.0 IS LIVE
                    </div>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[64px] md:text-[96px] font-bold tracking-tight leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                >
                    Write code.<br />
                    <span>Get pixel-perfect PDFs.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[20px] md:text-[24px] text-neutral-400 max-w-2xl mx-auto mb-12 font-normal leading-[1.5]"
                >
                    DARE is a deterministic, token-efficient markup language built for AI. It compiles directly to native PDFs—no HTML or headless browsers required.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full"
                >
                    <Link href="/playground" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-[16px] hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Open Playground
                    </Link>
                    <Link href="/docs" className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-semibold text-[16px] hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        Read the Docs
                    </Link>
                </motion.div>
            </header>

            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full px-6 py-24 relative z-10"
            >
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-white mb-4">Why DARE?</h2>
                    <p className="text-neutral-400 text-[18px] max-w-2xl mx-auto">HTML is bloated. DARE is laser-focused. See how AI generates documents with 10x fewer tokens.</p>
                </div>
                
                <CodeComparison />
            </motion.section>

            <section className="w-full px-6 py-32 relative z-10 border-t border-white/5 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-[40px] font-bold tracking-tight text-white mb-4">What's New in v3</h2>
                        <p className="text-[18px] text-neutral-400 max-w-2xl mx-auto">The most massive update to the DARE ecosystem yet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FeatureBlock 
                            title="Native Cloudflare Edge Rendering"
                            desc="We replaced heavy Node.js dependencies with a fully edge-compatible PDF compiler. 0ms cold starts, infinite scaling."
                            icon={<EdgeIcon />}
                        />
                        <FeatureBlock 
                            title="AI Skill System"
                            desc="DARE now ships with a native SKILL.md file. Give it to any AI agent, and they instantly understand how to write perfect DARE code."
                            icon={<SkillIcon />}
                        />
                        <FeatureBlock 
                            title="Interactive Playground"
                            desc="A dual-pane live editor. Type DARE on the left, see the compiled PDF on the right in real-time."
                            icon={<PlayIcon />}
                        />
                        <FeatureBlock 
                            title="Deep Documentation"
                            desc="An exhaustive, encyclopedic breakdown of every single primitive, parameter, and rule in the DARE layout engine."
                            icon={<DocIcon />}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureBlock({ title, desc, icon }) {
    return (
        <div className="group relative bg-white/[0.02] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.04] transition-colors overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <h3 className="text-[22px] font-semibold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-[16px] text-neutral-400 leading-relaxed font-normal">{desc}</p>
        </div>
    );
}

function EdgeIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
}

function SkillIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}

function PlayIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="15" y1="3" y2="3"/><line x1="9" x2="15" y1="21" y2="21"/><line x1="9" x2="9" y1="9" y2="15"/><line x1="15" x2="15" y1="9" y2="15"/></svg>;
}

function DocIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
