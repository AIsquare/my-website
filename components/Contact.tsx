'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check, Send, Terminal } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'aamiriqbal@outlook.in';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-8 md:py-10 px-4 sm:px-6 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Section Header */}
        <div className="pb-2.5 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 font-semibold mb-0.5">
            <span className="text-slate-400 font-normal">{'//'} 03.</span>
            <span>CONTACT_ME</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Available for Applied Machine Learning, MLOps, LLM Systems & Research Engineering discussions.
          </p>
        </div>

        {/* Compact Contact Terminal Card */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-3.5 sm:p-4 shadow-xs font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px]">PRIMARY_EMAIL</span>
              <a
                href={`mailto:${email}`}
                className="text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
              >
                {email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors text-[11px]"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
              </button>

              <a
                href={`mailto:${email}?subject=Machine%20Learning%20Collaboration`}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-indigo-700 text-white rounded transition-colors text-[11px]"
              >
                <Send size={12} />
                <span>Send Mail</span>
              </a>
            </div>
          </div>

          {/* Social Network Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
            <a
              href="https://linkedin.com/in/amriqbal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 rounded transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-indigo-600" />
                <span className="text-slate-700 font-semibold group-hover:text-indigo-600">LinkedIn</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">/in/amriqbal ↗</span>
            </a>

            <a
              href="https://github.com/aamirai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/70 rounded transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Github size={14} className="text-slate-800" />
                <span className="text-slate-700 font-semibold group-hover:text-indigo-600">GitHub</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">@aamirai ↗</span>
            </a>

            <div className="p-2.5 bg-slate-50 border border-slate-200/70 rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-500" />
                <span className="text-slate-700 font-semibold">Location</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Remote / India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
