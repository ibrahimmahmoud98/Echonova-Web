"use client";

/**
 * ContactImmersive — رحلة «ابدأ رحلتك.. وارسم بصمتك» بتقنية Scroll-Scrubbed Video.
 *
 * الفيديو المولّد خصيصاً (public/videos/contact-journey.mp4) مثبّت ملء الشاشة
 * ولا يتشغّل ذاتياً أبداً: التمرير هو الذي يحرّك زمن الفيديو (scroll → currentTime)،
 * فالزائر يقود الكاميرا بإصبعه عبر معبد إيكونوڤا — من شرارة العتبة حتى قلب النوفا.
 *
 * ست محطات توقّف داخل المشهد (أزمنة حقيقية من الفيديو) تستقر عندها لوحات
 * النموذج: تدخل من اليمين، تثبت في مساحة الفراغ المصمّمة لها، وتخرج يساراً —
 * كلها مربوطة بنسبة التمرير لا بمؤقتات. خريطة المحطات ظاهرة دائماً وقابلة
 * للقفز، وEnter يقدّم الرحلة.
 *
 * نصوص النموذج كلها منقولة حرفياً من النموذج الأصلي. لا تشغيل تلقائي للفيديو.
 */

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/LiquidButton";

// ─── بيانات النموذج (نفس نصوص الأصل حرفياً) ─────────────────────────────────
type FormData = {
  name: string;
  email: string;
  countryKey: string;
  countryCode?: string;
  phone: string;
  services: string[];
  message: string;
};

const SERVICES = ["الإعلانات السينمائية", "موديلينج", "الإنتاج السينمائي", "الإنتاج الصوتي"];

