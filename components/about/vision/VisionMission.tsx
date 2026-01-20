'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VISION_MISSION } from '@/lib/data/about-content';
import { cn } from '@/lib/utils';

const FlipCard = ({ 
    frontContent, 
    backContent, 
    className, 
    delay: _delay = 0 
}: { 
    frontContent: React.ReactNode; 
    backContent: React.ReactNode; 
    className?: string;
    delay?: number;
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="relative h-[250px] md:h-[350px] w-full [perspective:1000px] group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className={cn(
                    "relative w-full h-full [transform-style:preserve-3d]",
                    className
                )}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] rounded-3xl overflow-hidden border border-white/10 bg-black">
                    {/* Gradient Overlay for Front */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
                    
                    {/* Front Content Container */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center">
                        {frontContent}
                    </div>
                </div>

                {/* Back Face */}
                <div 
                    className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateX(180deg)] rounded-3xl overflow-hidden border border-white/10 bg-black"
                >
                    {/* Darker styling for readability on back */}
                    <div className="absolute inset-0 bg-white/5 z-0" />
                     {/* Back Content Container */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-sm">
                        {backContent}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const VisionMission = () => {
    return (
        <section className="py-32 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vision Card - Purple Theme */}
                <FlipCard 
                    className=""
                    frontContent={
                        <>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{VISION_MISSION.vision.title}</h2>
                            <h3 className="text-sm md:text-xl text-[#A78BFA] tracking-[0.3em] md:tracking-[0.5em] font-bold uppercase">{VISION_MISSION.vision.subtitle}</h3>
                        </>
                    }
                    backContent={
                        <>
                            <h2 className="text-xl md:text-3xl font-bold text-[#A78BFA] mb-4 md:mb-6">{VISION_MISSION.vision.title}</h2>
                            <p className="text-base md:text-xl text-white/90 leading-relaxed font-light">
                                {VISION_MISSION.vision.description}
                            </p>
                        </>
                    }
                />

                {/* Mission Card - Copper/Gold Theme */}
                <FlipCard 
                    delay={0.2}
                    className=""
                    frontContent={
                        <>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{VISION_MISSION.mission.title}</h2>
                            <h3 className="text-sm md:text-xl text-[#FFD6A5] tracking-[0.3em] md:tracking-[0.5em] font-bold uppercase">{VISION_MISSION.mission.subtitle}</h3>
                        </>
                    }
                    backContent={
                        <>
                            <h2 className="text-xl md:text-3xl font-bold text-[#FFD6A5] mb-4 md:mb-6">{VISION_MISSION.mission.title}</h2>
                            <p className="text-base md:text-xl text-white/90 leading-relaxed font-light">
                                {VISION_MISSION.mission.description}
                            </p>
                        </>
                    }
                />
            </div>
        </section>
    );
};
