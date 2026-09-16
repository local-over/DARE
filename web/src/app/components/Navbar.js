'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ArrowRightIcon } from './Icons';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Playground', href: '/playground' },
    { name: 'Skills', href: '/skills' },
    { name: 'Docs', href: '/docs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size="medium" animated={true} />
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-widest text-white group-hover:text-neutral-300 transition-colors">
              DARE
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider">DOCUMENT ENGINE</span>
          </div>
        </Link>

        {/* Navigation Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-950 p-1 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/local-over/DARE"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white border border-white/10 hover:border-white/30 transition-all"
          >
            GitHub
          </a>
          <Link
            href="/playground"
            className="px-4 py-2 rounded-full text-xs font-mono font-medium text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <span>Playground</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
