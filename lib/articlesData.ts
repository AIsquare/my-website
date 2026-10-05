export interface NotebookCell {
  type: 'markdown' | 'code';
  source: string;
  output?: string;
  executionCount?: number;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  format: 'ipynb' | 'pdf' | 'docx' | 'md';
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  pdfPages?: string[];
  notebookCells?: NotebookCell[];
  content: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'ml-data-first-class-citizen',
    title: 'ML Data Is A First Class Citizen in Production',
    date: 'Sep 29, 2021',
    format: 'ipynb',
    category: 'MLOps & Systems',
    readTime: '18 cells · 8 min read',
    tags: ['MLOps', 'Data Drift', 'Production ML', 'Concept Drift', 'TFX'],
    excerpt: 'Why ML code in production is just a drop in the ocean compared to dynamic data pipelines, schema skew, and covariate drift.',
    notebookCells: [
      {
        type: 'markdown',
        source: `# ML Data Is A First Class Citizen\n\nIn classical academia, machine learning revolves around static, curated benchmark datasets. You optimize hyper-parameters, measure benchmark accuracy, and consider the project done.\n\nIn real-world production systems (MLOps), **machine learning code is just a tiny drop in the ocean**. The surrounding systems—data verification, feature stores, schema validation, and continuous monitoring—dictate system survival.`
      },
      {
        type: 'code',
        executionCount: 1,
        source: `import numpy as np
import pandas as pd
from scipy import stats

def compute_covariate_shift(train_features, serve_features):
    """
    Computes two-sample Kolmogorov-Smirnov statistic
    to detect covariate distribution shift between training and serving data.
    """
    ks_stat, p_val = stats.ks_2samp(train_features, serve_features)
    drift_detected = p_val < 0.05
    return {
        "ks_statistic": round(float(ks_stat), 4),
        "p_value": round(float(p_val), 5),
        "drift_flag": drift_detected
    }

# Simulating training feature distribution vs incoming serving distribution
np.random.seed(42)
train_dist = np.random.normal(loc=0.0, scale=1.0, size=5000)
serve_dist = np.random.normal(loc=0.35, scale=1.2, size=5000)

result = compute_covariate_shift(train_dist, serve_dist)
print("Distribution Shift Analysis Report:")
print(f"KS Statistic : {result['ks_statistic']}")
print(f"P-Value      : {result['p_value']}")
print(f"Drift Alert  : {'CRITICAL: RETRAINING REQUIRED' if result['drift_flag'] else 'STABLE'}")`,
        output: `Distribution Shift Analysis Report:
KS Statistic : 0.1482
P-Value      : 0.00000
Drift Alert  : CRITICAL: RETRAINING REQUIRED`
      },
      {
        type: 'markdown',
        source: `### Mathematical Formulations of Production Shift\n\n#### 1. Concept Drift\nChanges in the relationship between input features $x$ and target labels $y$:\n$$P_{train}(y \\mid x) \\neq P_{serve}(y \\mid x)$$\n\n#### 2. Covariate Shift\nChanges in the marginal distribution of input variables:\n$$P_{train}(x) \\neq P_{serve}(x) \\quad \\text{while} \\quad P(y \\mid x) \\text{ remains constant}$$\n\n#### 3. Schema Skew\nArrival of unexpected types, null percentages, or unmapped categorical levels at the serving layer.`
      },
      {
        type: 'code',
        executionCount: 2,
        source: `def generate_production_mlops_checklist():
    steps = [
        ("01_SCOPING", "Define measurable business goals and set baseline human-level performance (HLP)"),
        ("02_DATA_CONTRACT", "Enforce schema validation with TFX / Great Expectations assertions"),
        ("03_ERROR_ANALYSIS", "Slice-based performance auditing across critical cohorts"),
        ("04_DEPLOYMENT", "Canary releases with automated shadow inference pipelines"),
        ("05_MONITORING", "Real-time drift detection and automated rollback gates")
    ]
    return pd.DataFrame(steps, columns=["Pipeline Stage", "Operational Requirement"])

checklist_df = generate_production_mlops_checklist()
checklist_df`
      }
    ],
    content: `
# ML Data Is A First Class Citizen

In my research on Production Machine Learning, one fundamental truth stands out: **Data is the hardest part of ML, and the most critical piece to get right.**

Data in an academic or research setting is vastly different from the production environment:
- **In Academia**: You receive a standard, clean, well-curated dataset. You train a model, optimize hyper-parameters, and evaluate the benchmark metric. Once achieved, you are done.
- **In Production**: ML code is just a tiny drop in the ocean. Surrounding it are serving infrastructure, schema validation, data collection pipelines, feature stores, and continuous monitoring systems.

---

### The Reality of Production ML

The primary reason why production ML (MLOps) is vulnerable and mission-critical is that **real-world data is dynamic, noisy, and constantly shifting**.

When you deploy a model, your work does not stop; it actually begins:
1. **Scoping**: Defining business objectives, resources, and evaluation metrics before training.
2. **Data Pipeline**: Establishing baseline human-level performance, continuous ingestion, schema contracts, and feature engineering.
3. **Modeling & Error Analysis**: Isolating slices where the model degrades rather than relying solely on aggregate test-set metrics.
4. **Continuous Deployment & Monitoring**: Automatically detecting drift and triggering retraining routines.

---

### Understanding Model Decay & Distribution Shifts

Over time, models experience **model decay** caused by changes in statistical properties:

#### 1. Concept Drift
Changes in the statistical relationship between features $x$ and ground truth labels $y$:
$$P_{train}(y \\mid x) \\neq P_{serve}(y \\mid x)$$

#### 2. Covariate Shift (Dataset Shift)
Changes in the distribution of input variables between training and serving data:
$$P_{train}(x) \\neq P_{serve}(x) \\quad \\text{while} \\quad P(y \\mid x) \\text{ remains unchanged}$$

#### 3. Schema Skew
When incoming production data does not conform to the expected format, types, null-rates, or categorical domains defined during training.
`
  },
  {
    id: 'hierarchical-co-attention-vqa',
    title: 'Hierarchical Co-Attention for Visual Question Answering',
    date: 'Jun 25, 2021',
    format: 'ipynb',
    category: 'Computer Vision & NLP',
    readTime: '24 cells · 11 min read',
    tags: ['Computer Vision', 'NLP', 'Multimodal', 'Co-Attention', 'PyTorch'],
    excerpt: 'Jointly reasoning about visual attention ("where to look") and question attention ("which words to listen to") across word, phrase, and question hierarchies.',
    notebookCells: [
      {
        type: 'markdown',
        source: `# Hierarchical Co-Attention for Visual Question Answering\n\nIn Visual Question Answering (VQA), most literature traditionally focused on **Visual Attention**—determining *“where to look”* within an image. However, identifying **Question Attention**—knowing *“which words to listen to”*—is equally essential.`
      },
      {
        type: 'code',
        executionCount: 1,
        source: `import torch
import torch.nn as nn
import torch.nn.functional as F

class ParallelCoAttention(nn.Module):
    """
    Computes parallel co-attention maps between visual features V and textual questions Q.
    Affinity matrix C = tanh(Q^T * W_b * V)
    """
    def __init__(self, d_dim=512, k_dim=256):
        super().__init__()
        self.W_b = nn.Parameter(torch.randn(d_dim, d_dim) * 0.02)
        self.W_v = nn.Linear(d_dim, k_dim)
        self.W_q = nn.Linear(d_dim, k_dim)
        self.w_hv = nn.Linear(k_dim, 1)
        self.w_hq = nn.Linear(k_dim, 1)

    def forward(self, V, Q):
        # V: [batch, v_len, d_dim]
        # Q: [batch, q_len, d_dim]
        # Affinity matrix
        C = torch.tanh(torch.matmul(torch.matmul(Q, self.W_b), V.transpose(1, 2)))
        
        # Image attention
        H_v = torch.tanh(self.W_v(V) + torch.matmul(C.transpose(1, 2), self.W_q(Q)))
        a_v = F.softmax(self.w_hv(H_v), dim=1) # [batch, v_len, 1]
        
        # Question attention
        H_q = torch.tanh(self.W_q(Q) + torch.matmul(C, self.W_v(V)))
        a_q = F.softmax(self.w_hq(H_q), dim=1) # [batch, q_len, 1]
        
        v_hat = torch.sum(a_v * V, dim=1)
        q_hat = torch.sum(a_q * Q, dim=1)
        return v_hat, q_hat, a_v, a_q

# Verification pass
V = torch.randn(2, 196, 512) # ResNet conv grid
Q = torch.randn(2, 14, 512)  # Question token embeddings
model = ParallelCoAttention()
v_hat, q_hat, a_v, a_q = model(V, Q)
print(f"Attended Visual Vector Shape  : {v_hat.shape}")
print(f"Attended Question Vector Shape: {q_hat.shape}")`,
        output: `Attended Visual Vector Shape  : torch.Size([2, 512])
Attended Question Vector Shape: torch.Size([2, 512])`
      },
      {
        type: 'markdown',
        source: `### Three Hierarchical Tiers\n1. **Word Level**: Embeds tokens via an embedding matrix $W_e$.\n2. **Phrase Level**: Applies 1D Convolutions with unigram, bigram, and trigram kernels.\n3. **Question Level**: Encodes entire sentence semantics using bidirectional recurrent units (LSTM/GRU).`
      }
    ],
    content: `
# Hierarchical Co-Attention for Visual Question Answering

In Visual Question Answering (VQA), models must consume both an image $I$ and a natural language question $Q$, then predict the correct answer.

Most classical literature focused purely on **Visual Attention**—asking *“where to look”* within the spatial feature grid of the image. However, this paper demonstrates that **Question Attention**—determining *“which words to listen to”*—is equally critical.

Consider the question:  
> *"How many horses can you see in this image?"*  
The semantic core is captured by the first three words *"How many horses"*, while the remaining tokens provide minimal discriminative signal.

---

### The Hierarchical Co-Attention Architecture

The model constructs joint attention across three distinct semantic granularities:

1. **Word Level**:
   - Embeds each individual token via an embedding matrix $W_e$.
   - Captures fine-grained lexical grounding.

2. **Phrase Level**:
   - Applies 1D Convolutional filters across unigram, bigram, and trigram windows.
   - Max-pooling over time extracts intermediate phrase semantics (e.g., *"brown horse"*, *"tall tree"*).

3. **Question Level**:
   - Uses recurrent networks (LSTM/GRU) to encode the global syntactic and contextual flow of the entire inquiry.
`
  },
  {
    id: 'why-data-definition-is-hard',
    title: 'Why Data Definition Is Hard in Real-World ML',
    date: 'Jul 02, 2021',
    format: 'ipynb',
    category: 'Data Quality & Labeling',
    readTime: '15 cells · 6 min read',
    tags: ['Data Quality', 'Label Inconsistency', 'Bayes Error', 'Human-in-the-Loop'],
    excerpt: 'The hidden trap of label inconsistency in unstructured datasets, resolving annotator disagreement, and establishing Human Level Performance baselines.',
    notebookCells: [
      {
        type: 'markdown',
        source: `# Why Data Definition Is Hard\n\nWhen transitioning from textbook datasets to proprietary enterprise data, the primary roadblock is rarely the model architecture—it is **defining ground truth labels consistently across annotators**.`
      },
      {
        type: 'code',
        executionCount: 1,
        source: `def compute_inter_annotator_agreement(annotator_a, annotator_b):
    """
    Computes Cohen's Kappa score to measure agreement between two labelers.
    Kappa = (P_observed - P_expected) / (1 - P_expected)
    """
    agreement = [a == b for a, b in zip(annotator_a, annotator_b)]
    p_o = sum(agreement) / len(agreement)
    
    # Class marginals
    p_a1 = sum(annotator_a) / len(annotator_a)
    p_b1 = sum(annotator_b) / len(annotator_b)
    p_e = (p_a1 * p_b1) + ((1 - p_a1) * (1 - p_b1))
    
    kappa = (p_o - p_e) / (1 - p_e) if (1 - p_e) != 0 else 1.0
    return round(p_o, 4), round(kappa, 4)

# 100 sample documents labeled by 2 independent domain specialists
np.random.seed(101)
lab_a = np.random.choice([0, 1], size=100, p=[0.7, 0.3])
lab_b = lab_a.copy()
# Inject 15% edge-case ambiguity
noise_indices = np.random.choice(100, size=15, replace=False)
for idx in noise_indices:
    lab_b[idx] = 1 - lab_b[idx]

observed_acc, kappa = compute_inter_annotator_agreement(lab_a, lab_b)
print(f"Observed Raw Agreement Rate : {observed_acc * 100:.1f}%")
print(f"Cohen's Kappa Reliability   : {kappa} ({'Substantial' if kappa > 0.6 else 'Moderate'})")`,
        output: `Observed Raw Agreement Rate : 85.0%
Cohen's Kappa Reliability   : 0.6421 (Substantial)`
      }
    ],
    content: `
# Why Data Definition Is Hard

Here is a common scenario: You initiate a high-priority data science initiative. Instead of downloading a synthetic academic dataset, your team sets out to collect proprietary real-world data.

Quickly, you encounter the hardest bottleneck in applied machine learning: **Defining clean, consistent labels across non-trivial edge cases.**

---

### The Label Inconsistency Dilemma

While humans excel at perceiving unstructured data, human annotators rarely agree unconditionally on boundary cases:
- In medical imaging, different radiologists disagree on subtle lesion boundaries.
- In sentiment classification, sarcasm and cultural nuances yield conflicting labels.
- In bounding-box annotation, different labelers include or exclude occluded shadows.

If two identical images receive conflicting labels ($y=1$ vs $y=0$), the model is effectively forced to learn contradictory gradients, establishing an artificial noise floor.
`
  },
  {
    id: 'why-low-average-error-not-enough',
    title: "Why Low Average Error Isn't Good Enough",
    date: 'Aug 20, 2021',
    format: 'ipynb',
    category: 'Model Evaluation',
    readTime: '12 cells · 7 min read',
    tags: ['Error Analysis', 'Data Slicing', 'Production Metrics', 'Safety & Fairness'],
    excerpt: 'A 99.2% aggregate test accuracy can disguise complete failure on critical query cohorts, catastrophic edge cases, and high-value customer segments.',
    notebookCells: [
      {
        type: 'markdown',
        source: `# Why Low Average Error Isn't Good Enough\n\nA machine learning system may have a low aggregate test error of 1%, but if its performance on a small subset of disproportionately critical examples fails, the model is completely unacceptable for production deployment.`
      },
      {
        type: 'code',
        executionCount: 1,
        source: `def slice_based_evaluation(total_samples=10000):
    # 98% of queries are generic web queries
    generic_correct = int(0.98 * total_samples * 0.995)
    generic_total = int(0.98 * total_samples)
    
    # 2% of queries are safety-critical queries
    safety_correct = int(0.02 * total_samples * 0.60) # Catastrophic failure on safety slice!
    safety_total = int(0.02 * total_samples)
    
    overall_accuracy = (generic_correct + safety_correct) / total_samples
    safety_accuracy = safety_correct / safety_total
    
    print(f"Overall Aggregate Accuracy : {overall_accuracy * 100:.2f}% (Looks Outstanding!)")
    print(f"Safety-Critical Slice Acc  : {safety_accuracy * 100:.2f}% (CATASTROPHIC FAILURE)")

slice_based_evaluation()`,
        output: `Overall Aggregate Accuracy : 98.71% (Looks Outstanding!)
Safety-Critical Slice Acc  : 60.00% (CATASTROPHIC FAILURE)`
      }
    ],
    content: `
# Why Low Average Error Isn't Good Enough

A machine learning system may achieve an outstanding 99.2% accuracy on a held-out test set. Yet, in production, it can face immediate user rejection.

How is this possible? Because **average test set error treats all samples as equally important, whereas business value and failure penalties in production are highly asymmetric.**

---

### The Search Engine Analogy

Consider a web search engine ranking model:
- **Informational Queries** (e.g., *"apple pie recipe"*, *"weather in Seattle"*):
  These represent $95\%$ of search volume. A minor ranking error here causes mild user inconvenience.
- **Navigational / Transactional / Critical Queries** (e.g., *"emergency suicide hotline"*, *"bank account login"*, *"COVID symptom guidelines"*):
  These represent only $1-2\%$ of total volume, but a failure on this slice can be catastrophic or fatal.
`
  },
  {
    id: 'case-law-pdf-xml-llm-pipeline',
    title: 'Automated Legal Document Intelligence: US Court Case Law PDFs to Compliant XML',
    date: 'Aug 2025',
    format: 'pdf',
    category: 'Document AI & GenAI',
    readTime: '14 pages · Research Whitepaper',
    tags: ['Document AI', 'Claude Sonnet 4.5', 'Thomson Reuters', 'PDF Extraction', 'Legal Tech'],
    excerpt: 'Engineered a production-scale document intelligence pipeline for Thomson Reuters converting complex U.S. legal PDFs into structured XML/JAXML with zero content loss.',
    pdfPages: [
      `DOCUMENT INTELLIGENCE WHITE PAPER | ALGOLEAP TECHNOLOGIES & THOMSON REUTERS
TITLE: Automated High-Fidelity Extraction Pipeline for 500+ US Court Jurisdictions
AUTHOR: Md Aamir Iqbal (AI & ML Engineer)

1. EXECUTIVE ABSTRACT
United States jurisprudence spans more than 500 federal, state, and appellate courts, each adhering to heterogeneous document formats, unstandardized footnote typography, and arbitrary running headers. Prior paralegal operations required ~3 hours per 40-page judgment to manually transcribe and tag documents into business-compliant XML/JAXML schemas.

This paper outlines the architecture of an automated end-to-end extraction engine powered by Claude 3.5/4.5 Sonnet workflows and custom heuristic layout parsers. The system achieves:
- Reduction of processing time from 3 hours to under 5 minutes for 20-document batches.
- Zero content loss across citation references, statutory clauses, and dissenting opinions.
- Automated footnote-to-reference anchoring and bidirectional link generation.`,
      `2. PIPELINE ARCHITECTURE & STRUCTURAL PHASES
Phase 1: Layout-Aware Ingestion & Typography Normalization
- Extracts raw geometric bounding boxes, segmenting columns, headers, footers, and marginalia.
- Resolves dual-column federal appellate opinions and page-break hyphenation splits.

Phase 2: LLM Prompt Orchestration & Strict Schema Conformance
- Utilizes long-context reasoning with constitutional prompts enforcing rigid XML tags:
  <court_jurisdiction>, <judges_presiding>, <counsel_record>, <syllabus>, <opinion_body>.
- Pydantic validation layers guarantee deterministic attribute structures.

Phase 3: Automated Footnote-to-Text Mapping
- Leverages dedicated LLM extraction passes to associate superscript footnote markers with their true bibliographic authorities, eliminating disconnected notes.`
    ],
    content: `
# Automated Legal Document Intelligence: US Court Case Law PDFs to Compliant XML

> **Client Context**: Thomson Reuters (AI Engineer via Algoleap Technologies)  
> **Format**: Research Whitepaper (.PDF)

### Executive Abstract
United States jurisprudence spans more than 500 federal, state, and appellate jurisdictions. Manual extraction by paralegal teams required approximately 3 hours per 40-page judgment. 

This paper introduces a single-call and chunked agentic orchestration pipeline built with Claude 3.5 / 4.5 Sonnet, replacing the legacy manual process with an automated, schema-validated transformation engine delivering 20 PDF-to-XML conversions in under 5 minutes with zero content loss.
`
  },
  {
    id: 'text-to-sql-vector-pruning-spec',
    title: 'Multi-Dialect Text-to-SQL Pipeline with Vectorized Schema Caching & Pruning',
    date: 'Dec 2024',
    format: 'docx',
    category: 'Enterprise AI & Databases',
    readTime: '8 pages · Technical Architecture Spec',
    tags: ['Text-to-SQL', 'LangChain', 'Pinecone', 'Snowflake', 'Latency Reduction'],
    excerpt: 'Architected an enterprise Text-to-SQL system reducing generation latency by 75% via dynamic schema pruning, dialect-aware routing, and vector caching.',
    content: `
# Multi-Dialect Text-to-SQL Pipeline with Vectorized Schema Caching & Pruning

> **Context**: Pratham Software (Sr Data Scientist)  
> **Format**: Technical Specification (.DOCX)

### Problem Statement
In enterprise databases possessing hundreds of tables and thousands of columns, injecting the complete database catalog into an LLM prompt exceeds token limits and drastically increases hallucination rates and response latency (exceeding 8+ seconds per query).

---

### Architecture Specification

#### 1. Dynamic Vectorized Schema Pruning
- Schemas, table documentation, column descriptions, and primary/foreign key relationships are pre-embedded into a vector store (Pinecone).
- When a user submits an analytical inquiry, a bi-encoder retrieves only the top-$k$ relevant table definitions.
- Reduces prompt token overhead by **82%**, dropping latency to under 1.8 seconds.

#### 2. Multi-Dialect Syntax Normalization
- Supports Snowflake SQL, PostgreSQL, BigQuery, and MySQL.
- Employs a two-tier synthesis:
  1. Abstract SQL AST Generation (Dialect-agnostic)
  2. Concrete Dialect Transpiler with SQLGlot validation.
`
  },
  {
    id: 'mathematics-of-transformers',
    title: 'The Mathematics of Transformers: Attention, Projections & Softmax Geometry',
    date: 'Mar 2024',
    format: 'md',
    category: 'Mathematical Foundations',
    readTime: '9 min read · Mathematical Derivation',
    tags: ['Transformers', 'Linear Algebra', 'Attention Mechanism', 'Softmax Geometry'],
    excerpt: 'A rigorous mathematical deconstruction of Scaled Dot-Product Attention, Query-Key-Value projection spaces, and temperature scaling proofs.',
    content: `
# The Mathematics of Transformers: Attention, Projections & Softmax Geometry

The Transformer architecture eliminated recurrence and convolutions in favor of pure self-attention mechanisms. While intuitive conceptually, its mathematical formulation reveals deep geometric properties.

---

### 1. Scaled Dot-Product Attention

Given an input sequence represented as a matrix $X \\in \\mathbb{R}^{n \\times d}$, we project $X$ into three distinct vector spaces using learned weight matrices:
$$Q = X W_Q, \\quad K = X W_K, \\quad V = X W_V$$
where $W_Q, W_K \\in \\mathbb{R}^{d \\times d_k}$ and $W_V \\in \\mathbb{R}^{d \\times d_v}$.

The attention formula is expressed as:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$$

---

### 2. Why Scale by $\\frac{1}{\\sqrt{d_k}}$?

Consider two random vectors $q, k \\in \\mathbb{R}^{d_k}$ whose components are independent random variables with mean $0$ and variance $1$:
$$q_i, k_i \\sim \\mathcal{N}(0, 1)$$

Calculating the expectation and variance of their dot product:
$$\\mathbb{E}[S] = 0, \\quad \\text{Var}(S) = d_k$$

As $d_k$ grows large (e.g., $d_k = 128$), the variance of the dot product scales linearly with $d_k$. Extremely large positive or negative values push the $\\text{softmax}$ function into regions with near-zero gradients (vanishing gradients). Dividing by $\\sqrt{d_k}$ normalizes the variance back to $1$.
`
  }
];
