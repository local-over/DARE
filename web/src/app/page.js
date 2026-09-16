'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Logo from './components/Logo';
import CodeRunner from './components/CodeRunner';
import DonationSection from './components/DonationSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          {/* Logo with Swush entrance animation */}
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer animate-[bounce_4s_infinite]">
              <Logo size="xl" animated={true} />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/20 text-xs font-mono text-neutral-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            DARE Engine v3.0 Released • Vector AST Direct Architecture
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Declarative Document <br />
            <span className="bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
              & Vector PDF Engine
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Write clean DARE code and compile vector-precise PDFs instantly. Designed for developers, automated workflows, and AI agent skills.
          </p>

          {/* 3 Main Action Buttons + Docs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/skills"
              className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105"
            >
              ⚡ Explore AI Skills
            </Link>
            <Link
              href="/playground"
              className="px-6 py-3 rounded-full bg-neutral-900 text-white border border-white/20 font-mono text-xs font-medium hover:bg-neutral-800 hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              🎮 Open Playground
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-full bg-neutral-900 text-neutral-300 border border-white/10 font-mono text-xs font-medium hover:text-white hover:bg-neutral-800 transition-all duration-300"
            >
              📖 Documentation
            </Link>
          </div>
        </div>

        {/* Code Runner Preview Container */}
        <div className="max-w-6xl mx-auto mt-16 relative z-10">
          <CodeRunner />
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-20 border-t border-white/10 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-mono text-white">What's New in DARE v3</h2>
            <p className="text-neutral-400 text-sm">Engineered for zero-latency AST compilation & AI Skill integration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4 hover:border-white/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-mono text-white font-bold">
                01
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Native AST PDF Compiler</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct vector PDF generation via `pdf-lib` AST compilation. Zero browser overhead, zero latency.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4 hover:border-white/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-mono text-white font-bold">
                02
              </div>
              <h3 className="text-lg font-bold font-mono text-white">AI Agent Skills Protocol</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Seamless agent integration. Equip AI assistants with official DARE PDF generation skills in seconds.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 bg-black/60 space-y-4 hover:border-white/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-mono text-white font-bold">
                03
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Dynamic `@data` Engine</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Implicit variable interpolation with mustache string syntax {'{{variable}}'} and JSON data binding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Install Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-bold font-mono text-white">Install & Run DARE</h2>
          <div className="p-6 rounded-2xl border border-white/15 bg-neutral-950 font-mono text-left space-y-4 shadow-2xl">
            <div className="text-xs text-neutral-500 uppercase tracking-widest">CLI Installation</div>
            <div className="flex items-center justify-between bg-black p-4 rounded-xl border border-white/10 text-xs text-neutral-200">
              <code>$ npm install -g dare-lang</code>
              <span className="text-neutral-500 text-[10px]">npm package</span>
            </div>
            <div className="flex items-center justify-between bg-black p-4 rounded-xl border border-white/10 text-xs text-neutral-200">
              <code>$ npx dare compile document.dare -o output.pdf</code>
              <span className="text-neutral-500 text-[10px]">npx quick compile</span>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <DonationSection />

      <Footer />
    </div>
  );
}
