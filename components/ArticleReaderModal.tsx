'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  FileText, 
  BookOpen, 
  Clock, 
  Share2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  FileCode2, 
  Terminal, 
  FileSpreadsheet,
  Maximize2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Article } from '@/lib/articlesData';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}#${article.id}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintOrDownload = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const isPdf = article.format === 'pdf';
  const isNotebook = article.format === 'ipynb';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-slate-300 shadow-2xl flex flex-col rounded-lg overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-100 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-slate-200">{article.id}.{article.format}</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline text-[11px]">{article.category}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                title="Copy share link"
                className="px-2 py-1 text-slate-300 hover:text-white rounded transition-colors text-xs flex items-center gap-1 font-mono"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={handlePrintOrDownload}
                title={isPdf ? "Download / Save PDF" : "Print Article"}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors text-xs flex items-center gap-1 font-mono font-medium shadow-xs"
              >
                <Download size={13} />
                <span className="text-[11px]">{isPdf ? 'Download PDF' : 'Save PDF'}</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close"
                className="p-1 text-slate-400 hover:text-white rounded transition-colors ml-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Sub Header / Format Banner */}
          <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-800 font-bold rounded text-[10px] uppercase">
                {article.format.toUpperCase()} Document
              </span>
              <span>{article.date}</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock size={12} />
                {article.readTime}
              </span>
            </div>

            {/* If PDF, show PDF viewer pagination bar */}
            {isPdf && article.pdfPages && (
              <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  className="disabled:opacity-30 hover:text-indigo-600"
                >
                  <ChevronLeft size={14} />
                </button>
                <span>Page {currentPage + 1} of {article.pdfPages.length}</span>
                <button
                  disabled={currentPage === article.pdfPages.length - 1}
                  onClick={() => setCurrentPage((p) => Math.min(article.pdfPages!.length - 1, p + 1))}
                  className="disabled:opacity-30 hover:text-indigo-600"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="overflow-y-auto px-4 sm:px-8 py-6 space-y-6 text-slate-800 flex-1">
            {/* 1. PDF Document Viewer Mode */}
            {isPdf && article.pdfPages ? (
              <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 border border-slate-300 rounded shadow-md font-serif text-slate-900 leading-relaxed text-sm min-h-[520px]">
                <div className="border-b-2 border-slate-900 pb-3 mb-6 flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-slate-900">RESEARCH PUBLICATION // PDF</span>
                  <span className="text-slate-500">PAGE {currentPage + 1} / {article.pdfPages.length}</span>
                </div>

                <div className="whitespace-pre-line text-slate-800 space-y-4 font-sans text-xs sm:text-sm">
                  {article.pdfPages[currentPage]}
                </div>

                <div className="mt-12 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>MD AAMIR IQBAL // AI & ML ENGINEER</span>
                  <span>CONFIDENTIAL RESEARCH</span>
                </div>
              </div>
            ) : isNotebook && article.notebookCells ? (
              /* 2. Interactive Jupyter Notebook Viewer Mode */
              <div className="space-y-4">
                <div className="bg-amber-50/70 border border-amber-200/80 rounded px-3 py-2 text-xs font-mono text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 size={14} className="text-amber-700" />
                    <span className="font-bold">Interactive Jupyter Notebook</span>
                    <span className="text-slate-400">Python 3.10 (ipykernel)</span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-semibold">{article.notebookCells.length} Cells Total</span>
                </div>

                {article.notebookCells.map((cell, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
                    {cell.type === 'markdown' ? (
                      <div className="p-4 bg-white prose prose-slate max-w-none prose-headings:font-mono prose-headings:text-slate-900 prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-p:text-xs prose-p:leading-relaxed prose-code:font-mono prose-code:text-indigo-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                        <ReactMarkdown>{cell.source}</ReactMarkdown>
                      </div>
                    ) : (
                      <div>
                        {/* Code Cell Input */}
                        <div className="bg-slate-900 text-slate-100 p-3 font-mono text-xs flex gap-3">
                          <span className="text-indigo-400 font-bold select-none text-[11px] pt-0.5">
                            In [{cell.executionCount || idx + 1}]:
                          </span>
                          <pre className="overflow-x-auto text-emerald-300 flex-1 leading-relaxed text-[11px]">
                            <code>{cell.source}</code>
                          </pre>
                        </div>

                        {/* Code Cell Output */}
                        {cell.output && (
                          <div className="bg-slate-50 border-t border-slate-200 p-3 font-mono text-xs flex gap-3 text-slate-800">
                            <span className="text-slate-400 select-none text-[11px]">Out:</span>
                            <pre className="overflow-x-auto text-slate-700 flex-1 text-[11px] leading-relaxed whitespace-pre-wrap">
                              {cell.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* 3. Standard Markdown Technical Article Mode */
              <div className="prose prose-slate max-w-none prose-headings:font-mono prose-headings:text-slate-900 prose-h1:text-xl prose-h2:text-base prose-h3:text-sm prose-p:text-xs prose-p:leading-relaxed prose-code:font-mono prose-code:text-indigo-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-900 prose-pre:text-emerald-300 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:px-3 prose-blockquote:text-xs">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 text-[11px]">
              Author: <strong className="text-slate-900">Md Aamir Iqbal</strong>
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrintOrDownload}
                className="px-3 py-1 bg-slate-900 hover:bg-indigo-700 text-white rounded text-[11px] transition-colors flex items-center gap-1"
              >
                <Download size={12} />
                <span>{isPdf ? 'Download PDF' : 'Save as PDF'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 border border-slate-300 hover:bg-slate-100 rounded text-slate-700 text-[11px] transition-colors"
              >
                Close Reader
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
