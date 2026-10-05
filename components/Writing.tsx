'use client';

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  FileSpreadsheet, 
  ArrowRight,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { ARTICLES_DATA, Article } from '@/lib/articlesData';

type FormatFilter = 'all' | 'pdf' | 'docx' | 'md';

export default function Writing() {
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((item) => {
      const matchesFormat = selectedFormat === 'all' || item.format === selectedFormat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFormat && matchesSearch;
    });
  }, [selectedFormat, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: ARTICLES_DATA.length,
      pdf: ARTICLES_DATA.filter((a) => a.format === 'pdf').length,
      docx: ARTICLES_DATA.filter((a) => a.format === 'docx').length,
      md: ARTICLES_DATA.filter((a) => a.format === 'md').length,
    };
  }, []);

  const getFormatBadge = (format: Article['format']) => {
    switch (format) {
      case 'pdf':
        return {
          icon: <FileText size={13} className="text-rose-600" />,
          style: 'bg-rose-50 text-rose-800 border-rose-200/90 font-bold',
          label: 'Paper .pdf'
        };
      case 'docx':
        return {
          icon: <FileSpreadsheet size={13} className="text-sky-600" />,
          style: 'bg-sky-50 text-sky-800 border-sky-200/90 font-bold',
          label: 'Spec .docx'
        };
      case 'md':
        return {
          icon: <BookOpen size={13} className="text-emerald-600" />,
          style: 'bg-emerald-50 text-emerald-800 border-emerald-200/90 font-bold',
          label: 'Article .md'
        };
    }
  };

  return (
    <section id="writing" className="py-8 md:py-10 px-4 sm:px-6 border-b border-slate-200/70 bg-white">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Section Header (Clean, professional, not confusing) */}
        <div className="pb-2.5 border-b border-slate-200/80">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 font-semibold mb-0.5">
            <span className="text-slate-400 font-normal">{'//'} 01.</span>
            <span>PUBLICATIONS & ARTICLES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
            Articles & Technical Writings
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Research articles, technical whitepapers, and production architecture specifications.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs font-mono">
          {/* Format Tabs with Distinct Color Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
                selectedFormat === 'all'
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedFormat === 'pdf'
                  ? 'bg-rose-600 text-white font-semibold shadow-xs'
                  : 'bg-rose-50 text-rose-800 border border-rose-200/60 hover:bg-rose-100'
              }`}
            >
              <FileText size={12} />
              <span>PDF Papers ({counts.pdf})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('docx')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedFormat === 'docx'
                  ? 'bg-sky-600 text-white font-semibold shadow-xs'
                  : 'bg-sky-50 text-sky-800 border border-sky-200/60 hover:bg-sky-100'
              }`}
            >
              <FileSpreadsheet size={12} />
              <span>Specs ({counts.docx})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('md')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                selectedFormat === 'md'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100'
              }`}
            >
              <BookOpen size={12} />
              <span>Articles ({counts.md})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[210px]">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tag..."
              className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Compact Articles List */}
        <div className="divide-y divide-slate-100 border border-slate-200/90 rounded-lg overflow-hidden bg-white shadow-xs">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => {
              const badge = getFormatBadge(article.format);
              return (
                <div
                  key={article.id}
                  className="p-3 sm:p-3.5 hover:bg-slate-50/70 transition-colors group flex flex-col md:flex-row md:items-start justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Top metadata line */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 border rounded ${badge.style}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>

                      <span className="text-slate-400">{article.date}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-medium">{article.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold font-mono text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug flex items-center gap-1.5">
                      <Link
                        href={`/articles/${article.id}`}
                        className="hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
                      >
                        <span>{article.title}</span>
                      </Link>
                      <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 shrink-0" />
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-sans">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {article.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[9px] font-mono rounded transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-1.5 pt-1 md:pt-0 shrink-0 font-mono text-xs">
                    <Link
                      href={`/articles/${article.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors shadow-xs"
                    >
                      <Eye size={12} className="text-indigo-300" />
                      <span>Read Article</span>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center font-mono text-xs text-slate-400">
              No articles found matching &ldquo;{searchQuery}&rdquo;. Try another search query.
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
