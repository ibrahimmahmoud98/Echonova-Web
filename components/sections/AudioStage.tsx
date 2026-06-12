"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Mic2, Play, Square, Volume2, Heart, Shield, Globe, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AudioStage — real-audio rebuild.
 *
 * Plays five ECHONOVA brand tracks through an <audio> element routed into a
 * WebAudio analyser, so the radial visualizer still reacts to the live signal.
 *
 *   • Five real tracks served from /audio
 *   • Real-time frequency analyser feeding a Canvas visualizer
 *     (radial spectrum + reactive waveform line + center glow)
 *   • Center play button — click to listen; click again to stop
 *   • Five "track cards" switch the active song
 *   • Respects the global MuteToggle
 */

interface Track {
  id: string;
  name: string;
  src: string;
  duration: number; // seconds — used for the card label
  icon: React.ComponentType<{ className?: string }>;
}

const TRACKS: Track[] = [
  { id: "wing",  name: "إيكونوڤا جناح",                     src: "/audio/echonova-wing.mp3",      duration: 229, icon: Heart },
  { id: "eid",   name: "أغنية العيد الرسمية لوزارة الاسكان", src: "/audio/housing-eid-anthem.mp3", duration: 46,  icon: Globe },
  { id: "asia",  name: "كبير آسيا",                         src: "/audio/kabeer-asia.mp3",        duration: 61,  icon: Activity },
  { id: "eidna", name: "عيدنا افراح و هَنا",                src: "/audio/eidna-afrah.mp3",        duration: 88,  icon: Mic2 },
  { id: "azrag", name: "ازرق ازرق كحل يا كبير",             src: "/audio/azrag-azrag.mp3",        duration: 136, icon: Shield },
];

