'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ZapIcon, ArrowRightIcon } from '../components/Icons';

export default function SkillsPage() {
  const skills = [
    {
      id: 'ui-ux-pro-max',
      name: 'UI/UX Pro Max Skill',
      handle: 'nextlevelbuilder/ui-ux-pro-max-skill',
      command: '/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill\n/plugin install ui-ux-pro-max@ui-ux-pro-max-skill',
      desc: 'Strict heuristic framework to prevent AI UI slop and enforce world-class typography, monochrome themes, and sleek micro-interactions.',
      badge: 'POPULAR',
    },
    {
      id: 'dare-engine',
      name: 'DARE Engine Skill',
      handle: 'dare-engine/dare-engine-skill',
      command: '/plugin install dare-engine',
      desc: 'Equips AI agents with native DARE PDF generation syntax, AST compilation, and live PDF rendering capability.',
      badge: 'OFFICIAL',
    },
    {
      id: 'pdf-qa-auditor',
      name: 'PDF QA Auditor Skill',
      handle: 'dare-engine/pdf-qa-auditor',
      command: '/plugin install pdf-qa-auditor',
      desc: 'Automated document QA skill that inspects rendered PDF page dimensions, layout margins, font embedding, and vector alignment.',
      badge: 'UTILITY',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-mono tracking-tight text-white">
            DARE AI Skills
          </h1>
          <p className="text-neutral-400 text-base leading-relaxed">
            Supercharge your AI coding assistant with official DARE Skills. Enable agents to generate, audit, and design vector PDFs directly inside your conversation context.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {skills.map((s) => (
            <div
              key={s.id}
              className="p-8 rounded-2xl border border-white/10 bg-neutral-950 flex flex-col justify-between hover:border-white/30 transition-all duration-300 space-y-6 shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/10 text-white border border-white/10">
                    {s.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">{s.handle}</span>
                </div>

                <h3 className="text-xl font-bold font-mono text-white">{s.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Install Plugin Command</span>
                <pre className="p-3 rounded-xl bg-black border border-white/10 font-mono text-[11px] text-green-400 overflow-x-auto whitespace-pre-wrap">
                  {s.command}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* How Skills Work */}
        <div className="p-10 rounded-3xl border border-white/10 bg-neutral-950/60 max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold font-mono text-white">How Agent Skills Work</h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mx-auto">
            DARE Skills provide structured SKILL.md rules, helper tools, and reference documentation that automatically trigger when your AI assistant works on document layout and PDF generation tasks.
          </p>
          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 bg-white text-black font-mono text-xs font-bold gap-2 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <ZapIcon className="w-4 h-4 fill-current" />
            <span>Equip Skills in your AI Agent Workspace</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
