
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MAIN_ARTICLE } from '@/lib/data/knowledge-content';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: `${MAIN_ARTICLE.arTitle} | Echonova Knowledge Hub`,
  description: "اكتشف كيف يقود إيكونوڤا ستوديو ثورة الإنتاج السينمائي باستخدام الذكاء الاصطناعي. Explore how Echonova Studio is revolutionizing cinema with Generative AI.",
  keywords: ["إيكونوڤا ستوديو", "Echonova Studio", "إنتاج فيديو بالذكاء الاصطناعي", "AI Cinema", "Nova Saga", "مستقبل الإنتاج السينمائي"],
};

export default function ArticlesPage() {
  const article = MAIN_ARTICLE;

  // JSON-LD Schema for BlogPosting / Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "alternativeHeadline": article.arTitle,
    "image": [
      `https://echonova.studio${article.heroImage}`
    ],
    "datePublished": article.date,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": [{
        "@type": "Organization",
        "name": article.author,
        "url": "https://echonova.studio"
    }],
    "publisher": {
        "@type": "Organization",
        "name": "Echonova Studio",
        "logo": {
            "@type": "ImageObject",
            "url": "https://echonova.studio/logo.png"
        }
    },
    "description": article.excerpt,
    "articleBody": article.sections.map(s => `${s.heading}: ${s.content.replace(/<[^>]*>?/gm, '')}`).join(" ")
  };

  return (
    <main className="min-h-screen bg-[#020B16] text-[var(--color-ivory)] selection:bg-[var(--color-copper)] selection:text-white font-arabic">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MagneticCursor />
      {/* Navbar is typically global, but ensuring it's here if layout doesn't cover or for structure */}
      <div className="fixed top-0 w-full z-50">
           {/* Assuming Navbar is handled by layout, but if not we would import it. 
               Since we are in app/articles/page.tsx, layout.tsx wraps us. 
               We just need to ensure padding for fixed navbar. */}
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-[#020B16]/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-copper)]/10 border border-[var(--color-copper)]/30 text-[var(--color-copper)] text-sm mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--color-copper)] animate-pulse" />
                Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
                {article.arTitle}
            </h1>
            <h2 className="text-xl md:text-2xl text-white/60 font-light mb-8 dir-ltr font-sans tracking-wide">
                {article.title}
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-gray-400">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-[var(--color-copper)]" />
                    <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[var(--color-copper)]" />
                    <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                     <Clock size={16} className="text-[var(--color-copper)]" />
                    <span>{article.readTime}</span>
                </div>
            </div>
        </div>
      </section>

      {/* Content Body */}
      <section className="relative py-16 md:py-24 px-4 bg-[#020B16]">
        <div className="container mx-auto max-w-4xl">
            {/* Excerpt */}
            <div className="mb-16 text-xl md:text-2xl font-light leading-relaxed text-center text-white/90 border-b border-white/10 pb-12">
                "{article.excerpt}"
            </div>

            {/* Sections */}
            <div className="space-y-20">
                {article.sections.map((section, idx) => (
                    <article key={section.id} id={section.id} className="group">
                        <div className="flex flex-col gap-6">
                            <div className="border-r-2 border-[var(--color-copper)] pr-6 transition-all duration-500 group-hover:border-[var(--color-copper)]/100 border-[var(--color-copper)]/30">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {section.heading}
                                </h2>
                                {section.subheading && (
                                    <h3 className="text-lg md:text-xl text-[var(--color-copper)] font-sans tracking-wide">
                                        {section.subheading}
                                    </h3>
                                )}
                            </div>

                            <div 
                                className="prose prose-invert prose-lg max-w-none prose-a:text-[var(--color-copper)] prose-a:no-underline hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: section.content }} 
                            />

                            {section.image && (
                                <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mt-8 border border-white/10 shadow-2xl group-hover:shadow-[var(--color-copper)]/10 transition-shadow duration-500">
                                    <Image
                                        src={section.image}
                                        alt={section.imageAlt || section.heading}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        title={section.heading} 
                                    />
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold mb-6">هل تبحث عن تطبيق هذه التقنيات في مشروعك القادم؟</h3>
                <Link href="/contact">
                    <button className="group relative px-8 py-4 bg-[var(--color-copper)] text-white font-bold rounded-full overflow-hidden transition-all hover:bg-[#A05D3D] shadow-lg hover:shadow-[var(--color-copper)]/30">
                        <span className="relative z-10 flex items-center gap-2">
                            ابدأ رحلتك مع إيكونوڤا
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </span>
                    </button>
                </Link>
            </div>
        </div>
      </section>
    </main>
  );
}