/** Formats a seconds count as m:ss. */
function formatTime(total: number): string {
  if (!isFinite(total) || total < 0) total = 0;
  const m = Math.floor(total / 60);
  const s = Math.round(total % 60);
  if (s === 60) return `${m + 1}:00`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ====================================================================
// COMPONENT
// ====================================================================

export function AudioStage() {
  const { isMuted, playClick, playHover } = useAudio();

  const [activeId, setActiveId] = useState<string>(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const active = TRACKS.find((t) => t.id === activeId)!;

  // Lazily wire the WebAudio graph: <audio> -> master gain -> analyser -> out.
  // Must run inside a user gesture so the AudioContext is allowed to start.
  const ensureGraph = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return null;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = isMuted ? 0 : 1;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.78;
      const source = ctx.createMediaElementSource(audioEl);
      source.connect(master);
      master.connect(analyser);
      analyser.connect(ctx.destination);
      masterGainRef.current = master;
      analyserRef.current = analyser;
      sourceRef.current = source;
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [isMuted]);

  // Mute changes propagate to master
  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(
        isMuted ? 0 : 1,
        ctxRef.current.currentTime + 0.1
      );
    }
  }, [isMuted]);

  const stopPlayback = useCallback(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const startPlayback = useCallback((trackId: string) => {
    const track = TRACKS.find((t) => t.id === trackId);
    const audioEl = audioRef.current;
    if (!track || !audioEl) return;

    ensureGraph();

    // Swap the source only when switching to a different track
    if (!audioEl.src || !audioEl.src.endsWith(track.src)) {
      audioEl.src = track.src;
    }
    audioEl.currentTime = 0;
    const playPromise = audioEl.play();
    if (playPromise) playPromise.catch(() => {});

    setActiveId(trackId);
    setIsPlaying(true);
    setHasInteracted(true);
  }, [ensureGraph]);

  const handlePlayToggle = useCallback(() => {
    playClick();
    if (isPlaying) stopPlayback();
    else startPlayback(activeId);
  }, [isPlaying, startPlayback, stopPlayback, activeId, playClick]);

  const handleSelectTrack = useCallback((id: string) => {
    playClick();
    if (isPlaying) {
      startPlayback(id);
    } else {
      setActiveId(id);
    }
  }, [isPlaying, startPlayback, playClick]);

  // Reset play state when a track finishes on its own
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    audioEl.addEventListener("ended", onEnded);
    return () => audioEl.removeEventListener("ended", onEnded);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioEl) audioEl.pause();
      if (ctxRef.current) ctxRef.current.close().catch(() => {});
    };
  }, []);

  // ===== Visualizer Loop =====
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx2d.clearRect(0, 0, w, h);

      const analyser = analyserRef.current;
      const freqData = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
      const timeData = analyser ? new Uint8Array(analyser.fftSize) : null;
      if (analyser && freqData && timeData) {
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);
      }

      // === Radial spectrum ===
      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.22;
      const bars = 96;

      ctx2d.lineCap = "round";
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
        let v = 0;
        if (freqData) {
          v = freqData[Math.floor((i / bars) * freqData.length * 0.6)] / 255;
        } else {
          // Idle ambient — gentle wobble
          v = 0.05 + Math.sin(performance.now() * 0.001 + i * 0.2) * 0.04 + Math.random() * 0.02;
        }
        const len = baseR * (0.25 + v * 1.6);
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * (baseR + len);
        const y2 = cy + Math.sin(angle) * (baseR + len);

        const grad = ctx2d.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(217,112,64,${0.3 + v * 0.4})`);
        grad.addColorStop(1, `rgba(255,214,165,${v * 0.9 + 0.1})`);
        ctx2d.strokeStyle = grad;
        ctx2d.lineWidth = (Math.min(w, h) / 200) * (1 + v * 1.2);
        ctx2d.beginPath();
        ctx2d.moveTo(x1, y1);
        ctx2d.lineTo(x2, y2);
        ctx2d.stroke();
      }

      // === Inner waveform ring ===
      if (timeData) {
        ctx2d.beginPath();
        for (let i = 0; i < timeData.length; i++) {
          const t = i / timeData.length;
          const angle = t * Math.PI * 2 - Math.PI / 2;
          const v = timeData[i] / 128 - 1; // -1..1
          const r = baseR * (0.85 + v * 0.15);
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (i === 0) ctx2d.moveTo(x, y);
          else ctx2d.lineTo(x, y);
        }
        ctx2d.closePath();
        ctx2d.strokeStyle = "rgba(255,214,165,0.5)";
        ctx2d.lineWidth = 1.5 * dpr;
        ctx2d.stroke();
      } else {
        // Idle ring
        ctx2d.beginPath();
        ctx2d.arc(cx, cy, baseR * 0.85, 0, Math.PI * 2);
        ctx2d.strokeStyle = "rgba(255,214,165,0.2)";
        ctx2d.lineWidth = 1 * dpr;
        ctx2d.stroke();
      }

      // === Center glow ===
      const avg = freqData
        ? freqData.reduce((s, v) => s + v, 0) / freqData.length / 255
        : 0;
      const glowR = baseR * 0.5 * (0.6 + avg * 1.5);
      const glow = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(217,112,64,${0.4 + avg * 0.5})`);
      glow.addColorStop(0.6, "rgba(217,112,64,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx2d.fillStyle = glow;
      ctx2d.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Progress tracking
  useEffect(() => {
    if (!isPlaying) return;
    const audioEl = audioRef.current;
    if (!audioEl) return;
    let raf: number;
    const tick = () => {
      if (audioEl.duration > 0) {
        setProgress(Math.min(1, audioEl.currentTime / audioEl.duration));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  return (
    <section className="relative w-full py-20 md:py-28">
      {/* Hidden audio element — routed into the WebAudio graph */}
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" className="hidden" />

      {/* Header */}
      <div className="container mx-auto px-4 mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 opacity-80">
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
          <span className="text-[var(--color-copper)] text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
          </span>
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-tight pb-2">
          الإنتاج الصوتي
        </h2>
        <div className="flex items-center justify-center gap-4 my-6">
          <span className="block w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-copper)]/50" />
          <span className="text-[var(--color-copper)] text-base opacity-70 select-none" aria-hidden="true">✦</span>
          <span className="block w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-copper)]/50" />
        </div>
        <p className="text-[var(--color-ivory)]/70 max-w-md mx-auto text-base md:text-lg font-light italic">
          ليست مجرد اغنية بل احساس يلامس روح المستمع
        </p>
      </div>

      {/* MAIN STAGE */}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        {/* Outer halo — pulses with audio */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isPlaying ? 0.85 : 0.35, scale: isPlaying ? 1.02 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute -inset-16 md:-inset-24 rounded-full blur-[100px] pointer-events-none bg-[var(--color-copper)]/30"
        />

        <div className="relative aspect-[16/10] md:aspect-[2/1] rounded-3xl overflow-hidden bg-black/60 backdrop-blur-sm border border-white/5">
          {/* Edge light leaks */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-copper)] to-transparent opacity-50 pointer-events-none z-30" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-copper)] to-transparent opacity-50 pointer-events-none z-30" />

          {/* Visualizer canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          />

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.button
              onClick={handlePlayToggle}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "إيقاف" : "تشغيل"}
              className={cn(
                "relative pointer-events-auto w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300",
                "border-2 backdrop-blur-md"
              )}
              style={{
                backgroundColor: isPlaying ? "rgba(217,112,64,0.25)" : "rgba(0,0,0,0.5)",
                borderColor: isPlaying ? "var(--color-champagne)" : "var(--color-copper)",
                boxShadow: isPlaying
                  ? "0 0 60px rgba(217,112,64,0.7), inset 0 0 30px rgba(255,214,165,0.2)"
                  : "0 0 30px rgba(217,112,64,0.4)",
              }}
            >
              {/* Pulsing ring when idle */}
              {!isPlaying && (
                <motion.span
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.4 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-[var(--color-copper)] pointer-events-none"
                />
              )}
              {isPlaying ? (
                <Square className="w-7 h-7 md:w-9 md:h-9 text-[var(--color-champagne)] fill-current" />
              ) : (
                <Play className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-copper)] fill-current ml-1" />
              )}
            </motion.button>
          </div>

          {/* Track meta — bottom-right of visualizer */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right" dir="rtl">
            <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
              {active.name}
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-44 md:w-56 h-px bg-white/15 overflow-hidden">
              <div
                className="h-full bg-[var(--color-copper)] transition-all duration-150 origin-right"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          {/* Status — top-left */}
          <div className="absolute top-6 left-6 z-10 pointer-events-none flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase">
            <span
              className={cn(
                "block w-2 h-2 rounded-full",
                isPlaying ? "bg-red-500 animate-pulse" : "bg-white/30"
              )}
            />
            <span className={isPlaying ? "text-red-400" : "text-white/40"}>
              {isPlaying ? "Live" : "Standby"}
            </span>
          </div>

          {/* Headphone hint — only before first interaction */}
          {!hasInteracted && !isMuted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 4, times: [0, 0.2, 0.8, 1], repeat: Infinity, repeatDelay: 1 }}
              className="absolute bottom-6 left-6 z-10 pointer-events-none flex items-center gap-2 text-white/60 text-xs font-mono tracking-wider"
              dir="ltr"
            >
              <Volume2 className="w-3.5 h-3.5" />
              HEADPHONES RECOMMENDED
            </motion.div>
          )}

          {/* Muted notice */}
          {isMuted && (
            <div className="absolute top-6 right-6 z-10 pointer-events-none px-3 py-1 rounded-full bg-red-900/40 border border-red-500/40 backdrop-blur-md">
              <span className="text-red-300 text-[10px] font-mono tracking-widest uppercase">صامت</span>
            </div>
          )}
        </div>

        {/* Track cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
          {TRACKS.map((track) => {
            const isActive = track.id === activeId;
            const Icon = track.icon;
            return (
              <motion.button
                key={track.id}
                onClick={() => handleSelectTrack(track.id)}
                onMouseEnter={playHover}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "relative group flex flex-col items-start gap-2 p-3 md:p-4 rounded-xl border transition-all duration-300 text-right",
                  isActive
                    ? "bg-[var(--color-copper)]/15 border-[var(--color-copper)]"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/25"
                )}
                style={{
                  filter: isActive ? "drop-shadow(0 6px 18px rgba(217,112,64,0.4))" : "none",
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-[var(--color-copper)]" : "text-white/40"
                    )}
                  />
                </div>
                <div
                  className={cn(
                    "text-sm md:text-base font-bold transition-colors",
                    isActive ? "text-white" : "text-white/70"
                  )}
                >
                  {track.name}
                </div>
                <div className="text-[10px] text-white/40 font-mono">
                  {formatTime(track.duration)}
                </div>
                {isActive && isPlaying && (
                  <div className="absolute top-2 left-2 flex items-end gap-px h-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="block w-0.5 bg-[var(--color-copper)]"
                        style={{ height: 10, transformOrigin: "bottom" }}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Description + CTAs row */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 text-right" dir="rtl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <span className="text-[var(--color-copper)]">صدى</span> المشاعر
            </h3>
            <p className="text-base text-[var(--color-ivory)]/80 leading-relaxed font-light max-w-2xl">
              خدمة الإنتاج الموسيقي والتوزيع المتقدم التي تقضي على التوليد الآلي العشوائي عبر هندسة صوتية صارمة. نترجم الكلمات إلى إحساس بشري طبيعي يلامس الوجدان بأدق اللهجات والمقامات، مع تثبيت البصمة الصوتية لهويتكم بنقاء تام وخلو مطلق من الهلوسات الترددية.
            </p>
          </div>
          <div className="flex md:flex-col gap-3 justify-end">
            <Link href="/services/whisper">
              <LiquidButton variant="secondary" className="w-full px-5 py-2.5 text-sm">
                اعرف أكثر
              </LiquidButton>
            </Link>
            <LiquidButton
              onClick={() => {
                playClick();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.location.href = "/contact";
              }}
              onMouseEnter={playHover}
              variant="primary"
              className="w-full px-5 py-2.5 text-sm"
            >
              ابدأ التوزيع الصوتي
            </LiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
