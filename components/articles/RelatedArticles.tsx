import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ArticleData } from '@/lib/data/knowledge-content';

interface RelatedArticlesProps {
  articles: ArticleData[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            مقالات ذات صلة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
               <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
