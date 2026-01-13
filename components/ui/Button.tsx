"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Create a simple utility if it doesn't exist, or we can inline it for now.
// Usually cn is clsx + tailwind-merge. I'll create the util file next.

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {
    
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none";
    
    // Variants
    const variants = {
      primary: "bg-[var(--color-copper)] text-white hover:bg-[var(--color-copper-burn)]",
      secondary: "bg-[var(--color-navy)] text-[var(--color-ivory)] border border-[var(--color-copper)]",
      outline: "border border-[var(--color-copper)] text-[var(--color-copper)] hover:bg-[var(--color-copper)] hover:text-white",
      ghost: "text-[var(--color-ivory)] hover:text-[var(--color-copper)] hover:bg-white/5",
    };

    // Sizes
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glow && "shadow-[0_0_20px_rgba(217,112,64,0.5)] hover:shadow-[0_0_30px_rgba(217,112,64,0.7)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
