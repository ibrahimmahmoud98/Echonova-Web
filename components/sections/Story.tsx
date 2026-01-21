"use client";

import React from "react";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
// ... imports

export function Story() {
  return (
    <section id="story" className="py-24 relative overflow-hidden">
      {/* Background Gradient (Transparent to let Scene3D show) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)] via-transparent to-[var(--color-navy)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="slide-in-right">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ivory)] mb-6">
              قصتنا
            </h2>
                <p className="text-sm md:text-xl text-[var(--color-ivory)]/70 leading-relaxed mb-6 md:mb-8 font-light max-w-2xl mx-auto">
                    في <span className="text-[var(--color-copper)] font-medium">إيكونوڤا</span> ستديو، نحن لا نستبدل الإبداع، بل نمنحه أجنحة رقمية. انطلقنا برؤية عربية طموحة لنعيد تعريف معايير الإنتاج الفني في المنطقة، حيث يلتقي خيال المبدعين والكُتّاب العرب بأحدث تقنيات الذكاء الاصطناعي التوليدي.
                </p>
            <p className="text-lg text-[var(--color-ivory)]/80 leading-relaxed mb-8 font-light">
               نحن هنا لنكسر قيود الميزانيات التقليدية وعوائق الوقت، لنمنح علامتك التجارية قصصاً سينمائية عالمية المستوى، تُصاغ بروح عربية مبتكرة كانت بالأمس ضرباً من الخيال.
            </p>
            

          </motion.div>

          {/* Visual Side */}
          <div className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden block group border border-white/5 shadow-2xl mt-6 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-transparent to-transparent z-10" />
            {/* Cinematic Image */}
            <img 
                src="/images/story_concept.png" 
                alt="Lens dissolving into particles" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            
            {/* Overlay Text */}
            <div className="absolute bottom-10 right-10 z-20 max-w-xs text-right">
                <p className="text-[var(--color-champagne)] font-serif italic text-lg opacity-80">
                    &ldquo;نحن لا نلغي الكاميرا.. بل نتجاوزها.&rdquo;
                </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
