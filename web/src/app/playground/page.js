'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'json'

  const handlePreset = (key) => {
    setActivePreset(key);
    setCode(PRESETS[key]);
  };

  const handleCompile = () => {
    setCompiling(true);
    setTimeout(() => {
      setCompiling(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-white selection:text-black">
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-2xl font-bold font-mono text-white">DARE Interactive Playground</h1>
              <p className="text-xs text-neutral-400">Edit DARE template source code and test AST PDF compilation live.</p>
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
                className="px-5 py-2 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                {compiling ? 'Compiling...' : '⚡ Compile PDF'}
              </button>
            </div>
          </div>

          {/* Playground Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
            {/* Left: Code Editor */}
            <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Editor (.dare)</span>
                <span className="text-[10px] font-mono text-neutral-500">DARE Syntax v3.0</span>
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
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Compiler Output</span>
                <div className="flex gap-1 bg-neutral-900 p-0.5 rounded border border-white/10">
                  <button
                    onClick={() => setViewMode('pdf')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      viewMode === 'pdf' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    PDF Canvas
                  </button>
                  <button
                    onClick={() => setViewMode('json')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      viewMode === 'json' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    AST Output
                  </button>
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-dashed border-white/15 bg-black p-6 flex items-center justify-center">
                {compiling ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span className="font-mono text-xs text-neutral-400 animate-pulse">Compiling PDF...</span>
                  </div>
                ) : viewMode === 'pdf' ? (
                  <div className="w-full max-w-sm bg-white text-black p-8 rounded shadow-2xl space-y-4 font-sans text-xs border border-neutral-300">
                    <div className="border-b pb-3 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm">
                          {activePreset === 'invoice' ? 'INVOICE' : 'CERTIFICATE OF ACHIEVEMENT'}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono">
                          {activePreset === 'invoice' ? 'INV-9921' : 'Verifiable Document'}
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold">
                        DARE
                      </div>
                    </div>

                    {activePreset === 'invoice' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between font-bold border-b pb-1 text-[11px]">
                          <span>Item</span>
                          <span>Cost</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Cloud Architecture Consulting</span>
                          <span className="font-mono">$8,950.00</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 space-y-2">
                        <div className="text-base font-bold">Presented to Jordan Lee</div>
                        <div className="text-xs text-neutral-500">For mastering Advanced PDF Architecture</div>
                      </div>
                    )}

                    <div className="pt-4 border-t text-[9px] text-neutral-400 flex justify-between">
                      <span>DARE v3.0 PDF Vector Engine</span>
                      <span>Page 1 / 1</span>
                    </div>
                  </div>
                ) : (
                  <pre className="w-full h-full overflow-auto text-[10px] font-mono text-green-400 bg-neutral-950 p-4 rounded border border-white/10">
                    {JSON.stringify(
                      {
                        status: 'compiled',
                        format: activePreset === 'invoice' ? 'A4 portrait' : 'A4 landscape',
                        astNodes: 5,
                        timestamp: new Date().toISOString(),
                      },
                      null,
                      2
                    )}
                  </pre>
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
