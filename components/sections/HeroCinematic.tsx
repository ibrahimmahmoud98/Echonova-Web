"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const HeroCinematic = ({ 
    videoSrc = "/videos/hero-background.mp4", 
    onAnimationComplete 
}: {  
    videoSrc?: string; 
    onAnimationComplete?: () => void;
}) => {
    const [stage, setStage] = useState<'reveal' | 'zoom' | 'full'>('reveal');
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const revealDuration = 2500;
        const zoomDuration = 1500;

        // Fallback to ensure video is treated as loaded
        const loadTimer = setTimeout(() => {
            setVideoLoaded(true);
        }, 500);

        const timer1 = setTimeout(() => {
            setStage('zoom');
        }, revealDuration);

        const timer2 = setTimeout(() => {
            setStage('full');
            if (onAnimationComplete) onAnimationComplete(); 
        }, revealDuration + zoomDuration);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []); // Empty dependency array to ensure this only runs ONCE on mount


    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            {/* 
                Layer 1: The Video
                Always visible at the bottom.
            */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className="w-full h-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                {/* Overlay for dimming (30%) */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>

            {/* 
                Layer 2: The Mask Overlay using mix-blend-mode: multiply.
                - Background: BLACK (0,0,0) -> Multiplies to Black (Hides Video).
                - Text: WHITE (1,1,1) -> Multiplies to Original (Shows Video).
                
                This layer sits ON TOP of the video.
            */}
            {stage !== 'full' && (
                <motion.div 
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black mix-blend-multiply"
                    initial={{ opacity: 1 }}
                    animate={{ 
                        opacity: 1, // Stay opaque until removed
                        scale: stage === 'zoom' ? 50 : 1 // Zoom the whole overlay? No, just the text.
                        // Wait. If we zoom the Overlay Div, the "Black" parts zoom out? No.
                        // We need to zoom the TEXT inside the black background.
                    }}
                    transition={{ duration: 1.5, ease: [0.6, 0.05, 0.05, 0.9] }}
                >
                    <motion.h1
                        className="font-black text-white text-9xl tracking-tighter select-none whitespace-nowrap"
                        initial={{ scale: 1 }}
                        animate={{ scale: stage === 'zoom' ? 150 : 1 }} // Massively increased scale to ensure solid part covers screen
                        transition={{ duration: 1.5, ease: [0.6, 0.05, 0.05, 0.9] }}
                        style={{ lineHeight: 0.8, transformOrigin: "43% 85%" }} // 43% X (Center of O), 85% Y (Solid BOTTOM rim of O)
                        // This ensures we zoom into the white TEXT (which reveals video), not the black void.
                    >
                        ECHONOVA
                    </motion.h1>
                </motion.div>
            )}
        </div>
    );
};
