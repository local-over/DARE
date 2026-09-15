'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Logo from './Logo';

const NAV_ITEMS = [
    { href: '/playground', label: 'Playground' },
    { href: '/docs', label: 'Docs' },
    { href: '/skills', label: 'Skills' },
];

export default function Nav() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 bg-[#000000] border-b border-[#27272A]"
        >
            <Link href="/" className="flex items-center">
                <Logo size={22} animate={false} />
            </Link>

            <div className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative px-3.5 py-1.5 text-[13px] font-medium transition-colors"
                            style={{ color: isActive ? '#FAFAFA' : '#A1A1AA' }}
                        >
                            {item.label}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#FAFAFA]"
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                                />
                            )}
                        </Link>
                    );
                })}
                <a
                    href="https://github.com/local-over/DARE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 px-3.5 py-1.5 text-[13px] font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                >
                    GitHub
                </a>
            </div>
        </motion.nav>
    );
}
