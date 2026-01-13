"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AutoFeatureCardProps {
  features: Feature[];
  interval?: number;
}

export const AutoFeatureCard: React.FC<AutoFeatureCardProps> = ({ features, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, interval);
    return () => clearInterval(timer);
  }, [features.length, interval]);

  const currentFeature = features[currentIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-8 min-h-[200px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center inset-0"
        >
          <div className="mb-6 p-4 rounded-full bg-[var(--color-copper)]/10 text-[var(--color-copper)] border border-[var(--color-copper)]/20 shadow-[0_0_15px_rgba(217,112,64,0.1)]">
            <Icon className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-3">{currentFeature.title}</h4>
          <p className="text-[var(--color-ivory)]/80 leading-relaxed max-w-sm">
            {currentFeature.description}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-4 flex gap-2">
        {features.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[var(--color-copper)]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
