"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CinematicLoader — first-visit only intro that frames ENS as a film studio.
 *
 * Sequence:
 *   1. Black void.
 *   2. Filmstrip slides across with sprocket holes (frames carry titles).
 *   3. Production slate appears: "ECHONOVA STUDIO / SCENE 01 / TAKE 01 / DIR. ENS"
 *   4. Slate clapper claps shut with kinetic motion blur (sound: sharp click).
 *   5. White flash for 1 frame.
 *   6. Iris circular reveal opens to expose the actual site beneath.
 *
 * Lives only on first visit (sessionStorage gate). Can be skipped via Esc.
 * Total duration ≈ 4.2s. Skippable.
 */

const STORAGE_KEY = "ens-cinematic-loader-shown";

interface CinematicLoaderProps {
  forceShow?: boolean;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ forceShow = false }) => {
  // Gate: only show on first session (or forceShow)
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState<
    "filmstrip" | "slate" | "snap" | "flash" | "iris" | "done"
  >("filmstrip");
  const audioRef = useRef<{ click: HTMLAudioElement | null; whoosh: AudioContext | null }>({
    click: null,
    whoosh: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (forceShow) {
      setShow(true);
      return;
    }
    const seen = window.sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setShow(true);
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, [forceShow]);

  // Stage timing
  useEffect(() => {
    if (!show) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 0.0s — filmstrip starts (initial)
    // 1.4s — slate appears
    timers.push(setTimeout(() => setStage("slate"), 1400));
    // 2.8s — slate snaps
    timers.push(setTimeout(() => setStage("snap"), 2800));
    // 3.0s — white flash
    timers.push(setTimeout(() => setStage("flash"), 3000));
    // 3.15s — iris opens
    timers.push(setTimeout(() => setStage("iris"), 3150));
    // 4.4s — done, unmount
    timers.push(setTimeout(() => {
      setStage("done");
      setShow(false);
    }, 4400));

    return () => timers.forEach(clearTimeout);
  }, [show]);

  // Skip on Esc
  useEffect(() => {
    if (!show) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStage("done");
        setShow(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [show]);

  // Slate snap sound
  useEffect(() => {
    if (stage !== "snap") return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      // Sharp short click — wood-like attack
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = "square";
      o1.frequency.setValueAtTime(180, ctx.currentTime);
      o1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.05);
      o2.type = "triangle";
      o2.frequency.setValueAtTime(2200, ctx.currentTime);
      o2.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      g.gain.setValueAtTime(0.18, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      o1.connect(g); o2.connect(g); g.connect(ctx.destination);
      o1.start(); o2.start();
      o1.stop(ctx.currentTime + 0.2); o2.stop(ctx.currentTime + 0.2);
    } catch {}
  }, [stage]);

  if (!show) return null;

  // Iris circle params — grows from a point at center to cover the screen
  const irisRadius = stage === "iris" ? 150 : 0; // % of viewport

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black overflow-hidden pointer-events-auto"
          style={{
            // Iris reveal: clip-path circle that expands from center outward
            clipPath: stage === "iris" || stage === "done"
              ? `circle(${irisRadius}% at 50% 50%)`
              : "circle(100% at 50% 50%)",
            transition:
              stage === "iris"
                ? "clip-path 1.25s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
          }}
        >
          {/* Skip hint */}
          <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-white/30 uppercase pointer-events-none z-50">
            Press Esc to skip
          </div>

          {/* === STAGE 1: FILMSTRIP === */}
          <AnimatePresence>
            {stage === "filmstrip" && (
              <motion.div
                key="filmstrip"
                initial={{ x: "100vw", opacity: 0 }}
                animate={{ x: "-30vw", opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
                className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <FilmFrame key={i} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* === STAGE 2/3: SLATE === */}
          <AnimatePresence>
            {(stage === "slate" || stage === "snap") && (
              <motion.div
                key="slate"
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Slate snapping={stage === "snap"} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* === STAGE 4: WHITE FLASH === */}
          <AnimatePresence>
            {stage === "flash" && (
              <motion.div
                key="flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
                className="absolute inset-0 bg-white pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* === STAGE 5: BRIEF DARK BEFORE IRIS === */}
          {/* The clipPath transition handles the iris reveal — no extra layer needed */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ====================================================================
   FILM FRAME — single sprocketed frame on the filmstrip
   ==================================================================== */
const FilmFrame: React.FC<{ index: number }> = ({ index }) => {
  const isAccent = index === 5 || index === 6;
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: "180px", flexShrink: 0 }}
    >
      {/* Top sprocket holes */}
      <div className="flex justify-around w-full px-3 py-1 bg-black/95">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="block w-3 h-2 bg-white/30 rounded-sm" />
        ))}
      </div>
      {/* Frame body */}
      <div
        className={`w-full h-[120px] flex items-center justify-center border-y border-white/5 ${
          isAccent ? "bg-[var(--color-copper)]/15" : "bg-[#0a0a0a]"
        }`}
      >
        <span
          className={`font-mono text-[10px] tracking-[0.3em] ${
            isAccent ? "text-[var(--color-copper)]" : "text-white/15"
          }`}
        >
          {isAccent ? `0${index}/12` : ""}
        </span>
      </div>
      {/* Bottom sprocket holes */}
      <div className="flex justify-around w-full px-3 py-1 bg-black/95">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="block w-3 h-2 bg-white/30 rounded-sm" />
        ))}
      </div>
    </div>
  );
};

/* ====================================================================
   SLATE — film production clapperboard
   ==================================================================== */
const Slate: React.FC<{ snapping: boolean }> = ({ snapping }) => {
  return (
    <div className="relative w-[min(560px,90vw)] aspect-[16/10] flex flex-col [perspective:1200px]">
      {/* Clapper (stripes top) — rotates down on snap */}
      <motion.div
        animate={{ rotateX: snapping ? 0 : -38 }}
        initial={{ rotateX: -38 }}
        transition={{ duration: 0.15, ease: [0.7, -0.2, 0.5, 1.5] }}
        style={{ transformOrigin: "left bottom", transformStyle: "preserve-3d" }}
        className="relative h-[22%] w-full bg-black flex border-2 border-white/95 origin-bottom"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-full ${i % 2 === 0 ? "bg-black" : "bg-white"}`}
            style={{ transform: `skewX(-12deg)` }}
          />
        ))}
        {/* Motion blur lines on snap */}
        {snapping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"
          />
        )}
      </motion.div>

      {/* Slate body */}
      <div className="flex-1 w-full bg-[#0a0a0a] border-2 border-white/95 border-t-0 p-5 md:p-7 grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-white">
        <SlateField label="Production" value="ECHONOVA STUDIO" />
        <SlateField label="Director" value="ENS" />
        <SlateField label="Scene" value="01" big />
        <SlateField label="Take" value="01" big />
        <SlateField label="Date" value={new Date().toISOString().slice(0, 10)} />
        <SlateField label="Format" value="DIGITAL · 8K" />
      </div>

      {/* Reflection sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

const SlateField: React.FC<{ label: string; value: string; big?: boolean }> = ({
  label,
  value,
  big,
}) => (
  <div className="flex flex-col text-left" dir="ltr">
    <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-white/45 uppercase">
      {label}
    </span>
    <span
      className={`text-white font-bold tracking-wide ${
        big ? "text-2xl md:text-4xl text-[var(--color-copper)]" : "text-sm md:text-lg"
      }`}
    >
      {value}
    </span>
  </div>
);
