'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Mail, 
  BookOpen, 
  FileText, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Cpu,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import Typewriter from './Typewriter';
import GaltonBoard from './GaltonBoard';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="pt-16 pb-6 md:pt-20 md:pb-8 px-4 sm:px-6 border-b border-slate-200/70">
      <div className="max-w-5xl mx-auto">
        {/* Terminal Header Bar (Clean, no confusing slogans) */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3.5 pb-1.5 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="text-slate-400 ml-1">~/aamir-iqbal/portfolio (main)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-600 font-semibold flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE FOR ROLES
            </span>
          </div>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Personal Intro, Highlights & Filled Space (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Identity & Typewriter */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[10px] font-mono rounded mb-1.5">
                <Terminal size={11} />
                <span>stochastic_modelling.py</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-mono">
                <Typewriter text="MD AAMIR IQBAL" delay={85} />
              </h1>

              <p className="text-xs font-mono text-indigo-600 mt-1 font-semibold tracking-wide">
                DATA SCIENTIST & ML ENGINEER // 4+ YEARS EXPERIENCE
              </p>
            </div>

            {/* Tight Bio */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              Data Scientist/AI Engineer with 4+ years of experience building and deploying intelligent solutions across machine learning, generative AI, natural language processing, and data science. Experienced in solving complex business problems through applied AI, automation, predictive modeling, and document intelligence, with a strong focus on turning research and experimentation into practical, scalable systems.
            </p>

            {/* Academic Credential (M.Tech Data Science only) */}
            <div className="bg-slate-50 border border-slate-200/80 rounded p-2.5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-800">
                <GraduationCap size={13} className="text-indigo-600" />
                <span className="font-semibold">M.Tech in Data Science</span>
              </div>
              <span className="text-slate-500 text-[11px]">GITAM University // 2019 – 2021</span>
            </div>

            {/* PROMINENTLY HIGHLIGHTED ICONS & ACTION BUTTONS */}
            <div className="space-y-2 pt-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Quick Actions & Direct Connections
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Read Articles */}
                <a
                  href="#writing"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-medium rounded transition-colors shadow-xs"
                >
                  <BookOpen size={13} className="text-indigo-300" />
                  <span>Read Articles (7)</span>
                </a>

                {/* View Resume */}
                <a
                  href="#resume"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-mono font-medium rounded transition-colors shadow-xs"
                >
                  <FileText size={13} className="text-slate-600" />
                  <span>View Resume</span>
                </a>

                {/* HIGHLIGHTED GitHub Button */}
                <a
                  href="https://github.com/aamirai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-mono font-medium rounded transition-colors shadow-xs"
                  title="GitHub Profile"
                >
                  <Github size={13} className="text-slate-100" />
                  <span>GitHub</span>
                </a>

                {/* HIGHLIGHTED LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/amriqbal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-mono font-medium rounded transition-colors shadow-xs"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={13} className="text-white" />
                  <span>LinkedIn</span>
                </a>

                {/* HIGHLIGHTED Email Button */}
                <a
                  href="mailto:aamiriqbal@outlook.in"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-medium rounded transition-colors shadow-xs"
                  title="Send Direct Email"
                >
                  <Mail size={13} className="text-white" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* PURPOSEFUL UTILIZATION OF EMPTY SPACE: IMPACT METRICS & CORE ARSENAL */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              {/* Career Impact Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-slate-50 border border-slate-200/80 rounded p-2">
                  <div className="text-xs sm:text-sm font-bold text-slate-900">4+ Years</div>
                  <div className="text-[9px] text-slate-500 uppercase">ML & Data Science</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded p-2">
                  <div className="text-xs sm:text-sm font-bold text-indigo-600">&lt;5 Mins</div>
                  <div className="text-[9px] text-slate-500 uppercase">20 Doc Legal Batch</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded p-2">
                  <div className="text-xs sm:text-sm font-bold text-emerald-600">90% Auto</div>
                  <div className="text-[9px] text-slate-500 uppercase">Ticket Resolution</div>
                </div>
              </div>

              {/* Core Skill Chips (from resume) */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  <Cpu size={11} className="text-indigo-600" />
                  <span>Core Production Stack</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    'Claude API / OpenAI',
                    'LangGraph & LangChain',
                    'RAG & Pinecone',
                    'Document AI',
                    'FastAPI',
                    'PySpark & Databricks',
                    'XGBoost',
                    'PyTorch'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-mono rounded transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Professional Certifications */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[10px] font-mono text-slate-500">
                <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                  <Award size={12} className="text-amber-500" />
                  Certifications:
                </span>
                <span className="px-1.5 py-0.5 bg-amber-50 border border-amber-200/70 text-amber-800 rounded text-[9px]">
                  DeepLearning.AI MLOps
                </span>
                <span className="px-1.5 py-0.5 bg-sky-50 border border-sky-200/70 text-sky-800 rounded text-[9px]">
                  AWS GenAI Agents
                </span>
                <span className="px-1.5 py-0.5 bg-emerald-50 border border-emerald-200/70 text-emerald-800 rounded text-[9px]">
                  Google AI
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Micro-Card & Galton Board (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-end gap-2.5">
            {/* Compact Profile Micro-Card */}
            <div className="w-full max-w-[300px] bg-white border border-slate-200/90 rounded p-2 flex items-center gap-2.5 shadow-xs">
              <div className="relative w-11 h-11 shrink-0 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                {!imgError ? (
                  <Image
                    src="/profile.jpg"
                    alt="MD Aamir Iqbal"
                    fill
                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 text-indigo-700 font-mono">
                    <span className="text-sm font-bold">AI</span>
                    <span className="text-[8px] text-slate-400">μ ± σ</span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 font-mono">
                <div className="text-xs font-bold text-slate-900 truncate">MD AAMIR IQBAL</div>
                <div className="text-[10px] text-slate-500 truncate">Data Science & ML Engineer</div>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-0.5">
                  <span>Remote / India</span>
                  <span>•</span>
                  <a href="#contact" className="text-indigo-600 hover:underline">
                    Contact me →
                  </a>
                </div>
              </div>
            </div>

            {/* Dynamic Galton Board Quincunx */}
            <GaltonBoard />
          </div>
        </div>
      </div>
    </section>
  );
}
