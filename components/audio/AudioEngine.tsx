
"use client";

import React, { createContext, useContext, useRef, useEffect, useState, useCallback } from "react";

interface AudioContextType {
  playHover: () => void;
  playClick: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  
  // Use HTMLAudioElement for better compatibility than WebAudio for simple SFX
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio objects
    if (typeof window !== "undefined") {
      // Audio files removed to fix 404, fallback tone will be used instead
    }
  }, []);

  const playFallbackTone = useCallback((freq: number) => {
      // Simple WebAudio fallback
      try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextClass) return;
          
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
      } catch (_e) {
          // ignore
      }
  }, []);

  const playSound = useCallback((audioRef: React.MutableRefObject<HTMLAudioElement | null>, fallbackFreq: number) => {
    if (isMuted) return;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback tone if file fails or not allowed
        playFallbackTone(fallbackFreq);
      });
    } else {
        playFallbackTone(fallbackFreq);
    }
  }, [isMuted, playFallbackTone]);

  const playHover = () => playSound(hoverSound, 400); // 400Hz fallback for hover
  const playClick = () => playSound(clickSound, 800); // 800Hz fallback for click
  
  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <AudioContext.Provider value={{ playHover, playClick, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
