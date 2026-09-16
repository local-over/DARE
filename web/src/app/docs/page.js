'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DocsPage() {
  const sections = [
    { id: 'why', title: '1. Why DARE?' },
    { id: 'structure', title: '2. File Structure' },
    { id: 'setup', title: '3. Setup Block (@setup)' },
    { id: 'data', title: '4. Data Block (@data)' },
    { id: 'doc', title: '5. Layout Tree (@doc)' },
    { id: 'components', title: '6. UI Component Registry' },
    { id: 'styling', title: '7. Styling & Shorthands' },
    { id: 'api', title: '8. REST API Reference' },
    { id: 'cli', title: '9. CLI Reference' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10 space-y-3">
          <h1 className="text-4xl font-extrabold font-mono tracking-tight text-white">DARE Language Documentation</h1>
          <p className="text-neutral-400 text-sm max-w-2xl">
            Complete technical specification, syntax reference, component registry, and API endpoints for the DARE Engine.
          </p>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl border border-white/10 bg-neutral-950/80 space-y-3 font-mono text-xs">
              <h3 className="text-neutral-400 uppercase tracking-widest text-[10px] mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="text-neutral-400 hover:text-white transition-colors block py-1">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Docs Content */}
          <main className="lg:col-span-3 space-y-16">
            {/* Why DARE */}
            <section id="why" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">1. Why DARE?</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                HTML was designed for fluid, responsive web pages—not for static, rigid PDF documents. Using HTML to generate PDFs causes token inefficiency, rendering instability, and non-deterministic layouts.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
                  <div className="font-bold text-white mb-1">Token Economy</div>
                  <p className="text-neutral-400 text-[11px]">Up to 10x fewer tokens than HTML/CSS boilerplate.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
                  <div className="font-bold text-white mb-1">Deterministic Output</div>
                  <p className="text-neutral-400 text-[11px]">Exact dimensions with zero cascading style conflicts.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950">
                  <div className="font-bold text-white mb-1">AI-Native Components</div>
                  <p className="text-neutral-400 text-[11px]">Built with 16 core tags LLMs understand intuitively.</p>
                </div>
              </div>
            </section>

            {/* Structure */}
            <section id="structure" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">2. File Structure</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                A valid DARE file contains three main blocks: `@setup`, `@data` (optional), and `@doc`.
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@setup {
    format: A4 portrait;
    font: Helvetica, Inter;
    $heading: size=20 bold color=primary;
}

@data {
    {
        "title": "Monthly Executive Report",
        "author": "Alice"
    }
}

@doc {
    page {
        box(p=20) {
            txt($heading) { {{ title }} }
        }
    }
}`}
              </pre>
            </section>

            {/* Setup */}
            <section id="setup" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">3. Setup Block (@setup)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Defines page format (`A4 portrait`, `A5 landscape`, or custom dimensions like `500 500`), font family imports, and reusable style variables starting with `$`.
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@setup {
    format: A4 portrait;
    font: Inter, Arial;
    $brand_color: color=#000000;
    $card_style: p=15 bg=surface border borderColor=border;
}`}
              </pre>
            </section>

            {/* Data */}
            <section id="data" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">4. Data Block (@data)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Embeds JSON data or references an external JSON source. Dynamic values are injected using double curly braces ({'{{path.to.var}}'}).
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@data {
    {
        "user": "Alice",
        "orders": [
            {"id": 1, "total": 100},
            {"id": 2, "total": 250}
        ]
    }
}`}
              </pre>
            </section>

            {/* Doc Tree */}
            <section id="doc" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">5. Layout Tree (@doc)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                The layout tree contains pages, containers, charts, and content nodes. Every DARE file MUST contain a `@doc {'{ ... }'}` block.
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@doc {
    page(bg=white) {
        box(row gap=10 p=20) {
            txt(size=18 bold) { Invoice for {{ user }} }
        }
    }
}`}
              </pre>
            </section>

            {/* Components */}
            <section id="components" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">6. UI Component Registry</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">page</div>
                  <p className="text-neutral-400 text-[11px]">Creates a new PDF page container (bg, format).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">box</div>
                  <p className="text-neutral-400 text-[11px]">Flexible container (`row` flag, `gap`, `p`, `m`, `bg`, `border`).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">cols</div>
                  <p className="text-neutral-400 text-[11px]">Multi-column grid layout (`n` columns, `gap`).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">tbl</div>
                  <p className="text-neutral-400 text-[11px]">Data table generator (`headers="A,B"`, `data="1,2"`).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">bar / pie / line</div>
                  <p className="text-neutral-400 text-[11px]">Vector charts (`data="10,20"`, `labels="Q1,Q2"`).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">qr</div>
                  <p className="text-neutral-400 text-[11px]">Vector QR code generator (`data="url"`, `w`, `h`).</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">each / if</div>
                  <p className="text-neutral-400 text-[11px]">Loop iterations and conditional rendering blocks.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">sp / line / hr</div>
                  <p className="text-neutral-400 text-[11px]">Vertical spacers and horizontal rule dividers.</p>
                </div>
              </div>
            </section>

            {/* Styling */}
            <section id="styling" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">7. Styling & Shorthands</h2>
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-neutral-300 space-y-2">
                <div>• Spacing: `p`, `pt`, `pb`, `pl`, `pr`, `m`, `mt`, `mb`, `ml`, `mr`, `gap`</div>
                <div>• Sizing: `w`, `h`, `size` (supports `px`, `mm`, or raw numbers)</div>
                <div>• Palette: `white`, `black`, `primary`, `secondary`, `surface`, `border`, `muted`</div>
                <div>• Typography Flags: `bold`, `italic`, `uppercase`</div>
              </div>
            </section>

            {/* API */}
            <section id="api" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">8. REST API Reference</h2>
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-black font-bold">POST</span>
                    <span className="text-white font-bold">/api/render</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Compiles DARE code string into inline PDF binary.</p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-black font-bold">POST</span>
                    <span className="text-white font-bold">/api/preview</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Compiles DARE code payload into AST JSON representation.</p>
                </div>
              </div>
            </section>

            {/* CLI */}
            <section id="cli" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">9. CLI Reference</h2>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-neutral-200">
{`# Compile .dare file to PDF
$ npx dare compile input.dare -o output.pdf

# Start local server instance
$ node server.js`}
              </pre>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
