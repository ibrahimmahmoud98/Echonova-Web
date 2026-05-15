"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { AURA_IMAGES } from "@/lib/data/identity-portfolio";
import cloudinaryLoader from "@/lib/cloudinary-loader";
import { Fingerprint, Play, X, ChevronLeft, ChevronRight, Layers, Heart, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AuraGallery — replaces the old NOVA AURA carousel.
 *
 * Goal: showcase the studio's AI-modelling output in a way that feels
 * powerful, premium, and exploratory — not a basic image carousel.
 *
 * Layout: a 3D-feeling "portrait wall" of 14 floating cards. Each card
 * has its own depth (z-index/scale), a slight tilt, and breathes idle.
 * The cursor exerts a magnetic pull on nearby cards (they shift toward
 * the cursor and scale up, the rest recede). Clicking any card switches
 * to a fullscreen Focus Mode where the chosen portrait expands and the
 * visitor can navigate the entire 36-image library with keyboard / arrows.
 *
 * Why this design: identity / modelling sells "personality" — a static
 * grid says nothing about that. A living, reactive wall says "we have a
 * deep library of unique faces and you can dive into any of them".
 */

const VISIBLE_COUNT = 14;       // Cards visible on the wall at any time
const ROTATE_INTERVAL = 8000;   // Periodically swap a card for variety

// Pre-computed positions for each card on the wall.
// Coordinates are percentages of the container; depth defines z-stack.
// Carefully laid out so cards spread without overlapping the centre too much.
const CARD_LAYOUT: Array<{
  x: number;     // % from center (-50..+50)
  y: number;     // % from center
  rotate: number; // base rotation in deg
  depth: number; // 0..1, larger = closer to viewer
}> = [
  { x: -38, y: -30, rotate: -6, depth: 0.5 },
  { x: -22, y: -36, rotate:  3, depth: 0.85 },
  { x:  -3, y: -34, rotate: -2, depth: 0.7 },
  { x:  20, y: -32, rotate:  4, depth: 0.95 },
  { x:  38, y: -26, rotate: -3, depth: 0.55 },
  { x: -42, y:  -2, rotate:  2, depth: 0.65 },
  { x: -20, y:   0, rotate: -4, depth: 1.0 },   // hero center-left
  { x:   5, y:  -2, rotate:  1, depth: 0.9 },
  { x:  26, y:   4, rotate: -2, depth: 0.8 },
  { x:  44, y:   2, rotate:  5, depth: 0.6 },
  { x: -34, y:  28, rotate: -3, depth: 0.7 },
  { x: -10, y:  32, rotate:  4, depth: 0.85 },
  { x:  14, y:  30, rotate: -2, depth: 0.95 },
  { x:  36, y:  28, rotate:  3, depth: 0.55 },
];

export function AuraGallery() {
  const { playClick, playHover } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which 14 indices we're showing. Periodically rotate one out.
  const [visibleIndices, setVisibleIndices] = useState<number[]>(
    () => Array.from({ length: VISIBLE_COUNT }, (_, i) => i)
  );

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, inside: false });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Track container size — needed to convert % positions into px for motion.x/y
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mouse tracking (relative to container)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      setMouse({ x, y, inside });
    };
    const leave = () => setMouse((m) => ({ ...m, inside: false }));
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Periodically rotate one card out for variety
  useEffect(() => {
    if (focusIndex !== null) return; // Pause when in focus mode
    const id = setInterval(() => {
      setVisibleIndices((prev) => {
        const slot = Math.floor(Math.random() * prev.length);
        const used = new Set(prev);
        let next: number;
        let attempts = 0;
        do {
          next = Math.floor(Math.random() * AURA_IMAGES.length);
          attempts += 1;
        } while (used.has(next) && attempts < 20);
        const out = [...prev];
        out[slot] = next;
        return out;
      });
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [focusIndex]);

  // Focus mode handlers
  const openFocus = useCallback(
    (cardIdx: number) => {
      playClick();
      setFocusIndex(visibleIndices[cardIdx]);
    },
    [visibleIndices, playClick]
  );

  const closeFocus = useCallback(() => setFocusIndex(null), []);

  const navigateFocus = useCallback(
    (dir: 1 | -1) => {
      if (focusIndex === null) return;
      playClick();
      setFocusIndex(
        (focusIndex + dir + AURA_IMAGES.length) % AURA_IMAGES.length
      );
    },
    [focusIndex, playClick]
  );

  // Keyboard navigation in focus mode
  useEffect(() => {
    if (focusIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFocus();
      else if (e.key === "ArrowRight") navigateFocus(1);
      else if (e.key === "ArrowLeft") navigateFocus(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [focusIndex, closeFocus, navigateFocus]);

  // Compute per-card position with magnetic offset.
  // All values converted to PX (relative to container) so motion.x/y can
  // animate them directly — % on motion would be relative to the element.
  const cardPositions = useMemo(() => {
    const halfW = size.w / 2;
    const halfH = size.h / 2;
    return CARD_LAYOUT.map((base, i) => {
      const mx = (mouse.x - 0.5) * 100; // -50..+50
      const my = (mouse.y - 0.5) * 100;
      const dx = mx - base.x;
      const dy = my - base.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const PULL_RADIUS = 35;
      const pullStrength = mouse.inside
        ? Math.max(0, 1 - dist / PULL_RADIUS) * 0.45
        : 0;
      const offsetXpct = dx * pullStrength;
      const offsetYpct = dy * pullStrength;
      const isHover = hoveredCard === i;
      const scale = (0.55 + base.depth * 0.45) * (isHover ? 1.18 : 1);
      const parX = (mouse.x - 0.5) * (base.depth - 0.5) * -30;
      const parY = (mouse.y - 0.5) * (base.depth - 0.5) * -20;

      // Convert % → px relative to container center
      const xPx = ((base.x + offsetXpct + parX) / 100) * halfW * 2;
      const yPx = ((base.y + offsetYpct + parY) / 100) * halfH * 2;

      return {
        xPx,
        yPx,
        scale,
        rotate: base.rotate + offsetXpct * 0.15,
        zIndex: Math.round(base.depth * 100) + (isHover ? 200 : 0),
        depth: base.depth,
        isHover,
      };
    });
  }, [mouse, hoveredCard, size]);

  return (
    <section
      id="services-aura"
      className="relative w-full py-20 md:py-28 overflow-hidden"
    >
      {/* Header */}
      <div className="container mx-auto px-4 mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 opacity-80">
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
          <span className="text-[var(--color-copper)] text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
            Chapter 04 · Identity
          </span>
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-tight pb-2">
          <span className="font-english">NOVA AURA</span>
        </h2>
        <p className="text-[var(--color-copper)] text-lg md:text-xl font-bold mt-3">
          سفراء علامتك التجارية
        </p>
        <div className="flex items-center justify-center gap-4 my-5">
          <span className="block w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-copper)]/50" />
          <span className="text-[var(--color-copper)] text-base opacity-70 select-none" aria-hidden="true">✦</span>
          <span className="block w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-copper)]/50" />
        </div>
        <p className="text-[var(--color-ivory)]/70 max-w-xl mx-auto text-sm md:text-base font-light italic">
          مكتبة وجوه افتراضية مولّدة بالذكاء الاصطناعي. حرّك المؤشر لتستكشف. اضغط أي صورة لتغوص داخلها.
        </p>
      </div>

      {/* THE WALL */}
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          maxWidth: "1400px",
          height: "min(720px, 80vh)",
          perspective: "1500px",
        }}
      >
        {/* Ambient glow that follows mouse */}
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full blur-[120px]"
          animate={{
            opacity: mouse.inside ? 0.7 : 0.4,
          }}
          style={{
            width: 600,
            height: 600,
            left: `calc(${mouse.x * 100}% - 300px)`,
            top: `calc(${mouse.y * 100}% - 300px)`,
            background:
              "radial-gradient(circle, rgba(217,112,64,0.4) 0%, transparent 70%)",
            transition: "left 0.8s ease-out, top 0.8s ease-out",
          }}
        />

        {/* Floating cards */}
        {visibleIndices.map((imgIdx, i) => {
          const pos = cardPositions[i];
          return (
            <motion.button
              key={`${i}-${imgIdx}`}
              onClick={() => openFocus(i)}
              onMouseEnter={() => { setHoveredCard(i); playHover(); }}
              onMouseLeave={() => setHoveredCard(null)}
              aria-label={`عرض صورة ${imgIdx + 1}`}
              className="absolute top-1/2 left-1/2 group"
              style={{
                width: "min(180px, 22vw)",
                height: "min(260px, 32vw)",
                marginLeft: "calc(min(180px, 22vw) / -2)",
                marginTop: "calc(min(260px, 32vw) / -2)",
                zIndex: pos.zIndex,
                willChange: "transform",
                pointerEvents: "auto",
              }}
              animate={{
                x: pos.xPx,
                y: pos.yPx,
                scale: pos.scale,
                rotate: pos.rotate,
                opacity: pos.depth * 0.5 + 0.5,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 18,
                mass: 0.6,
              }}
            >
              {/* Card frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A0E18] border border-white/10 shadow-2xl">
                {/* Image (Cloudinary loader) */}
                <Image
                  src={AURA_IMAGES[imgIdx]}
                  alt={`نموذج Nova Aura رقم ${imgIdx + 1} من إنتاج إيكونوڤا ستديو`}
                  fill
                  className="object-cover"
                  sizes="220px"
                  loader={cloudinaryLoader}
                  draggable={false}
                />

                {/* Bottom gradient + index badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div
                  className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-mono tracking-widest font-bold rounded-sm bg-black/60 text-white/80 backdrop-blur-sm border border-white/10"
                  dir="ltr"
                >
                  {String(imgIdx + 1).padStart(3, "0")} / {String(AURA_IMAGES.length).padStart(3, "0")}
                </div>

                {/* Hover overlay — copper rim + 'view' chip */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300 pointer-events-none flex items-center justify-center",
                    pos.isHover ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="absolute inset-0 ring-2 ring-[var(--color-copper)] rounded-2xl" />
                  <div className="absolute inset-0 bg-[var(--color-copper)]/10" />
                  <div className="relative w-12 h-12 rounded-full bg-[var(--color-copper)]/95 flex items-center justify-center shadow-[0_0_30px_rgba(217,112,64,0.7)]">
                    <Eye className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        {/* Hint text — center, only when nothing hovered */}
        <AnimatePresence>
          {!hoveredCard && !mouse.inside && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            >
              <div className="text-center">
                <p className="text-white/40 text-xs font-mono tracking-[0.4em] uppercase">
                  Move · Hover · Click
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Counter (top-right) */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/70 z-50 pointer-events-none"
          dir="ltr"
        >
          <span className="text-[var(--color-copper)]">{AURA_IMAGES.length}</span> فيس
        </div>
      </div>

      {/* === Below: features grid + CTAs === */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          <div className="text-right" dir="rtl">
            <p className="text-base md:text-lg text-[var(--color-ivory)]/80 leading-relaxed font-light">
              حيث يذوب الخيال في جوهر هوية علامتك التجارية. نقدم لعلامتك وجوهاً وشخصيات تتجاوز حدود الواقع في دقتها وتنوعها، لكنها لا تخرج أبداً عن نطاق روح علامتك التجارية. نحن نمنحك حرية بصرية مطلقة و Vibes يُصمم خصيصاً ليتناغم مع القواعد البصرية لهويتك.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/services/aura">
                <LiquidButton variant="secondary" className="px-5 py-2.5 text-sm">
                  اعرف أكثر
                </LiquidButton>
              </Link>
              <button
                onClick={() => {
                  playClick();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={playHover}
                className="px-6 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-[var(--color-copper)] to-orange-500 text-white hover:shadow-[0_0_30px_rgba(217,112,64,0.5)] transition-shadow"
              >
                اطلب هويتك
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Fingerprint, title: "بصمة فريدة", body: "DNA حصري لعلامتك" },
              { icon: Layers, title: "ثبات الملامح", body: "تطابق عبر آلاف الصور" },
              { icon: Heart, title: "نقل الأورا", body: "مشاعر تنبض بالحياة" },
              { icon: Sparkles, title: "خيال بلا حدود", body: "إنتاج لا يقيده الواقع" },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:bg-white/[0.06] hover:border-[var(--color-copper)]/30 transition-all"
              >
                <f.icon className="w-4 h-4 text-[var(--color-copper)] mb-2" />
                <h4 className="text-white text-sm font-bold mb-1">{f.title}</h4>
                <p className="text-white/50 text-[11px] leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ FOCUS MODE (Portal to body to escape GSAP transform) ============ */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {focusIndex !== null && (
            <motion.div
              key="focus-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeFocus}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
              {/* Close */}
              <button
                onClick={closeFocus}
                aria-label="إغلاق"
                className="absolute top-4 left-4 z-50 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Counter */}
              <div className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-sm font-mono text-white/80" dir="ltr">
                <span className="text-[var(--color-copper)] font-bold">
                  {String(focusIndex + 1).padStart(2, "0")}
                </span>
                {" "}/{" "}
                <span className="text-white/50">
                  {String(AURA_IMAGES.length).padStart(2, "0")}
                </span>
              </div>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateFocus(-1); }}
                onMouseEnter={playHover}
                aria-label="السابق"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-[var(--color-copper)]/30 backdrop-blur-md border border-white/10 hover:border-[var(--color-copper)] flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateFocus(1); }}
                onMouseEnter={playHover}
                aria-label="التالي"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-[var(--color-copper)]/30 backdrop-blur-md border border-white/10 hover:border-[var(--color-copper)] flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Hero image — natural aspect ratio, fits within viewport */}
              <motion.div
                key={focusIndex}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center justify-center"
                style={{
                  width: "calc(100vw - 160px)",
                  height: "calc(100vh - 120px)",
                }}
              >
                <Image
                  src={AURA_IMAGES[focusIndex]}
                  alt={`Nova Aura — صورة ${focusIndex + 1}`}
                  fill
                  className="object-contain rounded-3xl"
                  sizes="90vw"
                  loader={cloudinaryLoader}
                  priority
                />
              </motion.div>

              {/* Hint bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 text-[10px] font-mono tracking-widest text-white/40 uppercase pointer-events-none" dir="ltr">
                <span>← →</span><span>NAVIGATE</span>
                <span className="opacity-50">·</span>
                <span>ESC</span><span>CLOSE</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
