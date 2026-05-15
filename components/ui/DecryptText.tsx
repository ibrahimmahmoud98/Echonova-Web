"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

// Arabic-native scramble pool: Arabic letters + a few digits/symbols only.
// Keeps the transient state visually consistent with the brand language
// (no Japanese katakana — that confused viewers seeing what looked like
// random Japanese in place of the headline).
const CHARS = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789#*+";

interface DecryptTextProps {
  text: string;
  className?: string;
  /** Interval (ms) between iterations of the decode loop */
  speed?: number;
  /** When true, the component renders scrambled glyphs first and resolves
   *  to the real text only when it scrolls into view. Default: false. */
  startScrambled?: boolean;
  /** Optional ms delay before the decode begins (after entering view). */
  startDelay?: number;
}

function scramble(text: string): string {
  return text
    .split("")
    .map((c) =>
      c === " " || c === "\n" ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
    )
    .join("");
}

export function DecryptText({
  text,
  className = "",
  speed = 50,
  startScrambled = false,
  startDelay = 0,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(() =>
    startScrambled ? scramble(text) : text
  );
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // CRITICAL: use refs (not state) for the "started" flag. Using useState
  // here triggers a re-render that re-runs the effect, which fires the
  // cleanup of the *previous* run — and that cleanup clears the timeout
  // before the decode interval can ever start. With a ref the flag is
  // checked synchronously without re-running the effect.
  const startedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    timeoutRef.current = setTimeout(() => {
      let iteration = 0;

      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              if (letter === " " || letter === "\n") return letter;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // Final write to ensure we land on the exact target text
          setDisplayText(text);
        }
        iteration += 1 / 3;
      }, speed);
    }, startDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
