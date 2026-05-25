"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { COMMERCIAL_LEVELS } from "@/lib/data/services-content";
import { cn } from "@/lib/utils";

/**
 * TheatreStage v2 — "Cinematic Light Portal"
 *
 * v1 had a literal red velvet curtain + brass rod which the user (correctly)
 * called out as looking like a 2006 PowerPoint asset rather than a living,
 * cinematic surface. v2 replaces all of that with:
 *
 *  1. A frameless "light portal" — the scene image floats inside a soft
 *     glow halo whose color absorbs from the active scene's accent.
 *     The frame edge isn't a hard rectangle but a faint chromatic rim that
 *     bleeds slightly outside its bounds (like a CRT screen with light leak).
 *
 *  2. A real cinematic transition between scenes — instead of curtains
 *     sliding, scene changes go through:
 *       a) chromatic aberration burst (RGB layers split apart for a frame)
 *       b) white-to-scene-color flash
 *       c) particle ember scatter
 *       d) reverse: new scene reassembles
 *
 *  3. Living edges — particles drift OUT of the frame in the active
 *     scene's color, dripping into the surrounding void. Frame is breathing.
 *
 *  4. Cinema-style ticket selectors below — kept from v1 with minor polish.
 */

const SCENE_THEMES: Record<
  string,
  { primary: string; accent: string; halo: string; label: string }
> = {
  life: {
    primary: "#7DD3FC",
    accent: "#0EA5E9",
    halo: "rgba(14,165,233,0.55)",
    label: "01",
  },
  action: {
    primary: "#FB923C",
    accent: "#DC2626",
    halo: "rgba(220,38,38,0.55)",
    label: "02",
  },
  magic: {
    primary: "#C084FC",
    accent: "#A855F7",
    halo: "rgba(168,85,247,0.55)",
    label: "03",
  },
};

