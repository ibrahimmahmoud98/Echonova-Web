import React from 'react';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/data/knowledge-content';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'المكتبة المعرفية | Echonova Studio',
  description: 'اكتشف أحدث المقالات والتحليلات حول الذكاء الاصطناعي السينمائي ومستقبل الإنتاج المرئي.',
  keywords: ["مقالات ذكاء اصطناعي", "Cinema AI", "Echonova Blog", "Tech Insights"],
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#020B16] text-[var(--color-ivory)] selection:bg-[var(--color-copper)] selection:text-white font-arabic">
      <MagneticCursor />
      
      {/* Header */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
         <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[var(--color-copper)]/10 to-transparent pointer-events-none" />
         <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                المكتبة المعرفية
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                رؤى متعمقة في تقنيات المستقبل، من هندسة المطالبات إلى الإنتاج السينمائي المؤتمت.
            </p>
         </div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-4">
        <div className="container mx-auto">
            {articles.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <ScrollReveal key={article.id} delay={index * 0.1}>
                            <ArticleCard article={article} />
                        </ScrollReveal>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400">جاري إضافة المقالات قريباً...</p>
                </div>
            )}
        </div>
      </section>
    </main>
  );
}
