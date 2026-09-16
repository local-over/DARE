'use client';

import { useState } from 'react';
import { ZapIcon } from './Icons';

const EXAMPLES = [
  {
    id: 'invoice',
    name: 'Invoice Template',
    code: `@setup {
  format: A4 portrait;
  font: Helvetica, Inter;
  $accent: #000000;
  $border: #E4E4E7;
}

@data {
  invoiceNumber: "INV-2026-889",
  client: "Acme Corp",
  amount: "$12,450.00",
  date: "2026-09-16"
}

@doc {
  [hdr title="TAX INVOICE" subtitle="{{invoiceNumber}}"]
  [sp 20]
  [tbl headers="Description,Qty,Total" data="Enterprise License,1,$12450.00"]
  [sp 30]
  [ftr note="Thank you for your business!"]
}`,
  },
  {
    id: 'badge',
    name: 'Event Badge',
    code: `@setup {
  format: A5 portrait;
  font: Inter;
}

@data {
  name: "Alex Vance",
  role: "Lead Architect",
  access: "VIP - FULL PASS"
}

@doc {
  [hdr title="BUILDER CONF 2026"]
  [sp 40]
  [txt text="{{name}}" align="center" size="24" bold="true"]
  [txt text="{{role}}" align="center" size="14" color="#71717A"]
  [sp 20]
  [badge text="{{access}}" color="#000000"]
  [qr text="https://dare-lang.org/verify/889"]
}`,
  },
];

export default function CodeRunner() {
  const [activeTab, setActiveTab] = useState(EXAMPLES[0].id);
  const selectedExample = EXAMPLES.find((ex) => ex.id === activeTab) || EXAMPLES[0];
  const [code, setCode] = useState(selectedExample.code);
  const [rendering, setRendering] = useState(false);
  const [outputType, setOutputType] = useState('compiled');

  const handleSelect = (ex) => {
    setActiveTab(ex.id);
    setCode(ex.code);
  };

  const handleRun = () => {
    setRendering(true);
    setTimeout(() => {
      setRendering(false);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 bg-neutral-900/60 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="font-mono text-xs text-neutral-400 ml-2">DARE Interactive Code Runner</span>
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
            <span>{rendering ? 'Compiling...' : 'Run Code'}</span>
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
              className="w-full h-[300px] bg-transparent resize-none outline-none font-mono text-xs text-white leading-relaxed tracking-wide selection:bg-white selection:text-black"
              spellCheck="false"
            />
          </div>
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
            <span>Direct AST Vector Compilation</span>
            <span>Zero Runtime Latency</span>
          </div>
        </div>

        {/* Right: Simulated Preview */}
        <div className="p-6 bg-black/90 flex flex-col justify-between relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Compiled Output Preview</span>
            <div className="flex gap-1 bg-neutral-900 p-0.5 rounded border border-white/10">
              <button
                onClick={() => setOutputType('compiled')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  outputType === 'compiled' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setOutputType('ast')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  outputType === 'ast' ? 'bg-white text-black font-bold' : 'text-neutral-400'
                }`}
              >
                AST JSON
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center border border-dashed border-white/15 rounded-xl p-6 bg-neutral-950/50">
            {rendering ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span className="font-mono text-xs text-neutral-400 animate-pulse">Compiling DARE AST...</span>
              </div>
            ) : outputType === 'compiled' ? (
              <div className="w-full max-w-sm bg-white text-black p-6 rounded shadow-2xl font-sans text-xs space-y-4 border border-neutral-300 transform hover:scale-[1.02] transition-transform">
                <div className="border-b border-neutral-300 pb-3 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm tracking-tight text-neutral-900">
                      {activeTab === 'invoice' ? 'TAX INVOICE' : 'BUILDER CONF 2026'}
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                      {activeTab === 'invoice' ? 'INV-2026-889' : 'VIP - FULL PASS'}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center font-bold text-[8px]">
                    DARE
                  </div>
                </div>

                {activeTab === 'invoice' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] text-neutral-600 border-b pb-1 font-semibold">
                      <span>Description</span>
                      <span>Total</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Enterprise License</span>
                      <span className="font-mono">$12,450.00</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-1">
                    <div className="text-base font-bold">Alex Vance</div>
                    <div className="text-xs text-neutral-500">Lead Architect</div>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-200 text-[9px] text-neutral-400 flex justify-between items-center">
                  <span>Generated by DARE Vector Engine</span>
                  <span className="font-mono">Page 1 / 1</span>
                </div>
              </div>
            ) : (
              <pre className="w-full max-h-[260px] overflow-auto text-[10px] font-mono text-green-400 bg-neutral-950 p-4 rounded border border-white/10">
                {JSON.stringify(
                  {
                    format: 'A4',
                    orientation: 'portrait',
                    ast: [
                      { tag: 'hdr', props: { title: 'TAX INVOICE', subtitle: 'INV-2026-889' } },
                      { tag: 'sp', props: { height: 20 } },
                      { tag: 'tbl', props: { headers: ['Description', 'Qty', 'Total'] } },
                    ],
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
  );
}
