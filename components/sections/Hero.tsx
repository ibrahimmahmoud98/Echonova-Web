"use client";

import React from "react";
import { useAudio } from "@/components/audio/AudioEngine";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HeroCinematic } from "./HeroCinematic";

import { HERO_VIDEO_URL, HERO_VIDEO_HLS_URL, HERO_VIDEO_POSTER_URL } from "@/lib/constants";

export function Hero() {
  const { playHover, playClick } = useAudio();
  const [showContent, setShowContent] = React.useState(false);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const headlineY = useTransform(scrollY, [0, 600], [0, -120]);
  const headlineScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const headlineBlur = useTransform(scrollY, [0, 600], [0, 6]);
  const headlineOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const headlineFilter = useTransform(headlineBlur, (v) => `blur(${v}px)`);

  const subtitleY = useTransform(scrollY, [0, 600], [0, -60]);
  const subtitleOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const buttonsOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 200], [0, -40]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnimationComplete = React.useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <HeroCinematic
        hlsSrc={HERO_VIDEO_HLS_URL}
        fallbackSrc={HERO_VIDEO_URL}
        posterSrc={HERO_VIDEO_POSTER_URL}
        onAnimationComplete={handleAnimationComplete}
      />

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative container mx-auto px-4 text-center pointer-events-none"
          >
            <ScrollReveal variant="fade-up">
              <div className="pointer-events-auto">
                <motion.h1
                  style={{ y: headlineY, scale: headlineScale, opacity: headlineOpacity, filter: headlineFilter }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--color-ivory)] leading-[0.9] mb-8 tracking-tighter drop-shadow-2xl selection:bg-[var(--color-copper)] selection:text-white will-change-transform"
                >
                  عالم يتخطى <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] via-[var(--color-champagne)] to-[var(--color-copper)] bg-[length:200%_auto] animate-shine">
                    حدود الكاميرا
                  </span>
                </motion.h1>

                <motion.p
                  style={{ 
                    y: subtitleY, 
                    opacity: subtitleOpacity,
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.9), 0 4px 30px rgba(0, 0, 0, 0.6)"
                  }}
                  className="text-lg md:text-2xl text-[var(--color-ivory)] max-w-2xl mx-auto mb-12 font-semibold will-change-transform"
                >
                  نحن نوڤا الإبداع وصدى الأثر. ندمج الخيال البشري بالذكاء الاصطناعي لنصنع ما لا يمكن تصويره.
                </motion.p>

                <motion.div
                  style={{ opacity: buttonsOpacity, y: buttonsY }}
                  className="flex flex-col md:flex-row items-center justify-center gap-6 will-change-transform"
                >
                  <LiquidButton onClick={() => { playClick(); scrollTo("services"); }} onMouseEnter={playHover}>
                    اكتشف خدماتنا
                  </LiquidButton>
                  <LiquidButton variant="secondary" onClick={() => { playClick(); scrollTo("contact"); }} onMouseEnter={playHover}>
                    تواصل معنا
                  </LiquidButton>
                </motion.div>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>

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
