"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ComparisonSlider } from "@/components/ui/ComparisonSlider";
import { X, Clock, Sparkles, Zap, ArrowLeftRight } from "lucide-react";

interface PortfolioWork {
  id: number;
  title: string;
  category: string;
  image: string;
  desc: string;
  longDesc: string;
  stats: {
    aiModel: string;
    renderTime: string;
    iterations: string;
    traditionalCost: string;
    actualCost: string;
  };
  tags: string[];
  comingSoon?: boolean;
}

const works: PortfolioWork[] = [
  {
    id: 1,
    title: "THE RED GHOST",
    category: "NOVA CINEMA",
    image: "/images/portfolio_1.png",
    desc: "إعلان فيلم خيال علمي قصير",
    longDesc:
      "محاكاة سينمائية لمشهد مطاردة في عالم خيالي. تم توليد المشهد عبر تركيبة من Higgsfield و Veo 3 مع إعادة بناء الإضاءة عبر Nuke compositing. النتيجة مشهد بمستوى استوديوهات هوليوود بميزانية 4٪ من الواقعية.",
    stats: {
      aiModel: "Veo 3.1 + Higgsfield",
      renderTime: "3.5 ساعة",
      iterations: "62 محاولة",
      traditionalCost: "$180,000",
      actualCost: "$7,200",
    },
    tags: ["Sci-Fi", "Action", "8K Render", "Anamorphic"],
    comingSoon: true,
  },
  {
    id: 2,
    title: "L'OR NOIR",
    category: "NOVA LIFE",
    image: "/images/portfolio_2.png",
    desc: "حملة إعلانية لمنتج فاخر",
    longDesc:
      "إعلان فاخر لعطر افتراضي بدون تصوير في موقع. كل اللقطات مولدة من الصفر مع التركيز على Subsurface Scattering للبشرة وملمس الذهب السائل. المنتج تم تركيبه رقمياً مع ضمان ثبات الملامح عبر 14 لقطة.",
    stats: {
      aiModel: "Sora 2 + Custom LoRA",
      renderTime: "1.8 ساعة",
      iterations: "38 محاولة",
      traditionalCost: "$95,000",
      actualCost: "$3,800",
    },
    tags: ["Luxury", "Product", "Photorealism", "Subsurface"],
    comingSoon: true,
  },
  {
    id: 3,
    title: "NEO TOKYO",
    category: "NOVA MAGIC",
    image: "/images/portfolio_3.png",
    desc: "تجربة بصرية للمدن الذكية",
    longDesc:
      "رحلة بصرية في مدينة مستقبلية ما تزال غير موجودة. التحدي كان كسر قوانين الفيزياء التقليدية مع الحفاظ على إقناع المشهد. استخدمنا Kling 2.0 للمشاهد الواسعة و Runway Gen-4 للديتيلز.",
    stats: {
      aiModel: "Kling 2.0 + Runway Gen-4",
      renderTime: "5.2 ساعة",
      iterations: "104 محاولة",
      traditionalCost: "$2,400,000",
      actualCost: "$11,500",
    },
    tags: ["Sci-Fi", "Cityscape", "Cyberpunk", "VFX"],
    comingSoon: true,
  },
];

