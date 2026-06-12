"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { CINEMATIC_SHOWCASE_DATA } from "@/lib/data/services-content";
import { ArrowRight, ArrowLeft, Crosshair, Aperture, Battery } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/LiquidButton";

type Phase = "split" | "saga" | "cinema";
type HoverState = "saga" | "cinema" | null;

export function PremiumCinematicShowcase() {
  const { playClick, playHover } = useAudio();
  const [phase, setPhase] = useState<Phase>("split");
  const [hoverState, setHoverState] = useState<HoverState>(null);
  
  // Frame indexing for scrubbing
  const [sagaFrame, setSagaFrame] = useState(0);
  const [cinemaFrame, setCinemaFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle in split mode or full mode if idle
  useEffect(() => {
    const interval = setInterval(() => {
      setSagaFrame(prev => (prev + 1) % CINEMATIC_SHOWCASE_DATA.saga.images.length);
      setCinemaFrame(prev => (prev + 1) % CINEMATIC_SHOWCASE_DATA.cinema.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Determine the translation of the 200vw canvas
  let canvasX = "-50vw"; // Default split (shows right half of SAGA, left half of CINEMA)
  if (phase === "split") {
    if (hoverState === "saga") canvasX = "-30vw"; // SAGA gets 70vw
    if (hoverState === "cinema") canvasX = "-70vw"; // CINEMA gets 70vw
  } else if (phase === "saga") {
    canvasX = "0vw"; // Show entire SAGA
  } else if (phase === "cinema") {
    canvasX = "-100vw"; // Show entire CINEMA
  }

  // Whip-pan blur effect
  const isPanning = phase === "saga" || phase === "cinema";

  const handleSelect = (selected: "saga" | "cinema") => {
    playClick();
    setPhase(selected);
    setHoverState(null);
  };

  const handleSplitReturn = () => {
    playClick();
    setPhase("split");
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85vh] min-h-[800px] overflow-hidden bg-black font-arabic"
    >
      {/* 
        THE 200vw CANVAS 
        Contains both sections side by side. We translate this wrapper to pan the camera.
      */}
      <motion.div 
        className="absolute top-0 bottom-0 left-0 w-[200vw] flex"
        animate={{ x: canvasX }}
        transition={{ type: "spring", stiffness: 60, damping: 20, mass: 1.2 }}
      >
        
        {/* =========================================================================
            SAGA PANEL (Left 100vw)
            ========================================================================= */}
        <div 
          className="relative w-[100vw] h-full overflow-hidden"
          onMouseEnter={() => phase === "split" && setHoverState("saga")}
          onMouseLeave={() => phase === "split" && setHoverState(null)}
          onClick={() => phase === "split" && handleSelect("saga")}
        >
          {/* Background Image Sequence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`saga-${sagaFrame}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image
                src={CINEMATIC_SHOWCASE_DATA.saga.images[sagaFrame]}
                alt="Saga Frame"
                fill
                className="object-cover opacity-80"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Split Mode Content (Right-aligned so it's visible in the center) */}
          <motion.div 
            className="absolute inset-y-0 right-0 w-[50vw] flex flex-col items-end justify-center pr-12 md:pr-24 cursor-pointer"
            animate={{ opacity: phase === "split" ? 1 : 0, pointerEvents: phase === "split" ? "auto" : "none" }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">
              SAGA
            </h2>
            <p className="text-[var(--color-copper)] tracking-[0.4em] uppercase text-sm mt-4 font-bold">
              مسلسلات قصيرة
            </p>
          </motion.div>

          {/* Full Mode UI */}
          <motion.div 
            className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "saga" ? 1 : 0, pointerEvents: phase === "saga" ? "auto" : "none" }}
            transition={{ duration: 0.5, delay: phase === "saga" ? 0.3 : 0 }}
          >
            {/* Top HUD */}
            <div className="flex justify-between items-start text-white/70 font-mono text-xs tracking-widest">
              <button 
                onClick={(e) => { e.stopPropagation(); handleSplitReturn(); }}
                className="hover:text-white flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-black/40 backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4" /> عودة لجميع المسارات
              </button>
              <div className="flex gap-4 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                <span className="flex items-center gap-2 text-red-500"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> REC</span>
                <span>ISO 800</span>
                <span>24 FPS</span>
              </div>
            </div>

            {/* Content & Whip-Pan Button */}
            <div className="flex justify-between items-end">
              <div className="max-w-xl text-right" dir="rtl">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {CINEMATIC_SHOWCASE_DATA.saga.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                  {CINEMATIC_SHOWCASE_DATA.saga.description}
                </p>
                <LiquidButton
                  onClick={(e) => { e.stopPropagation(); playClick(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  variant="primary"
                >
                  {CINEMATIC_SHOWCASE_DATA.saga.ctaText}
                </LiquidButton>
              </div>

              {/* Whip-Pan to Cinema Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleSelect("cinema"); }}
                onMouseEnter={playHover}
                className="group flex flex-col items-center gap-3"
              >
                <span className="text-[10px] text-[var(--color-copper)] tracking-[0.3em] uppercase">الانتقال إلى</span>
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-[var(--color-copper)] group-hover:bg-[var(--color-copper)]/20 transition-all">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-white tracking-widest">CINEMA</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            CINEMA PANEL (Right 100vw)
            ========================================================================= */}
        <div 
          className="relative w-[100vw] h-full overflow-hidden"
          onMouseEnter={() => phase === "split" && setHoverState("cinema")}
          onMouseLeave={() => phase === "split" && setHoverState(null)}
          onClick={() => phase === "split" && handleSelect("cinema")}
        >
          {/* Background Image Sequence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cinema-${cinemaFrame}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 pointer-events-none"
            >
              <Image
                src={CINEMATIC_SHOWCASE_DATA.cinema.images[cinemaFrame]}
                alt="Cinema Frame"
                fill
                className="object-cover opacity-80 filter contrast-125"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Split Mode Content (Left-aligned so it's visible in the center) */}
          <motion.div 
            className="absolute inset-y-0 left-0 w-[50vw] flex flex-col items-start justify-center pl-12 md:pl-24 cursor-pointer"
            animate={{ opacity: phase === "split" ? 1 : 0, pointerEvents: phase === "split" ? "auto" : "none" }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">
              CINEMA
            </h2>
            <p className="text-blue-400 tracking-[0.4em] uppercase text-sm mt-4 font-bold">
              أفلام قصيرة
            </p>
          </motion.div>

          {/* Full Mode UI */}
          <motion.div 
            className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "cinema" ? 1 : 0, pointerEvents: phase === "cinema" ? "auto" : "none" }}
            transition={{ duration: 0.5, delay: phase === "cinema" ? 0.3 : 0 }}
          >
            {/* Top HUD */}
            <div className="flex justify-between items-start text-white/70 font-mono text-xs tracking-widest">
              <div className="flex gap-4 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                <span className="flex items-center gap-2 text-red-500"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> REC</span>
                <span>ISO 3200</span>
                <span>24 FPS</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleSplitReturn(); }}
                className="hover:text-white flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-black/40 backdrop-blur-md"
              >
                عودة لجميع المسارات <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content & Whip-Pan Button */}
            <div className="flex justify-between items-end">
              {/* Whip-Pan to Saga Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleSelect("saga"); }}
                onMouseEnter={playHover}
                className="group flex flex-col items-center gap-3"
              >
                <span className="text-[10px] text-blue-400 tracking-[0.3em] uppercase">الانتقال إلى</span>
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-blue-400 group-hover:bg-blue-400/20 transition-all">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-white tracking-widest">SAGA</span>
              </button>

              <div className="max-w-xl text-right" dir="rtl">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {CINEMATIC_SHOWCASE_DATA.cinema.title}
                </h3>
                <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
                  {CINEMATIC_SHOWCASE_DATA.cinema.description}
                </p>
                <LiquidButton
                  onClick={(e) => { e.stopPropagation(); playClick(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  variant="primary"
                >
                  {CINEMATIC_SHOWCASE_DATA.cinema.ctaText}
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Crosshair Overlay (always visible to maintain camera aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
        <Crosshair className="w-12 h-12 text-white" />
      </div>
    </section>
  );
}
