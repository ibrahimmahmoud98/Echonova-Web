import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/data/knowledge-content';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { ArticleSidebar } from '@/components/articles/ArticleSidebar';
import { RelatedArticles } from '@/components/articles/RelatedArticles';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.arTitle} | Echonova Articles`,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.arTitle,
      description: article.excerpt,
      images: [article.heroImage],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.category, article.slug);
  const recentArticles = getAllArticles().filter(a => a.id !== article.id).slice(0, 3); // Simple recent logic for sidebar

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "alternativeHeadline": article.arTitle,
    "image": [`https://www.echonovastudio.com${article.heroImage}`],
    "datePublished": article.date,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": [{
        "@type": "Organization",
        "name": article.author,
        "url": "https://www.echonovastudio.com"
    }],
    "publisher": {
        "@type": "Organization",
        "name": "Echonova Studio",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.echonovastudio.com/logo.png"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] via-[#020B16]/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-copper)]/10 border border-[var(--color-copper)]/30 text-[var(--color-copper)] text-sm mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[var(--color-copper)] animate-pulse" />
                {article.category}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
                {article.arTitle}
            </h1>
            
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

      {/* Main Content Area with Sidebar */}
      <section className="relative py-16 md:py-24 px-4 bg-[#020B16]">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Article Content (8 Columns) */}
                <div className="lg:col-span-8">
                     {/* Excerpt */}
                    <div className="mb-12 text-xl font-light leading-relaxed text-white/90 border-l-4 border-[var(--color-copper)] pl-6 py-2">
                        "{article.excerpt}"
                    </div>

                    <div className="space-y-16">
                        {article.sections.map((section) => (
                            <article key={section.id} id={section.id} className="group">
                                <div className="flex flex-col gap-6">
                                    <div className="border-b border-white/10 pb-4 mb-4">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                            {section.heading}
                                        </h2>
                                        {section.subheading && (
                                            <h3 className="text-lg text-[var(--color-copper)] font-sans tracking-wide">
                                                {section.subheading}
                                            </h3>
                                        )}
                                    </div>

                                    <div 
                                        className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-a:text-[var(--color-copper)] prose-a:no-underline hover:prose-a:underline"
                                        dangerouslySetInnerHTML={{ __html: section.content }} 
                                    />

                                    {section.image && (
                                        <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden mt-6 border border-white/10">
                                            <Image
                                                src={section.image}
                                                alt={section.imageAlt || section.heading}
                                                fill
                                                className="object-cover"
                                                title={section.heading} 
                                            />
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-12 flex flex-wrap gap-2">
                         {article.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                                #{tag}
                             </span>
                         ))}
                    </div>
                </div>

                {/* Sidebar (4 Columns) */}
                <div className="lg:col-span-4 pl-0 lg:pl-8">
                    <div className="sticky top-32">
                        <ArticleSidebar recentArticles={recentArticles} />
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />
      
      {/* Bottom CTA */}
      <div className="py-20 border-t border-white/10 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#020B16] to-[var(--color-navy)]">
            <h3 className="text-2xl font-bold mb-8 text-white">ألهمك هذا المقال؟ لنصنع المستحيل معاً.</h3>
            <Link href="/contact">
                <button className="group relative px-10 py-5 bg-[var(--color-copper)] text-white font-bold rounded-full overflow-hidden transition-all hover:bg-[#A05D3D] shadow-2xl hover:shadow-[var(--color-copper)]/30">
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                        ابدأ مشروعك الآن
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </span>
                </button>
            </Link>
      </div>

    </main>
  );
}