export function Portfolio() {
  const [activeWork, setActiveWork] = useState<PortfolioWork | null>(null);

  const closeModal = useCallback(() => setActiveWork(null), []);

  // ESC to close + body scroll lock
  useEffect(() => {
    if (!activeWork) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [activeWork, closeModal]);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ivory)]">
            بصمتنا في{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)]">
              المستقبل
            </span>
          </h2>
          <p className="text-[var(--color-ivory)]/60 mt-3 text-sm max-w-xl">
            قريبا سيتم الاعلان عن اعمالنا الابداعية لتكون مصدر إلهام لعلامتكم التجارية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => {
            if (work.comingSoon) {
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.92, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-[500px] rounded-2xl overflow-hidden cursor-default text-right block w-full focus:outline-none"
                  aria-label={`${work.title} - قريباً`}
                >
                  {/* Image */}
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 blur-[8px] scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500" />

                  {/* "Coming Soon" Badge */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                      <Clock className="w-5 h-5 text-[var(--color-copper)] animate-pulse" />
                      <span className="text-base font-bold tracking-wider text-[var(--color-champagne)]">
                        قريباً
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500 blur-[6px] select-none">
                    <span className="text-[var(--color-copper)] text-xs font-bold tracking-widest mb-2 block">
                      {work.category}
                    </span>
                    <h4 className="text-2xl font-bold text-white mb-2">{work.title}</h4>
                    <p className="text-gray-300/80 text-sm leading-relaxed">{work.desc}</p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.button
                key={work.id}
                type="button"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveWork(work)}
                className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer text-right block w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-copper)]"
                aria-label={`عرض تفاصيل ${work.title}`}
              >
                {/* Image */}
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500" />

                {/* Tags Strip (visible on hover) */}
                <div className="absolute top-4 right-4 left-4 z-10 flex flex-wrap gap-2 justify-end opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {work.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* "Reveal" CTA Badge - centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-copper)]/20 backdrop-blur-md border-2 border-[var(--color-copper)] flex items-center justify-center shadow-[0_0_30px_rgba(217,112,64,0.5)]">
                    <ArrowLeftRight className="w-7 h-7 text-[var(--color-champagne)]" />
                  </div>
                  <span className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                    كشف الفارق
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500 group-hover:pb-10">
                  <span className="text-[var(--color-copper)] text-xs font-bold tracking-widest mb-2 block">
                    {work.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-2">{work.title}</h4>
                  <p className="text-gray-300 text-sm">{work.desc}</p>

                  {/* Quick stat strip */}
                  <div className="mt-4 flex items-center gap-3 text-[11px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {work.stats.renderTime}
                    </span>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {work.stats.iterations}
                    </span>
                  </div>
                </div>

                {/* Subtle copper border on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--color-copper)]/40 transition-colors duration-500 pointer-events-none" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ============ MODAL: Comparison + Stats ============ */}
      <AnimatePresence>
        {activeWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[var(--color-navy)]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] my-auto"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:rotate-90 duration-300"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-5 gap-0">
                {/* LEFT: Comparison Slider */}
                <div className="lg:col-span-3 relative h-[400px] md:h-[550px] lg:h-[640px]">
                  <ComparisonSlider
                    beforeImage={activeWork.image}
                    afterImage={activeWork.image}
                    beforeLabel="محاولة بدون AI"
                    afterLabel="إنتاج إيكونوڤا"
                    beforeAlt={`${activeWork.title} - Before`}
                    afterAlt={`${activeWork.title} - After`}
                  />
                </div>

                {/* RIGHT: Stats & Description */}
                <div className="lg:col-span-2 p-6 md:p-10 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <span className="text-[var(--color-copper)] text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-2">
                      {activeWork.category}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tighter">
                      {activeWork.title}
                    </h3>

                    <p className="text-[var(--color-ivory)]/75 text-sm md:text-base leading-relaxed mb-6">
                      {activeWork.longDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeWork.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase rounded-md bg-[var(--color-copper)]/10 text-[var(--color-champagne)] border border-[var(--color-copper)]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <StatBox
                        icon={<Sparkles className="w-3.5 h-3.5" />}
                        label="نموذج AI"
                        value={activeWork.stats.aiModel}
                      />
                      <StatBox
                        icon={<Clock className="w-3.5 h-3.5" />}
                        label="زمن العرض"
                        value={activeWork.stats.renderTime}
                      />
                      <StatBox
                        icon={<Zap className="w-3.5 h-3.5" />}
                        label="عدد المحاولات"
                        value={activeWork.stats.iterations}
                      />
                      <StatBox
                        icon={<span className="text-[10px] font-bold">$</span>}
                        label="ميزانية تقليدية"
                        value={activeWork.stats.traditionalCost}
                        valueClass="line-through opacity-60 text-red-400/80"
                      />
                    </div>

                    <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-[var(--color-copper)]/15 to-[var(--color-copper)]/5 border border-[var(--color-copper)]/30">
                      <div className="text-[10px] text-[var(--color-champagne)] font-mono uppercase tracking-wider mb-1">
                        التكلفة الفعلية مع ENS
                      </div>
                      <div className="text-2xl font-black text-[var(--color-champagne)]">
                        {activeWork.stats.actualCost}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5">
                    <button
                      onClick={() => {
                        closeModal();
                        setTimeout(() => {
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }, 200);
                      }}
                      className="w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-[var(--color-copper)] to-orange-500 text-white shadow-lg shadow-[var(--color-copper)]/20 hover:shadow-[var(--color-copper)]/40 hover:scale-[1.02] transition-all duration-300"
                    >
                      احجز مشروعاً مماثلاً
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/** Small stat tile inside the modal */
function StatBox({
  icon,
  label,
  value,
  valueClass = "text-white",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 hover:bg-white/[0.06] transition-colors">
      <div className="flex items-center gap-1.5 text-[var(--color-copper)] text-[10px] font-mono uppercase tracking-wider mb-1.5">
        {icon}
        <span>{label}</span>
      </div>
      <div className={`text-sm font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}
