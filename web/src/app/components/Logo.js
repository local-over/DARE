'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Logo({ size = 28, animate = true }) {
    return (
        <motion.div
            initial={animate ? { scale: 0.5, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center gap-2.5"
        >
            <div
                style={{ width: size, height: size }}
                className="rounded-full bg-white flex items-center justify-center relative"
            >
                <div
                    style={{ width: size * 0.35, height: size * 0.35 }}
                    className="rounded-full bg-black"
                />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white">
                DARE
            </span>
        </motion.div>
    );
}
