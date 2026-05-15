"use client";

import React, { createContext, useContext, useRef, useEffect, useState, useCallback } from "react";

interface AudioContextType {
  playHover: () => void;
  playClick: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isAudioReady: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

const STORAGE_KEY = "ens-audio-muted";
const HOVER_SRC = "/sounds/hover.mp3";
const CLICK_SRC = "/sounds/click.mp3";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);

  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements + hydrate mute preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hydrate persisted mute preference
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setIsMuted(true);
    } catch {
      // localStorage may be unavailable
    }

    // Preload sound files
    const hover = new Audio(HOVER_SRC);
    hover.preload = "auto";
    hover.volume = 0.35;
    hover.crossOrigin = "anonymous";

    const click = new Audio(CLICK_SRC);
    click.preload = "auto";
    click.volume = 0.55;
    click.crossOrigin = "anonymous";

    hoverSound.current = hover;
    clickSound.current = click;

    // Mark ready when files are loadable, with a fallback timeout
    const readyTimer = setTimeout(() => setIsAudioReady(true), 800);
    const onCanPlay = () => setIsAudioReady(true);
    hover.addEventListener("canplaythrough", onCanPlay, { once: true });
    click.addEventListener("canplaythrough", onCanPlay, { once: true });

    return () => {
      clearTimeout(readyTimer);
      hover.removeEventListener("canplaythrough", onCanPlay);
      click.removeEventListener("canplaythrough", onCanPlay);
      try {
        hover.pause();
        click.pause();
      } catch {}
      hoverSound.current = null;
      clickSound.current = null;
    };
  }, []);

  // Persist mute preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, isMuted ? "1" : "0");
    } catch {}
  }, [isMuted]);

  // WebAudio fallback tone (used if mp3 playback fails)
  const playFallbackTone = useCallback((freq: number, durationMs = 100) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const dur = durationMs / 1000;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch {
      // ignore
    }
  }, []);

  const playSound = useCallback(
    (audioRef: React.MutableRefObject<HTMLAudioElement | null>, fallbackFreq: number) => {
      if (isMuted) return;
      const a = audioRef.current;
      if (a && a.readyState >= 2 /* HAVE_CURRENT_DATA */) {
        try {
          a.currentTime = 0;
          const result = a.play();
          if (result && typeof result.catch === "function") {
            result.catch(() => playFallbackTone(fallbackFreq));
          }
          return;
        } catch {
          playFallbackTone(fallbackFreq);
          return;
        }
      }
      playFallbackTone(fallbackFreq);
    },
    [isMuted, playFallbackTone]
  );

  const playHover = useCallback(() => playSound(hoverSound, 400), [playSound]);
  const playClick = useCallback(() => playSound(clickSound, 800), [playSound]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      // Soft confirmation when un-muting
      if (!next) playFallbackTone(700, 80);
      return next;
    });
  }, [playFallbackTone]);

  return (
    <AudioContext.Provider value={{ playHover, playClick, isMuted, toggleMute, isAudioReady }}>
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
