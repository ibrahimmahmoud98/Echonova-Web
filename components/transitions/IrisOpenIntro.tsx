"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * IrisOpenIntro — receiving half of the cinematic lens transition.
 *
 * Architecture:
 * The wrapped children are rendered in a FIXED viewport-filling container
 * that sits BEHIND the iris overlay. The iris overlay (fully opaque black
 * with a growing circular hole) animates on top. This means:
 *
 *   1. Previous section (Story) finishes its SHUT phase → viewport is black
 *   2. Story's pin releases → this section pins at viewport top
 *   3. Children are FIXED in the viewport background — they do NOT scroll.
 *      They appear stationary, as if they've always been there behind the
 *      black screen — emerging from the Z-axis/depth.
 *   4. Continued scroll opens the iris hole — revealing the children
 *   5. Iris fully open → pin releases → children transition to normal flow
 *      and the user continues scrolling through the section's content.
 */

interface IrisOpenIntroProps {
  children: React.ReactNode;
  scrollLength?: number;
  tint?: string;
}

export function IrisOpenIntro({
  children,
  scrollLength = 1.0,
  tint = "var(--color-copper, #D97040)",
}: IrisOpenIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || reduceMotion) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${scrollLength * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => setProgress(self.progress),
      });
      return () => trigger.kill();
    },
    { scope: containerRef, dependencies: [reduceMotion, scrollLength] }
  );

  // Iris geometry — radius grows linearly with scroll progress.
  // 180vmax is comfortably past the diagonal of any viewport.
  const holeRadius = progress * 180;

  // Iris ring tracks the hole edge. We scale a 1vmax base circle.
  const ringScale = Math.max(0.05, progress * 200);
  const ringOpacity = clamp(
    progress < 0.7 ? 1 - progress * 0.7 : (1 - progress) * 3.3
  );

  // Centre spark — a flicker at the very heart of the lens, only at the
  // start of the open before the iris swallows it.
  const sparkOpacity = clamp(progress < 0.15 ? 1 - progress / 0.15 : 0);

  // Whole overlay opacity — fade out only in the very last bit so the iris
  // edge doesn't leave a 1px ring artifact when it exits the viewport.
  const overlayOpacity = clamp(progress < 0.95 ? 1 : (1 - progress) * 20);

  if (reduceMotion) {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <div ref={containerRef} className="relative">
      {children}

      {/* Iris overlay — fills the viewport with `inset-0` (top/right/bottom/left
          all 0). The overlay starts fully opaque (progress=0 → holeRadius=0 →
          solid black), matching the previous section's blackout. As scroll
          progresses, the hole grows, revealing the stationary children
          underneath — creating the Z-axis depth illusion.

          MOBILE FIX (2026-05-12): originally `top-0 left-0` + `width:100vw
          height:100vh`. On iOS Safari, 100vh is the LARGEST viewport
          (address bar collapsed), so when the address bar was visible the
          overlay left ~80px gaps top and bottom, exposing the body's navy bg
          as a horizontal strip. `inset-0` stretches to the actual viewport
          edges (independent of address bar state), eliminating the gap. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[80] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        {/* Black backdrop with circular hole punched via radial mask */}
        <div
          className="absolute inset-0 bg-black"
          style={{
            WebkitMaskImage: `radial-gradient(circle at 50vw 50vh, transparent ${holeRadius}vmax, black ${
              holeRadius + 0.5
            }vmax)`,
            maskImage: `radial-gradient(circle at 50vw 50vh, transparent ${holeRadius}vmax, black ${
              holeRadius + 0.5
            }vmax)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        {/* Copper iris ring */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full border"
          style={{
            width: "1vmax",
            height: "1vmax",
            borderColor: tint,
            borderWidth: 2,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOpacity,
            boxShadow: `0 0 30px ${tint}99`,
          }}
        />

        {/* Centre spark */}
        <div
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: 6,
            height: 6,
            background: tint,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 20px ${tint}`,
            opacity: sparkOpacity,
          }}
        />
      </div>
    </div>
  );
}

/** Clamp to [0, 1]. */
function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
