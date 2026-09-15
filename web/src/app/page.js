'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeComparison from './components/CodeComparison';

export default function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
            {/* Subtle Aurora Background matching Pro-Max */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.1),rgba(15,23,42,0)_50%)]" />
            
            <header className="px-6 flex flex-col items-center text-center relative z-10 w-full max-w-5xl mx-auto pt-32 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2336] border border-[#475569] text-[#94A3B8] text-xs font-medium tracking-wide shadow-[0_0_15px_rgba(34,197,94,0.05)]">
                        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        DARE v3.0 IS LIVE
                    </div>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[56px] md:text-[88px] font-bold tracking-tight leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/90 to-[#94A3B8]/60"
                >
                    Write code.<br />
                    <span>Get pixel-perfect PDFs.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[20px] md:text-[22px] text-[#94A3B8] max-w-2xl mx-auto mb-12 font-normal leading-[1.5]"
                >
                    DARE is a deterministic, token-efficient markup language built for AI. It compiles directly to native PDFs—no HTML or headless browsers required.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl"
                >
                    <Link href="/playground" className="bg-[#22C55E] text-[#0F172A] px-8 py-4 rounded-xl font-semibold text-[16px] hover:bg-[#22C55E]/90 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        <PlayIcon /> Open Playground
                    </Link>
                    <Link href="/docs" className="bg-[#1E293B] text-[#F8FAFC] border border-[#475569] px-8 py-4 rounded-xl font-semibold text-[16px] hover:bg-[#334155] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                        <DocIcon /> Read the Docs
                    </Link>
                    <Link href="/skills" className="bg-transparent text-[#94A3B8] border border-[#475569] px-8 py-4 rounded-xl font-semibold text-[16px] hover:border-[#22C55E]/50 hover:text-[#22C55E] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                        <SkillIcon /> Install AI Skill
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
                    <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-[#F8FAFC] mb-4">Why DARE?</h2>
                    <p className="text-[#94A3B8] text-[18px] max-w-2xl mx-auto">HTML is bloated. DARE is laser-focused. See how AI generates documents with 10x fewer tokens.</p>
                </div>
                
                <CodeComparison />
            </motion.section>

            <section className="w-full px-6 py-32 relative z-10 border-t border-[#475569] bg-[#0B1121]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-[40px] font-bold tracking-tight text-[#F8FAFC] mb-4">What's New in v3</h2>
                        <p className="text-[18px] text-[#94A3B8] max-w-2xl mx-auto">The most massive update to the DARE ecosystem yet.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="group relative bg-[#1B2336] border border-[#475569] p-8 rounded-3xl hover:bg-[#1E293B] hover:border-[#64748B] transition-all overflow-hidden cursor-pointer shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] border border-[#475569] flex items-center justify-center mb-6 text-[#22C55E] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-[22px] font-semibold text-[#F8FAFC] mb-3 tracking-tight">{title}</h3>
            <p className="text-[16px] text-[#94A3B8] leading-relaxed font-normal">{desc}</p>
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
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
}

function DocIcon() {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
}
