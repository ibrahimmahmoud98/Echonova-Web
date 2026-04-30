'use client';

import React, { useRef } from 'react';
import { AUDIO_PRODUCTION_DATA } from '@/lib/data/services-content';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Copper system palette (matches --color-copper: #D97040, --color-copper-burn: #8A3A1B)
// Gradient: from-[#F2C49B] via-[#D97040] to-[#8A3A1B]  (light → copper → burnt)
// Shadow RGBA: rgba(217,112,64,0.XX)

const WAVE_BARS = [3, 11, 18, 24, 18, 11, 3];

export const AudioProductionSection = () => {
    const item = AUDIO_PRODUCTION_DATA[0];
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-40 bg-[#020810] overflow-hidden"
        >
            {/* ── Neural Soundscape Background ── */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
                {/* Copper radial core — muted, high transparency */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(217,112,64,0.07)_0%,_rgba(138,58,27,0.03)_40%,_transparent_70%)]" />
                {/* Concentric rings in copper */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.03]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <radialGradient id="ringGradCu" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#D97040" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                    {[200, 350, 500, 650, 800, 950].map((r) => (
                        <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="url(#ringGradCu)" strokeWidth="1" />
                    ))}
                </svg>
                {/* Film-grain noise */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                        backgroundRepeat: 'repeat',
                        backgroundSize: '128px 128px',
                    }}
                />
            </motion.div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* ── Section eyebrow ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex items-center justify-center gap-4 mb-6"
                >
                    <div className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-copper)]/50" />
                    <span className="text-[var(--color-copper)]/60 tracking-[0.2em] text-sm font-bold uppercase">
                        Audio Production
                    </span>
                    <div className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-copper)]/50" />
                </motion.div>

                {/* ── Main heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        الإنتاج{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F2C49B] via-[#D97040] to-[#8A3A1B]">
                            الموسيقي والصوتي
                        </span>
                    </h2>
                    {/* Luxury Arabic tagline — extreme letter spacing */}
                    <p className="text-white/30 tracking-[0.2em] text-sm font-bold uppercase mt-3">
                        هندسة&nbsp;&nbsp;·&nbsp;&nbsp;وجدان&nbsp;&nbsp;·&nbsp;&nbsp;نقاء
                    </p>
                </motion.div>

                {/* ── Centerpiece Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                >
                    {/* Copper outer glow ring — appears on hover */}
                    <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[var(--color-copper)]/15 via-transparent to-[var(--color-copper-burn)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#080D18] shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]">
                        <div className="flex flex-col lg:flex-row-reverse min-h-[520px]">

                            {/* ── Visual Side ── */}
                            <div className="relative w-full lg:w-1/2 overflow-hidden min-h-[320px] lg:min-h-full">
                                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                                    <Image
                                        src={item.posterImage}
                                        alt={item.brandName}
                                        fill
                                        className="object-cover object-center opacity-55"
                                        priority
                                    />
                                </motion.div>
                                {/* Gradient bleed into content */}
                                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#080D18] via-[#080D18]/40 to-transparent" />

                                {/* Animated Soundwave Bars — copper gradient */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                                    <svg viewBox="0 0 84 40" width="120" height="60" className="overflow-visible">
                                        <defs>
                                            <linearGradient id="waveGradCu" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#F2C49B" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#8A3A1B" stopOpacity="0.4" />
                                            </linearGradient>
                                        </defs>
                                        {WAVE_BARS.map((h, i) => (
                                            <motion.rect
                                                key={i}
                                                x={i * 12}
                                                y={(40 - h) / 2}
                                                width={5}
                                                height={h}
                                                rx={2.5}
                                                fill="url(#waveGradCu)"
                                                animate={{
                                                    scaleY: [1, 1.8 + (i % 3) * 0.3, 0.6, 1.4, 1],
                                                    opacity: [0.6, 1, 0.7, 0.9, 0.6],
                                                }}
                                                transition={{
                                                    duration: 1.6 + i * 0.15,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                    delay: i * 0.12,
                                                }}
                                                style={{ originY: 0.5, originX: 0.5 }}
                                            />
                                        ))}
                                    </svg>
                                </div>

                                {/* Tech badge */}
                                <div className="absolute top-6 right-6 z-10 font-mono text-[10px] tracking-[0.2em] text-[var(--color-copper)]/35 text-right leading-5">
                                    <div>24-BIT / 96kHz</div>
                                    <div>LOSSLESS &nbsp; RAW</div>
                                </div>
                            </div>

                            {/* ── Content Side ── */}
                            <div className="w-full lg:w-1/2 p-8 md:p-12 xl:p-16 flex flex-col justify-center text-right dir-rtl relative">
                                {/* Copper fine rule */}
                                <div className="w-12 h-px bg-[var(--color-copper)]/35 mb-8 ml-auto hidden lg:block" />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
                                >
                                    {/* Brand name — copper gradient */}
                                    <motion.h3
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7 }}
                                        className="text-3xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-l from-[#F2C49B] via-[#D97040] to-[#8A3A1B]"
                                    >
                                        {item.brandName}
                                    </motion.h3>

                                    {/* Luxury Arabic tagline */}
                                    <motion.p
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, delay: 0.1 }}
                                        className="text-[var(--color-copper)]/40 font-mono text-sm tracking-widest mb-8 uppercase"
                                    >
                                        صدى&nbsp;&nbsp;المشاعر
                                    </motion.p>

                                    {/* Copper divider — animates in */}
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="h-px bg-gradient-to-l from-[var(--color-copper)]/25 to-transparent mb-8 origin-right"
                                    />

                                    <motion.p
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.7, delay: 0.25 }}
                                        className="text-white/50 text-xl leading-relaxed mb-10 font-normal max-w-md"
                                    >
                                        {item.scriptExcerpt}
                                    </motion.p>

                                    {/* Feature pills */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.35 }}
                                        className="flex flex-wrap gap-2 mb-10 justify-end"
                                    >
                                        {item.integrationMethods.map((m, i) => (
                                            <span
                                                key={i}
                                                className="text-xs text-[var(--color-copper)]/65 border border-[var(--color-copper)]/15 rounded-full px-3 py-1 tracking-wide"
                                            >
                                                {m.title}
                                            </span>
                                        ))}
                                    </motion.div>

                                    {/* Ghost CTA — stealth luxury */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.45 }}
                                    >
                                        <Link href={`/services/nova-${item.id}`}>
                                            <button className="group/btn relative overflow-hidden px-8 py-4 rounded-full bg-transparent border border-[var(--color-copper)]/35 text-[var(--color-copper)] text-sm font-semibold tracking-widest uppercase transition-all duration-500 hover:border-[var(--color-copper)]/60 hover:text-white hover:shadow-[0_0_30px_rgba(217,112,64,0.15)]">
                                                <span className="relative z-10">استكشف الخدمة</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-copper)]/0 to-[var(--color-copper-burn)]/0 group-hover/btn:from-[var(--color-copper)]/10 group-hover/btn:to-[var(--color-copper-burn)]/5 transition-all duration-500" />
                                            </button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
