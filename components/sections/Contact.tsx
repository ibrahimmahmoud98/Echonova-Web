"use client";

import React from "react";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden z-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-copper)]/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ivory)] mb-6">
              ابدأ رحلتك <span className="text-[var(--color-copper)]">.</span>
            </h2>
            <p className="text-lg text-[var(--color-ivory)]/70 max-w-2xl mx-auto font-light">
              هل أنت مستعد لنقل رؤيتك إلى بعد آخر؟ تواصل معنا اليوم لتحويل الأفكار إلى واقع سينمائي.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Contact Info */}
            <ScrollReveal variant="slide-in-left" delay={0.2}>
              <div className="space-y-8">
                  <ContactCard 
                    icon={<Mail className="w-6 h-6" />}
                    title="البريد الإلكتروني"
                    value="info@echonova.sa"
                    link="mailto:info@echonova.sa"
                  />
                  <ContactCard 
                    icon={<Phone className="w-6 h-6" />}
                    title="الهاتف"
                    value="+966 50 000 0000"
                    link="tel:+966500000000"
                  />
                  <ContactCard 
                    icon={<MapPin className="w-6 h-6" />}
                    title="العنوان"
                    value="الرياض، المملكة العربية السعودية"
                    subval="حي الملقا، طريق الملك فهد"
                  />
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal variant="slide-in-right" delay={0.4}>
              <form className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
                 <div className="space-y-6">
                    <div>
                        <label className="block text-[var(--color-ivory)]/60 text-sm mb-2 font-medium">الاسم الكامل</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--color-ivory)] focus:border-[var(--color-copper)] focus:outline-none transition-colors" placeholder="اسمك الكريم" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-ivory)]/60 text-sm mb-2 font-medium">البريد الإلكتروني</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--color-ivory)] focus:border-[var(--color-copper)] focus:outline-none transition-colors" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-[var(--color-ivory)]/60 text-sm mb-2 font-medium">الرسالة</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--color-ivory)] focus:border-[var(--color-copper)] focus:outline-none transition-colors resize-none" placeholder="حدثنا عن مشروعك..." />
                    </div>
                    <LiquidButton className="w-full justify-center group">
                        <span className="flex items-center gap-2">
                           إرسال الطلب <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </span>
                    </LiquidButton>
                 </div>
              </form>
            </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, value, subval, link }: any) {
    const content = (
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--color-copper)]/50 transition-all hover:bg-white/10 group cursor-pointer h-full">
            <div className="w-12 h-12 rounded-full bg-[var(--color-copper)]/10 flex items-center justify-center text-[var(--color-copper)] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(217,112,64,0.2)]">
                {icon}
            </div>
            <div>
                <h4 className="text-[var(--color-ivory)]/60 text-sm mb-1">{title}</h4>
                <p className="text-xl text-[var(--color-ivory)] font-medium group-hover:text-[var(--color-copper)] transition-colors">{value}</p>
                {subval && <p className="text-[var(--color-ivory)]/40 text-sm mt-1">{subval}</p>}
            </div>
        </div>
    );

    if (link) {
        return <a href={link} className="block">{content}</a>;
    }
    return content;
}
