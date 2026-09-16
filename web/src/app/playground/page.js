'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ZapIcon } from '../components/Icons';

const RENDER_API_URL = 'https://dare-api-server.onrender.com/api/render';
const PREVIEW_API_URL = 'https://dare-api-server.onrender.com/api/preview';

const PRESETS = {
  invoice: `@setup {
  format: A4 portrait;
  font: Inter;
  $accent: #000000;
}

@data {
  invoiceNo: "INV-9921",
  client: "Nexus Tech Solutions",
  total: "$8,950.00"
}

@doc {
  [hdr title="INVOICE" subtitle="{{invoiceNo}}"]
  [sp 20]
  [txt text="Billed To: {{client}}" bold="true"]
  [sp 15]
  [tbl headers="Item,Cost" data="Cloud Architecture Consulting,$8950.00"]
  [sp 30]
  [ftr note="Thank you for partnering with us!"]
}`,
  certificate: `@setup {
  format: A4 landscape;
  font: Helvetica;
}

@data {
  recipient: "Jordan Lee",
  course: "Advanced PDF Architecture",
  date: "2026-09-16"
}

@doc {
  [hdr title="CERTIFICATE OF ACHIEVEMENT"]
  [sp 30]
  [txt text="This is presented to {{recipient}}" align="center" size="18"]
  [txt text="For mastering {{course}}" align="center" size="14" color="#71717A"]
  [sp 20]
  [qr text="https://dare-lang.org/verify/9921"]
}`,
};

export default function PlaygroundPage() {
  const [code, setCode] = useState(PRESETS.invoice);
  const [activePreset, setActivePreset] = useState('invoice');
  const [compiling, setCompiling] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [astJson, setAstJson] = useState(null);
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'json'
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePreset = (key) => {
    setActivePreset(key);
    setCode(PRESETS[key]);
  };

  const handleCompile = async () => {
    setCompiling(true);
    setErrorMsg(null);
    try {
      if (viewMode === 'json') {
        const res = await fetch(PREVIEW_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setAstJson(data);
      } else {
        const res = await fetch(RENDER_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (err) {
      console.error("Compile error:", err);
      setErrorMsg(err.message || "Failed to render PDF");
    } finally {
      setCompiling(false);
    }
  };

  useEffect(() => {
    handleCompile();
  }, [activePreset]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-white selection:text-black">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-2xl font-bold font-mono text-white">DARE Interactive Playground</h1>
              <p className="text-xs text-neutral-400">Connected to Live Render API Server (https://dare-api-server.onrender.com)</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-900 p-1 rounded-lg border border-white/10 text-xs font-mono">
                <button
                  onClick={() => handlePreset('invoice')}
                  className={`px-3 py-1 rounded transition-all ${
                    activePreset === 'invoice' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Invoice Template
                </button>
                <button
                  onClick={() => handlePreset('certificate')}
                  className={`px-3 py-1 rounded transition-all ${
                    activePreset === 'certificate' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Certificate Template
                </button>
              </div>

              <button
                onClick={handleCompile}
                disabled={compiling}
                className="px-5 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                <ZapIcon className="w-3.5 h-3.5 fill-current" />
                <span>{compiling ? 'Compiling...' : 'Compile via API'}</span>
              </button>
            </div>
          </div>

          {/* Playground Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
            {/* Left: Code Editor */}
            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Editor (.dare)</span>
                <span className="text-[10px] font-mono text-neutral-500">Live Syntax</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[450px] bg-transparent resize-none outline-none font-mono text-xs text-white leading-relaxed tracking-wide selection:bg-white selection:text-black"
                spellCheck="false"
              />
            </div>

            {/* Right: Render Preview */}
            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Live Render API Output</span>
                <div className="flex gap-1 bg-neutral-900 p-0.5 rounded border border-white/10">
                  <button
                    onClick={() => { setViewMode('pdf'); handleCompile(); }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      viewMode === 'pdf' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    PDF Canvas
                  </button>
                  <button
                    onClick={() => { setViewMode('json'); handleCompile(); }}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      viewMode === 'json' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    AST Output
                  </button>
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-dashed border-white/15 bg-black p-6 flex items-center justify-center overflow-hidden min-h-[450px]">
                {compiling ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span className="font-mono text-xs text-neutral-400 animate-pulse">Compiling PDF on Render Server...</span>
                  </div>
                ) : errorMsg ? (
                  <div className="text-red-400 font-mono text-xs p-4 text-center">{errorMsg}</div>
                ) : viewMode === 'pdf' && pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full min-h-[450px] border-0 rounded-lg"
                    title="Live Render PDF Preview"
                  />
                ) : astJson ? (
                  <pre className="w-full h-full max-h-[450px] overflow-auto text-[10px] font-mono text-green-400 bg-neutral-950 p-4 rounded border border-white/10">
                    {JSON.stringify(astJson, null, 2)}
                  </pre>
                ) : (
                  <div className="text-xs font-mono text-neutral-500">Ready to compile</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
