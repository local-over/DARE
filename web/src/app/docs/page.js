'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DocsPage() {
  const sections = [
    { id: 'overview', title: '1. Overview & Architecture' },
    { id: 'setup', title: '2. Setup Directive (@setup)' },
    { id: 'data', title: '3. Data Directive (@data)' },
    { id: 'doc', title: '4. Document Body (@doc)' },
    { id: 'components', title: '5. UI Components' },
    { id: 'api', title: '6. API & Server Reference' },
    { id: 'cli', title: '7. CLI Reference' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-white/10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
            📖 Official Documentation
          </div>
          <h1 className="text-4xl font-extrabold font-mono tracking-tight text-white">DARE Language Specification</h1>
          <p className="text-neutral-400 text-sm max-w-2xl">
            Complete syntax reference, compiler directives, component library, and API endpoints for DARE v3.0.
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
            {/* Overview */}
            <section id="overview" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">1. Overview & Architecture</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                DARE (Declarative Document & PDF Engine) compiles structured human-readable template text directly into PDF vector binaries.
              </p>
              <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-neutral-300">
                DARE Code → Parser → AST → pdf-lib Direct Renderer → Vector PDF Binary
              </div>
            </section>

            {/* Setup */}
            <section id="setup" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">2. Setup Directive (@setup)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                The `@setup` block defines global document properties such as page orientation, format size, custom font declarations, and reusable style variables.
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@setup {
  format: A4 portrait;
  font: Helvetica, Inter;
  $accentColor: #000000;
  $mutedColor: #71717A;
}`}
              </pre>
            </section>

            {/* Data */}
            <section id="data" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">3. Data Directive (@data)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                The `@data` block binds dynamic variables and JSON state into template mustache placeholders ({'{{key}}'}).
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@data {
  clientName: "Acme Corporation",
  amountDue: "$4,500.00",
  dueDate: "2026-10-01"
}`}
              </pre>
            </section>

            {/* Doc Body */}
            <section id="doc" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">4. Document Body (@doc)</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                The `@doc` block contains the layout hierarchy. Components are enclosed in brackets `[component_name attr="value"]`.
              </p>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-green-400">
{`@doc {
  [hdr title="INVOICE" subtitle="Due: {{dueDate}}"]
  [sp 20]
  [txt text="Billed to: {{clientName}}" bold="true"]
  [sp 10]
  [tbl headers="Item,Cost" data="Service A,$4500.00"]
  [ftr note="Payment due within 30 days"]
}`}
              </pre>
            </section>

            {/* UI Components */}
            <section id="components" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">5. UI Component Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[hdr] - Header</div>
                  <p className="text-neutral-400 text-[11px]">Renders document header with title, subtitle, and logo.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[ftr] - Footer</div>
                  <p className="text-neutral-400 text-[11px]">Renders footer with page note and divider.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[tbl] - Table</div>
                  <p className="text-neutral-400 text-[11px]">Renders structured data table with headers and row data.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[qr] - QR Code</div>
                  <p className="text-neutral-400 text-[11px]">Generates inline vector QR code from URL or text payload.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[badge] - Badge</div>
                  <p className="text-neutral-400 text-[11px]">Renders styled status or category badge.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="text-white font-bold">[sp] - Spacer</div>
                  <p className="text-neutral-400 text-[11px]">Adds vertical spacing offset in pixels.</p>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">6. API Reference</h2>
              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-black font-bold">POST</span>
                    <span className="text-white font-bold">/api/render</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Compiles DARE code payload into inline PDF binary.</p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-black font-bold">POST</span>
                    <span className="text-white font-bold">/api/preview</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Compiles DARE code payload into AST JSON representation.</p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-neutral-950 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold">GET</span>
                    <span className="text-white font-bold">/api/health</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">Returns engine status object {'{ status: "ok" }'}.</p>
                </div>
              </div>
            </section>

            {/* CLI Reference */}
            <section id="cli" className="space-y-4">
              <h2 className="text-2xl font-bold font-mono text-white border-b border-white/10 pb-3">7. CLI Commands</h2>
              <pre className="p-4 rounded-xl border border-white/10 bg-neutral-950 font-mono text-xs text-neutral-200">
{`# Compile a .dare file to PDF
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
