"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ENTERTAINMENT_PAGE_CONTENT } from "@/lib/data/services-content";
import { Play, Film, Tv, Star, Clapperboard, MonitorPlay } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 }
};

export default function EntertainmentPage() {
  const [activeTab, setActiveTab] = useState<'nova-cinema' | 'nova-saga'>('nova-cinema');

  const activeContent = ENTERTAINMENT_PAGE_CONTENT.services.find(s => s.id === activeTab);

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

      {/* Content Area */}
      <section className="py-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={fadeInScale}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Visuals */}
                <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-40 self-start">
                  <motion.div 
                    className="relative aspect-[4/5] lg:aspect-[9/16] rounded-lg overflow-hidden border border-[#F7F5F0]/10 shadow-2xl group cursor-pointer"
                    whileHover={{ scale: 1.02, rotateY: 2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <Image
                      src={activeTab === 'nova-cinema' ? "/images/nova_cinema_scene.png" : "/images/nova_saga_poster.png"}
                      alt={activeContent?.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute bottom-8 left-8 right-8 text-center bg-[#020B16]/60 backdrop-blur-md p-6 rounded-xl border border-[#F7F5F0]/10 transform translate-y-0 text-[#F7F5F0] transition-all group-hover:border-[#D97040]/50 group-hover:shadow-[0_0_30px_rgba(217,112,64,0.2)]">
                       <h3 className="text-3xl font-bold mb-2 tracking-tighter">{activeContent?.title}</h3>
                       <p className="text-[#D97040] font-mono text-sm tracking-widest">{activeContent?.arTitle}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-7 space-y-16 dir-rtl text-right">
                  {/* Main Description */}
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <motion.div variants={staggerItem}>
                      <h3 className="text-3xl font-bold text-[#D97040] mb-6 flex items-center gap-3">
                        <Film className="w-8 h-8" />
                        الوصف
                      </h3>
                      <p className="text-xl text-[#F7F5F0] leading-relaxed border-r-2 border-[#D97040]/50 pr-6">
                        {activeContent?.description}
                      </p>
                    </motion.div>

                    {/* Mechanism */}
                    <motion.div variants={staggerItem} className="mt-12">
                      <h3 className="text-3xl font-bold text-[#D97040] mb-4 flex items-center gap-3">
                        <Tv className="w-8 h-8" />
                        {activeContent?.mechanism.title}
                      </h3>
                      {activeContent?.mechanism.intro && (
                        <p className="text-[#F7F5F0]/70 mb-8 max-w-2xl">{activeContent.mechanism.intro}</p>
                      )}
                      
                      <div className="grid gap-6">
                        {activeContent?.mechanism.points.map((point, idx) => (
                          <motion.div 
                            key={idx} 
                            variants={staggerItem}
                            whileHover={{ x: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
                            className="bg-[#F7F5F0]/5 p-6 rounded-xl border border-[#F7F5F0]/5 transition-all cursor-default"
                          >
                            <h4 className="text-xl font-bold text-[#F7F5F0] mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#D97040] rounded-full" />
                              {point.title}
                            </h4>
                            <p className="text-[#F7F5F0]/70 pr-4">{point.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Value */}
                    <motion.div variants={staggerItem} className="mt-12">
                      <div className="bg-gradient-to-br from-[#D97040]/20 to-[#020B16] p-8 rounded-2xl border border-[#D97040]/20 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97040]/10 blur-[50px] rounded-full group-hover:bg-[#D97040]/20 transition-colors" />
                         
                        <h3 className="text-2xl font-bold text-[#F7F5F0] mb-4 flex items-center gap-3 relative z-10">
                          <Star className="w-6 h-6 text-[#FFD6A5] fill-[#FFD6A5]" />
                          {activeContent?.value.title}
                        </h3>
                        <p className="text-lg text-[#F7F5F0] leading-relaxed relative z-10">
                          {activeContent?.value.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Button Removed as per request */}
                    
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>

  );
}
