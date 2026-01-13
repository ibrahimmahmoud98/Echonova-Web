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
            "relative py-32 transition-colors duration-1000",
            cinemaMode ? "bg-black" : "bg-transparent"
        )}>
            {/* Cinema Mode Overlay */}
            {cinemaMode && (
                <div className="fixed inset-0 bg-black/90 z-40 pointer-events-none animate-in fade-in duration-1000" />
            )}

            <div className="max-w-7xl mx-auto px-4 relative z-50">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            الإنتاج <span className="text-[var(--nova-gold)]">السينمائي</span>
                        </h2>
                        <p className="text-white/60 max-w-lg text-lg leading-relaxed">
                            لا نقوم فقط بوضع منتجك في الفيلم، بل نجعله جزءاً من الحكاية.
                        </p>
                    </div>

                    {/* Toggle Button Removed */}
                </div>

                {/* Posters Grid */}
                <div className="grid md:grid-cols-2 gap-16">
                    {ENTERTAINMENT_DATA.map((item, idx) => (
                        <div key={item.id} className={cn(
                            "group transition-all duration-700 max-w-sm mx-auto w-full",
                            cinemaMode && idx === 0 ? "md:translate-x-10" : "",
                            cinemaMode && idx === 1 ? "md:-translate-x-10" : ""
                        )}>
                            <Poster3D 
                                src={item.posterImage} 
                                title={item.brandName} 
                            />
                            
                            {/* Narrative Context */}
                            <div className="mt-8 relative pr-8 border-r-2 border-[var(--nova-gold)]/30">
                                <h4 className="text-[var(--nova-gold)] text-lg font-bold mb-3 tracking-wide">
                                    القصة
                                </h4>
                                <p className="text-white/80 text-base leading-relaxed max-w-sm mb-6">
                                    {item["scriptExcerpt"]}
                                </p>
                                <Link href="/services/cinema" className="inline-flex items-center gap-2 text-[var(--color-copper)] hover:text-white transition-colors group/link">
                                    <span className="text-sm font-bold border-b border-[var(--color-copper)] pb-1 group-hover/link:border-white">
                                        اعرف أكثر
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
