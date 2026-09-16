'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <Logo size="small" animated={false} />
            <span className="font-mono text-xl font-bold tracking-widest text-white">DARE</span>
          </div>
          <p className="text-neutral-400 text-sm max-w-sm">
            Declarative Document & PDF Engine. Fast, vector-precise PDF generation built for modern AI agents and developer workflows.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-neutral-400 font-mono">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/playground" className="hover:text-white transition-colors">Playground</Link></li>
            <li><Link href="/skills" className="hover:text-white transition-colors">AI Skills</Link></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-neutral-400 font-mono">
            <li><a href="https://github.com/local-over/DARE" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="/docs#cli" className="hover:text-white transition-colors">CLI Package</a></li>
            <li><a href="#donations" className="hover:text-white transition-colors">Sponsor & Donate</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-mono gap-4">
        <span>© {new Date().getFullYear()} DARE Engine. Open Source MIT License.</span>
        <span>Built with Precision & High Contrast Monochrome Design.</span>
      </div>
    </footer>
  );
}
