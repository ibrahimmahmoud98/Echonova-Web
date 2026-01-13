'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ServicesHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[var(--cinematic-bg)] z-0" />
            
            {/* Animated Spotlights */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--nova-gold)]/20 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--nova-purple)]/10 blur-[150px] rounded-full" />

            {/* Content */}
            <motion.div 
                style={{ y, opacity }} 
                className="relative z-10 text-center px-4"
            >
                <motion.h1 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6"
                >
                    ما وراء <br />
                    <span className="text-[var(--nova-gold)]">الخيال</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light"
                >
                    استكشف عوالماً لم يسبق لها مثيل، حيث تندمج التقنية بالفن السينمائي.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs tracking-widest text-white/40">مرر لاكتشاف المزيد</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
};
