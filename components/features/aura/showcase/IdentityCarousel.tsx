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

  /**
   * Handle mouse wheel for horizontal scroll navigation
   */
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0) goToNext();
      else goToPrevious();
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
