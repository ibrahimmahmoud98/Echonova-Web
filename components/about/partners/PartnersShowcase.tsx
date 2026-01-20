'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS_DATA, PARTNERS_INTRO } from '@/lib/data/about-content';
import Image from 'next/image';

export const PartnersShowcase = () => {
    return (
        <section className="py-12 md:py-32 px-4 border-t border-white/5 bg-black/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-20 max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-8">
                        {PARTNERS_INTRO.title}
                    </h2>
                    <p className="text-white/70 leading-relaxed text-sm md:text-lg">
                        {PARTNERS_INTRO.description}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
                    {PARTNERS_DATA.map((partner, idx) => (
                        <motion.div
                            key={partner.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative h-[180px] md:h-[400px] rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 overflow-hidden"
                        >
                            {/* Background Image */}
                            {partner.image && (
                                <>
                                    <Image 
                                        src={partner.image} 
                                        alt={partner.name} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-20"
                                    />
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-colors duration-500" />
                                </>
                            )}


                            {/* Static Content (Visible by default) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-500 group-hover:scale-95 group-hover:opacity-0">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[var(--nova-gold)]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700" />
                                
                                {/* Logo */}
                                <div className="relative z-10 w-20 h-20 md:w-40 md:h-40 mb-3 md:mb-6 flex items-center justify-center px-2 md:px-4">
                                     {partner.logo ? (
                                        <Image 
                                            src={partner.logo} 
                                            alt={`${partner.name} Logo`} 
                                            width={160} 
                                            height={160} 
                                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        />
                                     ) : (
                                        <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-white/20 text-2xl md:text-4xl font-bold">
                                            {partner.name.charAt(0)}
                                        </div>
                                     )}
                                </div>

                                <h3 className="text-sm md:text-2xl font-bold text-white text-center mb-1 md:mb-2 drop-shadow-lg">
                                    {partner.name}
                                </h3>
                                <p className="text-[10px] md:text-base text-[var(--nova-gold)] text-center font-medium drop-shadow-md">
                                    {partner.role}
                                </p>
                            </div>

                            {/* Hover Overlay (Details) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80 flex flex-col items-center justify-center p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <h3 className="text-sm md:text-xl font-bold text-[var(--nova-gold)] mb-2 md:mb-4 text-center">
                                    {partner.name}
                                </h3>
                                <div className="w-8 h-1 md:w-12 bg-white/10 mb-2 md:mb-6 rounded-full" />
                                <p className="text-white/90 text-center leading-relaxed text-[10px] md:text-base whitespace-pre-line hidden md:block">
                                    {partner.description}
                                </p>
                                <p className="text-white/90 text-center leading-relaxed text-[10px] whitespace-pre-line md:hidden line-clamp-4">
                                    {partner.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
