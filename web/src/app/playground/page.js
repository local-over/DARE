'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DARE_EXAMPLE = `@setup {
    format: a4;
    $main: bold size=24 color=#ffffff;
    $subtitle: color=#a1a1aa size=12;
    $card: bg=#09090B rounded=4 p=15;
}

@data {
    "title": "Welcome to DARE v3.0",
    "user": "Developer"
}

@doc {
    page(bg=#000000) {
        box(p=30 bg=#09090B border=1 borderColor=#27272A rounded=6) {
            txt($main) { {{ title }} }
            txt($subtitle mt=5) { Native Edge Rendering for AI Agents }
        }
        
        cols(n=2 gap=15 mt=20) {
            box($card) {
                txt(bold size=14 color=white) { Hello, {{ user }}! }
                txt($subtitle mt=5) { This PDF was generated on the Edge. }
                sp(h=10)
                badge(bg=#27272A color=white size=10) { 0ms Cold Starts }
            }
            box($card center) {
                qr(data="https://dare.pages.dev" w=80)
            }
        }
    }
}`;

export default function Playground() {
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
        <div className="flex-1 flex flex-col p-6 max-w-[1400px] w-full mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#FAFAFA] mb-1">Playground</h1>
                    <p className="text-[14px] text-[#A1A1AA]">Write DARE code on the left, see the compiled PDF on the right.</p>
                </div>
                <button 
                    onClick={handleRun}
                    disabled={loading}
                    className="bg-[#FAFAFA] text-[#000000] px-6 py-2 rounded-lg text-[14px] font-semibold flex items-center gap-2 hover:bg-[#E4E4E7] transition-colors disabled:opacity-50"
                >
                    {loading ? 'Compiling...' : 'Run Compiler'}
                </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
                {/* Editor */}
                <div className="flex flex-col bg-[#000000] border border-[#27272A] rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-[#27272A] flex items-center bg-[#000000]">
                        <span className="text-[12px] font-mono text-[#A1A1AA]">document.dare</span>
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            value={dareCode}
                            onChange={(e) => setDareCode(e.target.value)}
                            className="absolute inset-0 w-full h-full bg-transparent p-5 font-mono text-[13px] leading-[1.7] text-[#D4D4D8] outline-none resize-none z-10"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col bg-[#000000] border border-[#27272A] rounded-xl overflow-hidden relative">
                    <div className="px-4 py-2.5 border-b border-[#27272A] flex items-center bg-[#000000]">
                        <span className="text-[12px] font-mono text-[#A1A1AA]">output.pdf</span>
                    </div>
                    <div className="flex-1 bg-[#000000] relative p-4">
                        <AnimatePresence mode="wait">
                            {pdfUrl ? (
                                <motion.iframe 
                                    key="pdf"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    src={pdfUrl} 
                                    className="w-full h-full rounded-lg bg-[#000000] border border-[#27272A]" 
                                />
                            ) : (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-[#52525B] font-medium text-[14px]"
                                >
                                    <div className="w-12 h-12 rounded-full border border-[#27272A] flex items-center justify-center mb-3">
                                        <div className="w-4 h-4 rounded-[3px] border border-[#52525B]" />
                                    </div>
                                    <p>Click Run to render your Edge PDF</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
