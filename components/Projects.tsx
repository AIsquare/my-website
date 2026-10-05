'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, Github, Terminal } from 'lucide-react';

const projects = [
  {
    title: 'LLM-based Automation System',
    company: 'Algoleap Technologies',
    description: 'Converted U.S. case law PDFs from 500+ courts into business-compliant XML using Sonnet 4.5. Reduced a 3-hour manual process to <5 minutes.',
    tags: ['Sonnet 4.5', 'Python', 'PDF-to-XML', 'Automation'],
    image: 'https://picsum.photos/seed/legal/800/600',
    links: { github: '#', demo: '#' }
  },
  {
    title: 'LLM Text-to-SQL Pipeline',
    company: 'Pratham Software',
    description: 'Led development using LangChain and ChatGPT to automate query generation across multi-dialect SQL engines. Optimized latency by 75%.',
    tags: ['LangChain', 'ChatGPT', 'SQL', 'Pinecone'],
    image: 'https://picsum.photos/seed/sql/800/600',
    links: { github: '#', demo: '#' }
  },
  {
    title: 'AI Ticket Automation',
    company: 'Pratham Software',
    description: 'Built an AI-driven ticketing system for logistics using LangGraph and Azure OpenAI. Achieved 90% auto-resolution rate.',
    tags: ['LangGraph', 'Azure OpenAI', 'FastAPI', 'Pinecone'],
    image: 'https://picsum.photos/seed/logistics/800/600',
    links: { github: '#', demo: '#' }
  },
  {
    title: 'O2O Propensity Model',
    company: 'Landmark Group',
    description: 'Developed a model achieving 50% improvement over traditional methods, targeting 90% of customers in top 3 deciles across 6 countries.',
    tags: ['XGBoost', 'Python', 'Databricks', 'MLflow'],
    image: 'https://picsum.photos/seed/retail/800/600',
    links: { github: '#', demo: '#' }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs mb-4">
              <Terminal size={14} />
              <span>ls ./projects/featured</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 font-mono">Engineering Impact</h2>
            <p className="text-slate-600 font-serif italic text-lg">
              A selection of high-impact machine learning systems deployed in production environments.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-80 w-full overflow-hidden border border-slate-200 grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={project.links.github} className="p-3 bg-white text-slate-900 hover:bg-indigo-600 hover:text-white transition-all">
                    <Github size={20} />
                  </a>
                  <a href={project.links.demo} className="p-3 bg-white text-slate-900 hover:bg-indigo-600 hover:text-white transition-all">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <div className="pt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest font-mono">
                    {project.company}
                  </span>
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-slate-400 border border-slate-200 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-mono group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-serif italic">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
