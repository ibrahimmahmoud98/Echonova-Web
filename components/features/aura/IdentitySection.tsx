'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IdentityHUD } from './IdentityHUD';
import { VIRTUAL_IDENTITY } from '@/lib/data/services-content';

export const IdentitySection = () => {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background DNA Strand Simulation (CSS Gradient Animation) */}
            <div className="absolute inset-0 opacity-10 flex justify-center gap-12 pointer-events-none">
                 <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--nova-gold)] to-transparent opacity-50" />
                 <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--nova-gold)] to-transparent opacity-30 delay-75" />
                 <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--nova-gold)] to-transparent opacity-20 delay-150" />
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start relative z-10">
                {/* Visual Side (The Model & HUD) */}
                <div className="relative flex justify-center lg:justify-end">
                    {/* Placeholder for Model Image */}
                    <div className="relative w-full max-w-[280px] md:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group md:-translate-x-[-50px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                        
                        {/* Scanning Line */}
                        <motion.div 
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-[var(--nova-gold)] shadow-[0_0_20px_var(--nova-gold)] z-20"
                        />
                        
                        {/* HUD Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-30">
                            <IdentityHUD />
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="text-right space-y-8">
                    {/* Tagline Removed */}
                    
                    <h2 className="text-5xl lg:text-7xl font-bold font-english text-white">
                        {VIRTUAL_IDENTITY.brandName}
                    </h2>
                    
                    <p className="text-xl text-white/70 leading-loose max-w-2xl">
                        {VIRTUAL_IDENTITY.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-4 md:pt-8 text-right">
                        {VIRTUAL_IDENTITY.features.map(feature => (
                            <div key={feature.title} className="bg-white/5 border border-white/5 p-3 md:p-6 rounded-xl md:rounded-2xl hover:bg-white/10 transition-colors group">
                                <h4 className="text-xs md:text-lg font-bold text-white mb-1.5 md:mb-2 group-hover:text-[var(--nova-gold)] transition-colors">{feature.title}</h4>
                                <p className="text-[10px] md:text-sm text-white/50 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 md:pt-8 flex justify-end">
                        <Link href="/services/aura" className="inline-block">
                            <button className="px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base rounded-full border border-[var(--color-copper)] text-[var(--color-copper)] hover:bg-[var(--color-copper)] hover:text-white transition-all duration-300 font-bold">
                                اعرف أكثر
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
