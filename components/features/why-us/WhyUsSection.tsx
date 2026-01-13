'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { WHY_US_DATA } from '@/lib/data/services-content';

// Helper for dynamic icons
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    // @ts-ignore
    const Icon = Icons[name];
    return Icon ? <Icon className={className} /> : null;
};

export const WhyUsSection = () => {
    return (
        <section className="py-32 px-4 relative overflow-hidden bg-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        لماذا <span className="text-[var(--nova-gold)]">إيكونوڤا؟</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {WHY_US_DATA.map((item, idx) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group p-8 rounded-2xl bg-black border border-white/10 overflow-hidden hover:border-[var(--nova-gold)]/50 transition-colors"
                        >
                            {/* Giant Background Number */}
                            <span className="absolute -bottom-10 -left-4 text-9xl font-bold text-white/5 select-none group-hover:text-white/10 transition-colors duration-500">
                                {item.id}
                            </span>

                            <div className="relative z-10 space-y-6">
                                <div className="w-12 h-12 rounded-xl bg-[var(--nova-gold)]/10 flex items-center justify-center text-[var(--nova-gold)]">
                                    <IconComponent name={item.icon_name} className="w-6 h-6" />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white">
                                    {item.title}
                                </h3>
                                
                                <p className="text-white/60 leading-relaxed min-h-[5rem]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
