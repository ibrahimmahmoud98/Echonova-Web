"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import cloudinaryLoader from '@/lib/cloudinary-loader';

interface HeroCinematicProps {
    hlsSrc?: string;
    fallbackSrc?: string;
    posterSrc?: string;
    onAnimationComplete?: () => void;
}

export const HeroCinematic = ({
    hlsSrc,
    fallbackSrc,
    posterSrc,
    onAnimationComplete,
}: HeroCinematicProps) => {
    const [stage, setStage] = useState<'reveal' | 'zoom' | 'full'>('reveal');
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<any>(null);

    // ──────────────────────────────────────────────
    // 1. تشغيل الستريمينج فوراً عند تحميل المكون
    // ──────────────────────────────────────────────
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const startStreaming = async () => {
            // محاولة HLS أولاً
            if (hlsSrc) {
                try {
                    const HlsModule = await import('hls.js');
                    const Hls = HlsModule.default;

                    if (Hls.isSupported()) {
                        const hls = new Hls({
                            enableWorker: true,
                            lowLatencyMode: false,
                            maxBufferLength: 30,
                            maxMaxBufferLength: 60,
                        });
                        hlsRef.current = hls;
                        hls.loadSource(hlsSrc);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            video.play().catch(() => {});
                        });
                        hls.on(Hls.Events.ERROR, (_: any, data: any) => {
                            if (data.fatal) {
                                hls.destroy();
                                hlsRef.current = null;
                                if (fallbackSrc) {
                                    video.src = fallbackSrc;
                                    video.play().catch(() => {});
                                }
                            }
                        });
                        return;
                    }

                    // Safari: دعم HLS الأصلي
                    if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = hlsSrc;
                        video.addEventListener('loadedmetadata', () => {
                            video.play().catch(() => {});
                        }, { once: true });
                        return;
                    }
                } catch {
                    // فشل التحميل الديناميكي → MP4
                }
            }

            // Fallback: MP4 تقليدي
            if (fallbackSrc) {
                video.src = fallbackSrc;
                video.play().catch(() => {});
            }
        };

        startStreaming();

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [hlsSrc, fallbackSrc]);

    // ──────────────────────────────────────────────
    // 2. بدء الأنيميشن فوراً (poster أو video — أيهما يجهز أولاً)
    // ──────────────────────────────────────────────
    useEffect(() => {
        // Safety fallback: لو الفيديو تأخر، ابدأ الأنيميشن بعد ثانيتين
        if (videoReady) return;
        const timer = setTimeout(() => setVideoReady(true), 2000);
        return () => clearTimeout(timer);
    }, [videoReady]);

    // تحميل الـ poster بالتوازي كـ LCP سريع
    useEffect(() => {
        if (!posterSrc) {
            setVideoReady(true);
            return;
        }
        const img = new Image();
        img.onload = () => setVideoReady(true);
        img.onerror = () => setVideoReady(true);
        img.src = posterSrc;
    }, [posterSrc]);

    // ──────────────────────────────────────────────
    // 3. مراحل الأنيميشن: reveal → zoom → full
    // ──────────────────────────────────────────────
    const hasTriggeredRef = useRef(false);
    const onCompleteRef = useRef(onAnimationComplete);

    // Keep ref updated with latest callback
    useEffect(() => {
        onCompleteRef.current = onAnimationComplete;
    }, [onAnimationComplete]);

    useEffect(() => {
        if (!videoReady || hasTriggeredRef.current) return;
        
        hasTriggeredRef.current = true;

        const revealDuration = 2500;
        const zoomDuration = 1500;

        const timer1 = setTimeout(() => {
            setStage('zoom');
        }, revealDuration);

        const timer2 = setTimeout(() => {
            setStage('full');
            if (onCompleteRef.current) onCompleteRef.current();
        }, revealDuration + zoomDuration);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [videoReady]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/*
                الطبقة ١: الفيديو + البوستر
                البوستر يظهر فوراً للـ LCP، والفيديو يشتغل فوراً في الخلفية
                عشان الزائر يشوف الحركة جوا الحروف من أول لحظة
            */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}>
                {posterSrc && (
                    <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${videoReady ? 'opacity-0 delay-500' : 'opacity-100'}`}>
                         <NextImage
                            src={posterSrc}
                            alt="Hero Background"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                )}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={posterSrc}
                    onCanPlay={() => setVideoReady(true)}
                    className="w-full h-full object-cover"
                />
                {/* تعتيم ٣٠٪ */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>

            {/*
                الطبقة ٢: القناع (Mask) باستخدام mix-blend-mode: multiply
                - الأسود → يخفي الفيديو
                - الأبيض (نص ECHONOVA) → يكشف الفيديو المتحرك
                الفيديو شغال تحت القناع = الزائر يشوف الحركة جوا الحروف
            */}
            {stage !== 'full' && (
                <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black mix-blend-multiply"
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 1,
                        scale: stage === 'zoom' ? 50 : 1
                    }}
                    transition={{ duration: 1.5, ease: [0.6, 0.05, 0.05, 0.9] }}
                >
                    <motion.h1
                        className="font-black text-white text-[13vw] md:text-9xl tracking-tighter select-none whitespace-nowrap"
                        initial={{ scale: 1 }}
                        animate={{ scale: stage === 'zoom' ? 150 : 1 }}
                        transition={{ duration: 1.5, ease: [0.6, 0.05, 0.05, 0.9] }}
                        style={{ lineHeight: 0.8, transformOrigin: "43% 85%" }}
                    >
                        ECHONOVA
                    </motion.h1>
                </motion.div>
            )}
        </div>
    );
};
