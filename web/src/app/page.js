'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeComparison from './components/CodeComparison';

export default function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative bg-[#000000] text-[#FAFAFA]">
            
            <header className="px-6 flex flex-col items-center text-center relative z-10 w-full max-w-5xl mx-auto pt-32 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181B] border border-[#27272A] text-[#A1A1AA] text-xs font-semibold tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 bg-[#FAFAFA]" />
                        DARE v3.0 IS LIVE
                    </div>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[56px] md:text-[88px] font-bold tracking-tight leading-[1.05] mb-6 text-[#FAFAFA]"
                >
                    Write code.<br />
                    <span className="text-[#A1A1AA]">Get pixel-perfect PDFs.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[20px] md:text-[22px] text-[#A1A1AA] max-w-2xl mx-auto mb-12 font-normal leading-[1.5]"
                >
                    DARE is a deterministic, token-efficient markup language built for AI. It compiles directly to native PDFs—no HTML or headless browsers required.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl"
                >
                    <Link href="/playground" className="bg-[#FAFAFA] text-[#000000] border border-[#FAFAFA] px-8 py-4 font-semibold text-[16px] hover:bg-[#E4E4E7] transition-all flex items-center justify-center gap-2">
                        <PlayIcon /> Open Playground
                    </Link>
                    <Link href="/docs" className="bg-[#18181B] text-[#FAFAFA] border border-[#27272A] px-8 py-4 font-semibold text-[16px] hover:bg-[#27272A] transition-all flex items-center justify-center gap-2">
                        <DocIcon /> Read the Docs
                    </Link>
                    <Link href="/skills" className="bg-transparent text-[#A1A1AA] border border-[#27272A] px-8 py-4 font-semibold text-[16px] hover:border-[#FAFAFA] hover:text-[#FAFAFA] transition-all flex items-center justify-center gap-2">
                        <SkillIcon /> Install AI Skill
                    </Link>
                </motion.div>
            </header>

            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full px-6 py-24 relative z-10 border-t border-[#27272A]"
            >
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-[#FAFAFA] mb-4">Why DARE?</h2>
                    <p className="text-[#A1A1AA] text-[18px] max-w-2xl mx-auto">HTML is bloated. DARE is laser-focused. See how AI generates documents with 10x fewer tokens.</p>
                </div>
                
                <CodeComparison />
            </motion.section>

            <section className="w-full px-6 py-32 relative z-10 border-t border-[#27272A] bg-[#09090B]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-[40px] font-bold tracking-tight text-[#FAFAFA] mb-4">What's New in v3</h2>
                        <p className="text-[18px] text-[#A1A1AA] max-w-2xl mx-auto">The most massive update to the DARE ecosystem yet.</p>
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
        <div className="group relative bg-[#18181B] border border-[#27272A] p-8 hover:bg-[#27272A] hover:border-[#3F3F46] transition-all overflow-hidden cursor-pointer">
            <div className="w-12 h-12 bg-[#000000] border border-[#3F3F46] flex items-center justify-center mb-6 text-[#FAFAFA]">
                {icon}
            </div>
            <h3 className="text-[20px] font-bold text-[#FAFAFA] mb-3 tracking-tight">{title}</h3>
            <p className="text-[16px] text-[#A1A1AA] leading-relaxed font-normal">{desc}</p>
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
