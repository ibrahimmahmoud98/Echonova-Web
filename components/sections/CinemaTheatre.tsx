"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { CINEMATIC_SHOWCASE_DATA } from "@/lib/data/services-content";
import {
  Film, BookOpen, Play, Award, Heart, Sparkles, Volume2, Zap, Activity, Eye,
  Users, Layers, Clapperboard, Aperture, Globe, Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CinemaTheatre — replaces the previous CinematicShowcase (mode toggle +
 * static thumbnails strip).
 *
 * Approach: render the active scene as a real cinema "screen" at the top —
 * with a volumetric projector light cone behind it and a 35mm filmstrip
 * (with sprocket perforations) acting as the frame selector below.
 * Toggling SAGA / CINEMA crossfades the screen with a brief projector flash
 * and shutter-style mask. The strip auto-drifts at idle.
 *
 * Why this design: previous version relied on tabs + a fixed-size image +
 * 5 small thumbs, which felt like a press kit. This rebuild reads as a
 * working cinema room: "Saga" and "Cinema" feel like two different reels
 * loaded in one projector.
 */

type Mode = "saga" | "cinema";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, Film, Play, Award, Heart, Sparkles, Volume2, Zap, Activity, Eye, Users, Layers, Clapperboard, Aperture, Globe, Rocket,
};
const getIcon = (name: string): LucideIcon => ICON_MAP[name] || Film;

interface CinemaTheatreProps {
  /** تحكم خارجي في الوضع (مثل تابات صفحة الإنتاج السينمائي). اختياري — بدونه يعمل المكوّن كما في الصفحة القديمة. */
  controlledMode?: Mode;
  /** إخفاء مبدّل SAGA/CINEMA الداخلي عندما يكون التبديل من تابات الصفحة. */
  hideToggle?: boolean;
  /** إخفاء زر «اعرف أكثر» عند العرض داخل صفحة /services/cinema نفسها. */
  hideMoreLink?: boolean;
}

