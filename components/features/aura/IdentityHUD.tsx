'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { VIRTUAL_IDENTITY } from '@/lib/data/services-content';

const StatCounter = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= value) {
                    clearInterval(interval);
                    return value;
                }
                return prev + 1;
            });
        }, 20); // Fast counting for glitch effect
        return () => clearInterval(interval);
    }, [value]);

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--nova-gold)] uppercase tracking-widest">{label}</span>
            <div className="text-4xl font-mono font-bold text-white flex items-baseline">
                {count}
                <span className="text-sm ml-1 opacity-50">{suffix}</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / 100) * 100}%` }}
                    className="h-full bg-[var(--nova-gold)]"
                />
            </div>
        </div>
    );
};

export const IdentityHUD = () => {
    return (
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-sm space-y-8 shadow-2xl relative overflow-hidden">
            {/* HUD Lines */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[var(--nova-gold)]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-[var(--nova-gold)]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[var(--nova-gold)]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[var(--nova-gold)]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-english font-bold text-white">NOVA AURA</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-500 font-mono">النظام نشط</span>
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-6">
                {VIRTUAL_IDENTITY.stats.map(stat => (
                    <StatCounter key={stat.label} {...stat} />
                ))}
            </div>

            {/* Decorative Code */}
            <div className="font-mono text-[10px] text-white/20 select-none text-right" dir="ltr">
                {`> بدء تسلسل الحمض النووي...`} <br/>
                {`> مطابقة الملامح الحيوية...`} <br/>
                {`> قفل هالة الهدف...`} <br/>
                {`> تم الاكتمال.`}
            </div>
        </div>
    );
};
