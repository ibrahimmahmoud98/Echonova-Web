"use client";

import React from "react";
import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import { PortfolioItem } from "@/lib/data/identity-portfolio";
import { Layers, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Style configuration for carousel items based on their position
 */
export interface CarouselItemStyle {
  zIndex: number;
  scale: number;
  opacity: number;
  x: string;
  rotateY: number;
  filter: string;
  cursor?: string;
  pointerEvents: 'auto' | 'none';
  [key: string]: string | number | undefined; // Index signature for framer-motion compatibility
}

/**
 * Props for the CarouselSlide component
 */
interface CarouselSlideProps {
  /** Portfolio item to display */
  item: PortfolioItem;
  /** Whether this slide is the currently active/center slide */
  isCenter: boolean;
  /** Style configuration for positioning */
  style: CarouselItemStyle;
  /** Callback when slide is clicked */
  onClick: () => void;
  /** Callback when drag starts */
  onDragStart: () => void;
  /** Callback when drag ends - uses framer-motion PanInfo */
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

/**
 * Individual carousel slide component
 * 
 * @description Renders a single slide in the identity carousel with 3D perspective effects,
 * collection stack visualization, and hover interactions.
 */
export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  item,
  isCenter,
  style,
  onClick,
  onDragStart,
  onDragEnd,
}) => {
  const isCollection = item.type === 'collection';

  return (
    <motion.div
      key={item.id}
      className={cn(
        "absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#0A1625] border border-[#F7F5F0]/10",
        isCenter ? "cursor-default" : "cursor-pointer"
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={style as any}  // Cast needed for framer-motion TargetAndTransition compatibility
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      drag={isCenter ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      {/* Collection Stack Effect (Visual layers behind) */}
      {isCollection && (
        <>
          <div className="absolute top-2 left-2 right-2 h-full bg-[#D97040]/10 rounded-t-xl -z-10 transform -translate-y-2 scale-95 border-t border-l border-r border-[#D97040]/30" />
          <div className="absolute top-4 left-4 right-4 h-full bg-[#D97040]/5 rounded-t-xl -z-20 transform -translate-y-4 scale-90 border-t border-l border-r border-[#D97040]/20" />
        </>
      )}

      {/* Image */}
      <div className="relative w-full h-full">
        <Image 
          src={item.thumbnail} 
          alt={item.title} 
          fill
          className="object-cover pointer-events-none"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 pointer-events-none">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#D97040] tracking-wider uppercase bg-[#D97040]/10 px-2 py-1 rounded">
            {item.category}
          </span>
          {isCollection && (
            <div className="flex items-center gap-1.5 text-[#FFD6A5] bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-[#FFD6A5]/20">
              <Layers size={14} />
              <span className="text-[10px] font-bold">{item.items.length}</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-[#F7F5F0] mb-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-sm text-[#F7F5F0]/60 line-clamp-2 mb-4 dir-rtl">
          {item.description}
        </p>
      </div>

      {/* Hover Effect - Center Only */}
      {isCenter && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] z-30 pointer-events-auto cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-[#D97040] flex items-center justify-center text-black shadow-lg transform scale-75 hover:scale-100 transition-transform duration-300">
            <Maximize2 size={24} />
          </div>
        </div>
      )}
    </motion.div>
  );
};
