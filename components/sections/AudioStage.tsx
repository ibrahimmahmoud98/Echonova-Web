"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioEngine";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Mic2, Play, Square, Volume2, Heart, Shield, Globe, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AudioStage — replaces the static AudioShowcase.
 *
 * The previous section was paradoxical: a "Sound" service with zero audio
 * playable on the page. This rebuild fixes that with a real WebAudio engine:
 *
 *   • Five procedurally-generated tracks (oscillator + envelope synthesis)
 *     covering the brand-anthem / ambient / sting / VO-bed / pulse moods
 *   • Real-time frequency analyser feeding a Canvas visualizer
 *     (radial spectrum + reactive waveform line + ambient particles)
 *   • Center play button — click to listen; click again to stop
 *   • Five "track cards" replace the old static thumbnails
 *   • Respects the global MuteToggle (won't autoplay if user has muted)
 *
 * NB: tracks are generated client-side from AudioContext primitives so we
 * don't need to ship audio files. They sound minimal but musical, designed
 * to demonstrate the "we engineer sound, not just generate it" thesis.
 */

interface Track {
  id: string;
  name: string;
  sub: string;
  duration: number; // seconds
  generator: (ctx: AudioContext, dest: AudioNode) => () => void;
  feature: { icon: React.ComponentType<{ className?: string }>; title: string };
}

// ====================================================================
// TRACK GENERATORS — each returns a stop function
// ====================================================================

function brandAnthem(ctx: AudioContext, dest: AudioNode) {
  // Sustained pad with arpeggio bell on top
  const now = ctx.currentTime;
  const stops: (() => void)[] = [];

  // PAD: detuned saw stack -> low pass -> long envelope
  const padNotes = [98, 147, 196]; // G2, D3, G3
  padNotes.forEach((freq, i) => {
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    o1.type = "sawtooth";
    o2.type = "sawtooth";
    o1.frequency.setValueAtTime(freq, now);
    o2.frequency.setValueAtTime(freq * 1.005, now); // detune
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(1200, now + 4);
    filter.Q.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.07, now + 1.5);
    g.gain.setValueAtTime(0.07, now + 9);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 12);
    o1.connect(filter); o2.connect(filter); filter.connect(g); g.connect(dest);
    o1.start(now + i * 0.1); o2.start(now + i * 0.1);
    o1.stop(now + 12); o2.stop(now + 12);
    stops.push(() => { try { o1.stop(); o2.stop(); } catch {} });
  });

  // ARP: triangle pings on a pentatonic
  const arp = [392, 587, 784, 587, 659, 784]; // G4 D5 G5 D5 E5 G5
  for (let i = 0; i < 16; i++) {
    const t = now + 2 + i * 0.4;
    const note = arp[i % arp.length] * (i > 8 ? 2 : 1);
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(note, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g); g.connect(dest);
    o.start(t); o.stop(t + 0.5);
    stops.push(() => { try { o.stop(); } catch {} });
  }

  return () => stops.forEach((s) => s());
}

function ambient(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const stops: (() => void)[] = [];

  // Slow evolving sine drone with LFO modulation
  const drones = [55, 82, 110, 165]; // A1 E2 A2 E3
  drones.forEach((freq, i) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, now);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.1 + i * 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = freq * 0.005;
    lfo.connect(lfoGain); lfoGain.connect(o.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.04, now + 3);
    g.gain.setValueAtTime(0.04, now + 12);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 15);
    o.connect(g); g.connect(dest);
    o.start(now); lfo.start(now);
    o.stop(now + 15); lfo.stop(now + 15);
    stops.push(() => { try { o.stop(); lfo.stop(); } catch {} });
  });

  return () => stops.forEach((s) => s());
}

function cinematicSting(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const stops: (() => void)[] = [];

  // Low rumble + bright stab + tail noise
  const rumble = ctx.createOscillator();
  rumble.type = "sine";
  rumble.frequency.setValueAtTime(40, now);
  rumble.frequency.exponentialRampToValueAtTime(28, now + 5);
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.4, now);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 5);
  rumble.connect(rumbleGain); rumbleGain.connect(dest);
  rumble.start(now); rumble.stop(now + 5);
  stops.push(() => { try { rumble.stop(); } catch {} });

  // Stab — square + filter sweep
  const stab = ctx.createOscillator();
  stab.type = "square";
  stab.frequency.setValueAtTime(330, now + 0.05);
  const stabFilter = ctx.createBiquadFilter();
  stabFilter.type = "lowpass";
  stabFilter.frequency.setValueAtTime(2400, now + 0.05);
  stabFilter.frequency.exponentialRampToValueAtTime(180, now + 1.5);
  const stabGain = ctx.createGain();
  stabGain.gain.setValueAtTime(0.0001, now + 0.05);
  stabGain.gain.exponentialRampToValueAtTime(0.18, now + 0.08);
  stabGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
  stab.connect(stabFilter); stabFilter.connect(stabGain); stabGain.connect(dest);
  stab.start(now + 0.05); stab.stop(now + 1.6);
  stops.push(() => { try { stab.stop(); } catch {} });

  // Tail noise (like cymbal swell)
  const buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 1.5);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 4000;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.06, now + 0.5);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 4);
  noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(dest);
  noise.start(now);
  stops.push(() => { try { noise.stop(); } catch {} });

  return () => stops.forEach((s) => s());
}

function voBed(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const stops: (() => void)[] = [];

  // Soft warm pad — 3rd + 5th
  const notes = [110, 138.6, 165]; // A2 C#3 E3
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.setValueAtTime(freq, now);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.06 - i * 0.01, now + 2);
    g.gain.setValueAtTime(0.06 - i * 0.01, now + 8);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 10);
    o.connect(filter); filter.connect(g); g.connect(dest);
    o.start(now + i * 0.05); o.stop(now + 10);
    stops.push(() => { try { o.stop(); } catch {} });
  });

  return () => stops.forEach((s) => s());
}

