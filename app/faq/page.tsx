
import React from 'react';
import { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticCursor } from '@/components/ui/MagneticCursor';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | إيكونوڤا',
  description: 'إجابات على كل ما يخص خدمات إيكونوڤا، من الإنتاج السينمائي إلى الهوية الرقمية والذكاء الاصطناعي.',
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#020B16] text-[var(--color-ivory)] selection:bg-[var(--color-copper)] selection:text-white font-arabic">
      <FAQSchema />
      <MagneticCursor />
      
      <div className="pt-32 pb-16 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">الأسئلة الشائعة</h1>
        <p className="text-xl text-[var(--color-ivory)]/60 max-w-2xl mx-auto">
          كل ما تحتاج معرفته عن رحلتك مع إيكونوڤا.
        </p>
      </div>

      <FAQSection />

    </main>
  );
}
