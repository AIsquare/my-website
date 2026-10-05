'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Writing from '@/components/Writing';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import MathBackground from '@/components/MathBackground';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
      <MathBackground />
      <Navbar />
      <Hero />
      <Writing />
      <Resume />
      <Contact />

      {/* Developer Minimal Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 font-mono text-[11px] border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>MD AAMIR IQBAL // STATISTICAL DATA SCIENCE</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a
              href="https://github.com/aamirai/square"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              Old Repo (square) ↗
            </a>
            <span>•</span>
            <a
              href="https://github.com/aamirai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              GitHub ↗
            </a>
            <span>•</span>
            <a
              href="https://linkedin.com/in/amriqbal/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
