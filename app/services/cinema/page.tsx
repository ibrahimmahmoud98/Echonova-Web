"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ENTERTAINMENT_PAGE_CONTENT } from "@/lib/data/services-content";
import { Clapperboard, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";
import { CinemaTheatre } from "@/components/sections/CinemaTheatre";

export default function EntertainmentPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'nova-cinema' | 'nova-saga'>(() => {
    if (params?.slug === 'nova-saga') return 'nova-saga';
    if (params?.slug === 'nova-cinema') return 'nova-cinema';
    return 'nova-cinema';
  });

  return (
    <main className="min-h-screen bg-[#020B16] text-[#F7F5F0] selection:bg-[#D97040]/30">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/nova_cinema_set.png"
            alt="Entertainment"
            fill
            className="object-cover opacity-40 animate-ken-burns" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-[#020B16]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020B16]/80 via-transparent to-[#020B16]/80" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-12 bg-[#D97040]" />
            <h2 className="text-[#D97040] tracking-[0.2em] text-sm font-bold uppercase">
              {ENTERTAINMENT_PAGE_CONTENT.header.subtitle}
            </h2>
            <div className="h-[1px] w-12 bg-[#D97040]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, letterSpacing: "normal" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.05em" }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 text-[#F7F5F0]"
          >
            {ENTERTAINMENT_PAGE_CONTENT.header.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-[#FFD6A5] max-w-3xl mx-auto leading-relaxed dir-rtl"
          >
            {ENTERTAINMENT_PAGE_CONTENT.header.intro}
          </motion.p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-10 bg-[#020B16]/90 backdrop-blur-md border-b border-[#F7F5F0]/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-12">
            {ENTERTAINMENT_PAGE_CONTENT.services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id as 'nova-cinema' | 'nova-saga')}
                className="group relative"
              >
                <div className={cn(
                  "py-6 text-xl font-bold transition-all duration-300 flex items-center gap-3",
                  activeTab === service.id ? "text-[#F7F5F0] scale-105" : "text-[#F7F5F0]/50 hover:text-[#F7F5F0]/80"
                )}>
                  {service.id === 'nova-cinema' ? <Clapperboard size={20} /> : <MonitorPlay size={20} />}
                  <span className="uppercase tracking-wider">{service.title}</span>
                  <span className="text-sm font-light text-[#FFD6A5] hidden md:inline-block border-l pl-3 ml-2 border-[#D97040]/30 opacity-60 group-hover:opacity-100 transition-opacity">
                    {service.arTitle}
                  </span>
                </div>
                {activeTab === service.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#D97040] shadow-[0_0_20px_rgba(217,112,64,0.8)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* مسرح السينما — منقول من التصميم القديم؛ التبديل بين SAGA/CINEMA من تابات الصفحة أعلاه فقط */}
      <CinemaTheatre
        controlledMode={activeTab === 'nova-saga' ? 'saga' : 'cinema'}
        hideToggle
        hideMoreLink
      />
    </main>

  );
}
