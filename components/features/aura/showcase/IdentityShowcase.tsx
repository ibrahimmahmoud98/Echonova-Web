'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IdentityCarousel } from './IdentityCarousel';
import { PortfolioItem } from '@/lib/data/identity-portfolio';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary-optimization';

// Type Definition matching our archive-data.json payload
type Asset = {
  public_id: string;
  url: string;
  is_hidden: boolean;
  is_featured: boolean;
  display_order: number;
  tags: string[]; // collection
  service_type: string;
  width: number;
  height: number;
};

export default function IdentityShowcase() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // 1. Fetch Data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/assets');
        if (!response.ok) throw new Error("Failed to load assets");
        const data = await response.json();
        setAssets(data);
      } catch (e) {
        console.error("Gallery Error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 1. Keyword Mapping for Frontend Filtering (Tag Union)
  const KEYWORD_MAP: Record<string, string[]> = useMemo(() => ({
    "Food": ["food", "snacks", "coffee", "drinks", "dining", "fruit", "vegetable"],
    "Animals": ["animal", "birds", "flamingo", "whales", "horse", "falcon", "cat", "dog"],
    "Male": ["male", "man", "men"],
    "Female": ["female", "woman", "women", "girl"],
    "Fantasy": ["imaginary", "art", "surreal", "space", "scifi", "dragon"],
    "Fashion": ["fashion", "apparel", "clothing", "bags", "luxury", "sunglasses", "fashion_apparel"],
    "Products": ["product", "gadget", "chair", "furniture", "perfume", "bottle"],
    "Feelings": ["anger", "sadness", "joy", "happy", "mood", "emotional", "portrait"],
    "Vibes": ["vibes", "lifestyle", "urban", "nature", "abstract", "cinematic"],
    "Ads": ["commercial", "advertising", "promo"]
  }), []);

  // 2. Logic: Filter & Sort & Map to PortfolioItem
  const carouselItems = useMemo<PortfolioItem[]>(() => {
    let filtered = assets.filter(a => !a.is_hidden); // Exclude hidden

    if (activeFilter !== 'All') {
       // TRUST THE JSON: Filter by the reclassified service_type.
       // The reclassify script handles all priority/metadata logic.
       filtered = filtered.filter(asset => asset.service_type === activeFilter);
    }

    // Sort: Featured First -> Display Order Ascending
    filtered.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });

    // Map to PortfolioItem structure required by IdentityCarousel
    // Apply Cloudinary Optimization here
    return filtered.map(asset => ({
        id: asset.public_id,
        title: " ", 
        type: 'single',
        thumbnail: optimizeCloudinaryUrl(asset.url, 600),
        items: [{ type: 'image', url: optimizeCloudinaryUrl(asset.url, 1200) }],
        tags: asset.tags,
        category: asset.service_type, // Keep original service_type for display/badge if needed, even if specific filtering is used
        description: "" 
    }));

  }, [assets, activeFilter, KEYWORD_MAP]);

  // 3. Dynamic Filters
  const filters = useMemo(() => {
    return [
      'All', 
      'Feelings', 
      'Fashion', 
      'Male', 
      'Female', 
      'Fantasy', 
      'Vibes', 
      'Ads', 
      'Products', 
      'Animals', 
      'Food'
    ];
  }, []);

  // 4. GSAP Animation on Filter Change
  useGSAP(() => {
    if (containerRef.current) {
        gsap.fromTo(containerRef.current, 
            { opacity: 0.5 }, 
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }
  }, [activeFilter]);

  if (loading) {
     return <div className="h-96 flex items-center justify-center bg-[#020B16]"><Loader2 className="w-8 h-8 text-[#C67C48] animate-spin" /></div>;
  }

  return (
    <section className="py-24 px-4 sm:px-8 bg-[#020B16] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D97040]/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#F7F5F0] font-arabic mb-4">
                    الأرشيف <span className="text-[#D97040]">الرقمي</span>
                </h2>
                <div className="flex items-center gap-2 text-[#FFD6A5]/80 max-w-xl font-arabic text-lg">
                   <span>({carouselItems.length}) أصول رقمية موثقة.</span>
                   {loading && <Loader2 className="w-4 h-4 animate-spin text-[#C67C48]" />}
                </div>
            </div>

            {/* Filter Scroll */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 custom-scrollbar">
                <div className="flex gap-2">
                    {filters.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveFilter(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                                activeFilter === tag 
                                    ? "bg-[#D97040] text-[#020B16] border-[#D97040]" 
                                    : "bg-transparent text-[#F7F5F0]/60 border-[#F7F5F0]/10 hover:border-[#D97040]/50 hover:text-[#F7F5F0]"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* The Original 3D Carousel with Injected Data */}
        <div ref={containerRef} className="w-full max-w-6xl mx-auto">
            {carouselItems.length > 0 ? (
                <IdentityCarousel 
                    items={carouselItems} 
                    onSelect={(item) => setSelectedItem(item)} 
                />
            ) : (
                <div className="h-[400px] flex items-center justify-center text-white/40 font-mono">
                    NO_ASSETS_FOUND
                </div>
            )}
        </div>
    </section>
  );
}
