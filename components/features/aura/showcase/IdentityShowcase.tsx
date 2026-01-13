'use client';

import { useState } from 'react';
import { portfolioItems, PortfolioItem } from '@/lib/data/identity-portfolio';
import InspectionModal from './InspectionModal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Layers, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IdentityCarousel } from './IdentityCarousel';

export default function IdentityShowcase() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  
  // Extract unique tags for filter
  const allTags = ['All', ...Array.from(new Set(portfolioItems.flatMap(item => item.tags)))];
  
  const filteredItems = filter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.tags.includes(filter));

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#020B16] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D97040]/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#F7F5F0] font-arabic mb-4">
                    الأرشيف <span className="text-[#D97040]">الرقمي</span>
                </h2>
                <p className="text-[#FFD6A5]/80 max-w-xl font-arabic text-lg">
                    مكتبة واسعة من الهويات الرقمية التي قمنا بتطويرها. استعرض النماذج الفردية والمجموعات الكاملة.
                </p>
            </div>

            {/* Filter Scroll */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 custom-scrollbar">
                <div className="flex gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                                filter === tag 
                                    ? "bg-[#D97040] text-[#020B16] border-[#D97040]" 
                                    : "bg-transparent text-[#F7F5F0]/60 border-[#F7F5F0]/10 hover:border-[#D97040]/50 hover:text-[#F7F5F0]"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-6xl mx-auto">
            <IdentityCarousel 
                items={filteredItems} 
                onSelect={setSelectedItem} 
            />
        </div>

        {/* Modal */}
        <InspectionModal 
            item={selectedItem} 
            isOpen={!!selectedItem} 
            onClose={() => setSelectedItem(null)} 
        />
    </section>
  );
}


