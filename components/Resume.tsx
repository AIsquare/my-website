'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  MapPin, 
  Download, 
  Check, 
  Copy, 
  Phone, 
  Mail, 
  Linkedin, 
  Award,
  ExternalLink
} from 'lucide-react';

const experience = [
  {
    company: 'ALGOLEAP TECHNOLOGIES',
    client: 'Thomson Reuters (AI Engineer)',
    role: 'ML Engineer',
    period: 'MAY 2025 – PRESENT',
    location: 'Remote',
    highlights: [
      'Engineered a production-scale document intelligence pipeline for converting complex U.S. legal PDFs into structured XML/JAXML outputs using Claude Sonnet-based LLM workflows, achieving zero content loss and reducing processing time from 3 hours to under 5 minutes for 20-document batches.',
      'Developed a document intelligence pipeline for extracting and mapping footnotes to in-text references from complex PDF documents using GPT-5.2, Python, and LLM-based extraction workflows.',
      'Developed an AI-powered document transformation pipeline that processes tracked changes in Word documents, applies rule and LLM-driven content modifications.'
    ],
    tech: ['Claude Sonnet', 'GPT-5.2', 'XML / JAXML', 'Document AI', 'Python', 'FastAPI']
  },
  {
    company: 'PRATHAM SOFTWARE',
    role: 'Sr Data Scientist',
    period: 'JUL 2024 – APR 2025',
    location: 'Remote',
    highlights: [
      'AI Ticket Automation for Logistics: Architected an AI-driven ticketing workflow using LangGraph, FastAPI, and Azure OpenAI to automate complex task categorization, summarization, and resolution. Engineered Retrieval-Augmented Generation (RAG) pipelines with Pinecone for vector search, structuring the agent routing, tool-calling, and fallback handling to successfully auto-resolve 90% of tickets and reduce manual operational effort by 80%.',
      'LLM Text-to-SQL Pipeline: Led development using LangChain and OpenAI to translate natural language into complex SQL for multi-dialect engines. Designed semantic layers and integrated Pinecone for accurate schema retrieval, optimizing query latency by 75%.',
      'AI Agent for NDA Conflict Resolution: Developed an agent with GPT-4 and Azure ML Studio to analyze NDAs and flag conflicts; integrated with Microsoft Teams for seamless contract review within enterprise workflows.'
    ],
    tech: ['LangGraph', 'LangChain', 'Azure OpenAI', 'Pinecone', 'FastAPI', 'Text-to-SQL']
  },
  {
    company: 'LANDMARK GROUP',
    role: 'Trainee Data Scientist',
    period: 'DEC 2022 – MAR 2024',
    location: 'Dubai / Bangalore',
    highlights: [
      'Analyzed business requirements and provided data-driven solutions for stakeholders across various MARKETPLACE.',
      'O2O Propensity Model (GCC Region): Developed a model achieving a 50% improvement over traditional methods, effectively targeting 90% of customers in the top 3 deciles, with an event rate of 1.5% or less across 6 countries.',
      'Acquisition Model (Homecentre UAE): Targeted the top 5% of customers, achieving 80% coverage and a lift of over 2 in top deciles.',
      'MLOps Pipeline (Centrepoint UAE): Designed and deployed a Stage 1 pipeline to generate customer propensity scores, enabling efficient forecasting for targeted campaigns.'
    ],
    tech: ['Python', 'XGBoost', 'Databricks', 'PySpark', 'MLflow']
  },
  {
    company: 'EUNIMART PVT LTD',
    role: 'Machine Learning Engineer',
    period: 'NOV 2021 – SEP 2022',
    location: 'Hyderabad',
    highlights: [
      'AI Service for SEO: Built a service for keyword and volume prediction to optimize omnichannel e-commerce platforms.',
      'Personalized Onboarding Journey: Developed a user onboarding system with 95% statistical significance, improving user flow and reducing friction points.',
      'Image Blur Removal: Enhanced and deployed an image deblurring solution for e-commerce platforms, reducing model size by 40%.'
    ],
    tech: ['Python', 'BERT', 'Statsmodels', 'Autoencoders', 'XGBoost', 'PyTorch', 'LSTM']
  },
  {
    company: 'iNEURON INTELLIGENCE',
    role: 'Computer Vision Intern',
    period: 'MAY 2021 – AUG 2021',
    location: 'Bangalore',
    highlights: [
      'Developed a Computer Vision solution for visually impaired individuals, employing Multimodal learning (CV+NLP) for "Visual Question Answering."',
      'Implemented the Hierarchical Co-attention paper, enhancing the model capabilities and contributing to advancements in attention mechanisms.'
    ],
    tech: ['Python', 'TensorFlow', 'Flask', 'CV+NLP', 'Data Labelling']
  },
  {
    company: 'EXPOSYS DATA LABS',
    role: 'Data Science Intern',
    period: 'JUL 2020 – AUG 2020',
    location: 'Remote',
    highlights: [
      'Implemented clustering algorithms on mall data to identify customer segments, optimizing targeted marketing strategies.'
    ],
    tech: ['K-Means Clustering', 'Python', 'Scikit-Learn']
  },
  {
    company: 'THE SMARTBRIDGE',
    role: 'Summer Intern',
    period: 'APR 2020 – MAY 2020',
    location: 'Remote',
    highlights: [
      'Implemented a Random Forest model for "Quality Prediction in the Mining Process."',
      'Applied machine learning techniques to analyze and predict the quality of mining outputs, contributing to process optimization.'
    ],
    tech: ['Random Forest', 'Statistical Modeling', 'Python']
  }
];

