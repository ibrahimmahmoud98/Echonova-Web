"use client";

import React from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
// import { LiquidGlass } from "@/components/3d/LiquidGlass"; // Postponed/Removed for Cinematic Text
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroCinematic } from "./HeroCinematic";
// ... imports

export function Hero() {
  const { playHover, playClick } = useAudio();
  const [showContent, setShowContent] = React.useState(false);
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Cinematic Intro Background */}
      <HeroCinematic onAnimationComplete={() => setShowContent(true)} />

      {/* Content Fade-In */}
      <AnimatePresence>
        {showContent && (
            <motion.div 
                key="hero-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 container mx-auto px-4 text-center pointer-events-none"
            >
                <ScrollReveal variant="fade-up">
                <div className="pointer-events-auto">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--color-ivory)] leading-[0.9] mb-8 tracking-tighter drop-shadow-2xl selection:bg-[var(--color-copper)] selection:text-white">
                    عالم يتخطى <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] via-[var(--color-champagne)] to-[var(--color-copper)] bg-[length:200%_auto] animate-shine">
                    حدود الكاميرا
                    </span>
                </h1>

                <p className="text-lg md:text-2xl text-[var(--color-ivory)]/80 max-w-2xl mx-auto mb-12 font-light drop-shadow-lg">
                    نحن نوڤا الإبداع وصدى الأثر. ندمج الخيال البشري بالذكاء الاصطناعي لنصنع ما لا يمكن تصويره.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <LiquidButton onClick={() => { playClick(); scrollTo('services'); }} onMouseEnter={playHover}>
                    اكتشف خدماتنا
                    </LiquidButton>
                    <LiquidButton variant="secondary" onClick={() => { playClick(); scrollTo('contact'); }} onMouseEnter={playHover}>
                    تواصل معنا
                    </LiquidButton>
                </div>
                </div>
                </ScrollReveal>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator (Fades out on scroll) */}
      {showContent && (
        <motion.div
            style={{ opacity: scrollOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--color-ivory)]/50 text-sm pointer-events-none z-20"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ opacity: { duration: 1 }, y: { repeat: Infinity, duration: 2 } }}
                className="flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest opacity-70">مرر للأسفل</span>
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[var(--color-copper)] to-transparent" />
            </motion.div>
        </motion.div>
      )}
    </section>
  );
}