function tribalPulse(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;
  const stops: (() => void)[] = [];

  // Sub bass kick on beat + percussive blip
  const bpm = 92;
  const beat = 60 / bpm;
  const totalBeats = 16;

  for (let i = 0; i < totalBeats; i++) {
    const t = now + i * beat * 0.5;

    // Kick
    if (i % 2 === 0) {
      const k = ctx.createOscillator();
      k.frequency.setValueAtTime(80, t);
      k.frequency.exponentialRampToValueAtTime(35, t + 0.08);
      const kg = ctx.createGain();
      kg.gain.setValueAtTime(0.4, t);
      kg.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      k.connect(kg); kg.connect(dest);
      k.start(t); k.stop(t + 0.2);
      stops.push(() => { try { k.stop(); } catch {} });
    }

    // Tick
    if (i % 4 === 1 || i % 4 === 3) {
      const o = ctx.createOscillator();
      o.type = "square";
      o.frequency.value = 1200 + (Math.random() * 400);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 800;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      o.connect(filter); filter.connect(g); g.connect(dest);
      o.start(t); o.stop(t + 0.1);
      stops.push(() => { try { o.stop(); } catch {} });
    }
  }

  return () => stops.forEach((s) => s());
}

const TRACKS: Track[] = [
  { id: "anthem",  name: "نشيد البراند",   sub: "Brand Anthem",     duration: 12, generator: brandAnthem,    feature: { icon: Heart,    title: "الارتباط الوجداني" } },
  { id: "ambient", name: "فضاء صوتي",       sub: "Ambient",          duration: 15, generator: ambient,        feature: { icon: Globe,    title: "بُعد لانهائي" } },
  { id: "sting",   name: "نبرة سينمائية",  sub: "Cinematic Sting",  duration: 5,  generator: cinematicSting, feature: { icon: Activity, title: "وقع لحظي" } },
  { id: "vo",      name: "بطانة صوت",       sub: "VO Bed",           duration: 10, generator: voBed,          feature: { icon: Mic2,     title: "حضن للصوت" } },
  { id: "pulse",   name: "نبض قبَلي",       sub: "Tribal Pulse",     duration: 12, generator: tribalPulse,    feature: { icon: Shield,   title: "إيقاع جذري" } },
];

// ====================================================================
// COMPONENT
// ====================================================================

export function AudioStage() {
  const { isMuted, playClick, playHover } = useAudio();

  const [activeId, setActiveId] = useState<string>(TRACKS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const stopFnRef = useRef<(() => void) | null>(null);
  const startTimeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = TRACKS.find((t) => t.id === activeId)!;

  // Lazy AudioContext
  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = isMuted ? 0 : 0.7;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.78;
      master.connect(analyser);
      analyser.connect(ctx.destination);
      masterGainRef.current = master;
      analyserRef.current = analyser;
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
        isMuted ? 0 : 0.7,
        ctxRef.current.currentTime + 0.1
      );
    }
  }, [isMuted]);

  const stopPlayback = useCallback(() => {
    if (stopFnRef.current) { stopFnRef.current(); stopFnRef.current = null; }
    if (stopTimerRef.current) { clearTimeout(stopTimerRef.current); stopTimerRef.current = null; }
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const startPlayback = useCallback((trackId: string) => {
    const track = TRACKS.find((t) => t.id === trackId);
    if (!track) return;

    if (stopFnRef.current) {
      stopFnRef.current();
      stopFnRef.current = null;
    }

    const ctx = ensureContext();
    const master = masterGainRef.current!;
    const stopFn = track.generator(ctx, master);
    stopFnRef.current = stopFn;
    startTimeRef.current = ctx.currentTime;
    setActiveId(trackId);
    setIsPlaying(true);
    setHasInteracted(true);

    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      stopPlayback();
    }, track.duration * 1000);
  }, [ensureContext, stopPlayback]);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stopFnRef.current) stopFnRef.current();
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
    const ctx = ctxRef.current;
    if (!ctx) return;
    const total = active.duration;
    let raf: number;
    const tick = () => {
      const elapsed = ctx.currentTime - startTimeRef.current;
      setProgress(Math.min(1, elapsed / total));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, active.duration]);

  return (
    <section className="relative w-full py-20 md:py-28">
      {/* Header */}
      <div className="container mx-auto px-4 mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 opacity-80">
          <span className="block w-8 h-px bg-[var(--color-copper)]/60" />
          <span className="text-[var(--color-copper)] text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase">
            Chapter 03 · Sound
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
          نهندس الصدى — الموسيقى تأتي بعد ذلك
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

          {/* Track meta — bottom-left of visualizer */}
          <div className="absolute bottom-6 right-6 z-10 pointer-events-none text-right" dir="rtl">
            <div className="text-[10px] font-mono tracking-[0.3em] text-[var(--color-copper)]/80 uppercase mb-1">
              {active.sub}
            </div>
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
            const Icon = track.feature.icon;
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
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-60" dir="ltr">
                    {track.sub}
                  </span>
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
                  {track.duration}s
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
            <button
              onClick={() => {
                playClick();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={playHover}
              className="w-full px-5 py-2.5 text-sm font-bold rounded-full bg-gradient-to-r from-[var(--color-copper)] to-orange-500 text-white hover:shadow-[0_0_30px_rgba(217,112,64,0.5)] transition-shadow"
            >
              ابدأ التوزيع الصوتي
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
