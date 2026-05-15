"use client";

import React, { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SmartVideo } from "@/components/ui/SmartVideo";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "الاستكشاف والتحليل",
    desc: "فهم عميق لأهداف العميل والجمهور المستهدف.",
    color: "#020B16",
    image: "/images/nova_aura_dna.png",
    video: "/placeholders/life-loop.mp4",
  },
  {
    num: "02",
    title: "السرد القصصي البشري",
    desc: "كتابة السيناريو والمشاعر بواسطة محترفين.",
    color: "#140a05",
    image: "/images/nova_saga_storyboard.png",
  },
  {
    num: "03",
    title: "هندسة الخيال",
    desc: "تحويل خيال و رؤية العميل الى اصول بصرية جذابة",
    color: "#0a0b1e",
    image: "/images/nova_cinema_anamorphic_lens_flare_1766262442202.png",
  },
  {
    num: "04",
    title: "التوليد والإخراج",
    desc: "توليد المشاهد تحت إشراف مخرج فني.",
    color: "#160404",
    image: "/images/nova_cinema_camera_rig_dark_1766262384875.png",
    video: "/placeholders/life-loop.mp4",
  },
  {
    num: "05",
    title: "المونتاج واللمسة النهائية",
    desc: "تجميع المشاهد وإضافة المؤثرات الصوتية.",
    color: "#030303",
    image: "/images/nova_cinema_color_grading_suite_1766262427888.png",
  },
  {
    num: "06",
    title: "التسليم والأثر",
    desc: "تسليم العمل ليصنع الصدى المتوقع.",
    color: "#000000",
    image: "/images/nova_saga_poster.png",
  },
];

// Contact section background color (must match ContactPageReveal)
const CONTACT_BG = "#020B16";

interface MethodologyScrollProps {
  endPanel?: React.ReactNode;
}

