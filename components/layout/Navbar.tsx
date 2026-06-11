"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { 
    name: "خدماتنا", 
    href: "/services",
    subItems: [
      { name: "الفيديوهات الإعلانية", href: "/services/reels" },
      { name: "الموديلينج", href: "/services/aura" },
      { name: "الإنتاج الصوتي", href: "/services/whisper" },
      { name: "الإنتاج السينمائي", href: "/services/cinema" },
    ]
  },
  { name: "تواصل معنا", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Reset scroll and visibility states on route change to prevent persistent states
  React.useEffect(() => {
    setIsVisible(true);
    setLastScrollY(0);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";

    // Smart Hide Logic - matches static homepage scroll behavior
    if (currentScrollY > 100 && scrollDirection === "down") {
        setIsVisible(false);
        setHoveredIndex(null); // Close dropdown on scroll hide
    } else if (scrollDirection === "up" || currentScrollY < 100) {
        setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  });

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') || href.includes('/#')) {
        const targetId = href.split('#')[1];
        const element = document.getElementById(targetId);
        
        if (element) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === '') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
       setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-6"
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-24 md:gap-44 relative">
          
          {/* Desktop Nav - Left Side */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-32">
            {navItems.slice(0, 2).map((item) => (
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
          <Link href="/" className="text-3xl font-bold flex flex-col items-center leading-tight z-50 group shrink-0 relative">
            <span className="text-[var(--color-ivory)] tracking-widest group-hover:text-[var(--color-copper)] transition-colors">ECHONOVA</span>
            <span className="text-[var(--color-copper)] text-[0.6rem] tracking-[0.4em] font-light uppercase group-hover:text-white transition-colors">STUDIO</span>
            {process.env.NEXT_PUBLIC_IS_LAB === "true" && (
              <span className="absolute -top-2 -right-8 px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider rounded-sm bg-gradient-to-r from-[var(--color-copper)] to-orange-500 text-white shadow-[0_0_10px_rgba(217,112,64,0.5)] animate-pulse">
                LAB
              </span>
            )}
          </Link>

          {/* Desktop Nav - Right Side */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-32">
            {navItems.slice(2).map((item, index) => (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => item.subItems && setHoveredIndex(index + 2)}
                onMouseLeave={() => item.subItems && setHoveredIndex(null)}
              >
                  <Link
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] transition-colors text-base font-medium relative flex items-center gap-1"
                  >
                    {item.name}
                    {item.subItems && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
                  </Link>
                  
                  {/* Dropdown Menu - Matches home-v2.html styles exactly */}
                  <AnimatePresence>
                    {item.subItems && hoveredIndex === index + 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[236px]"
                        >
                            <div className="bg-[#020b16]/58 backdrop-blur-[26px] border border-white/5 rounded-[12px] shadow-2xl p-3 flex flex-col gap-1">
                                {item.subItems.map((subItem) => (
                                    <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] hover:bg-white/5 px-3.5 py-2.5 rounded-[8px] transition-colors text-[14.5px] font-medium text-right"
                                    >
                                        {subItem.name}
                                    </Link>
                                ))}
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
                <React.Fragment key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-[var(--color-ivory)] text-3xl font-light tracking-wide w-full text-center py-2 border-b border-white/5"
                  >
                    {item.name}
                  </Link>

                  {/* Mobile Submenu (only for "خدماتنا") */}
                  {item.subItems && (
                    <div className="flex flex-col gap-4 w-full items-center bg-white/5 rounded-2xl py-5 px-4">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[var(--color-ivory)]/90 text-lg hover:text-[var(--color-copper)] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
