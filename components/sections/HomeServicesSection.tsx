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

import { AudioShowcase } from "@/components/ui/AudioShowcase";
import { TheatreStage } from "@/components/sections/TheatreStage";
import { AudioStage } from "@/components/sections/AudioStage";
import { CinemaTheatre } from "@/components/sections/CinemaTheatre";
import { AuraGallery } from "@/components/sections/AuraGallery";
import { IrisOpenIntro } from "@/components/transitions/IrisOpenIntro";
import { COMMERCIAL_LEVELS } from "@/lib/data/services-content";
import { AURA_IMAGES } from "@/lib/data/identity-portfolio";

// Derive UI-friendly format from centralized data (SSOT)
const levels = COMMERCIAL_LEVELS.map(level => ({
  id: level.id,
  title: level.brandName,
  subtitle: level.arTitle,
  desc: level.description,
  image: level.posterImage,
  altText: level.altText,
  
}));

export function HomeServicesSection() {
  const [activeLevel, setActiveLevel] = useState(levels[0]);

  return (
    <IrisOpenIntro>
      <section id="services" className="pt-12 pb-24 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-[var(--color-navy)] pointer-events-none" />

        {/* === REPLACED: the old simple tabs+image are now a full Theatre Stage === */}
        <TheatreStage />

      <div className="container mx-auto px-4 relative z-10">
        {/* Other Services Sections - Deep Visual Redesign */}
        <div className="space-y-32 mt-32">
            
            {/* NOVA AURA — replaced with AuraGallery (magnetic 3D wall + focus mode) */}
            <ScrollReveal variant="fade-up">
                 <AuraGallery />
            </ScrollReveal>

            {/* Cinematic Universe: Saga & Cinema Unified */}
            <ScrollReveal variant="fade-up">
                 <CinemaTheatre />
            </ScrollReveal>

            {/* Audio Universe: Whisper — replaced AudioShowcase with AudioStage
                (real WebAudio synth + canvas analyser visualizer) */}
            <ScrollReveal variant="fade-up">
                 <AudioStage />
            </ScrollReveal>

        </div>

      </div>
      </section>
    </IrisOpenIntro>
  );
}

