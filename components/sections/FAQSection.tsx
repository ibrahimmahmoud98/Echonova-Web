"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "ما هو الإنتاج المدعوم بالذكاء الاصطناعي؟",
    answer: "نستخدم أحدث تقنيات الذكاء الاصطناعي التوليدي لإنشاء محتوى بصري سينمائي (فيديو وصور) بجودة تضاهي الإنتاج التقليدي ولكن بتكلفة أقل وسرعة تنفيذ أعلى، مع إمكانية خلق عوالم خيالية يصعب تصويرها واقعياً."
  },
  {
    question: "هل تقدمون خدماتكم في الرياض فقط؟",
    answer: "مقرنا الرئيسي في الرياض، ولكن خدماتنا الرقمية عابرة للحدود. نخدم عملاء في جميع أنحاء المملكة ودول الخليج، حيث تتم عمليات الإنتاج والتواصل بشكل رقمي كامل."
  },
  {
    question: "ما هي خدمة 'الهوية الافتراضية' (NOVA AURA)؟",
    answer: "هي خدمة تصميم شخصيات رقمية (Virtual Influencers/Models) خاصة بعلامتك التجارية. نمتلك التكنولوجيا لضمان ثبات ملامح الشخصية بنسبة 100% في آلاف الصور والفيديوهات، لتصبح سفيراً دائماً لعلامتك."
  },
  {
    question: "كم تكلفة إنتاج إعلان سينمائي؟",
    answer: "تختلف التكلفة حسب مستوى التعقيد (NOVA LIFE, ACTION, MAGIC). لكن بشكل عام، نوفر ما بين 40% إلى 70% من تكلفة الإنتاج التقليدي لعدم الحاجة لمواقع تصوير، ممثلين، أو معدات ثقيلة."
  },
  {
    question: "هل يمكن دمج منتجات حقيقية في الفيديو؟",
    answer: "نعم، نستخدم تقنيات دمج متقدمة (Compositing & LoRA Fine-tuning) لإدراج منتجك الحقيقي داخل المشاهد المولدة بالذكاء الاصطناعي بدقة وواقعية عالية."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[var(--color-navy)]">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-ivory)] mb-6">
                أسئلة شائعة
            </h2>
            <p className="text-[var(--color-ivory)]/70 text-lg">
                إجابات سريعة حول تقنياتنا وعمليات الإنتاج
            </p>
            </div>

            <div className="space-y-4">
            {FAQS.map((faq, index) => (
                <div 
                    key={index} 
                    className={cn(
                        "border border-white/10 rounded-2xl overflow-hidden transition-all duration-300",
                        openIndex === index ? "bg-white/5 border-[var(--color-copper)]/30" : "hover:bg-white/5"
                    )}
                >
                <button
                    onClick={() => setOpenIndex(active => active === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
                >
                     <span className={cn(
                         "text-xl md:text-2xl font-bold transition-colors duration-300",
                         openIndex === index ? "text-[var(--color-copper)]" : "text-white"
                     )}>
                        {faq.question}
                    </span>
                    <span className={cn(
                        "p-2 rounded-full border border-white/10 transition-all duration-300 ml-4",
                        openIndex === index ? "bg-[var(--color-copper)] text-white rotate-180" : "text-white/50"
                    )}>
                        {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                   
                </button>
                <AnimatePresence>
                    {openIndex === index && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 pt-0 text-[var(--color-ivory)]/80 text-lg leading-relaxed font-light border-t border-white/5 mt-2">
                        {faq.answer}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            ))}
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
