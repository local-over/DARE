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
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#000000] text-[#FAFAFA]">
            <Head>
                <title>DARE Engine - Skills</title>
            </Head>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl w-full mx-auto bg-[#000000] border border-[#27272A] rounded-2xl overflow-hidden mt-12"
            >
                <div className="p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000000] border border-[#27272A] text-[#FAFAFA] text-xs font-bold tracking-wide mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        AGENT TOOL
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-4 tracking-tight text-[#FAFAFA]">DARE AI Skill</h1>
                    <p className="text-[#A1A1AA] mb-10 text-lg leading-relaxed">
                        Install the DARE skill into your AI agent's workspace. This teaches any LLM how to write perfectly valid, token-efficient DARE syntax and compile it directly to PDF via our native Edge API.
                    </p>

                    <div className="bg-[#000000] border border-[#27272A] rounded-xl p-6 mb-10 relative">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-[#52525B] uppercase tracking-wider">Install Prompt</span>
                            <button 
                                onClick={handleCopy}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                    copied 
                                    ? "bg-[#FAFAFA] text-[#000000] border border-[#FAFAFA]" 
                                    : "bg-[#000000] hover:bg-[#27272A] text-[#FAFAFA] border border-[#27272A]"
                                }`}
                            >
                                {copied ? "Copied!" : "Copy Prompt"}
                            </button>
                        </div>
                        <code className="block whitespace-pre-wrap break-all text-[13px] leading-relaxed font-mono text-[#D4D4D8]">
                            {installPrompt}
                        </code>
                    </div>

                    <div className="border-t border-[#27272A] pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-[#FAFAFA]">Manual Download</h2>
                            <p className="text-[#A1A1AA] text-sm">
                                Download the raw <code>SKILL.md</code> file directly to your agent's directory.
                            </p>
                        </div>
                        <a 
                            href="https://raw.githubusercontent.com/local-over/DARE/main/dare-skill.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#27272A] hover:border-[#FAFAFA] hover:text-[#FAFAFA] text-[#FAFAFA] rounded-lg font-bold transition-all group shrink-0"
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
