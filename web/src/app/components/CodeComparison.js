'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; font-family: sans-serif; }
    .invoice-header {
      background: #1a1a2e;
      padding: 40px;
      color: white;
    }
    .invoice-header h1 {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px;
    }
    .invoice-header p {
      color: #a1a1aa;
      font-size: 12px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .items-table th {
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid #27272a;
      color: #a1a1aa;
      font-size: 11px;
      text-transform: uppercase;
    }
    .items-table td {
      padding: 12px 16px;
      border-bottom: 1px solid #18181b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="invoice-header">
    <h1>Invoice #1042</h1>
    <p>Acme Corp · Jan 2026</p>
  </div>
  <table class="items-table">
    <tr><th>Item</th><th>Qty</th>
    <th>Price</th></tr>
    <tr><td>Design System</td>
    <td>1</td><td>$4,200</td></tr>
    <tr><td>Development</td>
    <td>3</td><td>$12,600</td></tr>
  </table>
</body>
</html>`;

const DARE_CODE = `@setup {
  format: a4;
  $h: bold size=28 color=white;
  $sub: color=#a1a1aa size=12;
  $th: color=#a1a1aa size=11 upper;
}

@doc {
  page {
    box(p=40 bg=#1a1a2e) {
      txt($h) { Invoice #1042 }
      txt($sub mt=8) { Acme Corp · Jan 2026 }
    }
    table(mt=20 w=100%) {
      row(header) {
        cell($th) { Item }
        cell($th) { Qty }
        cell($th) { Price }
      }
      row {
        cell { Design System }
        cell { 1 }
        cell { $4,200 }
      }
      row {
        cell { Development }
        cell { 3 }
        cell { $12,600 }
      }
    }
  }
}`;

function useTypewriter(text, speed = 18, startDelay = 0) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayed('');
        setDone(false);
        indexRef.current = 0;

        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (indexRef.current < text.length) {
                    const step = Math.min(2, text.length - indexRef.current);
                    setDisplayed(text.slice(0, indexRef.current + step));
                    indexRef.current += step;
                } else {
                    setDone(true);
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return { displayed, done };
}

export default function CodeComparison() {
    const [activeTab, setActiveTab] = useState('dare');
    const htmlTyper = useTypewriter(HTML_CODE, 12, 200);
    const dareTyper = useTypewriter(DARE_CODE, 22, 200);

    const htmlTokens = HTML_CODE.split(/\s+/).length;
    const dareTokens = DARE_CODE.split(/\s+/).length;

    const currentDisplay = activeTab === 'html' ? htmlTyper : dareTyper;
    const currentTokens = activeTab === 'html' ? htmlTokens : dareTokens;
    const currentDone = activeTab === 'html' ? htmlTyper.done : dareTyper.done;

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Tab switcher */}
            <div className="flex items-center gap-1 mb-4 p-1 rounded-xl bg-[#1B2336] w-fit mx-auto border border-[#475569]">
                <button
                    onClick={() => setActiveTab('html')}
                    className="relative px-5 py-2 text-[13px] font-medium rounded-lg transition-colors"
                    style={{ color: activeTab === 'html' ? '#F8FAFC' : '#94A3B8' }}
                >
                    {activeTab === 'html' && (
                        <motion.div
                            layoutId="comparison-tab"
                            className="absolute inset-0 bg-[#0F172A] rounded-lg border border-[#475569]"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            style={{ zIndex: -1 }}
                        />
                    )}
                    HTML + CSS
                </button>
                <button
                    onClick={() => setActiveTab('dare')}
                    className="relative px-5 py-2 text-[13px] font-medium rounded-lg transition-colors"
                    style={{ color: activeTab === 'dare' ? '#F8FAFC' : '#94A3B8' }}
                >
                    {activeTab === 'dare' && (
                        <motion.div
                            layoutId="comparison-tab"
                            className="absolute inset-0 bg-[#0F172A] rounded-lg border border-[#475569]"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            style={{ zIndex: -1 }}
                        />
                    )}
                    DARE
                </button>
            </div>

            {/* Code display */}
            <div className="code-block relative" style={{ height: 420, overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.pre
                        key={activeTab}
                        initial={{ opacity: 0, x: activeTab === 'dare' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: activeTab === 'dare' ? -20 : 20 }}
                        transition={{ duration: 0.25 }}
                        className="p-5 text-[12.5px] leading-[1.7] text-neutral-300 whitespace-pre overflow-auto h-full"
                    >
                        {currentDisplay.displayed}
                        {!currentDone && (
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="inline-block w-[7px] h-[15px] bg-white/70 ml-[1px] align-middle"
                            />
                        )}
                    </motion.pre>
                </AnimatePresence>
            </div>

            {/* Token counter */}
            <div className="flex items-center justify-center gap-6 mt-4 text-[13px]">
                <div className="flex items-center gap-2">
                    <span className="text-neutral-500">Tokens:</span>
                    <motion.span
                        key={activeTab + '-tokens'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono font-bold"
                        style={{ color: activeTab === 'dare' ? '#22c55e' : '#ef4444' }}
                    >
                        ~{currentTokens}
                    </motion.span>
                </div>
                {activeTab === 'dare' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium"
                        style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}
                    >
                        {Math.round((1 - dareTokens / htmlTokens) * 100)}% fewer tokens
                    </motion.div>
                )}
            </div>
        </div>
    );
}
