'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer 
} from 'recharts';

const skillData = [
  { subject: 'NLP / LLMs', A: 98, fullMark: 100 },
  { subject: 'Statistics', A: 92, fullMark: 100 },
  { subject: 'MLOps', A: 85, fullMark: 100 },
  { subject: 'Computer Vision', A: 80, fullMark: 100 },
  { subject: 'Data Engineering', A: 88, fullMark: 100 },
  { subject: 'Deep Learning', A: 95, fullMark: 100 },
];

const technicalSkills = [
  { category: 'Core AI', items: ['Generative AI', 'RAG', 'Transformers', 'BERT', 'GPT-4'] },
  { category: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'LangGraph'] },
  { category: 'Data & Cloud', items: ['Python', 'PySpark', 'Databricks', 'Pinecone', 'MySQL'] },
  { category: 'MLOps', items: ['MLflow', 'Docker', 'Azure ML Studio', 'FastAPI', 'Git'] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Expertise</h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              My approach combines deep statistical knowledge with modern engineering practices. 
              I don&apos;t just build models; I build scalable data products that solve real-world problems.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {technicalSkills.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] w-full bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-center justify-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
