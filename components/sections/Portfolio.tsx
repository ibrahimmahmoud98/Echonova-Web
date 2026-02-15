"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const works = [
  {
    id: 1,
    title: "THE RED GHOST",
    category: "NOVA CINEMA",
    image: "/images/portfolio_1.png",
    desc: "إعلان فيلم خيال علمي قصير",
  },
  {
    id: 2,
    title: "L'OR NOIR",
    category: "NOVA LIFE",
    image: "/images/portfolio_2.png",
    desc: "حملة إعلانية لمنتج فاخر",
  },
  {
    id: 3,
    title: "NEO TOKYO",
    category: "NOVA MAGCIC",
    image: "/images/portfolio_3.png",
    desc: "تجربة بصرية تفاعلية للمدن الذكية",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>

                <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-ivory)]">
                    بصمتنا في <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-copper)] to-[var(--color-champagne)]">المستقبل</span>
                </h2>
            </div>
            <Button variant="outline">شاهد جميع الأعمال</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
                <motion.div
                    key={work.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
                >
                    <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Coming Soon Blur Layer */}
                    <div className="absolute inset-0 backdrop-blur-[8px] bg-black/40 flex items-center justify-center z-10 transition-all duration-500">
                        <span className="text-[var(--nova-gold)] text-4xl md:text-5xl font-bold tracking-widest opacity-100 border-4 border-[var(--nova-gold)] px-8 py-2 rotate-[-15deg] shadow-[0_0_30px_rgba(217,112,64,0.5)]">
                            قريباً
                        </span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[var(--color-copper)] text-xs font-bold tracking-widest mb-2 block">
                            {work.category}
                        </span>
                        <h4 className="text-2xl font-bold text-white mb-2">{work.title}</h4>
                        <p className="text-gray-300 text-sm opacity-100 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {work.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
