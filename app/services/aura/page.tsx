"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { IDENTITY_PAGE_CONTENT } from "@/lib/data/services-content";
import { ArrowRight, Fingerprint, Dna, ScanFace, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { TextDecode } from "@/components/ui/TextDecode";
import IdentityShowcase from "@/components/features/aura/showcase/IdentityShowcase";
import cloudinaryLoader from "@/lib/cloudinary-loader";

export default function IdentityPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="min-h-screen bg-[#020B16] text-[#F7F5F0] selection:bg-[#D97040]/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
             src={(typeof IDENTITY_PAGE_CONTENT.header === 'object' && 'image' in IDENTITY_PAGE_CONTENT.header) 
              ? (IDENTITY_PAGE_CONTENT.header as { image: string }).image 
              : "/images/nova_aura_face.png"} 
            alt="NOVA AURA"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-[#020B16]/50 to-transparent" />
          {/* Digital Grid Overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[#D97040] tracking-[0.2em] mb-4 text-lg md:text-xl font-medium uppercase font-mono h-6">
              {/* Tagline removed */}
            </h2>
            <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#F7F5F0] to-[#F7F5F0]/60">
              {IDENTITY_PAGE_CONTENT.header.subtitle}
            </h1>
            <p className="text-2xl md:text-3xl text-[#FFD6A5] font-light mb-8">
              {IDENTITY_PAGE_CONTENT.header.title}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator with Pulse */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-[10px] font-mono text-[#D97040]/50 mb-1">SCROLL_DETECT</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D97040] to-transparent relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full h-1/3 bg-[#F7F5F0] blur-[2px]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Description Section */}
      <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#D97040]/20 blur-3xl rounded-full opacity-50 animate-pulse" />
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative border border-[#F7F5F0]/10 bg-[#020B16]/50 backdrop-blur-sm p-8 rounded-2xl group"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D97040] opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D97040] opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-4 mb-6 text-[#D97040]">
                <div className="p-3 bg-[#D97040]/10 rounded-full">
                  <Dna size={32} className="animate-[spin_10s_linear_infinite]" />
                </div>
                <span className="text-xl font-bold font-mono">DNA_MATCH_VERIFIED</span>
              </div>
              <p className="text-lg leading-relaxed text-[#F7F5F0] text-right dir-rtl">
                {IDENTITY_PAGE_CONTENT.description.text}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-2xl overflow-hidden border border-[#F7F5F0]/10 group select-none"
          >
            <Image
              src="/images/nova_aura_dna.png"
              alt="Digital Human"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-transparent to-transparent opacity-80" />
            
            {/* Scanning Effect */}
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-[#D97040] shadow-[0_0_20px_rgba(217,112,64,0.8)] z-20"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-[#D97040]/5 mix-blend-overlay z-10" />

            {/* HUD Overlay Elements */}
            <div className="absolute top-8 right-8 flex gap-2 z-30">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 bg-[#D97040] rounded-full animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }} 
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 left-8 space-y-4 z-30 hidden md:block opacity-70">
               <div className="flex items-center gap-2 text-xs font-mono text-[#FFD6A5]">
                  <Activity size={12} />
                  <span>BIO_SYNC: 98%</span>
               </div>
               <div className="flex items-center gap-2 text-xs font-mono text-[#FFD6A5]">
                  <Fingerprint size={12} />
                  <span>ID_VERIFIED</span>
               </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-30">
               <div className="flex justify-between items-end border-t border-[#F7F5F0]/20 pt-4 backdrop-blur-md bg-[#020B16]/20 p-4 rounded-b-xl">
                 <div className="text-xs font-mono text-[#FFD6A5] space-y-1">
                   <div>SCN_MODE: FULL_BIO</div>
                   <div>RENDER: 8K_REALTIME</div>
                   <div className="text-[#F7F5F0]/50">XYZ: 45.231, 12.992</div>
                 </div>
                 <ScanFace className="text-[#D97040] animate-pulse" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Identity Portfolio Showcase */}
      <IdentityShowcase />

      {/* Value Proposition */}
      <section className="relative py-24 bg-[#020B16]/50">
         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
         
         <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block p-4 rounded-full bg-[#D97040]/10 border border-[#D97040]/20 mb-8 shadow-[0_0_30px_rgba(217,112,64,0.2)]"
            >
              <Sparkles className="w-8 h-8 text-[#D97040]" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#F7F5F0]">
              {IDENTITY_PAGE_CONTENT.valueProp.title}
            </h2>
            
            <p className="text-xl md:text-2xl leading-relaxed text-[#FFD6A5] dir-rtl mb-12">
              {IDENTITY_PAGE_CONTENT.valueProp.text}
            </p>

            <Link href="/contact" className="group relative inline-flex items-center gap-2 bg-[#F7F5F0] text-[#020B16] px-10 py-5 rounded-full font-bold overflow-hidden">
              <span className="relative z-10 group-hover:text-[#F7F5F0] transition-colors duration-300">اطلب هويتك الافتراضية</span>
              <ArrowRight size={20} className="relative z-10 rotate-180 group-hover:text-[#F7F5F0] transition-colors duration-300" />
              <div className="absolute inset-0 bg-[#D97040] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Link>
         </div>
      </section>
    </main>
  );
}
