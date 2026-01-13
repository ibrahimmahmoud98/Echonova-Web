"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "خدماتنا", href: "/services" },
  { name: "تواصل معنا", href: "/contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
    
    // Scrolled state for background
    setIsScrolled(currentScrollY > 50);

    // Smart Hide Logic
    if (currentScrollY > 100 && scrollDirection === "down") {
        setIsVisible(false);
    } else if (scrollDirection === "up" || currentScrollY < 100) {
        setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  });

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    // Check if it's a hash link
    if (href.startsWith('#') || href.includes('/#')) {
        const targetId = href.split('#')[1];
        const element = document.getElementById(targetId);
        
        if (element) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === '') {
             // Handle explicit top scroll if needed, though Next.js usually handles this
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
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-24 md:gap-44 relative">
          
          {/* Desktop Nav - Left Side */}
          <nav className="hidden md:flex items-center gap-44">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] transition-colors text-base font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Logo - Centered in Flow */}
          <Link href="/" className="text-3xl font-bold flex flex-col items-center leading-tight z-50 group shrink-0">
            <span className="text-[var(--color-ivory)] tracking-widest group-hover:text-[var(--color-copper)] transition-colors">ECHONOVA</span>
            <span className="text-[var(--color-copper)] text-[0.6rem] tracking-[0.4em] font-light uppercase group-hover:text-white transition-colors">STUDIO</span>
          </Link>

          {/* Desktop Nav - Right Side */}
          <nav className="hidden md:flex items-center gap-44">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="text-[var(--color-ivory)] hover:text-[var(--color-copper)] transition-colors text-base font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[var(--color-copper)] transition-all duration-300 group-hover:w-full" />
              </Link>
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
            className="fixed inset-0 z-40 bg-[var(--color-navy)]/95 backdrop-blur-xl pt-32 px-6 md:hidden flex flex-col items-center"
          >
            <nav className="flex flex-col items-center gap-10 w-full pointer-events-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="text-[var(--color-ivory)] text-3xl font-light tracking-wide w-full text-center py-4 border-b border-white/5"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
