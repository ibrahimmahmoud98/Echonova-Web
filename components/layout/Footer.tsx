"use client";

import React from "react";
import Link from "next/link";

import { Twitter, Instagram, Youtube, Video } from "lucide-react";

// Custom TikTok Icon since it's not in standard Lucide import
const TikTok = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export function Footer() {
  return (
    <footer id="contact" className="relative pt-16 pb-8 overflow-hidden">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[var(--color-navy)]/60 backdrop-blur-xl border-t border-white/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold flex flex-col leading-tight mb-6">
              <span className="text-[var(--color-ivory)] tracking-wider">ECHONOVA</span>
              <span className="text-[var(--color-copper)] text-xs tracking-[0.2em] font-light">STUDIO</span>
            </Link>
            <p className="text-[var(--color-ivory)]/60 max-w-sm mb-6">
              نحن الـ NOVA التي تعيد تشكيل مشهد المحتوى المرئي عالمياً، عبر قيادة التحول من الإنتاج التقليدي إلى عصر الذكاء الاصطناعي السينمائي.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
                <a href="https://x.com/echonovastudio?s=21" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/10 hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)]/10 hover:text-[var(--color-copper)] transition-all duration-300 group" aria-label="X (Twitter)">
                    <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@echonovastudio?_r=1&_t=ZS-93w0dbFWjDN" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/10 hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)]/10 hover:text-[var(--color-copper)] transition-all duration-300 group" aria-label="TikTok">
                    <TikTok className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/echonova_studio?igsh=MXgzbDEyMXV5N282dw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/10 hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)]/10 hover:text-[var(--color-copper)] transition-all duration-300 group" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@echonova_studio?si=p_E0sOxiUh_CqDU8" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/10 hover:border-[var(--color-copper)] hover:bg-[var(--color-copper)]/10 hover:text-[var(--color-copper)] transition-all duration-300 group" aria-label="YouTube">
                    <Youtube className="w-5 h-5" />
                </a>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--color-ivory)] font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-[var(--color-ivory)]/60 text-sm">
              <li><Link href="/about" className="hover:text-[var(--color-copper)] transition-colors">من نحن</Link></li>
              <li><Link href="/services" className="hover:text-[var(--color-copper)] transition-colors">خدماتنا</Link></li>
              <li><Link href="/articles" className="hover:text-[var(--color-copper)] transition-colors">المقالات المتخصصة</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-copper)] transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>


        </div>

        <div className="border-t border-white/5 pt-8 text-center text-[var(--color-ivory)]/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Echonova Studio. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="hover:text-[var(--color-copper)]">Privacy Policy</Link>
                <Link href="#" className="hover:text-[var(--color-copper)]">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
