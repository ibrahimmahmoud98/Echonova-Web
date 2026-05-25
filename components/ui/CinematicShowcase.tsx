"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film, BookOpen, PenTool, Clapperboard, Aperture, Layers, Globe, Rocket, Mic2, Monitor, Image as ImageIcon, LucideIcon, Shield, Eye, Users, Award, Sparkles, Volume2, Zap, Activity, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LiquidButton } from '@/components/ui/LiquidButton';
import { CINEMATIC_SHOWCASE_DATA } from '@/lib/data/services-content';

// --- Icon Mapping (maps icon_name strings to Lucide components) ---
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  PenTool,
  Globe,
  Clapperboard,
  Aperture,
  Monitor,
  Film,
  Play,
  Layers,
  Rocket,
  Mic2,
  ImageIcon,
  Shield,
  Eye,
  Users,
  Award,
  Sparkles,
  Volume2,
  Zap,
  Activity,
  Heart,
};

// Helper to get icon component from string name
const getIcon = (iconName: string): LucideIcon => ICON_MAP[iconName] || Film;

export const CinematicShowcase = () => {
  const [activeMode, setActiveMode] = useState<'saga' | 'cinema'>('saga');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);

  const toggleMode = (mode: 'saga' | 'cinema') => {
      setActiveMode(mode);
      setSelectedImageIndex(0); // Reset selection on mode switch
      setFeatureIndex(0);
  };

  // Get data from centralized source (SSOT)
  const currentData = CINEMATIC_SHOWCASE_DATA[activeMode];
  const currentImages = currentData.images;
  // @ts-ignore
  const currentAlts = currentData.imageAlts || [];
  // @ts-ignore — captions are an optional NEW field on each mode
  const currentCaptions: string[] = currentData.captions || [];

  // Auto-cycle features
  React.useEffect(() => {
    const timer = setInterval(() => {
        setFeatureIndex((prev) => (prev + 1) % currentData.features.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [currentData.features.length]);

  return (
    <section className="relative w-full min-h-[850px] bg-[#00050A] overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* --- Background Ambience --- */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {activeMode === 'saga' ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#000000_100%)] opacity-80" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#000000_100%)] opacity-80" />
        )}
      </div>

      {/* --- Main Section Header (Cinematic) --- */}
      <div className="relative z-20 mb-12 text-center px-4 max-w-4xl mx-auto">
          {/* Eyebrow — chapter marker */}
          <div className="flex items-center justify-center gap-3 mb-4 opacity-80">
              <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
              <span className="text-[var(--color-copper)] text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
              </span>
              <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
          </div>

          {/* Main title (unchanged) */}
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl font-arabic leading-normal pb-2 transition-all duration-500">
              الانتاج السينمائي الترويجي
          </h2>

          {/* Cinematic divider with star at center */}
          <div className="flex items-center justify-center gap-4 my-6">
              <span className="block w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-copper)]/50" />
              <span className="text-[var(--color-copper)] text-base opacity-70 select-none" aria-hidden="true">✦</span>
              <span className="block w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-copper)]/50" />
          </div>

          {/* Tagline — italic, restrained */}
          <p className="text-[var(--color-ivory)]/70 text-sm md:text-base font-light italic max-w-md mx-auto leading-relaxed">
              ليس مجرد تسويق... بل قصة لا تُنسى
          </p>
      </div>

      {/* --- Main Container --- */}
      <div className="container relative z-10 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch h-full">
        
        {/* --- LEFT: The Narrative (Text & Controls) --- */}
        <div className="w-full lg:w-[45%] flex flex-col items-end text-right pt-0">
            
            {/* Mode Switcher (Large) */}
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-2 mb-8 backdrop-blur-md w-full justify-between gap-2">
                <button
                    onClick={() => toggleMode('saga')}
                    className={cn(
                        "flex-1 py-2 md:py-3 rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all duration-500 flex items-center justify-center gap-1 md:gap-2",
                        activeMode === 'saga' 
                            ? "bg-[var(--color-copper)] text-white shadow-lg shadow-orange-900/40" 
                            : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                    NOVA SAGA
                </button>
                <button
                    onClick={() => toggleMode('cinema')}
                    className={cn(
                        "flex-1 py-2 md:py-3 rounded-xl text-xs md:text-sm lg:text-base font-bold transition-all duration-500 flex items-center justify-center gap-1 md:gap-2",
                        activeMode === 'cinema' 
                            ? "bg-[var(--color-copper)] text-white shadow-lg shadow-orange-900/40" 
                            : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <Film className="w-4 h-4 md:w-5 md:h-5" />
                    NOVA CINEMA
                </button>
            </div>

            {/* Dynamic Title */}
            <div className="relative h-14 mb-4 w-full flex justify-end">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeMode + "-title"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-0"
                    >
                         <h2 className={`text-3xl md:text-4xl font-bold ${activeMode === 'saga' ? 'text-[var(--color-copper)]' : 'text-[var(--color-copper)]'}`}>
                            {currentData.title}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dynamic Description */}
            <div className="relative mb-6 w-full min-h-[80px]">
                <AnimatePresence mode="wait">
                     <motion.p 
                        key={activeMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-base md:text-lg text-[var(--color-ivory)]/80 leading-relaxed pl-4 font-light"
                    >
                        {currentData.description}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Features — vertical stack with rotating active highlight.
                All features stay visible; the highlight cycles via featureIndex.
                This replaces the previous single-feature auto-cycle that hid
                4/5 of the value props at any moment. */}
            <div className="w-full mb-6 space-y-1.5">
                {currentData.features.map((feature, idx) => {
                    const isActive = idx === featureIndex;
                    const Icon = getIcon(feature.icon_name || "Film");
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-500",
                                isActive
                                    ? "bg-[var(--color-copper)]/15 border-[var(--color-copper)]/40"
                                    : "bg-white/[0.02] border-white/5 opacity-55 hover:opacity-90"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-4 h-4 flex-shrink-0 transition-colors",
                                    isActive ? "text-[var(--color-copper)]" : "text-white/35"
                                )}
                            />
                            <h4
                                className={cn(
                                    "text-sm transition-all flex-1 text-right",
                                    isActive ? "text-white font-bold" : "text-white/55 font-light"
                                )}
                            >
                                {feature.title}
                            </h4>
                            {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-copper)] flex-shrink-0 animate-pulse" />
                            )}
                        </div>
                    );
                })}
            </div>
            
             <div className="flex gap-4 justify-center w-full">
                  <Link href={`/services/cinema`}>
                    <LiquidButton variant="secondary" className="px-5 py-2 text-sm md:px-8 md:py-3.5 md:text-base">
                        اعرف أكثر
                    </LiquidButton>
                 </Link>
                 <Link href={`/services/cinema`}>
                    <LiquidButton variant={activeMode === 'saga' ? 'primary' : 'primary'} className="px-5 py-2 text-sm md:px-8 md:py-3.5 md:text-base">
                        {currentData.ctaText}
                    </LiquidButton>
                </Link>
             </div>

        </div>

        {/* --- RIGHT: The Visual Command Center (5 Images Interaction) --- */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
            
            {/* Main Preview Monitor */}
            <div className="relative w-full flex-1 bg-[#050505] rounded-xl border border-white/10 shadow-2xl overflow-hidden group min-h-[400px]">
                <AnimatePresence mode="wait">
                     <motion.div
                        key={currentImages[selectedImageIndex]}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        <Image 
                            src={currentImages[selectedImageIndex]} 
                            alt={currentAlts[selectedImageIndex] || `Cinematic Showcase ${selectedImageIndex + 1}`} 
                            fill 
                            className={cn(
                                "object-cover",
                                activeMode === 'cinema' ? "opacity-90" : "opacity-100" // Cinema darker mood
                            )}
                        />
                         
                         {/* Overlays based on Mode */}
                         {activeMode === 'cinema' && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"/>
                                <div className="absolute top-6 right-6 flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                                     <span className="text-[10px] font-mono text-red-500 tracking-widest">تسجيل</span>
                                </div>
                                <div className="absolute bottom-6 left-6 font-mono text-xs text-white/50 space-x-4">
                                    <span>ISO 800</span>
                                    <span>RAW 8K</span>
                                    <span>24 إطار/ث</span>
                                </div>
                                {/* Center Focus Reticle */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                     <div className="w-1 h-1 bg-red-500 rounded-full"/>
                                </div>
                            </>
                         )}

                         {activeMode === 'saga' && (
                             <>
                                <div className="absolute inset-0 bg-[#3a2e26]/10 mix-blend-sepia pointer-events-none"/>
                            </>
                         )}

                     </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails — story cards with hover caption overlay + active LIVE pip */}
            <div className="grid grid-cols-5 gap-1.5 md:gap-3">
                 {currentImages.map((img, idx) => {
                    const isActive = selectedImageIndex === idx;
                    const caption = currentCaptions[idx];
                    return (
                        <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            aria-label={caption ? `عرض: ${caption}` : `Thumbnail ${idx + 1}`}
                            className={cn(
                                "relative aspect-square rounded-lg overflow-hidden border transition-all duration-300 group",
                                isActive
                                    ? "border-[var(--color-copper)] ring-2 ring-[var(--color-copper)]/30 scale-105 z-10"
                                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={currentAlts[idx] || `Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Active tint (very subtle copper wash) */}
                            {isActive && (
                                <div className="absolute inset-0 bg-[var(--color-copper)] opacity-15 pointer-events-none" />
                            )}

                            {/* Caption overlay — visible on active or hover */}
                            {caption && (
                                <div
                                    className={cn(
                                        "absolute inset-x-0 bottom-0 px-2 py-1.5 text-[10px] md:text-xs font-medium text-white text-right truncate",
                                        "bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-all duration-300",
                                        isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                                    )}
                                >
                                    {caption}
                                </div>
                            )}

                            {/* LIVE indicator — only on active card */}
                            {isActive && (
                                <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-[var(--color-copper)]/40">
                                    <span className="w-1 h-1 rounded-full bg-[var(--color-copper)] animate-pulse" />
                                    <span className="text-[8px] font-mono tracking-wider text-[var(--color-copper)] uppercase">
                                        Live
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                 })}
            </div>

        </div>

      </div>
    </section>
  );
};
