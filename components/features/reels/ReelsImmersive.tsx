"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMERCIAL_LEVELS } from "@/lib/data/services-content";
import Image from "next/image";
import { Maximize2, X, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ReelsImmersive = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const activeLevel = COMMERCIAL_LEVELS[activeIndex];

  return (
    <div className="relative w-full h-screen max-h-[1080px] overflow-hidden bg-black flex flex-col font-sans selection:bg-[var(--nova-gold)] selection:text-black">
      
      {/* 1. CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeLevel.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                filter: showDetails ? "blur(20px) brightness(0.3)" : "blur(0px) brightness(0.6)"
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            {activeLevel.gallery && activeLevel.gallery[0] ? (
              <Image
                src={activeLevel.gallery[0]}
                alt={activeLevel.brandName}
                fill
                className="object-cover"
                priority
              />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${activeLevel.colorTheme || 'from-gray-900 to-black'}`} />
            )}
            
            {/* Cinematic Noise & Vignette */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. MAIN CONTENT AREA (State Dependent) */}
      <div className="relative z-10 flex-1 w-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-center">
         <AnimatePresence mode="wait">
            {!showDetails ? (
                // --- STATE A: HERO VIEW ---
                <motion.div 
                    key="hero-view"
                    className="flex flex-col items-start max-w-4xl pt-20 pb-40"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="overflow-hidden mb-6">
                        <motion.p 
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            className="text-[var(--nova-gold)] text-xl font-mono tracking-[0.2em] uppercase flex items-center gap-3"
                        >
                            <span className="w-8 h-[1px] bg-[var(--nova-gold)]" />
                            0{activeIndex + 1}
                        </motion.p>
                    </div>

                    <h1 className="text-7xl md:text-[8rem] font-black text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl">
                        {activeLevel.brandName}
                    </h1>

                    <p className="text-white/80 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mb-12 border-l-4 border-white/10 pl-6">
                        {activeLevel.description.substring(0, 140)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-6 relative -top-4">
                        <button 
                            onClick={() => setShowDetails(true)}
                            className="group pl-8 pr-2 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-6 hover:bg-white/10 transition-all z-20"
                        >
                            <span className="text-white font-bold tracking-wide uppercase text-sm">استكشاف المزايا</span>
                            <div className="w-12 h-12 bg-[var(--nova-gold)] rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </button>
                    </div>
                </motion.div>
            ) : (
                // --- STATE B: DETAILS VIEW (In-Place Transformation) ---
                <motion.div 
                    key="details-view"
                    className="w-full h-full flex flex-col pt-8 pb-48 md:pb-24"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6 shrink-0">
                        <div className="flex items-center gap-6">
                            <h2 className="text-4xl md:text-6xl font-black text-white">{activeLevel.brandName}</h2>
                        </div>
                        <button 
                            onClick={() => setShowDetails(false)}
                            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest group-hover:mr-2 transition-all">عودة</span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <X className="w-5 h-5" />
                            </div>
                        </button>
                    </div>

                    {/* Content Grid (Scrollable if needed inside fixed container) */}
                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Description & Value */}
                            <div className="lg:col-span-7 space-y-10">
                                <div className="prose prose-lg prose-invert max-w-none">
                                    <p className="text-2xl font-light leading-normal text-white/90">
                                        {activeLevel.description}
                                    </p>
                                </div>
                                
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-4 text-[var(--nova-gold)]">
                                            <Check className="w-5 h-5" />
                                            <h3 className="font-bold uppercase tracking-wider text-sm">مثالي لـ</h3>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">{activeLevel.idealFor}</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 mb-4 text-[var(--nova-gold)]">
                                            <Maximize2 className="w-5 h-5" />
                                            <h3 className="font-bold uppercase tracking-wider text-sm">القيمة</h3>
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">{activeLevel.valueProp}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Visuals & CTA */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-3 aspect-video w-full rounded-2xl overflow-hidden border border-white/10 p-1 bg-white/5">
                                    {activeLevel.gallery?.slice(0, 4).map((img, i) => (
                                        <div key={i} className="relative w-full h-full rounded-lg overflow-hidden">
                                            <Image src={img} alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full py-6 bg-white text-black font-black text-xl rounded-xl hover:bg-[var(--nova-gold)] transition-colors shadow-xl"
                                >
                                    بدء المشروع بهذا المستوى
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* 3. HUD CONTROLLER (Fixed Bottom) */}
      <div className="relative shrink-0 z-50 w-full px-6 pb-6 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent">
         <div className="max-w-4xl mx-auto flex items-end gap-2 p-1.5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            {COMMERCIAL_LEVELS.map((level, idx) => (
                <button
                    key={level.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                        "relative flex-1 group transition-all duration-500 rounded-2xl overflow-hidden",
                        activeIndex === idx ? "h-28 flex-[2] bg-white text-black" : "h-16 hover:h-20 bg-black/40 text-white/50"
                    )}
                >
                    {/* Content for inactive state */}
                    {activeIndex !== idx && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-mono mb-1 text-white/30">0{idx + 1}</span>
                            <span className="font-bold uppercase text-xs tracking-widest">{level.brandName}</span>
                        </div>
                    )}

                    {/* Content for active state */}
                    {activeIndex === idx && (
                        <div className="flex items-center justify-between px-6 h-full w-full">
                            <div className="flex flex-col items-start">
                                <span className="text-2xl font-black uppercase tracking-tighter">{level.brandName}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                                <div className="w-3 h-3 bg-[var(--nova-gold)] rounded-full animate-pulse" />
                            </div>
                        </div>
                    )}
                </button>
            ))}
         </div>
      </div>

    </div>
  );
};

// Helper for animations
const fullSlideIn = (delay: number) => ({ y: 50 }); // Just a placeholder, actually defining directly in props
