'use client';

import React from 'react';
import NextImage from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Poster3D = ({ src, title }: { src: string; title: string; }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative aspect-[2/3] rounded-xl bg-white/5 border border-white/10 group perspective-1000 cursor-pointer"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 rounded-xl" />
            
            {/* Image Layer */}
            <div className="absolute inset-0 bg-gray-900 rounded-xl overflow-hidden">
                 <NextImage 
                    src={src} 
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 />
                 <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
            </div>

            {/* Content */}
            <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-z-10">
                <span className="text-[10px] font-mono text-red-500 tracking-widest bg-black/50 px-2 py-1 rounded">COMING SOON</span>
                <h3 className="text-2xl font-bold text-white mt-2 font-english">{title}</h3>
            </div>
        </motion.div>
    );
};