const education = [
  {
    school: 'GITAM UNIVERSITY',
    degree: 'M.TECH IN DATA SCIENCE',
    period: 'JUN 2019 – MAY 2021'
  }
];

const certifications = [
  {
    name: 'Machine Learning Engineering for Production (MLOps)',
    issuer: 'DeepLearning.AI (Coursera)',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CSKS2HAH62XJ'
  },
  {
    name: 'AWS Generative AI and AI Agents with Amazon Bedrock',
    issuer: 'Coursera',
    link: 'https://coursera.org/share/95847239c536be61931a694521aa9914'
  },
  {
    name: 'Google AI',
    issuer: 'Coursera',
    link: 'https://www.coursera.org/account/accomplishments/professional-cert/O12C9CRTWI3U'
  },
  {
    name: 'AWS - Practical Data Science Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/98NT7ZYTWHRL'
  }
];

const skills = [
  'Machine Learning', 'Generative AI', 'RAG', 'Document AI', 'Pinecone',
  'LangChain', 'LangGraph', 'LangSmith', 'FastAPI', 'Flask',
  'Claude API', 'OpenAI API', 'AWS', 'Python', 'Statistics',
  'Databases (MySQL)', 'PySpark', 'Databricks'
];

export default function Resume() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleDownloadPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aamiriqbal@outlook.in');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="resume" className="py-8 md:py-10 px-4 sm:px-6 border-b border-slate-200/70 bg-slate-50/50 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 font-semibold mb-0.5">
              <span className="text-slate-400 font-normal">{'//'} 02.</span>
              <span>CURRICULUM_VITAE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tracking-tight">
              Curriculum Vitae & Experience
            </h2>
          </div>

          {/* Quick CV actions - UPDATED: "Download PDF" instead of "Print" */}
          <div className="flex items-center gap-2 font-mono text-xs print:hidden">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition-colors text-xs shadow-xs"
              title="Download or Save Resume PDF"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors text-xs shadow-xs"
            >
              {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* Bio & Contact Dossier */}
        <div className="bg-white border border-slate-200/90 rounded p-3.5 shadow-xs font-mono text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div>
              <span className="text-sm font-bold text-slate-900">MD AAMIR IQBAL</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-indigo-600 font-semibold">Data Scientist & ML Engineer</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 text-[11px]">
              <span className="flex items-center gap-1 text-slate-900 font-semibold">
                <Phone size={11} className="text-indigo-600" />
                +91 94922 96109
              </span>
              <a href="mailto:aamiriqbal@outlook.in" className="hover:text-indigo-600 flex items-center gap-1">
                <Mail size={11} className="text-indigo-600" />
                aamiriqbal@outlook.in
              </a>
              <a href="https://www.linkedin.com/in/amriqbal/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-1">
                <Linkedin size={11} className="text-[#0077b5]" />
                LinkedIn ↗
              </a>
            </div>
          </div>
          <p className="font-sans text-xs text-slate-600 leading-relaxed">
            Data Scientist with effective over 4+ years of past experience specializing in Machine Learning, Deep Learning, and Natural Language Processing. 
            Proficient in developing and deploying advanced analytical models to drive business insights and optimize processes.
          </p>
        </div>

        {/* Core Skills Ribbon */}
        <div className="bg-white border border-slate-200/90 rounded p-3 shadow-xs space-y-1.5 font-mono">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-800 border-b border-slate-100 pb-1">
            <Code2 size={13} className="text-indigo-600" />
            <span>Technical Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 bg-slate-100 border border-slate-200/70 text-slate-700 text-[10px] rounded font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 font-semibold uppercase tracking-wider">
            <Briefcase size={13} className="text-indigo-600" />
            <span>Professional Work Experience</span>
          </div>

          <div className="space-y-2.5">
            {experience.map((item) => (
              <div
                key={item.company}
                className="bg-white border border-slate-200/90 rounded p-3.5 shadow-xs transition-all hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 mb-1.5 font-mono">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.company}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-indigo-600 font-semibold">{item.role}</span>
                      {item.client && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 rounded border border-indigo-200/50">
                          Client: {item.client}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <span>{item.period}</span>
                  </div>
                </div>

                <ul className="space-y-1 my-2 text-xs text-slate-600 list-disc pl-4 font-sans leading-relaxed">
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1 pt-1.5 border-t border-slate-100">
                  <span className="text-[10px] font-mono text-slate-400 mr-1">Tech:</span>
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200/60 text-[10px] font-mono rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education (M.Tech only) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 font-semibold uppercase tracking-wider">
            <GraduationCap size={13} className="text-indigo-600" />
            <span>Academic Credential</span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded p-3 font-mono shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <div className="text-xs font-bold text-slate-900">{education[0].degree}</div>
              <div className="text-[11px] text-indigo-600 font-medium">{education[0].school}</div>
            </div>
            <div className="text-[10px] text-slate-400">{education[0].period}</div>
          </div>
        </div>

        {/* Certifications (from page 2) */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 font-semibold uppercase tracking-wider">
            <Award size={13} className="text-amber-500" />
            <span>Verified Certifications</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200/90 hover:border-indigo-300 rounded p-2.5 font-mono shadow-xs flex items-center justify-between group transition-colors"
              >
                <div>
                  <div className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {cert.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{cert.issuer}</div>
                </div>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-indigo-600 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
