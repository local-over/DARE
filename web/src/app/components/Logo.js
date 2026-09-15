'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ size = 28, animate = true }) {
    return (
        <motion.div
            initial={animate ? { scale: 0.5, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center gap-2"
        >
            <div className="flex items-center justify-center text-white" style={{ width: size, height: size }}>
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.1" />
                    <text x="50%" y="53%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="60" fontWeight="bold" fontFamily="monospace">
                        {"{}"}
                    </text>
                </svg>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white ml-1">
                DARE
            </span>
        </motion.div>
    );
}
