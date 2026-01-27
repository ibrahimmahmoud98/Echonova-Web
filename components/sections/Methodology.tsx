"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "الاستكشاف والتحليل", desc: "فهم عميق لأهداف العميل والجمهور المستهدف." },
  { num: "02", title: "السرد القصصي البشري", desc: "كتابة السيناريو والمشاعر بواسطة محترفين." },
  { num: "03", title: "هندسة الخيال", desc: "تحويل خيال و رؤية العميل الى اصول بصرية جذابة" },
  { num: "04", title: "التوليد والإخراج", desc: "توليد المشاهد تحت إشراف مخرج فني." },
  { num: "05", title: "المونتاج واللمسة النهائية", desc: "تجميع المشاهد وإضافة المؤثرات الصوتية." },
  { num: "06", title: "التسليم والأثر", desc: "تسليم العمل ليصنع الصدى المتوقع." },
];

export function Methodology() {
  return (
    <section id="methodology" className="py-24 bg-[#020B16] relative overflow-hidden">
        {/* Background Decorative Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-copper)]/30 to-transparent hidden md:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[var(--color-ivory)] mb-4">منهجية العمل</h2>
          <p className="text-[var(--color-ivory)]/60">كيف نحول الفوضى الإبداعية إلى عمل مؤسسي</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-12">
            {steps.map((step, index) => (
                <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={index % 2 === 0 ? "md:text-left md:items-start" : "md:text-right md:items-end md:mt-24"}
                >
                    <div className="relative p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-[var(--color-copper)]/50 transition-colors group">
                        <div className="text-5xl font-bold text-[var(--color-copper)]/20 absolute top-4 left-4 group-hover:text-[var(--color-copper)]/40 transition-colors">
                            {step.num}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--color-ivory)] mb-2 relative z-10">{step.title}</h3>
                        <p className="text-[var(--color-ivory)]/70 relative z-10 text-sm">
                            {step.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
