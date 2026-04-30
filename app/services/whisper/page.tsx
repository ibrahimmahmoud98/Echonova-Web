"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AUDIO_PRODUCTION_PAGE_CONTENT } from "@/lib/data/services-content";

// ── Official Copper System ────────────────────────────────────────────────
// --color-copper:      #D97040  (Electric Copper)
// --color-copper-burn: #8A3A1B  (Burnt Copper for shadows)
// Gradient: from-[#F2C49B] via-[#D97040] to-[#8A3A1B]
// Shadow:   rgba(217,112,64,0.XX)

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const featureVariant = {
  hidden: { opacity: 0, x: 30, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

const HERO_BARS = [8, 20, 36, 48, 60, 48, 36, 20, 8, 20, 36, 48, 60, 48, 36, 20, 8];

export default function AudioProductionPage() {
  const activeContent = AUDIO_PRODUCTION_PAGE_CONTENT.services[0];
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: contentScroll } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  });

  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const bgBlobY = useTransform(contentScroll, [0, 1], ["0%", "-20%"]);

  return (
    <main className="min-h-screen bg-[#020810] text-[#F0EDE8] selection:bg-[var(--color-copper)]/25 overflow-hidden">

      {/* ═══════════════════════════════════════════
          HERO — Full-screen Immersive
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] w-full flex items-end pb-20 overflow-hidden"
      >
        {/* Background image — parallax */}
        <motion.div style={{ y: heroImgY, scale: 1.08 }} className="absolute inset-0 z-0">
          <Image
            src="/images/nova_whisper_void.png"
            alt="NOVA WHISPER — صدى المشاعر"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020810] via-[#020810]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020810]/60 via-transparent to-transparent" />
        </motion.div>

        {/* Film grain */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Copper vignette — muted bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[var(--color-copper-burn)]/8 to-transparent z-[2] pointer-events-none" />

        {/* ── Hero Content ── */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">

          {/* Eyebrow */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-[var(--color-copper)]/55" />
            <span className="text-[var(--color-copper)]/60 tracking-[0.2em] text-sm font-bold uppercase">
              الإنتاج الصوتي
            </span>
          </motion.div>

          {/* Main title — copper gradient */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-[#F2C49B] via-[#D97040] to-[#8A3A1B]"
          >
            NOVA<br />WHISPER
          </motion.h1>

          {/* Tagline — stealth luxury spacing */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/35 text-lg md:text-2xl leading-relaxed font-normal mb-10"
          >
            صدى&nbsp;&nbsp;&nbsp;المشاعر
          </motion.p>

          {/* Animated soundwave bars — copper palette */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-end gap-[3px] h-10 mb-12"
          >
            {HERO_BARS.map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-t from-[var(--color-copper-burn)]/55 to-[#F2C49B]/75"
                style={{ height: `${h}%` }}
                animate={{
                  scaleY: [1, 1.5 + (i % 3) * 0.4, 0.7, 1.3, 1],
                  opacity: [0.5, 0.9, 0.6, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.8 + (i % 4) * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.08,
                }}
              />
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            <Link href="/contact">
              <button className="relative overflow-hidden px-7 py-3.5 rounded-full bg-[var(--color-copper)] text-white text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(217,112,64,0.25)] hover:shadow-[0_0_50px_rgba(217,112,64,0.4)] hover:bg-[var(--color-copper-burn)] transition-all duration-500 hover:-translate-y-0.5">
                ابدأ مشروعك
              </button>
            </Link>
            <span className="text-white/20 text-xs tracking-widest">
              24-BIT · 96kHz · LOSSLESS
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll cue — copper tint */}
        <motion.div
          className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--color-copper)]/45" />
          <span className="text-[9px] tracking-[0.25em] text-[var(--color-copper)]/35 rotate-90 origin-center translate-x-3">SCROLL</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTENT — Asymmetric Cinematic Layout
      ═══════════════════════════════════════════ */}
      <section ref={contentRef} className="relative py-28 md:py-40 overflow-hidden bg-[#020810]">

        {/* Parallax copper blob */}
        <motion.div
          style={{ y: bgBlobY }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_right,_rgba(138,58,27,0.10)_0%,_transparent_60%)] pointer-events-none z-0"
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* ── Description — Wide asymmetric offset ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-24 items-start mb-24 md:mb-36"
          >
            <div className="lg:w-[55%]">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F2C49B] via-[#D97040] to-[#8A3A1B] mb-6 flex items-center gap-3">
                {activeContent?.mechanism.title}
              </h2>
              <p className="text-[#F7F5F0] text-xl leading-relaxed border-r-2 border-[var(--color-copper)]/25 pr-6 font-normal mb-6 text-right">
                {activeContent?.description}
              </p>
              {activeContent?.mechanism.intro && (
                <p className="text-[#F7F5F0]/70 text-base max-w-2xl text-right">
                  {activeContent.mechanism.intro}
                </p>
              )}
            </div>

            {/* Side sticky visual */}
            <div className="lg:w-[45%] lg:sticky lg:top-32 self-start">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
              >
                <Image
                  src="/images/nova_whisper_gear.png"
                  alt="NOVA WHISPER Studio Gear"
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020810]/80 via-transparent to-transparent" />
                {/* Copper pulse overlay */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-[var(--color-copper)]/8 rounded-full blur-2xl animate-pulse" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Features — Staggered grid ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.04]"
          >
            {activeContent?.mechanism.points.map((point, idx) => (
              <motion.div
                key={idx}
                variants={featureVariant}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group/feature relative bg-[#020810] p-8 md:p-10 hover:bg-[#060e1e] transition-colors duration-500"
              >
                {/* Ghost index numeral */}
                <div className="text-[3.5rem] font-black text-white/[0.025] absolute top-4 left-6 select-none pointer-events-none leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                {/* Copper accent line — expands on hover */}
                <div className="w-6 h-px bg-gradient-to-r from-[var(--color-copper)]/55 to-transparent mb-6 group-hover/feature:w-12 transition-all duration-500" />

                <h3 className="text-xl font-bold text-[#F7F5F0] mb-3 flex items-center gap-2 justify-end">
                  {point.title}
                </h3>
                <p className="text-[#F7F5F0]/70 pr-4 leading-relaxed font-normal text-right">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Value — Full-width cinematic strip ── */}
          {activeContent?.value && (
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative mt-px overflow-hidden rounded-b-3xl"
            >
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src="/images/nova_whisper_sound_1_new.png"
                  alt="NOVA WHISPER — Visual Frequency"
                  fill
                  className="object-cover object-center opacity-22"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020810] via-[#020810]/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
                  <div className="max-w-2xl">
                    <p className="text-2xl font-bold text-[#F7F5F0] mb-4 flex items-center gap-3 relative z-10">
                      {activeContent.value.title}
                    </p>
                    <p className="text-lg text-[#F7F5F0] leading-relaxed relative z-10 font-normal text-right">
                      {activeContent.value.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Final CTA ── */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-8 mt-20 md:mt-28 pt-10 border-t border-white/[0.06]"
          >
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-black text-white leading-tight">
                جاهز لهندسة{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F2C49B] via-[#D97040] to-[#8A3A1B]">
                  صوت علامتك؟
                </span>
              </p>
              <p className="text-white/28 text-sm mt-2 tracking-wide">
                بصمة صوتية حصرية &nbsp;·&nbsp; توزيع آمن &nbsp;·&nbsp; نقاء هندسي
              </p>
            </div>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full border border-[var(--color-copper)]/35 text-[var(--color-copper)] text-sm font-semibold tracking-widest uppercase hover:bg-[var(--color-copper)]/8 hover:border-[var(--color-copper)]/55 hover:text-white transition-all duration-500 whitespace-nowrap hover:shadow-[0_0_30px_rgba(217,112,64,0.12)]">
                ابدأ الآن
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
