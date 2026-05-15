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
 * HorizontalSlideIn — receiving half of the lateral handoff.
 *
 * IMPORTANT architectural fix vs. the first attempt:
 * The wrapped section PINS itself at viewport top for the duration of the
 * slide-in. While pinned, the user's scroll DRIVES the horizontal motion
 * — it does NOT move the section vertically. So the previous section
 * (e.g. MethodologyScroll's last step) and this section share the SAME
 * viewport position throughout the transition. The user's scroll feels
 * like it's pushing the next section in laterally, not like they're
 * scrolling DOWN to a new section that happens to slide.
 *
 * Flow:
 *   1. MethodologyScroll's pin releases on its last step
 *   2. THIS section IMMEDIATELY pins itself at viewport top
 *   3. Initially, this section's content is translated 100% off-screen to
 *      the entry side (right by default — RTL-natural)
 *   4. Continued scroll moves the content from off-screen to in-place
 *      (translateX 100% → 0%) while it stays pinned
 *   5. Slide complete → pin releases → user continues scrolling normally
 *      through the wrapped section's content (no jump)
 *
 * Notes:
 *  - Uses GSAP ScrollTrigger pin (consistent with the rest of the project)
 *  - respects prefers-reduced-motion (renders children directly, no pin)
 *  - overflow-hidden on the wrapper prevents horizontal scrollbars from
 *    appearing while content is off-screen
 *  - copper edge-glow tracks the leading edge during the slide
 */

interface HorizontalSlideInProps {
  children: React.ReactNode;
  /** Side from which the section enters. */
  from?: "right" | "left";
  /**
   * How long the slide takes, in viewport heights of scroll.
   * Default 1.0 = the slide consumes one full screen of scroll.
   */
  scrollLength?: number;
  /** Optional className for the wrapper. */
  className?: string;
}

export function HorizontalSlideIn({
  children,
  from = "right",
  scrollLength = 1.0,
  className = "",
}: HorizontalSlideInProps) {
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

  // Slide geometry — content starts at 100% off-screen, lands at 0%.
  const startPercent = from === "right" ? 100 : -100;
  const xPercent = startPercent * (1 - progress);
  // Subtle "arrival" scale — feels like the section is coming from depth,
  // not just translating flat across.
  const scale = 0.94 + progress * 0.06;
  // Velocity blur fades as content lands.
  const blur = Math.max(0, (1 - progress) * 6);
  // Leading-edge copper glow fades as it lands.
  const edgeOpacity = Math.max(0, (1 - progress) * 0.85);

  if (reduceMotion) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden min-h-screen ${className}`}
      style={{ isolation: "isolate" }}
    >
      <div
        style={{
          transform: `translateX(${xPercent}%) scale(${scale})`,
          transformOrigin: from === "right" ? "right center" : "left center",
          filter: `blur(${blur}px)`,
          willChange: "transform, filter",
        }}
      >
        {children}
      </div>

      {/* Leading-edge copper glow — visible while the section is mid-slide.
          Sits on the side from which the section is entering. */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          opacity: edgeOpacity,
          width: "8vw",
          [from === "right" ? "right" : "left"]: 0,
          background:
            from === "right"
              ? "linear-gradient(to left, rgba(217,112,64,0.35), transparent)"
              : "linear-gradient(to right, rgba(217,112,64,0.35), transparent)",
          mixBlendMode: "screen",
          zIndex: 5,
        }}
      />
    </div>
  );
}
