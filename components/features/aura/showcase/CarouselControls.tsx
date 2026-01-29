"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the CarouselControls component
 */
interface CarouselControlsProps {
  /** Total number of items in the carousel */
  totalItems: number;
  /** Currently active/selected index */
  currentIndex: number;
  /** Callback to navigate to previous item */
  onPrevious: () => void;
  /** Callback to navigate to next item */
  onNext: () => void;
  /** Callback when a specific dot is clicked */
  onDotClick: (index: number) => void;
}

/**
 * Carousel navigation controls component
 * 
 * @description Provides navigation buttons (prev/next) and pagination dots
 * for the identity carousel. Uses LTR direction to fix button positions.
 */
export const CarouselControls: React.FC<CarouselControlsProps> = ({
  totalItems,
  currentIndex,
  onPrevious,
  onNext,
  onDotClick,
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50" dir="ltr">
      {/* Pagination Dots */}
      <div className="flex gap-2 max-w-[200px] overflow-x-auto no-scrollbar px-2 py-2 mask-linear">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentIndex ? 'true' : 'false'}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0",
              idx === currentIndex ? "w-8 bg-[#D97040]" : "bg-[#F7F5F0]/20 hover:bg-[#F7F5F0]/50"
            )}
          />
        ))}
      </div>
    </div>
  );
};
