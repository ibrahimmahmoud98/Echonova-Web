"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";

const FAQS = [
  {
    question: "ما هو إيكونوڤا ستوديو (Echonova Studio) وما هي رؤيته؟",
    answer: "إيكونوڤا ستوديو هو مختبر إبداعي رائد متخصص في دمج الفن السينمائي بتقنيات الذكاء الاصطناعي التوليدي. نهدف إلى إعادة تعريف صناعة المحتوى البصري من خلال إنتاج فيديوهات فائقة الجودة تجمع بين الدقة التقنية والعمق الدرامي، مثل مشاريعنا الرائدة Nova Saga و Nova Aura."
  },
  {
    question: "كيف يوظف ستوديو إيكونوڤا الذكاء الاصطناعي في الإنتاج الفني؟",
    answer: "نعتمد في إيكونوڤا على سير عمل (Workflow) هجين يدمج بين محركات الرندرة التقليدية ونماذج الانتشار (Diffusion Models) المتقدمة. يتيح لنا ذلك إنتاج لقطات سينمائية معقدة، وتوليد بيئات افتراضية، وتحريك شخصيات رقمية بدقة تضاهي الإنتاج الضخم ولكن بكفاءة زمنية وتقنية أعلى."
  },
  {
    question: "ما هي الخدمات التي يقدمها إيكونوڤا ستوديو للشركات والأفراد؟",
    answer: "نقدم حزمة متكاملة تشمل إنتاج الإعلانات التجارية السينمائية، صناعة المحتوى البصري لوسائل التواصل الاجتماعي، تطوير الأفلام القصيرة المعتمدة على AI، وتصميم الهويات البصرية المتحركة. نركز على تحويل الأفكار المجردة إلى واقع بصري مذهل يخدم أهداف التسويق والبراندنج."
  },
  {
    question: "ما الذي يميز الفيديوهات المنتجة بالذكاء الاصطناعي لدى إيكونوڤا عن غيرها؟",
    answer: "التميز يكمن في 'الجودة السينمائية' والتحكم الكامل في التفاصيل. نحن لا نعتمد على التوليد العشوائي، بل نستخدم تقنيات الـ ControlNet والـ Prompt Engineering الدقيق لضمان اتساق الشخصيات والحركات، مما يجعل المحتوى يبدو كأنه صُور بكاميرات احترافية في ستوديو حقيقي."
  },
  {
    question: "كيف يمكنني التعاون مع إيكونوڤا ستوديو لبدء مشروعي؟",
    answer: (
      <>
        يمكنكم التواصل معنا مباشرة عبر <Link href="/contact" className="text-[var(--color-copper)] underline hover:text-white transition-colors">الموقع الرسمي</Link> أو من خلال منصات التواصل الاجتماعي المرتبطة (<a href="https://www.instagram.com/echonova_studio?igsh=MXgzbDEyMXV5N282dw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-copper)] hover:text-white transition-colors">Instagram</a>, <a href="https://x.com/echonovastudio?s=21" target="_blank" rel="noopener noreferrer" className="text-[var(--color-copper)] hover:text-white transition-colors">X</a>, <a href="https://www.tiktok.com/@echonovastudio?_r=1&_t=ZS-93w0dbFWjDN" target="_blank" rel="noopener noreferrer" className="text-[var(--color-copper)] hover:text-white transition-colors">TikTok</a>). فريقنا مستعد لمناقشة رؤيتكم الفنية وتقديم استشارات حول أفضل السبل لتنفيذها باستخدام أحدث تقنيات الـ AI Video Production.
      </>
    )
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
