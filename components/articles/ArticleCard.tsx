import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { ArticleData } from '@/lib/data/knowledge-content';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: ArticleData;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.slug}`}
      className={cn(
        "group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--color-copper)]/50 transition-all duration-500",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.arTitle}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B16] to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-[var(--color-navy)]/80 backdrop-blur-md border border-[var(--color-copper)]/30 px-3 py-1 rounded-full text-xs font-bold text-[var(--color-copper)] uppercase tracking-wider">
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-[var(--color-copper)]" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag size={12} className="text-[var(--color-copper)]" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight group-hover:text-[var(--color-copper)] transition-colors">
          {article.arTitle}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">
          {article.excerpt}
        </p>

        <div className="flex items-center text-[var(--color-copper)] font-bold text-sm mt-auto group/btn">
          <span className="ml-2">اقرأ المقال</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
