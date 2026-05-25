"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmartVideo } from "@/components/ui/SmartVideo";
import { HERO_VIDEO_URL } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Story — "Through The Lens"
 *
 * Pinned cinematic section: a giant camera lens fills the screen.
 * Scrolling controls the aperture (closed → fully open → closing again),
 * blade rotation, and the active text stanza. A video plays through the
 * iris while three brand stanzas crossfade.
 */

const STANZAS = [
  {
    headline: "قصتنا تبدأ بعدسة...",
    body: "كل قصة عظيمة بدأت من خلف عدسة. نحن نوسّع تلك العدسة لتلتقط ما لم يكن ممكناً تصويره من قبل.",
  },
  {
    headline: "ثم جاء الكود",
    body: "في إيكونوڤا ستديو، نحن لا نستبدل الإبداع، بل نمنحه أجنحة رقمية. خيال المبدعين والكُتّاب العرب يلتقي بأحدث تقنيات الذكاء الاصطناعي التوليدي.",
  },
  {
    headline: "نحن لا نلغي الكاميرا..",
    body: "بل نتجاوزها. نكسر قيود الميزانيات التقليدية وعوائق الوقت، ونمنح علامتك التجارية قصصاً سينمائية عالمية المستوى، تُصاغ بروح عربية مبتكرة كانت بالأمس ضرباً من الخيال.",
  },
];

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  // Pinned scroll trigger
  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;
      // Pin extended to +=320% (was 250%) so the lens has scroll-room to:
      //   open → hold (3 stanzas) → CLOSE FULLY → blackout
      // The blackout hands off seamlessly to HomeServicesSection's
      // IrisOpenIntro, which reopens the lens to reveal the next chapter.
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=320%",
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => setProgress(self.progress),
      });
      return () => trigger.kill();
    },
    { scope: containerRef }
  );

  // Cursor parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Aperture phases over the extended pin (+=320%):
  //   0.00 → 0.20  OPEN     aperture 0.10 → 1.0
  //   0.20 → 0.50  HOLD     aperture 1.0   (3 stanzas play)
  //   0.50 → 0.80  CLOSE    aperture 1.0 → 0
  //   0.80 → 1.00  SHUT     aperture 0     (lens housing scales up + black overlay
  //                                          fills viewport, handing off cleanly to
  //                                          HomeServicesSection's IrisOpenIntro)
  const apertureRadius =
    progress < 0.20
      ? 0.10 + (progress / 0.20) * 0.90
      : progress < 0.50
      ? 1.0
      : progress < 0.80
      ? 1.0 - ((progress - 0.50) / 0.30) * 1.0
      : 0;

  // Stanza progression — only meaningful in the HOLD window
  const stanzaIndex = progress < 0.30 ? 0 : progress < 0.42 ? 1 : 2;
  const stanza = STANZAS[stanzaIndex];
  const bladeRotation = progress * 60;
  const videoScale = 1 + progress * 0.15;
  const parallaxX = (mouse.x - 0.5) * 30;
  const parallaxY = (mouse.y - 0.5) * 20;

  // SHUT phase enhancement (progress 0.80 → 1.00): the closed lens housing
  // scales up beyond the viewport and a black overlay fades in, so by the
  // end of the pin the screen is fully black — a clean canvas for the next
  // section's IrisOpenIntro to "reopen" the lens onto.
  const shutProgress = progress > 0.80 ? (progress - 0.80) / 0.20 : 0;
  const lensScale = 1 + shutProgress * 4; // 1× → 5× (housing eats the viewport)
  const blackoutOpacity = Math.min(1, shutProgress * 1.35);

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background video bleed (dim) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px) scale(1.05)` }}
      >
        <SmartVideo
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(2,11,22,0.92) 70%)",
          }}
        />
      </div>

      {/* Cinematic Lens — scales up during the SHUT phase so the black housing
          fills the viewport (visual "fade to black" via the lens itself, not
          a generic overlay). Combined with blackoutOpacity below, this hands
          off perfectly to the next section's iris-open intro.

          ARCHITECTURE NOTE (2026-05-12 mobile fix):
          The lens was originally a single <svg> with a <foreignObject> holding
          the video clipped by <clipPath>. iOS Safari has well-known bugs with
          foreignObject + clipPath — the video escaped the SVG container and
          rendered at the top-left of the viewport on mobile.

          Fix: split rendering into three sandwiched layers, all centered:
            1. BACK <svg>  — outer rings, ticks, lens housing (drawn first)
            2. <video>     — plain HTML element, clipped via CSS clip-path
            3. FRONT <svg> — glow, vignette, blades, ring, crosshair (drawn last)

          The iris geometry must stay in lock-step:
            - SVG viewBox is -100..100 (200 units); rendered at 120vmin.
            - 1 viewBox unit = 0.6 vmin on screen.
            - Original SVG iris max radius = 70 units = 42 vmin.
            - HTML video box is sized 84vmin × 84vmin (twice the radius)
              and clipped with circle(R% at center), where R = apertureRadius * 50.
              At apertureRadius = 1.0 → 50% → circle inscribed in the box,
              radius 42vmin. Matches SVG geometry exactly. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${lensScale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-[120vmin] h-[120vmin] max-w-none flex items-center justify-center">
          {/* ── LAYER 1 (BACK): outer rings + ticks + lens housing ── */}
          <svg
            viewBox="-100 -100 200 200"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {/* Outer rings */}
            <circle cx="0" cy="0" r="98" fill="none" stroke="rgba(217,112,64,0.08)" strokeWidth="0.4" />
            <circle cx="0" cy="0" r="92" fill="none" stroke="rgba(217,112,64,0.18)" strokeWidth="0.4" />
            <circle cx="0" cy="0" r="86" fill="none" stroke="rgba(255,214,165,0.12)" strokeWidth="0.4" />

            {/* Tick marks — pre-rounded to fixed precision so server and client
                render identical SVG attributes (avoids hydration mismatch). */}
            <g stroke="rgba(255,214,165,0.5)" strokeWidth="0.6">
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2;
                const isMajor = i % 5 === 0;
                const r1 = isMajor ? 78 : 80;
                const r2 = 82;
                const round = (v: number) => Math.round(v * 1000) / 1000;
                return (
                  <line
                    key={i}
                    x1={round(Math.cos(angle) * r1)}
                    y1={round(Math.sin(angle) * r1)}
                    x2={round(Math.cos(angle) * r2)}
                    y2={round(Math.sin(angle) * r2)}
                    opacity={isMajor ? 0.9 : 0.4}
                  />
                );
              })}
            </g>

            {/* Lens housing — dark fill sits BEHIND the html video, so when the
                iris is fully open the video covers it; as the iris closes
                (clip-path shrinks), the dark housing is revealed. */}
            <circle cx="0" cy="0" r="76" fill="rgba(0,0,0,0.6)" stroke="rgba(217,112,64,0.4)" strokeWidth="0.5" />
          </svg>

          {/* ── LAYER 2 (MIDDLE): the HTML video, CSS-clipped to the iris ──
              Sized to match the original SVG iris (radius 70 in 200-unit viewBox
              = 35% of 120vmin = 42vmin radius = 84vmin diameter).
              clip-path: circle(R% at center) — R goes 0→50 as aperture opens.
              CSS clip-path is well-supported on iOS Safari, unlike SVG
              foreignObject + clipPath. */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              width: "84vmin",
              height: "84vmin",
              clipPath: `circle(${apertureRadius * 50}% at center)`,
              WebkitClipPath: `circle(${apertureRadius * 50}% at center)`,
              transform: `scale(${videoScale})`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease-out",
            }}
          >
            <video
              src={HERO_VIDEO_URL}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* ── LAYER 3 (FRONT): glow + vignette + blades + iris ring + crosshair ──
              Drawn on top of the video so the closing aperture blades cover it. */}
          <svg
            viewBox="-100 -100 200 200"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="lens-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,214,165,0.6)" />
                <stop offset="60%" stopColor="rgba(217,112,64,0.4)" />
                <stop offset="100%" stopColor="rgba(217,112,64,0)" />
              </radialGradient>
              <radialGradient id="lens-vignette" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.85)" />
              </radialGradient>
            </defs>

            {/* Lens glow */}
            <circle
              cx="0"
              cy="0"
              r={apertureRadius * 70}
              fill="url(#lens-glow)"
              opacity={0.3 + progress * 0.4}
            />

            {/* Iris vignette */}
            <circle cx="0" cy="0" r={apertureRadius * 70} fill="url(#lens-vignette)" />

            {/* APERTURE BLADES — 8 wedges. Use SVG transform attribute, not CSS,
                so rotation pivots around the viewBox origin (0,0 = center).
                Float values are rounded to avoid SSR/CSR hydration mismatches. */}
            <g transform={`rotate(${Math.round(bladeRotation * 100) / 100})`}>
              {Array.from({ length: 8 }).map((_, i) => {
                const startAngle = (i / 8) * 360;
                const endAngle = ((i + 1) / 8) * 360;
                const innerR = Math.max(0.001, Math.round(apertureRadius * 70 * 1000) / 1000);
                const outerR = 76;
                const a1 = (startAngle * Math.PI) / 180;
                const a2 = (endAngle * Math.PI) / 180;
                const round = (v: number) => Math.round(v * 1000) / 1000;
                const x1 = round(Math.cos(a1) * innerR);
                const y1 = round(Math.sin(a1) * innerR);
                const x2 = round(Math.cos(a2) * innerR);
                const y2 = round(Math.sin(a2) * innerR);
                const x3 = round(Math.cos(a2) * outerR);
                const y3 = round(Math.sin(a2) * outerR);
                const x4 = round(Math.cos(a1) * outerR);
                const y4 = round(Math.sin(a1) * outerR);
                const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                const path = `M ${x1} ${y1} A ${innerR} ${innerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${outerR} ${outerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
                return (
                  <path
                    key={i}
                    d={path}
                    fill="rgba(8, 8, 12, 0.97)"
                    stroke="rgba(217,112,64,0.25)"
                    strokeWidth="0.2"
                  />
                );
              })}
            </g>

            {/* Iris ring */}
            <circle
              cx="0"
              cy="0"
              r={apertureRadius * 70 + 0.5}
              fill="none"
              stroke="rgba(217,112,64,0.7)"
              strokeWidth="0.4"
            />

            {/* Center crosshair (only when nearly closed) */}
            {apertureRadius < 0.3 && (
              <g stroke="rgba(217,112,64,0.7)" strokeWidth="0.4">
                <line x1="-3" y1="0" x2="3" y2="0" />
                <line x1="0" y1="-3" x2="0" y2="3" />
                <circle cx="0" cy="0" r="1" fill="rgba(217,112,64,0.5)" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Stanzas — fade out as the lens shuts so the SHUT-phase blackout
          isn't sitting underneath floating text. */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 z-20"
        style={{ opacity: 1 - shutProgress }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stanzaIndex}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center max-w-3xl mx-auto"
          >
            {/* Readability scrim — radial dark gradient sits BEHIND the text
                so headline + body stay legible regardless of how bright the
                lens-iris video gets behind them. Soft edges, no visible box. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-8 md:-m-12 pointer-events-none rounded-[40%]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 75%)",
                filter: "blur(8px)",
              }}
            />
            <h2
              className="relative text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.05]"
              style={{
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.85), 0 8px 32px rgba(0,0,0,0.75)",
              }}
            >
              {stanza.headline}
            </h2>
            <p
              className="relative text-base md:text-lg text-[var(--color-ivory)] leading-relaxed font-semibold max-w-2xl mx-auto"
              style={{
                textShadow:
                  "0 1px 3px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.85), 0 4px 20px rgba(0,0,0,0.7)",
              }}
            >
              {stanza.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SHUT-phase blackout — fades in over progress 0.80 → 0.95.
          Combined with the lens housing scaling up, this turns the screen
          fully black so the next section's IrisOpenIntro can seamlessly
          "reopen" the lens onto the new chapter. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[40] pointer-events-none bg-black"
        style={{ opacity: blackoutOpacity }}
      />

      {/* Stanza progress dots — fade out during the SHUT phase so they
          don't sit on top of the blackout. */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2"
        style={{ opacity: 1 - shutProgress }}
      >
        {STANZAS.map((_, i) => (
          <span
            key={i}
            className={`block h-px transition-all duration-500 ${
              i === stanzaIndex ? "w-10 bg-[var(--color-copper)]" : "w-5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
