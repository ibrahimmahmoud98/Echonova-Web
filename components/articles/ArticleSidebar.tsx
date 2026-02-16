import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { ArticleData } from '@/lib/data/knowledge-content';

interface ArticleSidebarProps {
  recentArticles: ArticleData[];
}

export function ArticleSidebar({ recentArticles }: ArticleSidebarProps) {
  return (
    <aside className="space-y-12">
      {/* Share Section */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
          <Share2 className="w-5 h-5 text-[var(--color-copper)]" />
          مشاركة المقال
        </h3>
        <div className="flex gap-4">
            {/* Placeholder Share Links */}
             <button className="p-3 bg-white/5 rounded-full hover:bg-[var(--color-copper)] hover:text-white transition-colors text-gray-400">
                <Twitter size={20} />
             </button>
             <button className="p-3 bg-white/5 rounded-full hover:bg-[var(--color-copper)] hover:text-white transition-colors text-gray-400">
                <Facebook size={20} />
             </button>
             <button className="p-3 bg-white/5 rounded-full hover:bg-[var(--color-copper)] hover:text-white transition-colors text-gray-400">
                <Linkedin size={20} />
             </button>
             <button className="p-3 bg-white/5 rounded-full hover:bg-[var(--color-copper)] hover:text-white transition-colors text-gray-400">
                <LinkIcon size={20} />
             </button>
        </div>
      </div>

      {/* Recent Articles */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 border-r-4 border-[var(--color-copper)] pr-4">
          أحدث المقالات
        </h3>
        <div className="space-y-6">
          {recentArticles.length > 0 ? (
            recentArticles.map(article => (
              <Link 
                key={article.id} 
                href={`/articles/${article.slug}`}
                className="group block"
              >
                <h4 className="text-white font-medium mb-2 group-hover:text-[var(--color-copper)] transition-colors line-clamp-2">
                  {article.arTitle}
                </h4>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{article.date}</span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">لا توجد مقالات أخرى حالياً.</p>
          )}
        </div>
      </div>

       {/* Newsletter or CTA (Optional Placeholder) */}
       <div className="p-8 bg-gradient-to-br from-[var(--color-copper)]/20 to-transparent border border-[var(--color-copper)]/30 rounded-2xl text-center">
            <h4 className="text-white font-bold mb-2">اشترك في النشرة البريدية</h4>
            <p className="text-sm text-white/70 mb-4">احصل على أحدث تحليلات الذكاء الاصطناعي السينمائي.</p>
            <button className="w-full py-2 bg-[var(--color-copper)] text-white font-bold rounded-lg hover:bg-[#A05D3D] transition-colors text-sm">
                قريباً
            </button>
       </div>
    </aside>
  );
}
