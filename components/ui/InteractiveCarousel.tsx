"use client";

import React, { useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary-loader";

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
  baseAltText?: string;
}

export const InteractiveCarousel: React.FC<ImageCarouselProps> = ({ images, autoPlayInterval = 3000, baseAltText = "Interactive Carousel Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Robust Auto-play logic
  useEffect(() => {
    // Don't auto-play if paused (hovered) or currently being dragged
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isPaused, isDragging]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    // Note: We don't hard-reset isPaused here because MouseLeave handles the resume for mouse users.
    // For touch users, the interaction loop is simpler. 
    // However, if we are on touch, we might want to ensure it resumes.
    // Let's rely on the state updates.
    
    const SWIPE_THRESHOLD = 50;
    if (info.offset.x > SWIPE_THRESHOLD) {
      // Swiped Right -> Go Previous
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      // Swiped Left -> Go Next
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
    {/* Minimal visibility for smoother transition */}
    return {
      zIndex: 10,
      scale: 0.5,
      opacity: 0,
      x: '0%', 
      rotateY: 0,
    };
  }; 

  // Wheel navigation state
  const wheelAccumulator = React.useRef(0);
  const lastWheelTime = React.useRef(0);
  const WHEEL_THRESHOLD = 50; // Sensitivity threshold
  const WHEEL_COOLDOWN = 150; // ms between slides (faster for main carousel)

  /**
   * Handle mouse wheel for smooth horizontal scroll navigation
   */
  const handleWheel = (e: React.WheelEvent) => {
    // Only handle if horizontal scroll is dominant
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const now = Date.now();
      
      // Accumulate
      wheelAccumulator.current += e.deltaX;

      // Check cooldown
      if (now - lastWheelTime.current > WHEEL_COOLDOWN) {
        if (wheelAccumulator.current > WHEEL_THRESHOLD) {
          // Navigating "Forward" in time/index means Next
          setCurrentIndex((prev) => (prev + 1) % images.length);
          wheelAccumulator.current = 0;
          lastWheelTime.current = now;
        } else if (wheelAccumulator.current < -WHEEL_THRESHOLD) {
          // Navigating "Back"
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
          wheelAccumulator.current = 0;
          lastWheelTime.current = now;
        }
      }

       // Reset accumulator prevents getting stuck if direction changes
      if (Math.abs(wheelAccumulator.current) > WHEEL_THRESHOLD * 2) {
          wheelAccumulator.current = 0;
      }
    } else {
        wheelAccumulator.current = 0;
    }
  };

  return (
    <div 
      className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px] overflow-hidden group touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
    >
      {/* 3D Scene Container */}
      <div className="relative w-[320px] h-[500px] flex items-center justify-center preserve-3d">
         {images.map((src, index) => {
            const style = getStyle(index);

            return (
              <motion.div
                key={index}
                className="absolute w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#020B16] cursor-grab active:cursor-grabbing"
                initial={false}
                animate={style}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
                style={{ 
                   pointerEvents: index === currentIndex ? 'auto' : 'none',
                   background: '#000',
                   boxShadow: index === currentIndex ? '0 25px 50px -12px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                  <Image 
                    src={src} 
                    alt={`${baseAltText} ${index + 1}`} 
                    fill
                    loader={cloudinaryLoader}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover select-none pointer-events-none"
                    draggable={false}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.opacity = '0';
                      target.parentElement?.classList.add('bg-[#0A1625]');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            );
         })}
      </div>

      {/* Manual Controls Hint (Dynamic Sliding Dots) */}
      <div className="absolute bottom-8 flex gap-3 z-40">
          {(() => {
            const maxDots = 5;
            const halfMax = Math.floor(maxDots / 2);
            
            // Only calculate sliding window if we have more images than maxDots
            if (images.length <= maxDots) {
                return images.map((_, idx) => (
                   <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition-all duration-300 rounded-full shadow-lg backdrop-blur-sm border border-white/10 ${
                            idx === currentIndex 
                            ? "w-8 h-2 bg-[var(--color-copper)]" 
                            : "w-2 h-2 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ));
            }

            // Sliding window logic
            return Array.from({ length: maxDots }).map((_, i) => {
                // Determine which real index this dot represents
                // We want the center dot to be the currentIndex
                // i ranges 0 to 4. Center is 2.
                // offset = i - 2 (-2, -1, 0, 1, 2)
                const offset = i - halfMax;
                let targetIndex = (currentIndex + offset) % images.length;
                
                // Handle negative modulo correctly in JS
                if (targetIndex < 0) targetIndex += images.length;

                const isCenter = i === halfMax;

                return (
                    <button
                        key={`dot-${targetIndex}`}
                        onClick={() => setCurrentIndex(targetIndex)}
                        className={`transition-all duration-300 rounded-full shadow-lg backdrop-blur-sm border border-white/10 ${
                            isCenter 
                            ? "w-8 h-2 bg-[var(--color-copper)] scale-110" 
                            : "w-2 h-2 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${targetIndex + 1}`}
                    />
                );
            });
          })()}
      </div>
    </div>
  );
};

