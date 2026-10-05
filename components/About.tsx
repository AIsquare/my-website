'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Brain, Database, LineChart, ShieldCheck, Cpu, Network } from 'lucide-react';

const stats = [
  { label: 'Experience', value: '3.5y+' },
  { label: 'LLM Agents', value: '10+' },
  { label: 'Accuracy Lift', value: '50%' },
  { label: 'Latency Red.', value: '75%' },
];

const values = [
  {
    icon: <Cpu className="text-indigo-600" size={24} />,
    title: 'Generative AI & LLMs',
    description: 'Specializing in RAG, Agentic Workflows (LangGraph), and fine-tuning models like Sonnet 4.5 and GPT-4.'
  },
  {
    icon: <Network className="text-emerald-600" size={24} />,
    title: 'NLP Architectures',
    description: 'Deep expertise in Transformers, BERT, and building Text-to-SQL pipelines with multi-dialect support.'
  },
  {
    icon: <Database className="text-amber-600" size={24} />,
    title: 'MLOps & Scaling',
    description: 'Designing Stage 1 pipelines using MLflow, Databricks, and Pinecone for efficient vector retrieval.'
  },
  {
    icon: <LineChart className="text-rose-600" size={24} />,
    title: 'Statistical Modeling',
    description: 'Propensity modeling and demand analysis with high statistical significance (95%+).'
  }
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-white/50 backdrop-blur-sm border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-6 rounded">
              System_Profile
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-mono tracking-tight">
              Bridging the gap between <span className="italic font-serif">Stochastic</span> models and <span className="text-indigo-600">Deterministic</span> business value.
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed font-serif text-lg italic">
              &ldquo;Data is the raw material; statistics is the refinery.&rdquo;
            </p>
            <p className="text-slate-600 mb-12 leading-relaxed">
              I am a Data Scientist with over 3 years of experience specializing in Machine Learning, Deep Learning, and NLP. 
              Currently an ML Engineer at <span className="font-bold text-slate-900">Algoleap Technologies</span>, 
              I focus on engineering high-efficiency LLM pipelines that replace hours of manual labor with minutes of automated intelligence.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-indigo-100 pl-4">
                  <p className="text-3xl font-bold text-slate-900 mb-1 font-mono">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-none bg-white border border-slate-200 hover:border-indigo-500 transition-all group"
              >
                <div className="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-widest font-mono">{value.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
