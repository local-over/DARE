"use client";

import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function SkillsPage() {
    const [copied, setCopied] = useState(false);
    
    const installPrompt = `curl -sSL https://raw.githubusercontent.com/local-over/DARE/main/dare-skill.md --create-dirs -o .agents/skills/dare/SKILL.md && echo "DARE skill installed. Use the online API if CLI is unavailable."`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(installPrompt);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0F172A] text-[#F8FAFC]">
            <Head>
                <title>DARE Engine - Skills</title>
            </Head>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl w-full mx-auto bg-[#1B2336] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] border border-[#475569] rounded-2xl overflow-hidden mt-12"
            >
                <div className="p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#475569] text-[#22C55E] text-xs font-bold tracking-wide mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        AGENT TOOL
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4 tracking-tight text-[#F8FAFC]">DARE AI Skill</h1>
                    <p className="text-[#94A3B8] mb-10 text-lg leading-relaxed">
                        Install the DARE skill into your AI agent's workspace. This teaches any LLM how to write perfectly valid, token-efficient DARE syntax and compile it directly to PDF via our native Edge API.
                    </p>

                    <div className="bg-[#0B1121] border border-[#475569] rounded-xl p-6 mb-10 relative shadow-inner">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-[#64748B] uppercase tracking-wider">Install Prompt</span>
                            <button 
                                onClick={handleCopy}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    copied 
                                    ? "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30" 
                                    : "bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-[#475569]"
                                }`}
                            >
                                {copied ? "Copied to Clipboard!" : "Copy Prompt"}
                            </button>
                        </div>
                        <code className="block whitespace-pre-wrap break-all text-[13px] leading-relaxed font-mono text-[#E2E8F0]">
                            {installPrompt}
                        </code>
                    </div>

                    <div className="border-t border-[#475569] pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-[#F8FAFC]">Manual Download</h2>
                            <p className="text-[#94A3B8] text-sm">
                                Download the raw <code>SKILL.md</code> file directly to your agent's directory.
                            </p>
                        </div>
                        <a 
                            href="https://raw.githubusercontent.com/local-over/DARE/main/dare-skill.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#475569] hover:border-[#22C55E]/50 hover:text-[#22C55E] text-[#F8FAFC] rounded-lg font-medium transition-all group shrink-0"
                        >
                            View SKILL.md 
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
