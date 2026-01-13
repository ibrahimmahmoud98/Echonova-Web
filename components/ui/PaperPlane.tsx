import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PaperPlaneProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Custom Paper Plane SVG component - OUTLINE STYLE.
 * Nose points RIGHT at rotation = 0.
 */
export const PaperPlane = forwardRef<SVGSVGElement, PaperPlaneProps>(
  ({ className, style }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("w-6 h-6", className)}
        style={style}
      >
        {/* 
          Paper Plane outline:
          - Nose (single tip): RIGHT at (22, 12)
          - Tail: LEFT at (2, 3) and (2, 21)
        */}
        {/* Main triangle outline */}
        <path d="M22 12 L2 3 L6 12 L2 21 Z" />
        {/* Center fold line */}
        <line x1="22" y1="12" x2="6" y2="12" />
      </svg>
    );
  }
);
PaperPlane.displayName = "PaperPlane";
