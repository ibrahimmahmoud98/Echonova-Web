"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { 
  Fingerprint, 
  Clapperboard, 
  Film, 
  Play, 
  Mic2, 
  BookOpen, 
  PenTool, 
  Layers, 
  Globe, 
  Rocket 
} from "lucide-react";
import { InteractiveCarousel } from "@/components/ui/InteractiveCarousel";
import { AutoFeatureCard } from "@/components/ui/AutoFeatureCard";
import { CinematicShowcase } from "@/components/ui/CinematicShowcase";
import { COMMERCIAL_LEVELS } from "@/lib/data/services-content";

// Derive UI-friendly format from centralized data (SSOT)
const levels = COMMERCIAL_LEVELS.map(level => ({
  id: level.id,
  title: level.brandName,
  subtitle: level.arTitle,
  desc: level.description,
  image: level.posterImage,
}));

export function HomeServicesSection() {
  const [activeLevel, setActiveLevel] = useState(levels[0]);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-[var(--color-navy)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ivory)] mb-4 drop-shadow-lg">إعلانك بمستوى سينمائي</h2>
          <p className="text-[var(--color-ivory)]/80 max-w-2xl mx-auto text-lg">
            هنا نكسر حاجز المستحيل تعرف على القوة الإبداعية التي يمنحها إيكونوڤو ستديو لعلامتك التجارية.
          </p>
        </div>

        {/* Levels Tabs */}
        <div className="flex flex-nowrap md:flex-wrap justify-center gap-2 md:gap-4 mb-8 overflow-x-auto no-scrollbar pb-2 mask-linear">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level)}
              className={cn(
                "px-4 py-2 md:px-8 md:py-4 rounded-full text-xs md:text-lg font-medium transition-all duration-300 border backdrop-blur-md whitespace-nowrap flex-shrink-0",
                activeLevel.id === level.id 
                  ? "bg-[var(--color-copper)]/80 border-[var(--color-copper)] text-white shadow-[0_0_20px_rgba(217,112,64,0.4)]" 
                  : "bg-white/5 border-white/10 text-[var(--color-ivory)]/70 hover:bg-white/10"
              )}
            >
              {level.title}
            </button>
          ))}
        </div>

        {/* Active Level Display */}
        <div className="relative min-h-[500px] mb-24">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeLevel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-8 items-center bg-transparent rounded-3xl p-6 md:p-12 border border-white/5 backdrop-blur-sm overflow-hidden"
                >
                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-7xl font-bold mb-4 tracking-tighter uppercase">
                            <span className="text-white">NOVA </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-orange-400">{activeLevel.title.replace('NOVA ', '')}</span>
                        </h3>
                        <h4 className="text-xl md:text-2xl text-[var(--color-copper)] font-bold mb-6">{activeLevel.subtitle}</h4>
                        <p className="text-lg text-[var(--color-ivory)]/80 leading-relaxed mb-8 max-w-lg">
                            {activeLevel.desc}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link href="/services/reels">
                                <LiquidButton variant="secondary">
                                    تفاصيل أكثر
                                </LiquidButton>
                            </Link>
                            <LiquidButton variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                تواصل معنا
                            </LiquidButton>
                        </div>
                    </div>
                    {/* Visual Side */}
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                        <Tilt className="w-full h-full" perspective={1000} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                         <Image 
                            src={activeLevel.image} 
                            alt={activeLevel.title} 
                            fill
                            className="object-cover transform transition-transform duration-700 hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-transparent to-transparent opacity-60" />
                        </Tilt>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
        </ScrollReveal>
        {/* Other Services Sections - Deep Visual Redesign */}
        <div className="space-y-32 mt-32">
            
            {/* NOVA AURA - The Digital Soul */}
            <ScrollReveal variant="fade-up">
                <div className="relative group">
                    <div className="flex flex-col xl:flex-row gap-6 items-stretch h-full">
                        
                        {/* Visual Core: Interactive 3D Carousel */}
                        <div className="w-full xl:w-1/2 min-h-[600px] flex items-center justify-center relative order-2 xl:order-1">
                             <InteractiveCarousel images={[
                                 "/images/model_portrait.png",
                                 "/images/model_fashion.png",
                                 "/images/model_beauty.png",
                                 "/images/model_lifestyle.png",
                                 "/images/model_editorial.png"
                             ]} />
                        </div>

                        {/* Text Core - More Compact & Balanced */}
                        <div className="w-full xl:w-1/2 relative bg-[#0A1A2E]/60 backdrop-blur-xl border border-white/5 rounded-[3rem] p-6 lg:p-10 flex flex-col justify-center shadow-2xl order-1 xl:order-2">
                             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                             
                             <div className="relative z-10 flex flex-col items-center xl:items-end text-center xl:text-right h-full justify-between">
                                <div>
                                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                                        NOVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-orange-400">AURA</span>
                                    </h3>
                                    <p className="text-[var(--color-copper)] text-base font-bold mb-6 opacity-90 border-b border-[var(--color-copper)]/20 pb-2 inline-block">
                                        سفراء علامتك التجارية
                                    </p>
                                    
                                    <p className="text-lg text-[var(--color-ivory)]/90 leading-relaxed font-light mb-8 max-w-xl">
                                        حيث يذوب الخيال في جوهر هوية علامتك التجارية. نقدم لعلامتك وجوهاً وشخصيات تتجاوز حدود الواقع في دقتها وتنوعها، لكنها لا تخرج أبداً عن نطاق روح علامتك التجارية. نحن نمنحك حرية بصرية مطلقة و Vibes يُصمم خصيصاً ليتناغم مع القواعد البصرية لهويتك، مما يضمن ظهور منتجك في بيئة سينمائية مبتكرة تشبهك في كل تفاصيلها.
                                    </p>
                                </div>

                                {/* Auto Cycling Feature Card */}
                                <div className="w-full relative z-20 mb-6 flex-grow flex items-center">
                                    <AutoFeatureCard features={[
                                        {
                                            icon: Fingerprint,
                                            title: "بصمة هوية فريدة",
                                            description: "وجوه مصممة خصيصاً لتحمل الـ DNA الخاص بعلامتك التجارية."
                                        },
                                        {
                                            icon: Fingerprint,
                                            title: "ثبات الملامح",
                                            description: "نضمن تطابق الملامح والشخصية في آلاف الصور والفيديوهات."
                                        },
                                        {
                                            icon: Play,
                                            title: "نقل الأورا والمشاعر",
                                            description: "شخصيات تنبض بالحياة تعبر عن مشاعر وأجواء علامتك بدقة متناهية."
                                        },
                                        {
                                            icon: Fingerprint,
                                            title: "ملكية وتحكم كامل",
                                            description: "وجه إعلاني ملكك وحدك للأبد، بعيداً عن تقلبات ومخاطر المؤثرين البشر."
                                        },
                                        {
                                            icon: Clapperboard,
                                            title: "خيال بلا حدود",
                                            description: "إنتاج مستمر بتكاليف أقل، وإمكانيات إبداعية لا يحدها الواقع."
                                        }
                                    ]} />
                                </div>
                                
                                <div className="w-full flex justify-center xl:justify-end gap-4">
                                     <Link href="/services/aura">
                                         <LiquidButton variant="secondary" className="px-8">
                                             اعرف أكثر
                                         </LiquidButton>
                                     </Link>
                                     <Link href="/services/aura">
                                         <LiquidButton variant="primary">
                                             اطلب هويتك
                                         </LiquidButton>
                                     </Link>
                                </div>
                             </div>
                        </div>

                    </div>
                </div>
            </ScrollReveal>

            {/* Cinematic Universe: Saga & Cinema Unified */}
            <ScrollReveal variant="fade-up">
                 <CinematicShowcase />
            </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

