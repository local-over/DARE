'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CodeComparison from './components/CodeComparison';

export default function Home() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden aurora-bg">
            <header className="px-6 flex flex-col items-center text-center relative z-10 w-full max-w-5xl mx-auto py-24">
                
                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[56px] md:text-[80px] font-bold tracking-tight leading-[1.05] mb-6 text-white"
                >
                    Write code.<br />
                    <span className="text-neutral-500">Get pixel-perfect PDFs.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[19px] md:text-[22px] text-neutral-400 max-w-2xl mx-auto mb-12 font-normal leading-[1.5]"
                >
                    DARE is a deterministic, token-efficient markup language built for AI. It compiles directly to native PDFs—no HTML or headless browsers required.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full"
                >
                    <Link href="/playground" className="bg-white text-black px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                        Open Playground
                    </Link>
                    <Link href="/docs" className="glass-panel text-white px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                        Read the Docs
                    </Link>
                </motion.div>
            </header>

            <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full px-6 py-12 relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-[22px] font-semibold tracking-tight text-white mb-2">10x more token-efficient than HTML</h2>
                    <p className="text-neutral-400 text-[15px]">Perfect for AI Agents generating documents on the fly.</p>
                </div>
                
                <CodeComparison />
            </motion.section>

            <section className="w-full px-6 py-24 bg-black relative z-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard 
                        title="0ms Cold Starts" 
                        desc="The Next.js API route runs entirely on Cloudflare Workers. It processes the AST in memory and streams the PDF buffer instantly." 
                    />
                    <FeatureCard 
                        title="Native Skills" 
                        desc="We provide a ready-to-use SKILL.md file. Drop it into your Agent's memory and it will instantly know how to write perfect DARE code." 
                    />
                    <FeatureCard 
                        title="Multi-Page Platform" 
                        desc="DARE v3 includes a fully interactive playground, comprehensive documentation, and a dedicated AI skills hub." 
                    />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ title, desc }) {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col border border-white/5">
            <h3 className="text-[17px] font-semibold text-white mb-2">{title}</h3>
            <p className="text-[14px] text-neutral-400 leading-relaxed font-normal">{desc}</p>
        </div>
    );
}
