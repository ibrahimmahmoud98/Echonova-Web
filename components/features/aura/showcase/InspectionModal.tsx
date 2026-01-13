'use client';

import { PortfolioItem } from '@/lib/data/identity-portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Share2, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface InspectionModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectionModal({ item, isOpen, onClose }: InspectionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when item changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [item]);

  if (!item) return null;

  const currentMedia = item.items[currentIndex];
  const isCollection = item.type === 'collection';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % item.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + item.items.length) % item.items.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
            {/* Backdrop with Blur */}
            <div 
                className="absolute inset-0 bg-[#020B16]/90 backdrop-blur-md"
                onClick={onClose} 
            />

            {/* Modal Content - HUD Style */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-6xl h-[85vh] bg-[#0A1625] border border-[#D97040]/30 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(217,112,64,0.1)]"
            >
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 z-50 p-2 bg-[#D97040]/10 hover:bg-[#D97040]/20 text-[#D97040] rounded-full transition-colors border border-[#D97040]/30"
                >
                    <X size={20} />
                </button>

                {/* Main Visual Area */}
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                    {/* Navigation for Collections */}
                    {isCollection && item.items.length > 1 && (
                        <>
                            <button 
                                onClick={prevSlide}
                                className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-[#D97040] text-white rounded-full transition-colors backdrop-blur-sm group"
                            >
                                <ChevronLeft className="group-hover:scale-110 transition-transform" />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-[#D97040] text-white rounded-full transition-colors backdrop-blur-sm group"
                            >
                                <ChevronRight className="group-hover:scale-110 transition-transform" />
                            </button>

                             {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {item.items.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            idx === currentIndex ? "bg-[#D97040] w-6" : "bg-white/30 hover:bg-white/50"
                                        )}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Image/Media */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-full flex items-center justify-center bg-black"
                        >
                            {currentMedia.type === 'video' ? (
                                <video 
                                    src={currentMedia.url} 
                                    controls 
                                    autoPlay 
                                    className="max-w-full max-h-full"
                                />
                            ) : (
                                <Image
                                    src={currentMedia.url}
                                    alt={currentMedia.caption || item.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Scan Line Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(transparent_0%,_rgba(217,112,64,0.1)_50%,_transparent_100%)] bg-[length:100%_4px]" />
                </div>

                {/* Sidebar Info Panel */}
                <div className="w-full md:w-80 border-l border-[#D97040]/20 bg-[#020B16] p-6 flex flex-col text-[#F7F5F0]">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                             <span className={cn(
                                "text-xs font-mono px-2 py-0.5 rounded border",
                                isCollection 
                                    ? "border-purple-500/50 text-purple-400 bg-purple-500/10" 
                                    : "border-[#D97040]/50 text-[#D97040] bg-[#D97040]/10"
                             )}>
                                {isCollection ? 'COLLECTION' : 'SINGLE UNIT'}
                             </span>
                             <span className="text-xs text-[#FFD6A5]/60 font-mono">ID: {item.id}</span>
                        </div>
                        <h2 className="text-2xl font-bold font-arabic text-[#F7F5F0] leading-tight mb-2">
                            {item.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.map(tag => (
                                <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-[#FFD6A5]/80">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-sm text-[#F7F5F0]/70 leading-relaxed font-arabic">
                            {/* Placeholder description logic */}
                            نموذج هوية رقمية متكامل تم تصميمه بعناية فائقة ليعكس القيم الجوهرية للعلامة التجارية.
                            يتميز هذا النموذج بالدقة العالية في التفاصيل وواقعية الملامح، مصمم ليكون سفيراً دائماً في العالم الافتراضي.
                        </p>
                        
                        {currentMedia.caption && (
                            <div className="mt-6 p-4 bg-[#D97040]/5 border border-[#D97040]/20 rounded">
                                <h4 className="text-xs text-[#D97040] uppercase tracking-wider mb-1 flex items-center gap-2">
                                    <Info size={12} />
                                    Current View
                                </h4>
                                <p className="text-sm font-medium">{currentMedia.caption}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/10 flex gap-3">
                         <button className="flex-1 py-3 bg-[#D97040] hover:bg-[#c66030] text-black font-bold rounded flex items-center justify-center gap-2 transition-colors">
                            طلب تصميم مشابه
                         </button>
                         <button className="p-3 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors">
                            <Share2 size={20} className="text-[#FFD6A5]" />
                         </button>
                    </div>
                </div>

            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
