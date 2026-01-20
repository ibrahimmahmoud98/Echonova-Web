'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CORE_VALUES } from '@/lib/data/about-content';
import { cn } from '@/lib/utils';




export const CoreValues = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-32 px-4 max-w-7xl mx-auto">
            <div className="mb-20 px-4 md:px-0 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">نهج <span className="text-[var(--nova-gold)]">إيكونوڤا</span></h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    المبادئ التي تقود كل قرار نتخذه، من أصغر كود إلى أكبر استراتيجية.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-3 md:gap-4 lg:h-[500px]">
                {CORE_VALUES.map((value) => {
                    const isHovered = hoveredId === value.id;

                    return (
                        <motion.div
                            key={value.id}
                            layout
                            onHoverStart={() => setHoveredId(value.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className={cn(
                                "relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/5 transition-colors duration-500 h-[180px] lg:h-auto",
                                isHovered ? "border-[var(--nova-gold)]/50 bg-white/10" : "bg-white/5 hover:border-white/20"
                            )}
                            style={{
                                flex: isHovered ? 3 : 1, // Only applies in flex mode (desktop)
                            }}
                        >
                            {/* Background Image */}
                            {value.image && (
                                <div className={cn(
                                    "absolute inset-0 transition-all duration-700 ease-out",
                                    isHovered ? "opacity-40 scale-110 grayscale-0" : "opacity-10 grayscale"
                                )}>
                                    <Image 
                                        src={value.image} 
                                        alt={value.title} 
                                        fill 
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </div>
                            )}

                             {/* Background Number */}
                             <span className="absolute top-2 right-4 md:top-4 md:right-6 text-4xl md:text-8xl font-bold text-white/5 select-none pointer-events-none z-10">
                                {value.id}
                            </span>

                            <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                                <motion.h3 
                                    layout="position"
                                    className={cn(
                                        "text-sm md:text-2xl font-bold mb-1 md:mb-2 whitespace-nowrap",
                                        isHovered ? "text-white" : "text-white/70"
                                    )}
                                >
                                    {value.title}
                                </motion.h3>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-[10px] md:text-base text-white/80 leading-relaxed overflow-hidden hidden lg:block"
                                        >
                                            {value.description}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
