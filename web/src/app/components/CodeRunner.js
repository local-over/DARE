'use client';

import { useState, useEffect } from 'react';
import { ZapIcon } from './Icons';

const RENDER_API_URL = 'https://dare-api-server.onrender.com/api/render';
const PREVIEW_API_URL = 'https://dare-api-server.onrender.com/api/preview';

const EXAMPLES = [
  {
    id: 'receipt',
    name: 'Payment Receipt',
    code: `@setup {
  format: 80mm 150mm;
  $brand: color=#000;
  $muted: color=#64748b;
  $h1: size=16 bold;
  $txt: size=10;
}

@doc {
  page {
    box(p=8mm) {
      txt($h1, align=center) { PAYMENT RECEIPT }
      sp(h=5) {}
      txt($muted, size=8, align=center) { #REC-2026-999 }
      
      sp(h=10) {}
      line(color=#e2e8f0) {}
      sp(h=10) {}
      
      box(row, between) {
        txt($txt) { Item }
        txt($txt) { Price }
      }
      sp(h=3) {}
      box(row, between) {
        txt($txt, bold) { API Pro Plan }
        txt($txt, bold) { $99.00 }
      }
      
      sp(h=15) {}
      qr(data="https://dare-lang.org/rec/999", w=35mm, align=center) {}
      
      sp(h=10) {}
      txt($muted, size=8, align=center) { Thank you for your business! }
    }
  }
}`,
  },
  {
    id: 'badge',
    name: 'Business Card',
    code: `@setup {
  format: 90mm 55mm;
  $accent: color=#38bdf8;
}

@doc {
  page {
    box(bg=#0f172a, p=8mm, h=fill, col, justify=center) {
      txt(size=14, bold, color=white) { DARE ENGINE }
      txt($accent, size=8) { AI Document Automation }
      sp(h=5) {}
      txt(color=#94a3b8, size=7) { hello@dare-engine.dev }
      txt(color=#94a3b8, size=7) { +1 234 567 8900 }
    }
  }
}`,
  },
];

export default function CodeRunner() {
  const [activeTab, setActiveTab] = useState(EXAMPLES[0].id);
  const selectedExample = EXAMPLES.find((ex) => ex.id === activeTab) || EXAMPLES[0];
  const [code, setCode] = useState(selectedExample.code);
  const [rendering, setRendering] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('/cached-receipt.pdf');
  const [astJson, setAstJson] = useState(null);
  const [outputType, setOutputType] = useState('compiled');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSelect = (ex) => {
    setActiveTab(ex.id);
    setCode(ex.code);
  };

  const handleRun = async () => {
    setRendering(true);
    setErrorMsg(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      if (outputType === 'ast') {
        const res = await fetch(PREVIEW_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`API returned HTTP ${res.status}`);
        const json = await res.json();
        setAstJson(json);
      } else {
        const res = await fetch(RENDER_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`API returned HTTP ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("Live API Error:", err);
      if (err.name === 'AbortError') {
        setErrorMsg("API Timeout: The rendering server is cold-starting or unavailable. Please try again in a few moments.");
      } else {
        setErrorMsg(err.message || "Failed to communicate with live API");
      }
    } finally {
      setRendering(false);
    }
  };

  useEffect(() => {
    handleRun();
  }, [activeTab]);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-neutral-900/60 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="font-mono text-xs text-neutral-400 ml-2">DARE Interactive Code Runner (Live API)</span>
        </div>

        <div className="flex items-center gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleSelect(ex)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-all ${
                activeTab === ex.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {ex.name}
            </button>
          ))}
          <button
            onClick={handleRun}
            disabled={rendering}
            className="ml-2 px-4 py-1.5 rounded-md bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          >
            <ZapIcon className="w-3.5 h-3.5 fill-current" />
            <span>{rendering ? 'Compiling...' : 'Run Live API'}</span>
          </button>
        </div>
      </div>

      {/* Grid view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[380px]">
        {/* Left: Code Editor */}
        <div className="p-6 font-mono text-xs text-neutral-200 bg-neutral-950/80 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-2">Input (.dare)</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[500px] bg-transparent resize-none outline-none font-mono text-xs text-white leading-relaxed tracking-wide selection:bg-white selection:text-black"
              spellCheck="false"
            />
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Connected to https://dare-api-server.onrender.com</span>
            <span className="text-green-400">Live API</span>
          </div>
        </div>

        {/* Right: Live API Output Preview */}
        <div className="p-6 bg-black/90 flex flex-col justify-between relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Live API Response Output</span>
            <div className="flex gap-1 bg-neutral-900 p-0.5 rounded border border-white/10">
              <button
                onClick={() => { setOutputType('compiled'); handleRun(); }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  outputType === 'compiled' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => { setOutputType('ast'); handleRun(); }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  outputType === 'ast' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                }`}
              >
                AST JSON
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center border border-dashed border-white/15 rounded-xl overflow-hidden bg-neutral-950/50 min-h-[500px]">
            {rendering ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span className="font-mono text-xs text-neutral-400 animate-pulse">Calling Render API...</span>
              </div>
            ) : errorMsg ? (
              <div className="text-red-400 text-xs font-mono p-4 text-center">
                {errorMsg}
              </div>
            ) : outputType === 'compiled' && pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full min-h-[500px] border-0 rounded-lg"
                title="Rendered PDF Preview"
              />
            ) : astJson ? (
              <pre className="w-full h-full max-h-[500px] overflow-auto text-[10px] font-mono text-green-400 bg-neutral-950 p-4 rounded border border-white/10">
                {JSON.stringify(astJson, null, 2)}
              </pre>
            ) : (
              <div className="text-xs font-mono text-neutral-500">Ready to compile</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
