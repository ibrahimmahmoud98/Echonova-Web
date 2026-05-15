"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Effect to apply to the "before" image to simulate non-AI version. Default: heavy desaturation + sepia */
  beforeFilter?: string;
}

/**
 * Interactive Before/After image comparison slider.
 * Used in Portfolio modals to demonstrate the visual leap from
 * traditional production attempts (Before) to ENS AI cinematic output (After).
 */
export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "بدون ENS",
  afterLabel = "إنتاج ENS",
  beforeAlt = "Before",
  afterAlt = "After",
  beforeFilter = "grayscale(0.85) sepia(0.4) brightness(0.55) contrast(1.15)",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // Percent from left
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // RTL-aware: invert because layout direction is RTL
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(2, Math.min(98, rawPct));
    setPosition(clamped);
  }, []);

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    },
    [isDragging, updatePosition]
  );

  const stopDrag = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging, handleMove, stopDrag]);

  // Click-to-set position on the container itself
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    updatePosition(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full h-full select-none overflow-hidden rounded-2xl cursor-ew-resize bg-black group"
      dir="ltr"
    >
      {/* Layer 1: After image (full underlay) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>

      {/* Layer 2: Before image clipped to position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          WebkitClipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <div className="absolute inset-0" style={{ filter: beforeFilter }}>
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        {/* Subtle vignette to make "Before" feel even less alive */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-md bg-black/60 backdrop-blur-md text-white/80 border border-white/10">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-md bg-[var(--color-copper)]/30 backdrop-blur-md text-[var(--color-champagne)] border border-[var(--color-copper)]/40">
        {afterLabel}
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        animate={{ scale: isDragging ? 1.05 : 1 }}
      >
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-copper)] to-transparent shadow-[0_0_20px_rgba(217,112,64,0.6)]" />

        {/* Drag knob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-[var(--color-copper)] shadow-[0_0_30px_rgba(217,112,64,0.6)] flex items-center justify-center pointer-events-auto cursor-ew-resize"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsDragging(true);
          }}
        >
          <GripVertical className="w-5 h-5 text-[var(--color-copper)]" />
        </div>

        {/* Pulse ring (only when not dragging) */}
        {!isDragging && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[var(--color-copper)] animate-ping opacity-40 pointer-events-none" />
        )}
      </motion.div>

      {/* First-time hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 text-xs font-mono tracking-wider rounded-full bg-black/70 backdrop-blur-md text-white/70 border border-white/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
        ← اسحب للمقارنة →
      </div>
    </div>
  );
};
