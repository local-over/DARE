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
            <div className="flex items-center justify-center font-mono font-bold text-white" style={{ fontSize: size }}>
                {`{}`}
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white ml-1">
                DARE
            </span>
        </motion.div>
    );
}
