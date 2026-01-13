"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";

// Register Plugin
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "الاستكشاف والتحليل",
    desc: "فهم عميق لأهداف العميل والجمهور المستهدف.",
    color: "#020B16", // Brand Navy
    image: "/images/nova_aura_dna.png",
    video: "/placeholders/life-loop.mp4" 
  },
  {
    num: "02",
    title: "السرد القصصي البشري",
    desc: "كتابة السيناريو والمشاعر بواسطة محترفين.",
    color: "#140a05", // Deep Dark Copper (Warmth for Story)
    image: "/images/nova_saga_storyboard.png",
    video: "/placeholders/action-loop.mp4"
  },
  {
    num: "03",
    title: "هندسة التخيل",
    desc: "ترجمة السيناريو إلى أكواد بصرية (Prompts).",
    color: "#0a0b1e", // Deep Dark Indigo (Tech/Magic)
    image: "/images/nova_cinema_anamorphic_lens_flare_1766262442202.png",
    video: "/placeholders/magic-loop.mp4"
  },
  {
    num: "04",
    title: "التوليد والإخراج",
    desc: "توليد المشاهد تحت إشراف مخرج فني.",
    color: "#160404", // Deep Dark Red (Action/Creation)
    image: "/images/nova_cinema_camera_rig_dark_1766262384875.png",
    video: "/placeholders/life-loop.mp4"
  },
  {
    num: "05",
    title: "المونتاج واللمسة النهائية",
    desc: "تجميع المشاهد وإضافة المؤثرات الصوتية.",
    color: "#030303", // Cinematic Charcoal (Refinement)
    image: "/images/nova_cinema_color_grading_suite_1766262427888.png",
    video: "/placeholders/action-loop.mp4"
  },
  {
    num: "06",
    title: "التسليم والأثر",
    desc: "تسليم العمل ليصنع الصدى المتوقع.",
    color: "#000000", // Pure Black (Final Impact)
    image: "/images/nova_saga_poster.png",
    video: "/placeholders/magic-loop.mp4"
  },
];

export function MethodologyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate total width with a buffer to ensure logical completion
    // Adding extra width ensures the last item comes fully into view before unpinning
    const totalWidth = (track.scrollWidth - window.innerWidth) + 500;

    // Horizontal Scroll Logic
    // For RTL (Right to Left): Content flows to the left.
    // To see content on the left, we must move the track to the RIGHT (Positive X).
    const scrollTween = gsap.to(track, {
      x: totalWidth, // Positive for RTL
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        // snap: 1 / (steps.length - 1), // Optional: snap to cards
        onUpdate: (self) => {
             // Calculate active step based on progress
             const progress = self.progress;
             const stepIndex = Math.round(progress * (steps.length - 1));
             setActiveStep(stepIndex);
        }
      },
    });

    // Background Color Changer (Linked to same scroll)
    steps.forEach((step, index) => {
        if (index === 0) return; // Skip first, handled by initial state
        const progressStart = (index - 1) / (steps.length - 1);
        const progressEnd = index / (steps.length - 1);
        
        // This is a simplified approach; usually we lerp between colors manually or use a timeline.
        // For smooth transitions, we'll animate the container background based on progress breakpoints
    });
    
  }, { scope: containerRef });

  return (
    <section 
        ref={containerRef} 
        className="relative h-screen w-full overflow-hidden text-white transition-colors duration-700 ease-linear"
        style={{ backgroundColor: steps[activeStep]?.color || steps[0].color }}
    >
      {/* Header (Optional, stays fixed or moves) */}
      <div className="absolute top-10 left-0 right-0 z-20 text-center pointer-events-none">
        <h2 className="text-3xl md:text-4xl font-bold text-white/90 drop-shadow-md">منهجية العمل</h2>
        <p className="text-white/60 text-sm">التجربة السينمائية للإنتاج</p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/10 rounded-full z-20 overflow-hidden">
        <div 
            className="h-full bg-[var(--color-copper)] transition-all duration-300 ease-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex h-full items-center pl-[10vw]"> {/* pl-[10vw] allows first card to be centered or offset */}
        {steps.map((step, index) => (
          <div 
            key={step.num} 
            className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-[70vh] md:h-[60vh] mx-4 md:mx-8 rounded-3xl overflow-hidden border border-white/10 group transition-transform duration-500 ease-out hover:scale-105"
            // Use subtle parallax or scale effect based on active state if desired
            style={{
                transform: activeStep === index ? 'scale(1.05)' : 'scale(1)',
                opacity: activeStep === index ? 1 : 0.5
            }}
          >
            {/* Background Image (Primary) */}
            <div className="absolute inset-0 z-0">
               <Image 
                 src={step.image} 
                 alt={step.title}
                 fill
                 className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            </div>

            {/* Background Video (Secondary/Optional) */}
            {/* Background Video (Secondary/Optional) */}
            <div className="absolute inset-0 z-0 opacity-0 pointer-events-none">
               <video 
                  src={step.video}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                  loop
                  muted
                  playsInline
                  ref={(el: HTMLVideoElement | null) => {
                      if (el) {
                          if (activeStep === index) el.play().catch(() => {});
                          else el.pause();
                      }
                  }}
               />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 text-right">
              <div className="text-8xl font-bold text-white/10 absolute top-6 left-6 font-mono select-none">
                {step.num}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                {step.title}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed max-w-md ml-auto">
                {step.desc}
              </p>
            </div>

          </div>
        ))}
        
        {/* Spacer at the end to allow full scroll of last item */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