export function CinemaTheatre({ controlledMode, hideToggle = false, hideMoreLink = false }: CinemaTheatreProps = {}) {
  const { playClick, playHover } = useAudio();
  const [mode, setMode] = useState<Mode>(controlledMode ?? "saga");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [featureIdx, setFeatureIdx] = useState(0);

  const data = CINEMATIC_SHOWCASE_DATA[mode];
  const images = data.images;
  // @ts-ignore — captions added in earlier phase
  const captions: string[] = data.captions || [];
  // @ts-ignore
  const alts: string[] = data.imageAlts || [];

  // Cycle features every 2.4s
  useEffect(() => {
    const id = setInterval(() => {
      setFeatureIdx((i) => (i + 1) % data.features.length);
    }, 2400);
    return () => clearInterval(id);
  }, [data.features.length]);

  // Mode change handler — triggers projector flash + reel swap
  const handleModeChange = useCallback(
    (next: Mode) => {
      if (next === mode || transitioning) return;
      playClick();
      setTransitioning(true);
      setTimeout(() => {
        setMode(next);
        setSelectedIndex(0);
        setFeatureIdx(0);
      }, 240);
      setTimeout(() => setTransitioning(false), 720);
    },
    [mode, transitioning, playClick]
  );

  // مزامنة الوضع مع التحكم الخارجي (تابات الصفحة) — بنفس انتقال البروجيكتور
  useEffect(() => {
    if (controlledMode && controlledMode !== mode && !transitioning) {
      handleModeChange(controlledMode);
    }
  }, [controlledMode, mode, transitioning, handleModeChange]);

  const handleFrameSelect = useCallback(
    (idx: number) => {
      if (idx === selectedIndex) return;
      playClick();
      setSelectedIndex(idx);
    },
    [selectedIndex, playClick]
  );

  // Auto-drift the filmstrip indicator (visual rhythm only — doesn't change selected)
  const stripWrapRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 opacity-80">
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
          <span className="text-[var(--color-copper)] text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
          </span>
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-tight pb-2">
          الانتاج السينمائي الترويجي
        </h2>
        <div className="flex items-center justify-center gap-4 my-6">
          <span className="block w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-copper)]/50" />
          <span className="text-[var(--color-copper)] text-base opacity-70 select-none" aria-hidden="true">✦</span>
          <span className="block w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-copper)]/50" />
        </div>
        <p className="text-[var(--color-ivory)]/70 max-w-md mx-auto text-base md:text-lg font-light italic">
          ليس مجرد تسويق... بل قصة لا تُنسى
        </p>
      </div>

      {/* THE THEATRE STAGE */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Projector beam — comes from above-screen, fans out */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-full opacity-25 mix-blend-screen blur-lg"
            style={{
              background: "linear-gradient(to bottom, rgba(255,214,165,0.6) 0%, rgba(217,112,64,0.3) 50%, transparent 100%)",
              clipPath: "polygon(45% 0, 55% 0, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* THE SCREEN */}
        <div className="relative">
          {/* Outer ambient halo */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: transitioning ? 0.95 : 0.5 }}
            transition={{ duration: 0.4 }}
            className="absolute -inset-12 md:-inset-20 rounded-[3rem] blur-[80px] pointer-events-none bg-[var(--color-copper)]/20"
          />

          {/* Screen frame — black bezel */}
          <div className="relative aspect-[2.35/1] rounded-lg overflow-hidden bg-black ring-1 ring-white/5 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)]">
            {/* Inner cinemascope pillar — 1px copper top/bottom */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-copper)]/60 to-transparent z-30 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-copper)]/60 to-transparent z-30 pointer-events-none" />

            {/* Screen image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${selectedIndex}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: transitioning ? 0.4 : 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[selectedIndex]}
                  alt={alts[selectedIndex] || `Frame ${selectedIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 1400px"
                />
                {/* Soft cinema vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
                {/* Bottom title shroud */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Projector flash overlay during transition */}
            <AnimatePresence>
              {transitioning && (
                <motion.div
                  key="flash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, times: [0, 0.3, 1] }}
                  className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(circle at center, #fff 0%, rgba(255,214,165,0.5) 40%, transparent 80%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Shutter mask during transition (top + bottom black bars sweep) */}
            <AnimatePresence>
              {transitioning && (
                <>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "30%" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.32, ease: [0.7, 0, 0.3, 1] }}
                    className="absolute top-0 inset-x-0 bg-black z-10 pointer-events-none"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "30%" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.32, ease: [0.7, 0, 0.3, 1] }}
                    className="absolute bottom-0 inset-x-0 bg-black z-10 pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            {/* Caption + active mode badge — bottom of screen */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-30 pointer-events-none flex items-end justify-between" dir="rtl">
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] text-[var(--color-copper)] uppercase mb-1">
                  {mode === "saga" ? "SAGA" : "CINEMA"} · Frame 0{selectedIndex + 1}
                </div>
                <div className="text-xl md:text-3xl font-bold text-white drop-shadow-2xl">
                  {captions[selectedIndex] || `لقطة ${selectedIndex + 1}`}
                </div>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
                  Now Showing
                </div>
                <div className="text-base md:text-lg font-bold text-[var(--color-champagne)]">
                  {data.title}
                </div>
              </div>
            </div>
          </div>

          {/* === 35mm FILMSTRIP — frame selector === */}
          <div className="relative mt-6 md:mt-8" ref={stripWrapRef}>
            {/* Strip background = dark band */}
            <div className="relative bg-[#0A0A0E] border-y border-white/5">
              {/* Top sprocket holes */}
              <div className="flex h-3 md:h-4 px-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={`top-${i}`}
                    className="flex-1 mx-1 my-1 rounded-sm bg-black/80 border border-white/10"
                  />
                ))}
              </div>

              {/* Frames row */}
              <div className="flex gap-2 md:gap-3 px-3 py-2 overflow-x-auto no-scrollbar">
                {images.map((src, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleFrameSelect(idx)}
                      onMouseEnter={playHover}
                      aria-label={captions[idx] ? `عرض: ${captions[idx]}` : `Frame ${idx + 1}`}
                      className={cn(
                        "relative flex-shrink-0 aspect-[2.35/1] w-44 md:w-56 transition-all duration-300 group",
                        isActive ? "scale-[1.04] z-10" : "opacity-50 hover:opacity-90 hover:scale-[1.02]"
                      )}
                      style={{
                        filter: isActive ? "drop-shadow(0 8px 16px rgba(217,112,64,0.5))" : "none",
                      }}
                    >
                      <div
                        className={cn(
                          "relative w-full h-full overflow-hidden border-2 transition-colors",
                          isActive ? "border-[var(--color-copper)]" : "border-white/10 group-hover:border-white/30"
                        )}
                      >
                        <Image
                          src={src}
                          alt={alts[idx] || `Frame ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="240px"
                        />
                        {/* Frame number burned on top-left */}
                        <span
                          className={cn(
                            "absolute top-1 left-1 px-1.5 py-0.5 text-[8px] font-mono tracking-widest font-bold rounded-sm transition-colors",
                            isActive
                              ? "bg-[var(--color-copper)] text-black"
                              : "bg-black/60 text-white/50"
                          )}
                          dir="ltr"
                        >
                          0{idx + 1}/0{images.length}
                        </span>
                        {/* Caption — only on active or hover */}
                        {captions[idx] && (
                          <div
                            className={cn(
                              "absolute inset-x-0 bottom-0 px-2 py-1 text-[10px] font-bold text-white text-right transition-all",
                              "bg-gradient-to-t from-black/95 via-black/60 to-transparent",
                              isActive
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            )}
                            dir="rtl"
                          >
                            {captions[idx]}
                          </div>
                        )}
                        {/* Active scan-line effect (motion-driven, no CSS keyframes) */}
                        {isActive && (
                          <motion.div
                            initial={{ y: "-50%", opacity: 0.3 }}
                            animate={{ y: ["-50%", "0%", "50%"], opacity: [0.3, 0.9, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 top-1/2 h-px bg-[var(--color-copper)] pointer-events-none"
                            style={{
                              boxShadow: "0 0 8px var(--color-copper)",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom sprocket holes */}
              <div className="flex h-3 md:h-4 px-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={`bot-${i}`}
                    className="flex-1 mx-1 my-1 rounded-sm bg-black/80 border border-white/10"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === BELOW: mode toggle + description + features + CTAs === */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: mode toggle + features (occupies 1 col) */}
          <div className="space-y-6">
            {/* Mode toggle — يُخفى عندما يكون التبديل من تابات الصفحة الخارجية */}
            {!hideToggle && (
            <div className="flex bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 gap-1.5">
              <button
                onClick={() => handleModeChange("saga")}
                onMouseEnter={playHover}
                disabled={transitioning}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-500 flex items-center justify-center gap-2",
                  mode === "saga"
                    ? "bg-[var(--color-copper)] text-white shadow-[0_4px_20px_rgba(217,112,64,0.45)]"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                <BookOpen className="w-4 h-4" />
                NOVA SAGA
              </button>
              <button
                onClick={() => handleModeChange("cinema")}
                onMouseEnter={playHover}
                disabled={transitioning}
                className={cn(
                  "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-500 flex items-center justify-center gap-2",
                  mode === "cinema"
                    ? "bg-[var(--color-copper)] text-white shadow-[0_4px_20px_rgba(217,112,64,0.45)]"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                <Film className="w-4 h-4" />
                NOVA CINEMA
              </button>
            </div>
            )}

            {/* Feature stack — vertical, rotating highlight */}
            <div className="space-y-1.5">
              {data.features.map((feature, idx) => {
                const isActive = idx === featureIdx;
                const Icon = getIcon(feature.icon_name || "Film");
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-500",
                      isActive
                        ? "bg-[var(--color-copper)]/15 border-[var(--color-copper)]/40"
                        : "bg-white/[0.02] border-white/5 opacity-55"
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
          </div>

          {/* RIGHT: title + description + CTAs (2 cols) */}
          <div className="lg:col-span-2 text-right" dir="rtl">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-5xl font-black mb-2">
                  <span className="text-white">NOVA </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-orange-400">
                    {mode === "saga" ? "SAGA" : "CINEMA"}
                  </span>
                </h3>
                <h4 className="text-xl md:text-2xl text-[var(--color-copper)] font-bold mb-5">
                  {data.title}
                </h4>
                <p className="text-base md:text-lg text-[var(--color-ivory)]/85 leading-relaxed font-light max-w-2xl mb-8">
                  {data.description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-3">
              {!hideMoreLink && (
              <Link href="/services/cinema">
                <LiquidButton variant="secondary" className="px-6 py-2.5 text-sm">
                  اعرف أكثر
                </LiquidButton>
              </Link>
              )}
              <LiquidButton
                onClick={() => {
                  playClick();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.location.href = "/contact";
                }}
                onMouseEnter={playHover}
                variant="primary"
                className="px-6 py-2.5 text-sm"
              >
                {data.ctaText}
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
