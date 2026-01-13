"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface TextDecodeProps {
  text: string;
  className?: string;
  scrambleSpeed?: number; // ms per char flip
  revealSpeed?: number; // ms delay before revealing next char
}

export const TextDecode: React.FC<TextDecodeProps> = ({ 
  text, 
  className,
  scrambleSpeed = 50,
  revealSpeed = 50 
}) => {
  const [display, setDisplay] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentRevealIdx = 0;

    // Start with random chars
    interval = setInterval(() => {
      if (currentRevealIdx >= text.length) {
        clearInterval(interval);
        setComplete(true);
        return;
      }

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (index < currentRevealIdx) return text[index];
          if (char === " ") return " "; 
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(scrambled);
      currentRevealIdx += 0.5; // Reveal slowly
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  return (
    <motion.span className={className}>
      {complete ? text : display}
    </motion.span>
  );
};
