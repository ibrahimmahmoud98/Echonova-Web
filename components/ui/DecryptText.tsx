"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function DecryptText({ text, className = "", speed = 50 }: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Slow down resolution
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isInView, started, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
