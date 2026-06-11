'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { MANIFESTO_TEXT } from '@/lib/data/about-content';
import { cn } from '@/lib/utils';

const ManifestoLine = ({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) => {
    // Each line appears at a specific range of the scroll
    const step = 0.1; // Duration of each line
    const start = index * step;
    
    // Fade in (0 to 1) -> Stay (1) -> Fade out (1 to 0)
    const fadeInEnd = start + 0.02;
    const fadeOutStart = start + 0.08;
    const end = start + 0.1;

    // Use clamp: true to ensure opacity doesn't drift outside these bounds
    const opacity = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0], { clamp: true });
    
    const y = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [20, 0, 0, -20], { clamp: true });
    const scale = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], [0.9, 1, 1, 1.1], { clamp: true });
    const blur = useTransform(progress, [start, fadeInEnd, fadeOutStart, end], ["4px", "0px", "0px", "4px"], { clamp: true });

    return (
        <motion.p 
            style={{ opacity, y, scale, filter: blur as unknown as string }}
            className={cn(
                "text-2xl md:text-6xl font-bold leading-tight transition-colors duration-500 text-center",
                index % 2 === 0 ? "text-white" : "text-[var(--nova-gold)]"
            )}
        >
            {text}
        </motion.p>
    );
};

export const Manifesto = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const primedRef = useRef(false);
    const curTimeRef = useRef(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const reduceMotion = React.useMemo(
        () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    );

    const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 0.5]);

    // iOS/Safari Video Priming
    const primeVideo = React.useCallback(() => {
        if (primedRef.current) return;
        const v = videoRef.current;
        if (!v) return;
        const pr = v.play();
        if (pr && typeof pr.then === "function") {
            pr.then(() => {
                v.pause();
                primedRef.current = true;
                try { v.currentTime = Math.max(0.05, curTimeRef.current); } catch {}
            }).catch(() => {});
        } else {
            v.pause();
            primedRef.current = true;
        }
    }, []);

    // Set Safari attributes and event listeners
    React.useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.setAttribute("muted", "");
        v.setAttribute("playsinline", "");
        v.setAttribute("webkit-playsinline", "");
        v.setAttribute("autoplay", "");

        const handleAutoplayInit = () => {
            if (!primedRef.current) {
                v.pause();
                primedRef.current = true;
                try { v.currentTime = Math.max(0.05, curTimeRef.current); } catch {}
            }
        };

        v.addEventListener("play", handleAutoplayInit);
        v.addEventListener("playing", handleAutoplayInit);

        if (!v.paused) {
            handleAutoplayInit();
        }

        const retry = () => primeVideo();
        window.addEventListener("touchstart", retry, { passive: true });
        window.addEventListener("touchend", retry, { passive: true });
        window.addEventListener("click", retry, { passive: true });

        return () => {
            v.removeEventListener("play", handleAutoplayInit);
            v.removeEventListener("playing", handleAutoplayInit);
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("touchend", retry);
            window.removeEventListener("click", retry);
        };
    }, [primeVideo]);

    // Scroll scrubbing animation loop
    React.useEffect(() => {
        let raf = 0;
        const tick = () => {
            raf = requestAnimationFrame(tick);
            const video = videoRef.current;
            if (!video) return;

            const p = scrollYProgress.get();
            if (video.readyState >= 1) {
                const duration = video.duration || 76.71;
                const target = p * duration;
                const cur = curTimeRef.current;
                const next = reduceMotion ? target : cur + (target - cur) * 0.22;
                curTimeRef.current = next;

                if (primedRef.current && Math.abs(video.currentTime - next) > 0.01) {
                    try { video.currentTime = next; } catch {}
                }
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [scrollYProgress, reduceMotion]);

    const onStageDown = () => {
        primeVideo();
    };

    return (
        <section 
            ref={containerRef} 
            onPointerDown={onStageDown}
            className="relative min-h-[450vh]"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020B16]">
                {/* Scroll-Scrubbed Video */}
                <video
                    ref={videoRef}
                    poster="/videos/about-bg-poster.jpg"
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/videos/about_bg.webm" type="video/webm" />
                    <source src="/videos/about_bg.mp4" type="video/mp4" />
                </video>

                {/* Darkening Layer */}
                <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

                {/* Dynamic Background Gradient */}
                <motion.div 
                    style={{ opacity: bgOpacity }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--nova-gold)]/10 to-transparent pointer-events-none z-[2]" 
                />
                
                {/* Text Container */}
                <div className="relative z-10 w-full max-w-4xl h-40 flex items-center justify-center px-4">
                    {MANIFESTO_TEXT.map((line, idx) => (
                        <div key={idx} className="absolute inset-0 flex items-center justify-center">
                            <ManifestoLine 
                                text={line} 
                                index={idx} 
                                progress={scrollYProgress} 
                            />
                        </div>
                    ))}
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="relative z-10 mt-12 translate-y-[10px] text-white/30 text-xs tracking-widest animate-pulse"
                >
                    مرر للاسفل لتعرف قصتنا
                </motion.div>
            </div>
        </section>
    );
};
