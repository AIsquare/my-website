'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Terminal, Github, Linkedin, Mail } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { num: '01', name: 'Articles & Notebooks', href: '#writing' },
    { num: '02', name: 'Resume', href: '#resume' },
    { num: '03', name: 'Contact Me', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-1.5'
          : 'bg-white/70 backdrop-blur-xs border-b border-slate-200/40 py-2'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 text-slate-900 hover:text-indigo-600 transition-colors font-mono text-xs font-bold tracking-tight"
        >
          <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-[10px]">
            λ
          </div>
          <span>~/aamir-iqbal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-slate-400 text-[10px]">{link.num}.</span>
              <span>{link.name}</span>
            </a>
          ))}

          <div className="h-3 w-px bg-slate-200 mx-1" />

          {/* Social icons */}
          <div className="flex items-center gap-2 text-slate-500">
            <a
              href="https://github.com/aamirai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-slate-900 transition-colors"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com/in/amriqbal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:text-indigo-600 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
          </div>

          <a
            href="#contact"
            className="px-3 py-1 bg-slate-900 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold transition-colors"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-1.5 text-slate-700 hover:text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 font-mono text-xs"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1.5 text-slate-700 hover:text-indigo-600"
              >
                <span className="text-slate-400 mr-2">{link.num}.</span>
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-500">
                <a href="https://github.com/aamirai" target="_blank" rel="noopener noreferrer">
                  <Github size={16} />
                </a>
                <a href="https://linkedin.com/in/amriqbal/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={16} />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1 bg-slate-900 text-white rounded text-xs"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
