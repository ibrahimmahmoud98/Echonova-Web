"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
}

export const InteractiveCarousel: React.FC<ImageCarouselProps> = ({ images, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isPaused]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsPaused(false); // Resume after drag
    if (info.offset.x > 50) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (info.offset.x < -50) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const getStyle = (index: number) => {
    const diff = (index - currentIndex + images.length) % images.length;
    
    // Center Card
    if (diff === 0) {
      return {
        zIndex: 30,
        scale: 1,
        opacity: 1,
        x: '0%',
        rotateY: 0,
        filter: 'brightness(1.1)',
      };
    }
    
    // Next Card (Right)
    if (diff === 1 || diff === -images.length + 1) {
       return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.6,
        x: '60%',
        rotateY: -25,
        filter: 'brightness(0.6) blur(2px)',
      };
    }

    // Previous Card (Left)
    if (diff === images.length - 1 || diff === -1) {
       return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.6,
        x: '-60%',
        rotateY: 25,
        filter: 'brightness(0.6) blur(2px)',
      };
    }

    // Hidden others
    return {
      zIndex: 10,
      scale: 0.7,
      opacity: 0,
      x: '0%', 
      rotateY: 0,
    };
  }; 

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Scene Container */}
      <div className="relative w-[320px] h-[500px] flex items-center justify-center preserve-3d">
         {images.map((src, index) => {
            const style = getStyle(index);

            return (
              <motion.div
                key={index}
                className="absolute w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#020B16]"
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={handleDragEnd}
                style={{ 
                   pointerEvents: index === currentIndex ? 'auto' : 'none',
                   background: '#000',
                   boxShadow: index === currentIndex ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                  <Image 
                    src={src} 
                    alt="Carousel Image" 
                    fill
                    className="object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            );
         })}
      </div>

      {/* Manual Controls Hint (Optional - Dots) */}
      <div className="absolute bottom-8 flex gap-3 z-40">
          {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full shadow-lg backdrop-blur-sm ${
                    idx === currentIndex 
                    ? "w-8 h-2 bg-[var(--color-copper)]" 
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
          ))}
      </div>
    </div>
  );
};