const COUNTRY_KEYS = [
  { code: "+966", flag: "🇸🇦" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+965", flag: "🇰🇼" },
  { code: "+974", flag: "🇶🇦" },
  { code: "+20", flag: "🇪🇬" },
];

const STEPS = [
  { id: "name", label: "الاسم الكامل" },
  { id: "email", label: "البريد الإلكتروني" },
  { id: "phone", label: "رقم الهاتف" },
  { id: "services", label: "الخدمات المهتم بها" },
  { id: "message", label: "تفاصيل إضافية" },
  { id: "send", label: "إرسال الطلب" },
] as const;

const N = STEPS.length;

// أزمنة توقّف الكاميرا داخل الفيديو المولّد (ثوانٍ) — معالم المشاهد الستة
const STATION_TIMES = [0.4, 2.2, 4.6, 5.65, 7.4, 9.55];
const VIDEO_SRC = "/videos/contact-journey.mp4";
const VIDEO_POSTER = "/videos/contact-journey-poster.jpg";
const SLOT_VH = 110; // طول شريحة التمرير لكل محطة

// مراكز المحطات على محور التقدم 0..1 — المحطة الأولى مستقرة عند فتح الصفحة
// (p=0) والأخيرة عند نهاية التمرير (p=1)
const CENTERS = STEPS.map((_, i) => i / (N - 1));

// خريطة تقدم التمرير → زمن الفيديو (خطية مقطعية عبر المراسي)
const TIMELINE: [number, number][] = CENTERS.map((c, i) => [c, STATION_TIMES[i]] as [number, number]);
function progressToTime(p: number) {
  const t = Math.min(1, Math.max(0, p));
  for (let i = 1; i < TIMELINE.length; i++) {
    if (t <= TIMELINE[i][0]) {
      const [p0, v0] = TIMELINE[i - 1];
      const [p1, v1] = TIMELINE[i];
      const k = p1 === p0 ? 0 : (t - p0) / (p1 - p0);
      return v0 + (v1 - v0) * k;
    }
  }
  return TIMELINE[TIMELINE.length - 1][1];
}

const usePrefersReducedMotion = () =>
  useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

// ─── حروف نوفا: كل ضغطة مفتاح تطلق الحرف ضوءاً يطير في العالم ────────────────
function GlyphField({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type G = { ch: string; x: number; y: number; vx: number; vy: number; rot: number; vr: number; life: number; size: number; warm: boolean };
    const glyphs: G[] = [];
    const onGlyph = (e: Event) => {
      const d = (e as CustomEvent).detail as { ch: string; x: number; y: number };
      if (!d?.ch) return;
      if (glyphs.length > 70) glyphs.splice(0, glyphs.length - 70);
      glyphs.push({
        ch: d.ch, x: d.x, y: d.y,
        vx: (Math.random() - 0.5) * 60,
        vy: -(70 + Math.random() * 90),
        rot: (Math.random() - 0.5) * 0.6,
        vr: (Math.random() - 0.5) * 1.6,
        life: 1,
        size: 16 + Math.random() * 16,
        warm: Math.random() < 0.55,
      });
    };
    window.addEventListener("ens-glyph", onGlyph as EventListener);

    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) { last = now; return; }
      const dt = Math.min(50, now - last) / 1000; last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = glyphs.length - 1; i >= 0; i--) {
        const g = glyphs[i];
        g.life -= dt * 0.8;
        if (g.life <= 0) { glyphs.splice(i, 1); continue; }
        g.x += g.vx * dt; g.y += g.vy * dt; g.rot += g.vr * dt;
        g.vy -= 14 * dt;
        const a = Math.max(0, g.life);
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rot);
        ctx.font = `700 ${g.size}px Cairo, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.shadowColor = g.warm ? "rgba(255,214,165,0.9)" : "rgba(217,112,64,0.9)";
        ctx.shadowBlur = 14;
        ctx.fillStyle = g.warm ? `rgba(255,214,165,${a})` : `rgba(217,112,64,${a})`;
        ctx.fillText(g.ch, 0, 0);
        ctx.restore();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("ens-glyph", onGlyph as EventListener);
    };
  }, [active]);
  if (!active) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[6]" aria-hidden="true" />;
}

// ─── التجربة ─────────────────────────────────────────────────────────────────
export const ContactImmersive = () => {
  const reduceMotion = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const curTimeRef = useRef(0);
  const primedRef = useRef(false);

  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", countryKey: "+966", countryCode: "SA",
    phone: "", services: [], message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // نفس قواعد التحقق الأصلية حرفياً
  const validation = useMemo(() => ({
    name: formData.name.trim().length > 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: /^\d{8,15}$/.test(formData.phone),
    services: formData.services.length > 0,
  }), [formData]);

  const formProgress = useMemo(() => {
    const fields = [validation.name, validation.email, validation.phone, validation.services];
    return Math.floor((fields.filter(Boolean).length / 4) * 100);
  }, [validation]);

  const stepValid = [validation.name, validation.email, validation.phone, validation.services, true, formProgress === 100];

  // ── حلقة السحب: التمرير يقود زمن الفيديو ولوحات المحطات ──
  useEffect(() => {
    let raf = 0;
    const vh = () => window.innerHeight;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const track = trackRef.current;
      const video = videoRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - vh();
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;

      // سحب الفيديو بنعومة نحو الزمن المستهدف
      if (video && video.readyState >= 1) {
        const target = progressToTime(p);
        const cur = curTimeRef.current;
        const next = reduceMotion ? target : cur + (target - cur) * 0.22;
        curTimeRef.current = next;
        if (Math.abs(video.currentTime - next) > 0.01) {
          try { video.currentTime = next; } catch { /* قبل التحميل */ }
        }
      }

      // لوحات المحطات: تدخل من اليمين، تستقر، تخرج يساراً — كتابة مباشرة بلا re-render
      for (let i = 0; i < N; i++) {
        const el = panelRefs.current[i];
        if (!el) continue;
        const local = (p - CENTERS[i]) * (N - 1); // 0 عند مركز المحطة
        const t = Math.max(-1, Math.min(1, local / 0.5));
        const drift = Math.sign(t) * Math.max(0, Math.abs(t) - 0.25) / 0.75; // هضبة استقرار ±0.25
        const x = -drift * 72; // vw — موجب يمين (RTL: دخول من اليمين، خروج لليسار)
        const op = 1 - Math.min(1, Math.max(0, (Math.abs(t) - 0.25) / 0.6));
        el.style.transform = `translate3d(${x}vw, 0, 0)`;
        el.style.opacity = String(op);
        el.style.pointerEvents = Math.abs(t) < 0.4 ? "auto" : "none";
        el.style.visibility = op <= 0.01 ? "hidden" : "visible";
      }

      // المحطة النشطة (لخريطة الرحلة فقط)
      const ai = Math.min(N - 1, Math.max(0, Math.round(p * N - 0.5)));
      setActive(prev => (prev === ai ? prev : ai));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  // iOS: تجهيز الفيديو للسحب بأول لمسة (تشغيل/إيقاف صامت)
  const primeVideo = () => {
    if (primedRef.current) return;
    primedRef.current = true;
    const v = videoRef.current;
    if (!v) return;
    const pr = v.play();
    if (pr) pr.then(() => v.pause()).catch(() => {});
  };

  // رنين الصدى عند أي لمسة
  const onStageDown = (e: React.PointerEvent) => {
    primeVideo();
    const r = stageRef.current?.getBoundingClientRect(); if (!r) return;
    const id = Date.now() + Math.random();
    setRipples(p => [...p.slice(-5), { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
  };

  // حروف نوفا من الكتابة
  const emitGlyph = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    const ch = v[v.length - 1];
    if (!ch || ch === " " || reduceMotion) return;
    const r = stageRef.current?.getBoundingClientRect();
    const ir = e.target.getBoundingClientRect();
    if (!r) return;
    window.dispatchEvent(new CustomEvent("ens-glyph", {
      detail: {
        ch,
        x: ir.left - r.left + Math.random() * ir.width,
        y: ir.top - r.top + ir.height * 0.3,
      },
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    emitGlyph(e);
  };

  const toggleService = (s: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
    }));
  };

  // التنقل = تمرير حقيقي إلى مركز المحطة
  const programmaticRef = useRef<number>(0);
  const scrollToStation = useCallback((i: number) => {
    const track = trackRef.current; if (!track) return;
    const vh = window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const total = track.offsetHeight - vh;
    const target = top + CENTERS[Math.max(0, Math.min(N - 1, i))] * total;
    programmaticRef.current = Date.now();
    window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // ── حركة محطات لا حرّة: أي توقف تمرير يستقر على أقرب محطة (لا وقوف بين مشهدين) ──
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        if (isSubmitted) return;
        if (Date.now() - programmaticRef.current < 750) return; // تمرير برمجي جارٍ
        const track = trackRef.current; if (!track) return;
        const vh = window.innerHeight;
        const rect = track.getBoundingClientRect();
        const total = rect.height - vh;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        const nearest = Math.round(p * (N - 1));
        const targetP = CENTERS[nearest];
        if (Math.abs(p - targetP) * total > 6) scrollToStation(nearest);
      }, 170);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (t) clearTimeout(t); };
  }, [isSubmitted, scrollToStation]);

  // ── إكمال الحقل = الانتقال للمحطة التالية تلقائياً (بعد لحظة هدوء قصيرة) ──
  useEffect(() => {
    if (isSubmitted) return;
    if (active > 3) return; // التفاصيل اختيارية والإرسال يدوي
    if (!stepValid[active]) return;
    const delay = active === 3 ? 1600 : 1200;
    const t = setTimeout(() => scrollToStation(active + 1), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, active, isSubmitted]);

  const nextStep = () => { if (stepValid[active]) scrollToStation(active + 1); };
  const prevStep = () => scrollToStation(active - 1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "TEXTAREA") return;
    if (active < N - 1 && stepValid[active]) { e.preventDefault(); nextStep(); }
  };

  // نفس إرسال النموذج الأصلي حرفياً
  const handleSubmit = async () => {
    if (formProgress < 100 || isSending) return;
    setIsSending(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", services: [], message: "", countryKey: "+966", countryCode: "+966" });
        scrollToStation(0);
      }, 6000);
    } catch {
      setSubmitError("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSending(false);
    }
  };

  const giantInput =
    "w-full bg-transparent border-0 outline-none text-right text-white placeholder:text-white/25 " +
    "text-3xl md:text-5xl font-bold leading-tight caret-[var(--color-copper)] py-3";

  const Baseline = ({ widthPct, ltr = false }: { widthPct: number; ltr?: boolean }) => (
    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={cn(
          "h-full shadow-[0_0_14px_rgba(217,112,64,0.8)]",
          ltr ? "bg-gradient-to-r from-[var(--color-copper)] to-[#FFD6A5]" : "bg-gradient-to-l from-[var(--color-copper)] to-[#FFD6A5]"
        )}
        animate={{ width: `${Math.min(100, widthPct)}%` }}
        transition={{ duration: 0.35 }}
        style={ltr ? undefined : { marginRight: 0, marginLeft: "auto" }}
      />
    </div>
  );

  return (
    <div ref={trackRef} style={{ height: `calc(100vh + ${N * SLOT_VH}vh)` }} className="relative">
      {/* ── المسرح المثبّت: الفيديو المسحوب + كل طبقات الحياة ── */}
      <div
        ref={stageRef}
        onPointerDown={onStageDown}
        onKeyDown={onKeyDown}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#020B16] text-[var(--color-ivory)] selection:bg-[var(--color-copper)]/40"
      >
        {/* الفيديو — لا يتشغّل أبداً: التمرير يقوده */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* تظليل سينمائي لقراءة النصوص */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(85%_70%_at_50%_45%,transparent_0%,rgba(2,11,22,0.5)_80%,rgba(2,11,22,0.82)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020B16]/70 via-transparent to-[#020B16]/45 pointer-events-none" />

        {/* طبقات الحياة */}
        <GlyphField active />
        <div className="absolute inset-0 pointer-events-none z-[5]">
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                onAnimationComplete={() => setRipples(p => p.filter(x => x.id !== r.id))}
                className="absolute w-[520px] h-[520px] -ml-[260px] -mt-[260px] rounded-full border border-[var(--color-copper)]/55 shadow-[0_0_70px_-24px_rgba(217,112,64,0.65),inset_0_0_46px_-22px_rgba(255,214,165,0.45)]"
                style={{ left: r.x, top: r.y }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* ── خريطة الرحلة: كل المحطات ظاهرة دائماً وقابلة للقفز ── */}
        <nav aria-label="خطوات التواصل" className="absolute z-20 inset-x-0 bottom-4 md:bottom-auto md:inset-x-auto md:right-6 lg:right-10 md:top-1/2 md:-translate-y-1/2">
          <ul className="flex md:flex-col items-center md:items-end justify-center gap-3 md:gap-5 px-4">
            {STEPS.map((s, i) => {
              const done = i < active || (i === active && stepValid[i] && i < 5);
              const activeNode = i === active;
              return (
                <li key={s.id}>
                  <button type="button" onClick={() => scrollToStation(i)} className="group flex items-center gap-3 md:flex-row-reverse">
                    <span className={cn(
                      "hidden md:block text-xs transition-all duration-300 whitespace-nowrap",
                      activeNode ? "text-[#FFD6A5] opacity-100" : "text-white/45 opacity-70 group-hover:opacity-100"
                    )}>
                      {s.label}
                    </span>
                    <span className={cn(
                      "relative block rounded-full transition-all duration-300",
                      activeNode ? "w-3.5 h-3.5 bg-[var(--color-copper)] shadow-[0_0_18px_rgba(217,112,64,0.9)]"
                        : done ? "w-2.5 h-2.5 bg-[#FFD6A5] shadow-[0_0_10px_rgba(255,214,165,0.7)]"
                        : "w-2.5 h-2.5 bg-white/20 group-hover:bg-white/45"
                    )}>
                      {activeNode && <span className="absolute -inset-2 rounded-full border border-[var(--color-copper)]/50 animate-ping" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── لوحات المحطات الست: مواقعها يكتبها محرك السحب مباشرة ── */}
        {!isSubmitted && STEPS.map((s, i) => (
          <div
            key={s.id}
            ref={el => { panelRefs.current[i] = el; }}
            className="absolute inset-0 z-10 flex items-center justify-end px-6 md:px-14 lg:px-24"
            style={i === 0
              ? { opacity: 1, visibility: "visible", pointerEvents: "auto", willChange: "transform, opacity" }
              : { opacity: 0, visibility: "hidden", pointerEvents: "none", willChange: "transform, opacity" }}
          >
            <div className="w-full max-w-2xl text-right">
              {/* افتتاحية المشهد الأول فقط */}
              {i === 0 && (
                <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
                    ابدأ رحلتك.. وارسم بصمتك
                  </h1>
                  <p className="text-white/55 text-lg md:text-xl">املأ النموذج وسنتواصل معك قريباً.</p>
                </div>
              )}

              {/* عنوان المحطة */}
              <div className="flex items-center gap-3 mb-2 justify-end">
                <span className="text-[var(--color-copper)] tracking-wide text-sm md:text-base font-bold">{s.label}</span>
                <span className="block w-10 h-px bg-[var(--color-copper)]/60" />
              </div>

              {/* محتوى المحطة */}
              {i === 0 && (
                <div className="relative">
                  <input type="text" name="name" value={formData.name} onChange={handleInput} placeholder="الاسم الكامل" className={giantInput} />
                  <Baseline widthPct={validation.name ? 100 : Math.min(80, formData.name.length * 7)} />
                </div>
              )}

              {i === 1 && (
                <div className="relative" dir="ltr">
                  <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="example@mail.com" className={cn(giantInput, "text-left placeholder:text-left")} />
                  <Baseline ltr widthPct={validation.email ? 100 : Math.min(80, formData.email.length * 5)} />
                </div>
              )}

              {i === 2 && (
                <div>
                  <div className="flex flex-wrap gap-2 justify-end mb-6">
                    {COUNTRY_KEYS.map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, countryKey: c.code }))}
                        className={cn(
                          "px-4 py-2 rounded-full border text-sm transition-all duration-300",
                          formData.countryKey === c.code
                            ? "border-[var(--color-copper)] bg-[var(--color-copper)]/15 text-white shadow-[0_0_22px_-6px_rgba(217,112,64,0.8)]"
                            : "border-white/12 bg-white/[0.04] text-white/55 hover:text-white hover:border-white/30"
                        )}
                      >
                        <span dir="ltr">{c.flag} {c.code}</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative" dir="ltr">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInput} placeholder="50 000 0000" className={cn(giantInput, "text-left placeholder:text-left tracking-widest")} />
                    <Baseline ltr widthPct={validation.phone ? 100 : Math.min(80, formData.phone.length * 9)} />
                  </div>
                </div>
              )}

              {i === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2">
                  {SERVICES.map(s2 => {
                    const on = formData.services.includes(s2);
                    return (
                      <button
                        key={s2}
                        type="button"
                        onClick={() => toggleService(s2)}
                        className={cn(
                          "relative overflow-hidden rounded-2xl border px-6 py-6 md:py-8 text-right transition-all duration-300 hover:-translate-y-1",
                          on
                            ? "border-[var(--color-copper)]/70 bg-[#020B16]/55 backdrop-blur-md shadow-[0_0_45px_-12px_rgba(217,112,64,0.7),inset_0_1px_0_rgba(255,214,165,0.15)]"
                            : "border-white/10 bg-[#020B16]/35 backdrop-blur-md hover:border-[#FFD6A5]/35"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0 right-6 left-6 h-[2px] rounded-full transition-all duration-500",
                          on ? "bg-gradient-to-l from-[var(--color-copper)] to-[#FFD6A5] opacity-100" : "opacity-0"
                        )} />
                        <span className={cn("block text-lg md:text-2xl font-bold transition-colors", on ? "text-white" : "text-white/75")}>{s2}</span>
                        <span className={cn(
                          "absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full transition-all duration-300",
                          on ? "bg-[var(--color-copper)] shadow-[0_0_12px_rgba(217,112,64,0.9)]" : "bg-white/15"
                        )} />
                      </button>
                    );
                  })}
                </div>
              )}

              {i === 4 && (
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInput}
                    rows={4}
                    placeholder="حدثنا عن مشروعك..."
                    className="w-full bg-transparent border-0 outline-none text-right text-white placeholder:text-white/25 text-2xl md:text-3xl font-medium leading-relaxed caret-[var(--color-copper)] resize-none py-3"
                  />
                  <Baseline widthPct={Math.min(100, 20 + formData.message.length * 1.5)} />
                </div>
              )}

              {i === 5 && (
                <div className="mt-4">
                  <div className="relative w-full">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-[6px] rounded-full transition-opacity duration-500"
                      style={{
                        opacity: formProgress > 0 ? 1 : 0,
                        background: `conic-gradient(var(--color-copper) ${formProgress * 3.6}deg, rgba(255,255,255,0.08) ${formProgress * 3.6}deg)`,
                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                      }}
                    />
                    <div className={cn(
                      "rounded-full transition-shadow duration-500",
                      formProgress === 100 && !isSending && "shadow-[0_0_60px_-12px_rgba(217,112,64,0.85)]"
                    )}>
                      <LiquidButton
                        type="button"
                        onClick={handleSubmit}
                        disabled={formProgress < 100 || isSending}
                        className={cn("w-full text-lg py-5", (formProgress < 100 || isSending) && "opacity-50 cursor-not-allowed")}
                      >
                        {isSending ? "جاري الإرسال.." : "إرسال الطلب"}
                      </LiquidButton>
                    </div>
                  </div>
                  {submitError && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                      {submitError}
                    </div>
                  )}
                  {/* رجوع من محطة الإرسال — لمراجعة البيانات أو إعادة المحاولة */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => scrollToStation(4)}
                      className="px-8 py-3 rounded-full border border-white/15 bg-[#020B16]/40 backdrop-blur-md text-white/70 hover:text-white hover:border-[#FFD6A5]/40 transition-all duration-300 text-sm"
                    >
                      رجوع
                    </button>
                  </div>
                </div>
              )}

              {/* تنقّل الرحلة */}
              {i < 5 && (
                <div className="flex items-center justify-end gap-3 mt-10">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-full border border-white/15 bg-[#020B16]/40 backdrop-blur-md text-white/70 hover:text-white hover:border-[#FFD6A5]/40 transition-all duration-300 text-sm"
                    >
                      رجوع
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!stepValid[i]}
                    className={cn(
                      "px-10 py-3 rounded-full border text-sm font-bold transition-all duration-300",
                      stepValid[i]
                        ? "border-[#FFD6A5]/45 bg-[linear-gradient(160deg,rgba(217,112,64,0.5),rgba(217,112,64,0.2)_55%,rgba(255,214,165,0.25))] backdrop-blur-md text-[#FFE9CF] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_16px_40px_-16px_rgba(217,112,64,0.65)] hover:-translate-y-0.5"
                        : "border-white/10 bg-[#020B16]/30 text-white/30 cursor-not-allowed"
                    )}
                  >
                    التالي
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* ── الختام: الرسالة تتحول إلى نوفا ── */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-[#020B16]/55 backdrop-blur-sm"
            >
              <div className="text-center">
                <div className="relative w-28 h-28 mx-auto mb-8">
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_38%_32%,#FFD6A5,var(--color-copper)_62%,rgba(217,112,64,0.2))] shadow-[0_0_70px_rgba(217,112,64,0.8)]"
                  />
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      className="absolute inset-0 rounded-full border border-[var(--color-copper)]/60"
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 3 + i * 1.2 }}
                      transition={{ duration: 1.3, delay: 0.25 + i * 0.3, ease: "easeOut" }}
                    />
                  ))}
                  <Check className="absolute inset-0 m-auto w-10 h-10 text-[#020B16]" />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">تم الإرسال بنجاح!</h3>
                <p className="text-white/65 text-lg">شكراً لتواصلك معنا.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── تترات رحلتك: بياناتك تتجمع كاعتمادات فيلم حيّة ── */}
        {!isSubmitted && (formData.name || formData.email || formData.phone || formData.services.length > 0) && (
          <div className="absolute bottom-16 md:bottom-8 inset-x-0 z-[8] flex flex-wrap items-center justify-center gap-2 px-6 pointer-events-none">
            {[
              formData.name && validation.name ? formData.name : null,
              formData.email && validation.email ? formData.email : null,
              formData.phone && validation.phone ? `${formData.countryKey} ${formData.phone}` : null,
              ...formData.services,
            ].filter(Boolean).map((chip, i) => (
              <motion.span
                key={`${chip}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                dir="auto"
                className="px-3 py-1 rounded-full text-[11px] md:text-xs text-[#FFD6A5]/80 border border-[#FFD6A5]/20 bg-[#020B16]/45 backdrop-blur-md"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