export function TheatreStage() {
  const { playClick, playHover } = useAudio();
  const [activeId, setActiveId] = useState(COMMERCIAL_LEVELS[0].id);
  const [phase, setPhase] = useState<"idle" | "burst" | "flash" | "settle">("idle");
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Stage-local mouse parallax
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handler = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    stage.addEventListener("mousemove", handler);
    return () => stage.removeEventListener("mousemove", handler);
  }, []);

  // Light-burst transition sound (lightweight WebAudio)
  const playBurst = useCallback(() => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();

      // Short white-noise burst (chromatic flash)
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / data.length;
        // Quick attack, exponential decay
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3);
      }
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.value = 1200;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start();

      // Sub-bass thump (subtle, gives the burst weight)
      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(80, ctx.currentTime);
      sub.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.2);
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.2, ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start();
      sub.stop(ctx.currentTime + 0.3);
    } catch {}
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      if (id === activeId || phase !== "idle") return;
      playClick();
      playBurst();
      setPhase("burst");
      // After burst peaks, swap scene + flash
      setTimeout(() => {
        setActiveId(id);
        setPhase("flash");
      }, 280);
      setTimeout(() => setPhase("settle"), 480);
      setTimeout(() => setPhase("idle"), 1100);
    },
    [activeId, phase, playClick, playBurst]
  );

  const active = COMMERCIAL_LEVELS.find((l) => l.id === activeId)!;
  const theme = SCENE_THEMES[activeId];

  // Subtle parallax (±10px)
  const parallaxX = (mouse.x - 0.5) * 20;
  const parallaxY = (mouse.y - 0.5) * 14;

  return (
    <section
      id="services-theatre"
      className="relative w-full pt-24 pb-20 md:pt-12 md:pb-28 overflow-hidden"
    >
      {/*  Section header
          MOBILE FIX (2026-05-12): mobile pt was 8 (32px) which let the fixed
          Navbar (~64-80px tall) clip the top of the title "إعلانك بمستوى".
          Bumped to pt-24 (96px) so the title clears the navbar on mobile.
          Desktop pt-12 unchanged. */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--color-ivory)] mb-4 leading-tight">
          إعلانك بمستوى{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)]">
            سينمائي
          </span>
        </h2>
        <p className="text-[var(--color-ivory)]/60 max-w-xl mx-auto text-base md:text-lg font-light">
          ثلاث تصنيفات... وعوالم بلا عدد
        </p>
      </div>

      {/* THE PORTAL */}
      <div ref={stageRef} className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* OUTER HALO — soft scene-colored bloom that breathes */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: phase === "burst" || phase === "flash" ? 1 : 0.55,
            scale: phase === "burst" ? 1.06 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute -inset-16 md:-inset-24 rounded-[4rem] blur-[80px] pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: theme.halo }}
        />

        {/* Secondary inner halo — tighter, accent color */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: phase === "flash" ? 0.85 : 0.4 }}
          className="absolute -inset-4 md:-inset-8 rounded-[3rem] blur-[40px] pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: `${theme.accent}66` }}
        />

        {/* PORTAL FRAME — frameless edge with chromatic rim
            RESPONSIVE FIX (2026-05-25): the mobile aspect-[16/9] was removed.
            A fixed wide ratio forced a short box on phones while the overlaid
            text/CTAs were taller — so they overflowed and got clipped by
            `overflow-hidden`. On phones the frame now has NO fixed ratio: its
            height is driven by the scene content (see SCENE CONTENT below), so
            it always fits the text and the poster image fills a portrait-
            friendly area via object-cover. Desktop keeps aspect-[21/9]. */}
        <div className="relative md:aspect-[21/9] overflow-hidden">
          {/* Edge chromatic rim — three colored 1px strokes offset slightly,
              gives a faint RGB glow at the boundary like a CRT/anaglyph edge */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-30"
            style={{
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.06),
                inset 0 0 60px rgba(0,0,0,0.4),
                inset 0 0 120px ${theme.accent}26
              `,
            }}
          />
          {/* Top edge light leak */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-30 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
            }}
          />
          {/* Bottom edge light leak */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-30 opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
            }}
          />

          {/* SCENE LAYERS — multiple stacked images for chromatic aberration on burst */}
          <SceneStack
            scene={active}
            phase={phase}
            theme={theme}
            parallaxX={parallaxX}
            parallaxY={parallaxY}
          />

          {/* Particle ember scatter during burst */}
          <AnimatePresence>
            {phase === "burst" && (
              <BurstParticles color={theme.primary} />
            )}
          </AnimatePresence>

          {/* White-to-scene flash overlay */}
          <AnimatePresence>
            {phase === "flash" && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.2, 1] }}
                className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at center, #fff 0%, ${theme.primary} 60%, transparent 100%)`,
                }}
              />
            )}
          </AnimatePresence>

          {/* SCENE CONTENT (text + CTAs)
              RESPONSIVE FIX (2026-05-25): on phones this block sits in normal
              flow (`relative`) so it DRIVES the portal's height — the frame
              grows to fit the text instead of clipping it inside a fixed box.
              On md+ it overlays the image (`md:absolute md:inset-0`) exactly
              as before. It now stays mounted through the burst phase (hidden
              via the `burst` variant) so the portal height never collapses
              mid-transition. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeId}`}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
                burst: {
                  opacity: 0,
                  y: 12,
                  transition: { duration: 0.18, ease: "easeOut" },
                },
              }}
              initial="hidden"
              animate={phase === "burst" ? "burst" : "visible"}
              exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="relative md:absolute md:inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 pointer-events-none z-10"
              dir="rtl"
            >
              <div className="max-w-2xl pointer-events-auto">
                {/* Service brand wordmark */}
                <KineticBrand
                  text={active.brandName}
                  accentColor={theme.primary}
                  sceneKey={activeId}
                />

                {/* Arabic title */}
                <h3
                  className="text-2xl md:text-4xl font-bold text-white mt-3 mb-4 drop-shadow-2xl"
                  style={{ textShadow: `0 0 30px ${theme.accent}55` }}
                >
                  {active.arTitle}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-semibold max-w-xl drop-shadow-lg mb-6">
                  {active.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link href="/services/reels">
                    <LiquidButton
                      variant="secondary"
                      className="px-5 py-2.5 text-sm"
                    >
                      تفاصيل أكثر
                    </LiquidButton>
                  </Link>
                  <button
                    onClick={() => {
                      playClick();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={playHover}
                    className="px-6 py-2.5 text-sm font-bold rounded-full border-2 transition-all hover:scale-105"
                    style={{
                      borderColor: theme.primary,
                      color: theme.primary,
                      boxShadow: `0 0 20px ${theme.accent}40`,
                    }}
                  >
                    ابدأ رحلتك.. وارسم بصمتك
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating bleed particles OUTSIDE the frame — drips of scene light */}
        <FloatingBleed color={theme.primary} sceneKey={activeId} />

        {/* TICKET SELECTORS */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
            {COMMERCIAL_LEVELS.map((level) => {
              const isActive = level.id === activeId;
              const t = SCENE_THEMES[level.id];
              return (
                <Ticket
                  key={level.id}
                  level={level}
                  theme={t}
                  isActive={isActive}
                  disabled={phase !== "idle"}
                  onClick={() => handleSelect(level.id)}
                  onHover={playHover}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   SCENE STACK — three image layers used for chromatic split during burst
   ===================================================================== */
function SceneStack({
  scene,
  phase,
  theme,
  parallaxX,
  parallaxY,
}: {
  scene: (typeof COMMERCIAL_LEVELS)[number];
  phase: "idle" | "burst" | "flash" | "settle";
  theme: typeof SCENE_THEMES[string];
  parallaxX: number;
  parallaxY: number;
}) {
  // Chromatic offset magnitude during burst
  const split = phase === "burst" ? 8 : 0;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Layer R (red shift) */}
          <div
            className="absolute inset-0 transition-transform duration-300 mix-blend-screen"
            style={{
              transform: `translate(${parallaxX + split}px, ${parallaxY}px) scale(1.06)`,
              filter: phase === "burst" ? "url(#redOnly)" : "none",
              opacity: phase === "burst" ? 0.7 : 0,
            }}
          >
            <Image
              src={scene.posterImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Layer G (green shift) */}
          <div
            className="absolute inset-0 transition-transform duration-300 mix-blend-screen"
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY - split / 2}px) scale(1.06)`,
              filter: phase === "burst" ? "url(#greenOnly)" : "none",
              opacity: phase === "burst" ? 0.7 : 0,
            }}
          >
            <Image
              src={scene.posterImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Layer B (blue shift) */}
          <div
            className="absolute inset-0 transition-transform duration-300 mix-blend-screen"
            style={{
              transform: `translate(${parallaxX - split}px, ${parallaxY + split / 2}px) scale(1.06)`,
              filter: phase === "burst" ? "url(#blueOnly)" : "none",
              opacity: phase === "burst" ? 0.7 : 0,
            }}
          >
            <Image
              src={scene.posterImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Main image (always visible, dimmed during burst) */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{
              transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.06)`,
              opacity: phase === "burst" ? 0.3 : 1,
              filter: phase === "burst" ? "blur(2px)" : "blur(0px)",
            }}
          >
            <Image
              src={scene.posterImage}
              alt={scene.altText}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            {/* Cinematic darken to favor text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />
            <div
              className="absolute inset-0 mix-blend-soft-light pointer-events-none transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, transparent 30%, ${theme.accent}33 100%)`,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SVG color filters for chromatic aberration */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="redOnly">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="greenOnly">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            />
          </filter>
          <filter id="blueOnly">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

/* =====================================================================
   BURST PARTICLES — embers radiating outward during transition
   ===================================================================== */
function BurstParticles({ color }: { color: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const dist = 60 + Math.random() * 80;
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 2 + Math.random() * 4,
          delay: Math.random() * 0.1,
        };
      }),
    []
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: p.x * 4,
            y: p.y * 4,
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{ duration: 0.6, delay: p.delay, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 6}px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

/* =====================================================================
   FLOATING BLEED — particles drift OUTSIDE the frame in scene color
   ===================================================================== */
function FloatingBleed({
  color,
  sceneKey,
}: {
  color: string;
  sceneKey: string;
}) {
  const particles = useMemo(() => {
    const seed = sceneKey.charCodeAt(0);
    const rand = (n: number) => {
      const x = Math.sin(seed + n) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      // Distributed around the perimeter (roughly)
      side: i % 4, // 0:top 1:right 2:bottom 3:left
      offset: rand(i * 7.3),
      depth: rand(i * 11.1) * 100,
      size: 1.5 + rand(i * 3.7) * 2.5,
      duration: 6 + rand(i * 5.1) * 8,
      delay: rand(i * 9.3) * 5,
    }));
  }, [sceneKey]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible -z-0">
      {particles.map((p) => {
        const pos: React.CSSProperties = {};
        if (p.side === 0) {
          pos.top = `-${p.depth * 0.3}px`;
          pos.left = `${p.offset * 100}%`;
        } else if (p.side === 1) {
          pos.right = `-${p.depth * 0.3}px`;
          pos.top = `${p.offset * 100}%`;
        } else if (p.side === 2) {
          pos.bottom = `-${p.depth * 0.3}px`;
          pos.left = `${p.offset * 100}%`;
        } else {
          pos.left = `-${p.depth * 0.3}px`;
          pos.top = `${p.offset * 100}%`;
        }
        return (
          <motion.span
            key={`${sceneKey}-${p.id}`}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 8}px ${color}`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.4, 1, 0.4],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* =====================================================================
   KINETIC BRAND — wordmark with letter-by-letter reveal
   ===================================================================== */
function KineticBrand({
  text,
  accentColor,
  sceneKey,
}: {
  text: string;
  accentColor: string;
  sceneKey: string;
}) {
  return (
    <h2
      key={sceneKey}
      className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none flex flex-wrap"
      dir="ltr"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.55,
            delay: 0.3 + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{
            color: char === " " ? "transparent" : "#fff",
            textShadow: char === " " ? "none" : `0 0 24px ${accentColor}99`,
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </h2>
  );
}

/* =====================================================================
   TICKET — refined cinema ticket selector
   ===================================================================== */
function Ticket({
  level,
  theme,
  isActive,
  disabled,
  onClick,
  onHover,
}: {
  level: (typeof COMMERCIAL_LEVELS)[number];
  theme: typeof SCENE_THEMES[string];
  isActive: boolean;
  disabled: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHover}
      disabled={disabled && !isActive}
      whileHover={!disabled || isActive ? { y: -4, scale: 1.03 } : {}}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative group flex items-stretch text-right transition-opacity duration-300",
        disabled && !isActive ? "opacity-40" : "opacity-100"
      )}
      style={{
        filter: isActive ? `drop-shadow(0 8px 24px ${theme.accent}66)` : "none",
      }}
    >
      <div
        className={cn(
          "relative pl-3 pr-5 py-3 md:pl-4 md:pr-7 md:py-4 rounded-l-xl rounded-r-sm border-2 transition-colors backdrop-blur-md",
          "min-w-[140px] md:min-w-[180px]"
        )}
        style={{
          backgroundColor: isActive ? `${theme.accent}25` : "rgba(255,255,255,0.04)",
          borderColor: isActive ? theme.primary : "rgba(255,255,255,0.12)",
        }}
      >
        <div
          className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] mb-1"
          style={{ color: isActive ? theme.primary : "rgba(255,255,255,0.4)" }}
        >
          SCENE · {theme.label}
        </div>
        <div
          className="text-sm md:text-lg font-black tracking-tight whitespace-nowrap"
          style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.7)" }}
        >
          {level.brandName}
        </div>
        <div
          className="text-[10px] md:text-xs font-light mt-0.5"
          style={{ color: isActive ? theme.primary : "rgba(255,255,255,0.45)" }}
        >
          {level.arTitle}
        </div>
        {isActive && (
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: theme.primary }}
          />
        )}
      </div>

      <div
        className="relative w-10 md:w-12 rounded-r-xl rounded-l-sm border-2 border-l-0 flex items-center justify-center font-mono font-bold text-base md:text-xl transition-colors backdrop-blur-md"
        style={{
          backgroundColor: isActive ? `${theme.accent}40` : "rgba(255,255,255,0.04)",
          borderColor: isActive ? theme.primary : "rgba(255,255,255,0.12)",
          color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
        }}
      >
        {theme.label}
        <span
          className="absolute -left-[2px] top-2 bottom-2 border-l-2 border-dashed pointer-events-none"
          style={{
            borderColor: isActive ? theme.primary : "rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </motion.button>
  );
}
