'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poster3D } from './Poster3D';
import { ENTERTAINMENT_DATA } from '@/lib/data/services-content';

export const EntertainmentSection = () => {
    const [cinemaMode, setCinemaMode] = useState(false);

    return (
        <section className={cn(
            "relative py-12 md:py-32 transition-colors duration-1000",
            cinemaMode ? "bg-black" : "bg-transparent"
        )}>
            {/* Cinema Mode Overlay */}
            {cinemaMode && (
                <div className="fixed inset-0 bg-black/90 z-40 pointer-events-none animate-in fade-in duration-1000" />
            )}

            <div className="max-w-7xl mx-auto px-4 relative z-50">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-24 gap-4 md:gap-12">
                    <div>
                        <h2 className="text-2xl md:text-6xl font-bold text-white mb-2 md:mb-6">
                            الإنتاج <span className="text-[var(--nova-gold)]">السينمائي</span>
                        </h2>
                        <p className="text-white/60 max-w-lg text-sm md:text-lg leading-relaxed">
                            لا نقوم فقط بوضع منتجك في الفيلم، بل نجعله جزءاً من الحكاية.
                        </p>
                    </div>

                    {/* Toggle Button Removed */}
                </div>

                {/* Posters Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-16">
                    {ENTERTAINMENT_DATA.map((item, idx) => (
                        <div key={item.id} className={cn(
                            "group transition-all duration-700 w-full min-w-0",
                            cinemaMode && idx === 0 ? "md:translate-x-10" : "",
                            cinemaMode && idx === 1 ? "md:-translate-x-10" : ""
                        )}>
                            <Poster3D 
                                src={item.posterImage} 
                                title={item.brandName} 
                            />
                            
                            {/* Narrative Context */}
                            <div className="mt-4 md:mt-8 relative md:pr-8 md:border-r-2 md:border-[var(--nova-gold)]/30 text-center md:text-right">
                                <h4 className="hidden md:block text-[var(--nova-gold)] text-lg font-bold mb-3 tracking-wide">
                                    القصة
                                </h4>
                                <p className="hidden md:block text-white/80 text-base leading-relaxed max-w-sm mb-6">
                                    {item["scriptExcerpt"]}
                                </p>
                                <Link href="/services/cinema" className="inline-block mt-2 md:mt-0">
                                    <button className="px-4 py-2 md:px-8 md:py-4 text-xs md:text-sm rounded-full border border-[var(--color-copper)] text-[var(--color-copper)] hover:bg-[var(--color-copper)] hover:text-white transition-all duration-300 font-bold whitespace-nowrap">
                                        اعرف أكثر
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
