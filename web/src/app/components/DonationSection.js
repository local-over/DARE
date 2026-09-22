'use client';

import { useState } from 'react';
import { HeartIcon, CoffeeIcon, ShieldIcon, ArrowRightIcon } from './Icons';

export default function DonationSection() {
  const [copied, setCopied] = useState(null);

  const cryptoWallets = [
    { name: 'USDT (TON Network)', address: 'UQBEJwLa4EGPRmUKw4O1i9d_JjJGmjkJ2myqR5lborzgceT-' }
  ];

  const handleCopy = (text, name) => {
    if (text === 'COMING SOON') return;
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="donations" className="w-full py-20 border-t border-white/10 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
            Fuel the Future of DARE
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            DARE is 100% free, open-source software built for developers, AI agents, and document automation. Your contributions help maintain core engine development, edge infrastructure, and AI Skill packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* GitHub Sponsors */}
          <div className="p-8 rounded-2xl border border-white/10 bg-black/80 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <HeartIcon className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">GitHub Sponsors</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sponsor DARE directly on GitHub to support ongoing core engine development and release builds.
              </p>
            </div>
            <button
              disabled
              className="mt-8 w-full py-2.5 rounded-xl bg-neutral-800 text-neutral-500 font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed"
            >
              <span>Coming Soon</span>
            </button>
          </div>

          {/* Buy Me a Coffee */}
          <div className="p-8 rounded-2xl border border-white/10 bg-black/80 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <CoffeeIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">Buy Us a Coffee</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                One-time quick support for developer coffee and server test instances.
              </p>
            </div>
            <button
              disabled
              className="mt-8 w-full py-2.5 rounded-xl bg-neutral-800 text-neutral-500 font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-not-allowed border border-white/5"
            >
              <span>Coming Soon</span>
            </button>
          </div>

          {/* Crypto Supporters */}
          <div className="p-8 rounded-2xl border border-white/10 bg-black/80 flex flex-col justify-between hover:border-white/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <ShieldIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">Crypto Donations</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct decentralized support via cryptocurrency wallet addresses.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              {cryptoWallets.map((w) => (
                <button
                  key={w.name}
                  onClick={() => handleCopy(w.address, w.name)}
                  className="w-full text-left p-2.5 rounded bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between font-mono text-[10px]"
                >
                  <span className="text-neutral-300">{w.name}</span>
                  <span className="text-white font-bold">{copied === w.name ? 'Copied! ✓' : 'Copy'}</span>
                </button>
              ))}
              <div className="text-center pt-2 text-[10px] font-mono text-neutral-500">Other Cryptocurrencies: COMING SOON</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
