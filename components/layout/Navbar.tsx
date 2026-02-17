"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
// import { LiquidButton } from "@/components/ui/LiquidButton"; // Removed as per original, or keep if needed? Original had it imported but not used in the snippet I saw? Wait, snippet had LiquidButton imported. I will keep imports.
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
  categories?: {
    title: string;
    items: { name: string; href: string }[];
  }[];
}

const navItems: NavItem[] = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { 
    name: "خدماتنا", 
    href: "/services",
    categories: [
      {
        title: "الإعلانات السينمائية",
        items: [
            { name: "NOVA LIFE", href: "/services/nova-life" },
            { name: "NOVA ACTION", href: "/services/nova-action" },
            { name: "NOVA MAGIC", href: "/services/nova-magic" },
        ]
      },
      {
        title: "موديلينج",
        items: [
            { name: "NOVA AURA", href: "/services/nova-aura" },
        ]
      },
      {
        title: "الإنتاج السينمائي",
        items: [
            { name: "NOVA CINEMA", href: "/services/nova-cinema" },
            { name: "NOVA SAGA", href: "/services/nova-saga" },
        ]
      }
    ]
  },
  { name: "تواصل معنا", href: "/contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
    
    // Scrolled state for background
    setIsScrolled(currentScrollY > 50);

    // Smart Hide Logic
    if (currentScrollY > 100 && scrollDirection === "down") {
        setIsVisible(false);
        setHoveredIndex(null); // Close dropdown on scroll hide
    } else if (scrollDirection === "up" || currentScrollY < 100) {
        setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  });

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link
    if (href.startsWith('#') || href.includes('/#')) {
        const targetId = href.split('#')[1];
        const element = document.getElementById(targetId);
        
        if (element) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === '') {
             // Handle explicit top scroll
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
       // For normal page navigation, close mobile menu
       setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-transparent py-6",
          isScrolled && "bg-black/50 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-24 md:gap-44 relative">
          
          {/* Desktop Nav - Left Side */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-32">
            {navItems.slice(0, 2).map((item, index) => (
              <div key={item.name} className="relative">
                  <Link
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] transition-colors text-base font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
                  </Link>
              </div>
            ))}
          </nav>

          {/* Logo - Centered in Flow */}
          <Link href="/" className="text-3xl font-bold flex flex-col items-center leading-tight z-50 group shrink-0">
            <span className="text-[var(--color-ivory)] tracking-widest group-hover:text-[var(--color-copper)] transition-colors">ECHONOVA</span>
            <span className="text-[var(--color-copper)] text-[0.6rem] tracking-[0.4em] font-light uppercase group-hover:text-white transition-colors">STUDIO</span>
          </Link>

          {/* Desktop Nav - Right Side */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-32">
            {navItems.slice(2).map((item, index) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => (item.subItems || item.categories) && setHoveredIndex(index + 2)}
                onMouseLeave={() => (item.subItems || item.categories) && setHoveredIndex(null)}
              >
                  <Link
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] transition-colors text-base font-medium relative flex items-center gap-1"
                  >
                    {item.name}
                    {(item.subItems || item.categories) && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {(item.subItems || item.categories) && hoveredIndex === index + 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15, rotateX: -10 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: 15, rotateX: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[600px]"
                        >
                            <div className="bg-[var(--color-navy)]/95 backdrop-blur-xl border border-[var(--color-copper)]/20 rounded-xl shadow-2xl overflow-hidden p-6 flex flex-row-reverse gap-8">
                                {item.categories ? (
                                    item.categories.map((category, idx) => (
                                        <div key={idx} className="flex-1 flex flex-col gap-4 text-right">
                                            <h4 className="text-[var(--color-copper)] text-sm font-bold border-b border-[var(--color-copper)]/20 pb-2 mb-1 cursor-default select-none">
                                                {category.title}
                                            </h4>
                                            <div className="flex flex-col gap-2">
                                                {category.items.map((subItem, sIdx) => (
                                                    <Link
                                                        key={sIdx}
                                                        href={subItem.href}
                                                        className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] hover:bg-white/5 px-2 py-1 rounded transition-colors text-sm font-medium"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col gap-1 w-full">
                                        {item.subItems?.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-3 text-sm text-[var(--color-ivory)] hover:bg-[var(--color-copper)]/10 hover:text-[var(--color-copper)] rounded-lg transition-colors text-right"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle (Absolute Right on Mobile) */}
          <button 
            className="md:hidden text-[var(--color-ivory)] z-50 pointer-events-auto absolute right-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--color-navy)]/95 backdrop-blur-xl pt-32 px-6 md:hidden flex flex-col items-center overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-8 w-full pointer-events-auto pb-20">
              {navItems.map((item) => (
                <div key={item.name} className="w-full flex flex-col items-center gap-4">
                    <Link
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-[var(--color-ivory)] text-3xl font-light tracking-wide w-full text-center py-2 border-b border-white/5"
                    >
                    {item.name}
                    </Link>

                    {/* Mobile Submenu */}
                    {(item.subItems || item.categories) && (
                        <div className="flex flex-col gap-6 w-full items-center bg-white/5 rounded-2xl py-6 px-4">
                            {item.categories ? (
                                item.categories.map((cat, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-3 w-full">
                                        <h4 className="text-[var(--color-copper)] text-base font-bold opacity-80 decoration-solid underline decoration-[var(--color-copper)]/30 underline-offset-4">{cat.title}</h4>
                                        <div className="flex flex-col gap-2 w-full items-center">
                                            {cat.items.map((sub, sIdx) => (
                                                <Link
                                                    key={sIdx}
                                                    href={sub.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-[var(--color-ivory)]/90 text-lg hover:text-[var(--color-copper)] transition-colors"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                item.subItems?.map(sub => (
                                    <Link
                                        key={sub.name}
                                        href={sub.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-[var(--color-copper)] text-lg hover:text-white transition-colors"
                                    >
                                        {sub.name}
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
