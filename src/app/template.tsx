"use client";
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            {children}
            <motion.div
                className="absolute top-0 left-0 w-full h-screen bg-primary-foreground origin-bottom z-20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="absolute top-0 left-0 w-full h-screen bg-primary-foreground origin-top z-20"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
        </AnimatePresence>
    )
}

export default Template;