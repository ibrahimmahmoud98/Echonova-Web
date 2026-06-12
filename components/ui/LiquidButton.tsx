"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function LiquidButton({ children, className, variant = "primary", ...props }: LiquidButtonProps) {
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
        "relative px-8 py-3.5 font-bold text-[15px] rounded-full group overflow-hidden isolation-auto",
        "transition-all duration-500 ease-out hover:scale-104 hover:-translate-y-0.5 active:scale-98",
        variant === "primary"
          ? "border border-[rgba(255,214,165,0.4)] hover:border-[rgba(255,214,165,0.6)] text-[#FFE9CF] hover:text-white"
          : "border border-[rgba(255,214,165,0.25)] hover:border-[rgba(255,214,165,0.6)] text-[var(--color-ivory)] hover:text-white",
        className
      )}
      style={{
          background: variant === "primary"
            ? "linear-gradient(160deg, rgba(217, 112, 64, 0.45), rgba(217, 112, 64, 0.18) 55%, rgba(255, 214, 165, 0.22)), rgba(10, 24, 40, 0.35)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent 55%), rgba(8, 18, 31, 0.32)",
          backdropFilter: variant === "primary" ? "blur(16px) saturate(1.5)" : "blur(14px) saturate(1.3)",
          WebkitBackdropFilter: variant === "primary" ? "blur(16px) saturate(1.5)" : "blur(14px) saturate(1.3)",
          boxShadow: variant === "primary"
            ? "inset 0 1px 0 rgba(255, 255, 255, 0.38), inset 0 -1px 0 rgba(217, 112, 64, 0.28), 0 18px 45px -18px rgba(217, 112, 64, 0.6)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.14)",
      }}
      whileHover={{
        boxShadow: variant === "primary"
          ? "inset 0 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 0 rgba(217, 112, 64, 0.35), 0 26px 54px -14px rgba(217, 112, 64, 0.75)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 15px 35px -15px rgba(217, 112, 64, 0.2)",
      }}
      {...btnProps}
    >
      {/* 1. Rim Light inner border for primary (matches .btn-p:before) */}
      {variant === "primary" && (
        <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-100 pointer-events-none z-0" />
      )}

      {/* 2. Slanted gloss swipe (matches .btn-p:after) */}
      <div 
        className={cn(
          "absolute top-[-40%] bottom-[-40%] w-[34%] left-[-60%] skew-x-[-20deg] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "bg-gradient-to-r from-transparent via-white/35 to-transparent",
          "group-hover:left-[140%]"
        )}
      />

      {/* 3. Mouse-following Light (kept as a subtle premium accent) */}
      <div 
        className="absolute w-[120px] h-[120px] bg-white/10 rounded-full blur-[35px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
            top: mousePos.y - 60,
            left: mousePos.x - 60,
        }}
      />

      {/* 4. Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-center w-full">
        {children}
      </span>
    </motion.button>
  );
}