export function MethodologyScroll({ endPanel }: MethodologyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  // 0 = fully showing methodology UI, 1 = fully in endPanel
  const [endPanelFade, setEndPanelFade] = useState(0);

  const totalSnapPoints = steps.length + (endPanel ? 1 : 0); // 7

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const totalWidth = track.scrollWidth - window.innerWidth;

      // Extra dwell scroll — section stays pinned but track stops moving
      const dwellDistance = endPanel ? window.innerHeight * 0.8 : 0;
      const totalScrollDistance = totalWidth + dwellDistance;

      // trackFraction: 0→trackFraction of progress = horizontal movement
      //                trackFraction→1 = dwell zone (pinned, no movement)
      const trackFraction = totalWidth / totalScrollDistance;

      // Last methodology card snap position within the track phase
      const lastCardInTrack = (steps.length - 1) / (totalSnapPoints - 1); // ~0.833
      // Its overall progress position
      const lastCardProgress = lastCardInTrack * trackFraction;

      // We DON'T use gsap.to for x — we manually set it in onUpdate.
      // This gives us full control to create the dwell plateau.
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: 0,
        snap: {
          snapTo: (value: number) => {
            // In the dwell zone → snap to the endPanel position (track fully scrolled)
            if (value >= trackFraction * 0.93) {
              return trackFraction;
            }
            // Snap to card boundaries within the track range
            const cardSnap = trackFraction / (totalSnapPoints - 1);
            const snapped = Math.round(value / cardSnap) * cardSnap;
            return Math.min(snapped, trackFraction);
          },
          duration: { min: 0.2, max: 0.6 },
          delay: 0.05,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;

          // --- Manual track position with dwell clamping ---
          // Map progress to x: clamp at totalWidth when progress >= trackFraction
          const xProgress = Math.min(progress / trackFraction, 1);
          gsap.set(track, { x: xProgress * totalWidth });

          // --- Active step ---
          const lastCardTrackPos = (steps.length - 1) / (totalSnapPoints - 1);
          const cardTrackProgress = Math.min(xProgress / lastCardTrackPos, 1);
          const stepIndex = Math.round(cardTrackProgress * (steps.length - 1));
          setActiveStep(Math.min(stepIndex, steps.length - 1));

          // --- Fade calculation ---
          // Fade starts after last card, fully faded when contact fills screen
          const fade = Math.max(
            0,
            Math.min(1, (progress - lastCardProgress) / (trackFraction - lastCardProgress))
          );
          setEndPanelFade(fade);
        },
      });

      stRef.current = ScrollTrigger.getAll().find(
        (st) => st.trigger === container
      ) ?? null;
    },
    { scope: containerRef }
  );

  const goToStep = useCallback((idx: number) => {
    const st = stRef.current;
    if (!st) return;
    const totalWidth = trackRef.current
      ? trackRef.current.scrollWidth - window.innerWidth
      : 0;
    const dwellDistance = endPanel ? window.innerHeight * 0.8 : 0;
    const totalScrollDistance = totalWidth + dwellDistance;
    const trackFraction = totalWidth / totalScrollDistance;
    const cardSnap = trackFraction / (totalSnapPoints - 1);
    const targetProgress = idx * cardSnap;
    const target = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, [totalSnapPoints, endPanel]);

  // UI opacity = inverse of fade
  const uiOpacity = 1 - endPanelFade;

  // Dynamic background: blend from active step's color to contact BG
  const sectionBg = endPanelFade > 0 && endPanel
    ? lerpColor(steps[activeStep]?.color || steps[steps.length - 1].color, CONTACT_BG, endPanelFade)
    : steps[activeStep]?.color || steps[0].color;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden text-white"
      style={{ backgroundColor: sectionBg, transition: "background-color 0.3s" }}
    >
      {/* Header — fades out near endPanel */}
      <div
        className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none"
        style={{ opacity: uiOpacity, transition: "opacity 0.15s" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 drop-shadow-md">منهجية العمل</h2>
      </div>

      {/* Progress Bar + Dots — fades out near endPanel */}
      <div
        className="absolute bottom-10 left-10 right-10 z-20"
        style={{
          opacity: uiOpacity,
          transition: "opacity 0.15s",
          pointerEvents: uiOpacity < 0.1 ? "none" : "auto",
        }}
      >
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[var(--color-copper)] transition-all duration-300 ease-out ml-auto"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isPast = idx < activeStep;
            return (
              <button
                key={step.num}
                onClick={() => goToStep(idx)}
                aria-label={`الانتقال إلى الخطوة ${step.num}`}
                className="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500",
                    isActive
                      ? "w-4 h-4 bg-[var(--color-copper)] shadow-[0_0_18px_rgba(217,112,64,0.8)]"
                      : isPast
                      ? "w-3 h-3 bg-[var(--color-copper)]/60"
                      : "w-2.5 h-2.5 bg-white/30 group-hover:bg-white/60"
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-wider transition-all duration-300",
                    isActive
                      ? "text-[var(--color-copper)] opacity-100"
                      : "text-white/40 opacity-60 group-hover:opacity-90"
                  )}
                >
                  {step.num}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex h-full items-center pl-[10vw]">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          return (
            <div
              key={step.num}
              className={cn(
                "relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[70vh] md:h-[60vh] mx-4 md:mx-8 rounded-3xl overflow-hidden border group transition-all duration-700 ease-out",
                isActive
                  ? "border-[var(--color-copper)]/60"
                  : "border-white/10"
              )}
              style={{
                transform: isActive ? "scale(1.05)" : "scale(1)",
                opacity: isActive ? 1 : 0.45,
                boxShadow: isActive
                  ? "0 0 60px rgba(217, 112, 64, 0.35), 0 0 140px rgba(217, 112, 64, 0.15)"
                  : "none",
              }}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              </div>

              {step.video && (
                <div className="absolute inset-0 z-0 opacity-0 pointer-events-none">
                  <SmartVideo
                    src={step.video}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                    loop
                    muted
                    playsInline
                    ref={(el: HTMLVideoElement | null) => {
                      if (el) {
                        if (isActive) el.play().catch(() => {});
                        else el.pause();
                      }
                    }}
                  />
                </div>
              )}

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 text-right">
                <div
                  className={cn(
                    "text-8xl font-bold absolute top-6 left-6 font-mono select-none transition-colors duration-500",
                    isActive ? "text-[var(--color-copper)]/40" : "text-white/10"
                  )}
                >
                  {step.num}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">{step.title}</h3>
                <p className="text-lg text-white/80 leading-relaxed max-w-md ml-auto">{step.desc}</p>
              </div>

              {isActive && (
                <div className="absolute inset-0 rounded-3xl ring-1 ring-[var(--color-copper)]/30 pointer-events-none" />
              )}
            </div>
          );
        })}

        {/* Gradient spacer — blends last card's dark into contact section's navy.
            Wide enough (50vw) so the last card fully exits the viewport before
            the contact section enters, preventing visual overlap.
            In RTL visual layout: left edge = contact (navy), right edge = card (black). */}
        {endPanel && (
          <div
            className="flex-shrink-0 w-[50vw] h-full"
            style={{
              background: `linear-gradient(to left, ${steps[steps.length - 1].color}, ${CONTACT_BG})`,
            }}
          />
        )}

        {/* End Panel — fills viewport on the same horizontal track */}
        {endPanel && (
          <div className="flex-shrink-0 w-screen h-screen relative">
            {endPanel}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Linearly interpolate between two hex colors.
 */
function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}
