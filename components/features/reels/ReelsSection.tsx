'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMERCIAL_LEVELS } from '@/lib/data/services-content';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const ReelsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeLevel = COMMERCIAL_LEVELS[activeIndex];

    return (
        <section className="relative h-screen min-h-[800px] bg-black text-white overflow-hidden flex flex-col justify-center">
            
            {/* Background Gradient / Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeLevel.colorTheme} opacity-10 transition-colors duration-1000`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full pb-32">
                
                {/* Text Content */}
                <div className="order-2 md:order-1 flex flex-col items-start md:items-end text-right md:pr-12">
                    
                    <motion.div
                        key={activeLevel.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className="space-y-6 md:space-y-8"
                    >
                        {/* Header Tag - English Removed */}
                        {/* Header Tag Removed */}
                        <div className="hidden" />

                        {/* Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none">
                            {activeLevel.brandName.split(' ').map((word, i) => (
                                <span key={i} className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                    {word}
                                </span>
                            ))}
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-white/80 max-w-xl font-light leading-relaxed font-arabic" dir="rtl">
                            {activeLevel.description}
                        </p>

                        {/* CTA - Adjusted Position */}
                        <div className="flex items-center justify-end gap-6 pt-8 -mb-4 relative z-20">
                             {/* Decorative Circle Removed */}
                             <div className="hidden" />

                            <Link href="/contact">
                                <button className="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-sm">
                                    <span className="font-bold tracking-wide">اعرف اكثر</span>
                                    <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </button>
                            </Link>

                        </div>
                    </motion.div>

                </div>

                {/* Visual/Image Side */}
                <div className="order-1 md:order-2 relative h-[50vh] md:h-auto md:aspect-square flex items-center justify-center">
                     <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeLevel.id}
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full h-full max-h-[600px] max-w-[600px]"
                        >
                            {/* ... Content ... */}
                            <div className={`absolute inset-0 bg-gradient-to-tr ${activeLevel.colorTheme} opacity-20 blur-[100px] rounded-full`} />
                            
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
                                 {activeLevel.gallery && activeLevel.gallery[0] ? (
                                     <Image 
                                        src={activeLevel.gallery[0]}
                                        alt={activeLevel.brandName}
                                        fill
                                        className="object-cover"
                                        priority
                                     />
                                 ) : (
                                     <div className="w-full h-full flex items-center justify-center bg-white/5">
                                         <span className="text-white/20">No Image Preview</span>
                                     </div>
                                 )}
                                 
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer hover:bg-black/10 transition-colors">
                                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                         <Play className="w-8 h-8 text-white fill-white ml-1" />
                                     </div>
                                 </div>
                            </div>
                        </motion.div>
                     </AnimatePresence>
                </div>
            </div>

            {/* Bottom Navigation - Sliding Tabs (Fixed Layout) */}
            <div className="absolute bottom-12 left-0 w-full z-20">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="relative flex items-center p-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full w-full max-w-3xl">
                        
                        {/* Buttons with shared layoutId for sliding effect */}
                        {COMMERCIAL_LEVELS.map((level, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={level.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={cn(
                                        "relative flex-1 h-20 rounded-full flex items-center justify-center gap-4 transition-colors duration-300 z-10",
                                        isActive ? "text-black" : "text-white/50 hover:text-white"
                                    )}
                                >
                                    {/* Active Slider Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSlide"
                                            className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border transition-colors",
                                            isActive ? "bg-black text-white border-black" : "bg-white/10 text-white/50 border-white/10"
                                        )}>
                                            {isActive ? (
                                                <div className="w-2 h-2 bg-[var(--nova-gold)] rounded-full animate-pulse" />
                                            ) : (
                                                <span>0{idx + 1}</span>
                                            )}
                                        </div>
                                        
                                        <span className="font-bold uppercase tracking-tight text-lg md:text-xl">
                                            {level.brandName}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

        </section>
    );
};
