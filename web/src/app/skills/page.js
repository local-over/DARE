"use client";

import { useState } from "react";
import Head from "next/head";

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
        <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
            <Head>
                <title>DARE Engine - Skills</title>
            </Head>
            
            <div className="max-w-3xl mx-auto bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-4">DARE AI Skill</h1>
                    <p className="text-slate-600 mb-8">
                        Install the DARE skill into your AI agent's workspace to teach it how to write valid DARE syntax and generate PDFs via our API.
                    </p>

                    <div className="bg-slate-900 text-slate-100 rounded-lg p-6 mb-8 relative">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-semibold text-slate-400">Install Prompt</span>
                            <button 
                                onClick={handleCopy}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                            >
                                {copied ? "Copied!" : "Copy Prompt"}
                            </button>
                        </div>
                        <code className="block whitespace-pre-wrap break-all text-sm font-mono text-emerald-400">
                            {installPrompt}
                        </code>
                    </div>

                    <div className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-semibold mb-4">Manual Download</h2>
                        <p className="text-slate-600 mb-4">
                            You can also download the raw <code>SKILL.md</code> file directly and place it in your agent's skills directory.
                        </p>
                        <a 
                            href="https://raw.githubusercontent.com/local-over/DARE/main/dare-skill.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
                        >
                            View Raw SKILL.md &rarr;
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
