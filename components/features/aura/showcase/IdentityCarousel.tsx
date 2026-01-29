"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, PanInfo } from "framer-motion";
import { PortfolioItem } from "@/lib/data/identity-portfolio";
import { CarouselSlide } from "./CarouselSlide";
import { CarouselControls } from "./CarouselControls";
import { getCarouselItemStyle } from "./carouselUtils";

/**
 * Props for the IdentityCarousel component
 */
interface IdentityCarouselProps {
  /** Array of portfolio items to display */
  items: PortfolioItem[];
  /** Callback when a carousel item is selected */
  onSelect: (item: PortfolioItem) => void;
}

/**
 * Interactive 3D carousel for displaying identity portfolio items
 * 
 * @description A fully interactive carousel with:
 * - 3D perspective and rotation effects
 * - Keyboard navigation (arrow keys)
 * - Drag/swipe support
 * - Mouse wheel horizontal scroll
 * - Pagination dots with scrollable overflow
 * 
 * @example
 * ```tsx
 * <IdentityCarousel 
 *   items={portfolioItems} 
 *   onSelect={(item) => setSelectedItem(item)} 
 * />
 * ```
 */
export const IdentityCarousel: React.FC<IdentityCarouselProps> = ({ items, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Reset index when items change (e.g. filtering)
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  /**
   * Navigate to the previous carousel item
   */
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  /**
   * Navigate to the next carousel item
   */
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  /**
   * Handle drag end event for swipe navigation
   */
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsPaused(false);
    if (info.offset.x > 50) {
      goToPrevious();
    } else if (info.offset.x < -50) {
      goToNext();
    }
  };

  // Wheel navigation state
  const wheelAccumulator = React.useRef(0);
  const lastWheelTime = React.useRef(0);
  const WHEEL_THRESHOLD = 50; // Sensitivity threshold
  const WHEEL_COOLDOWN = 250; // ms between slides

  /**
   * Handle mouse wheel for smooth horizontal scroll navigation
   * Implements accumulation and throttling to handle trackpad momentum
   */
  const handleWheel = (e: React.WheelEvent) => {
    // Only handle if horizontal scroll is dominant to allow vertical page scrolling
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const now = Date.now();
      
      // Accumulate delta
      wheelAccumulator.current += e.deltaX;

      // Check cooldown
      if (now - lastWheelTime.current > WHEEL_COOLDOWN) {
        if (wheelAccumulator.current > WHEEL_THRESHOLD) {
          goToNext();
          wheelAccumulator.current = 0;
          lastWheelTime.current = now;
        } else if (wheelAccumulator.current < -WHEEL_THRESHOLD) {
          goToPrevious();
          wheelAccumulator.current = 0;
          lastWheelTime.current = now;
        }
      }

      // Reset accumulator if scrolling acts weird or direction changes abruptly
      if (Math.abs(wheelAccumulator.current) > WHEEL_THRESHOLD * 2) {
          wheelAccumulator.current = 0;
      }
    } else {
        // Reset if vertical scrolling happens
        wheelAccumulator.current = 0;
    }
  };

  if (items.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[600px] flex flex-col items-center justify-center perspective-[1200px] overflow-visible group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
    >
      {/* Carousel Items Container */}
      <div className="relative w-[340px] md:w-[400px] h-[520px] md:h-[580px] flex items-center justify-center preserve-3d">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            // Virtualization Logic:
            // Calculate distance in a circular manner
            // We only render items if they are within VISIBLE_RANGE (e.g., -2 to +2 from center)
            // But we must preserve the 'index' passed to getCarouselItemStyle so the style calculation works correctly relative to currentIndex.
            
            const total = items.length;
            const dist = (index - currentIndex + total) % total;
            
            // Normalize distance to be shortest path (e.g. if total is 10, dist 9 becomes -1)
            let checkDist = dist;
            if (checkDist > total / 2) checkDist -= total;
            
            // We show 2 neighbors on each side (total 5 visible)
            // If optimization is key, strict window of +/- 2 is good.
            const VISIBLE_WINDOW = 3; 
            
            if (Math.abs(checkDist) > VISIBLE_WINDOW) {
                return null; // Do not render distant items in DOM at all
            }

            const isCenter = index === currentIndex;
            const style = getCarouselItemStyle(index, currentIndex, items.length);

            return (
              <CarouselSlide
                key={item.id}
                item={item}
                isCenter={isCenter}
                style={style}
                onClick={() => {
                  if (isCenter) onSelect(item);
                  else setCurrentIndex(index);
                }}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <CarouselControls
        totalItems={items.length}
        currentIndex={currentIndex}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onDotClick={setCurrentIndex}
      />
    </div>
  );
};
