'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { MANIFESTO_TEXT } from '@/lib/data/about-content';
import { cn } from '@/lib/utils';

const ManifestoLine = ({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) => {
    // Each line appears at a specific range of the scroll
    const step = 0.1; // Duration of each line
    const start = index * step;
    
    // Fade in (0 to 1) -> Stay (1) -> Fade out (1 to 0)
    const fadeInEnd = start + 0.02;
    const fadeOutStart = start + 0.08;
    const end = start + 0.1;

    // Use clamp: true to ensure opacity doesn't drift outside these bounds
    const opacity = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0], { clamp: true });
    
    const y = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [20, 0, 0, -20], { clamp: true });
    const scale = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0.9, 1, 1, 1.1], { clamp: true });
    const blur = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], ["4px", "0px", "0px", "4px"], { clamp: true });

    return (
        <motion.p 
            style={{ opacity, y, scale, filter: blur as unknown as string }}
            className={cn(
                "text-4xl md:text-6xl font-bold leading-tight transition-colors duration-500 text-center",
                index % 2 === 0 ? "text-white" : "text-[var(--nova-gold)]"
            )}
        >
            {text}
        </motion.p>
    );
};

export const Manifesto = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 0.5]);

    return (
        <section ref={containerRef} className="relative min-h-[450vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Dynamic Background */}
                <motion.div 
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--nova-gold)]/10 to-transparent pointer-events-none" 
                />
                
                {/* Text Container */}
                <div className="relative z-10 w-full max-w-4xl h-40 flex items-center justify-center px-4">
                    {MANIFESTO_TEXT.map((line, idx) => (
                        <div key={idx} className="absolute inset-0 flex items-center justify-center">
                            <ManifestoLine 
                                text={line} 
                                index={idx} 
                                progress={scrollYProgress} 
                            />
                        </div>
                    ))}
                </div>
                
                {/* Scroll Indicator - Positioned relative to text now */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="mt-12 translate-y-[10px] text-white/30 text-xs tracking-widest animate-pulse"
                >
                    مرر للاسفل لتعرف قصتنا
                </motion.div>
            </div>
        </section>
    );
};
