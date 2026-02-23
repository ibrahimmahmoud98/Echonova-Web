"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Simplified interface to avoid strict type collisions between React and Framer Motion types
interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function LiquidButton({ children, className, variant = "primary", ...props }: LiquidButtonProps) {
  // Cast props to Record to bypass the motion/react event handler conflict
  const btnProps = props as Record<string, unknown>;
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    });
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative px-12 py-5 font-bold text-lg rounded-full group overflow-hidden isolating",
        "transition-all duration-500 hover:scale-105 active:scale-95",
        "border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]", // Base glass border
        className
      )}
      style={{
          backgroundColor: variant === "primary" ? "rgba(217, 112, 64, 0.1)" : "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)", // Safari support
      }}
      {...btnProps}
    >
      {/* 1. Internal Gradient Textures */}
      <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-40 transition-all duration-500",
           variant === "primary" 
             ? "from-[var(--color-copper)]/40 via-transparent to-[var(--color-champagne)]/20"
             : "from-white/10 via-transparent to-white/5"
      )} />

       {/* 2. Mouse-following Shine (The 'Liquid' Light) */}
      <div 
        className="absolute w-[150px] h-[150px] bg-white/20 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
            top: mousePos.y - 75,
            left: mousePos.x - 75,
        }}
      />

       {/* 3. Rim Light (White borders that glow) */}
      <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
      <div className="absolute inset-[1px] rounded-full border border-white/5 opacity-50" />
      
      {/* 4. Content Content */}
      <span className={cn(
          "relative z-10 flex items-center justify-center gap-3 tracking-[0.15em] uppercase text-sm",
          "text-[var(--color-ivory)] group-hover:text-white transition-colors drop-shadow-md"
      )}>
        {children}
      </span>
      
      {/* 5. Liquid Reflection Overlay (SVG Noise) */}
       <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light w-[200%] h-full animate-[flow_8s_linear_infinite] pointer-events-none"
        style={{
            backgroundImage: "url('/noise.svg')",
            backgroundSize: "30%"
        }}
      />

    </motion.button>
  );
}
