"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioEngine";

/**
 * Persistent floating audio toggle.
 * Bottom-left (RTL: right-side from user's perspective at the visual edge).
 * Sits above content. Includes a "wave" indicator when active and
 * a one-time onboarding pulse to call attention to the feature.
 */
export const MuteToggle: React.FC = () => {
  const { isMuted, toggleMute, isAudioReady } = useAudio();
  const [showHint, setShowHint] = useState(false);

  // Show first-time tooltip 3s after page mounts (only if user has never toggled)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seenKey = "ens-audio-hint-seen";
    if (window.localStorage.getItem(seenKey) === "1") return;

    const t = setTimeout(() => setShowHint(true), 3000);
    const dismiss = setTimeout(() => {
      setShowHint(false);
      try {
        window.localStorage.setItem(seenKey, "1");
      } catch {}
    }, 9000);

    return () => {
      clearTimeout(t);
      clearTimeout(dismiss);
    };
  }, []);

  const handleClick = () => {
    setShowHint(false);
    try {
      window.localStorage.setItem("ens-audio-hint-seen", "1");
    } catch {}
    toggleMute();
  };

  if (!isAudioReady) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[80] flex items-center gap-3 [@media(pointer:coarse)]:bottom-4 [@media(pointer:coarse)]:left-4">
      {/* Hint Tooltip */}
      <AnimatePresence>
        {showHint && !isMuted && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="px-3 py-2 rounded-xl bg-[var(--color-navy)]/95 backdrop-blur-md border border-[var(--color-copper)]/30 text-[11px] text-[var(--color-ivory)]/90 whitespace-nowrap shadow-lg shadow-black/40 font-mono tracking-wide"
            dir="rtl"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-copper)] mr-2 animate-pulse align-middle" />
            تجربة صوتية متاحة — اضغط للكتم
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleClick}
        aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        aria-pressed={isMuted}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 rounded-full bg-[var(--color-navy)]/85 backdrop-blur-md border border-white/10 hover:border-[var(--color-copper)]/60 flex items-center justify-center text-[var(--color-ivory)] shadow-lg shadow-black/40 transition-colors group overflow-hidden"
      >
        {/* Pulsing ring (only when active and hint visible) */}
        <AnimatePresence>
          {showHint && !isMuted && (
            <motion.span
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-[var(--color-copper)] pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Audio waves - shown when un-muted */}
        {!isMuted && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="block w-[26px] h-[26px] rounded-full bg-gradient-radial from-[var(--color-copper)]/15 to-transparent animate-pulse" />
          </span>
        )}

        {/* Icon */}
        <span className="relative z-10">
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5 text-[var(--color-copper)] group-hover:text-[var(--color-champagne)] transition-colors" />
          )}
        </span>

        {/* Diagonal slash indicator when muted (Apple-style) */}
        {isMuted && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-[2px] bg-red-400/80 rotate-45 pointer-events-none rounded-full" />
        )}
      </motion.button>
    </div>
  );
};
