export interface Article {
  id: string;
  title: string;
  date: string;
  format: 'pdf' | 'docx' | 'md';
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  pdfUrl?: string;
  pdfPages?: string[];
  content: string;
}


export const ARTICLES_DATA: Article[] = [
  {
    id: 'rlef-grounding-code-llms',
    title: 'RLEF: Grounding Code LLMs in Execution Feedback with Reinforcement Learning',
    date: 'Oct 06, 2026',
    format: 'pdf',
    category: 'LLM Agents & Reinforcement Learning',
    readTime: '19 pages · Paper Analysis',
    tags: [
      'LLMs',
      'Code Generation',
      'Reinforcement Learning',
      'PPO',
      'Execution Feedback',
      'AI Agents'
    ],
    excerpt:
      'A detailed analysis of RLEF and how reinforcement learning teaches code LLMs to condition future generations on execution feedback rather than simply generating another independent answer.',
    pdfUrl: '/documents/rlef.pdf',
    content: ''
  },

  {
    id: 'kv-cache',
    title: 'KV Cache: Understanding Prefill, Decode, and Attention Caching',
    date: 'Oct 06, 2026',
    format: 'pdf',
    category: 'LLM Systems & Inference',
    readTime: '7 pages · Technical Note',
    tags: [
      'LLMs',
      'Transformers',
      'KV Cache',
      'Attention',
      'Inference',
      'LLM Serving'
    ],
    excerpt:
      'A technical walkthrough of KV caching, explaining how K and V are stored across decoder blocks, why Q is computed only for the current token, and how prefill and decode differ.',
    pdfUrl: '/documents/kv-cache.pdf',
    content: ''
  },
  
  {
    id: 'ml-data-first-class-citizen',
    title: 'ML Data Is A First Class Citizen in Production',
    date: 'Sep 29, 2021',
    format: 'md',
    category: 'MLOps & Systems',
    readTime: '8 min read',
    tags: ['MLOps', 'Data Drift', 'Production ML', 'Concept Drift', 'TFX'],
    excerpt: 'Why ML code in production is just a drop in the ocean compared to dynamic data pipelines, schema skew, and covariate drift.',
    content: `
# ML Data Is A First Class Citizen

![Machine learning development lifecycle](/articles/ml-data/sketch.png)

In classical academia, machine learning seems like a neat optimization problem: clean data, a model, a benchmark, and a report. In production, the reality is different. **Model code is only a small part of the system**. The critical burden sits in the data layer: ingestion, validation, drift monitoring, feature quality, and feedback loops.

> The real challenge is not training a better model. The real challenge is keeping the data contract healthy over time.

### The production reality

Data in an academic or research setting is usually curated, static, and well-behaved. In production, the data pipeline is continuous and messy:

- **Schema drift** changes the meaning of the same columns over time
- **Data quality issues** create silent model degradation
- **Covariate shift** changes the distribution seen at serving time
- **Label delay** makes evaluation lag behind business reality

That is why production ML systems are more about observability, monitoring, and feedback loops than pure predictive performance.

![Production machine learning systems](/articles/ml-data/mlops.png)

---

### Why model code is not enough

When you deploy a model, your work does not stop. It actually begins.

1. **Scoping**: define the business problem and the right success metric
2. **Data pipeline**: ensure ingestion, feature engineering, and schema contracts are stable
3. **Modeling and error analysis**: inspect slices, not just aggregate accuracy
4. **Deployment and monitoring**: detect drift and trigger automated retraining

A model can be algorithmically correct and still fail in production because the incoming data no longer matches the assumptions of training.

![Machine learning production pipeline](/articles/ml-data/ml_pipelings.png)

---

### Distribution shift in practice

The most common types of drift are:

![Data changes after deployment](/articles/ml-data/download.png)

#### 1. Concept drift
Changes in the relationship between features and target:

$$P_{train}(y \\mid x) \\neq P_{serve}(y \\mid x)$$

#### 2. Covariate shift
Changes in the input distribution itself:

$$P_{train}(x) \\neq P_{serve}(x) \\quad \\text{while} \\quad P(y \\mid x) \\text{ remains stable}$$

#### 3. Schema skew
The feature columns arrive with new types, missing values, or unanticipated categories.

This is why MLOps teams care deeply about data validation frameworks, lineage tracking, and continuous monitoring dashboards.

![Data and model monitoring workflow](/articles/ml-data/ml_system.png)

![Production data quality example](/articles/ml-data/skw.jpg)

The original notebook also walks through a TensorFlow Extended production pipeline:

![TensorFlow Extended pipeline](/articles/ml-data/tfx.png)

![TFX pipeline components](/articles/ml-data/tfx1.png)

![Additional TensorFlow Extended component view](/articles/ml-data/tfx2.png)

---

### Operational checklist

A production pipeline should include:

- data contract validation
- baseline and business KPI tracking
- drift detection thresholds
- replayable training data
- canary rollout and rollback gates
- retraining triggered by evidence, not guesswork

![Feedback and continuous learning loop](/articles/ml-data/flow.png)

![Monitoring and retraining example](/articles/ml-data/runs.png)

![Serving and feedback workflow](/articles/ml-data/sft.png)

### Final thought

The highest-leverage system in machine learning is not the model itself. It is the **data health system around it**. If the data pipeline is healthy, the model has a chance to remain useful. If not, the production system silently decays.
`
  },
  {
    id: 'hierarchical-co-attention-vqa',
    title: 'Hierarchical Co-Attention for Visual Question Answering',
    date: 'Jun 25, 2021',
    format: 'md',
    category: 'Computer Vision & NLP',
    readTime: '8 min read',
    tags: ['Computer Vision', 'NLP', 'Multimodal', 'Co-Attention', 'PyTorch'],
    excerpt: 'Jointly reasoning about visual attention ("where to look") and question attention ("which words to listen to") across word, phrase, and question hierarchies.',
    content: `
# Hierarchical Co-Attention for Visual Question Answering

![Hierarchical question-image co-attention paper](/articles/vqa/h-co.png)

In visual question answering, a model must understand both the image and the language query. The difficulty is that the useful signal is often distributed: the image contains many irrelevant regions, while the question contains words that matter more than others.

This motivates **co-attention**: the system should learn not only *where to look* in the image, but also *which words to prioritize* in the question.

![Equivalent questions about the same image](/articles/vqa/horses.png)

---

### Why attention matters in VQA

A typical model may treat the question as a flat sequence and the image as a set of regional features. However, real reasoning is hierarchical:

- words combine into phrase-level meaning
- phrases compose into a question-level interpretation
- image regions compete for relevance
- the answer emerges from the joint alignment of both views

The hierarchical co-attention model addresses exactly this by aligning visual and textual representations at multiple levels.

![Hierarchical model aligning question words and image regions](/articles/vqa/co1.png)

![Joint question and image attention maps](/articles/vqa/co2.png)

---

### Core idea

The architecture computes attention over two modalities simultaneously:

- visual attention decides which image regions matter most
- question attention decides which words or phrases are most relevant

This is particularly important in VQA because the same image may support multiple questions, and different query tokens may imply different regions of interest.

If the model only attends to one modality, it misses important context. The joint representation allows the question to guide the image interpretation and the image to guide the text interpretation.

---

### Mathematical intuition

Let $V$ be the visual feature matrix and $Q$ the question representation. The model builds an affinity matrix:

$$C = \\tanh(Q W_b V^\\top)$$

This matrix captures the compatibility between question features and visual features. From it, the model derives separate attention distributions over the image and the question.

The result is a richer representation where both views inform the final fused feature vector used for answer decoding.

![Parallel co-attention architecture](/articles/vqa/co3.png)

---

### Why hierarchical attention is powerful

A flat attention model may focus on the image as a whole and miss finer details. Hierarchical attention allows the reasoning process to operate at multiple scales:

- word-level alignment
- phrase-level fusion
- question-level summarization
- final image-text reasoning

This makes it especially effective for compositional questions such as "What is the person holding?" or "How many objects are visible to the left of the table?"

![Alternating co-attention architecture](/articles/vqa/co4.png)

---

### Practical takeaway

For multimodal systems, the key is not simply combining features. It is learning *where* the model should focus in the visual stream and *what* it should emphasize in the textual stream.

That is the core insight behind hierarchical co-attention: it allows the model to reason jointly across vision and language instead of treating them as independent inputs.

### Closing note

Modern VQA systems have become far more sophisticated, but the core principle remains the same: the model must learn to align the right visual cues with the right textual cues. That alignment is exactly what co-attention aims to optimize.
`
  },
  {
    id: 'why-data-definition-is-hard',
    title: 'Why Data Definition Is Hard in Real-World ML',
    date: 'Jul 02, 2021',
    format: 'md',
    category: 'Data Quality & Labeling',
    readTime: '6 min read',
    tags: ['Data Quality', 'Label Inconsistency', 'Bayes Error', 'Human-in-the-Loop'],
    excerpt: 'The hidden trap of label inconsistency in unstructured datasets, resolving annotator disagreement, and establishing Human Level Performance baselines.',
    content: `
# Why Data Definition Is Hard in Real-World ML

![Major types of data problems](/articles/vqa/3.png)

A high-priority ML initiative rarely fails because the model architecture is weak. It fails because the ground truth is poorly defined.

In textbook settings, labels are usually clean, consistent, and easy to reason about. In real business applications, especially with unstructured or semi-structured data, annotation quality becomes the first real bottleneck.

![Notebook example introducing the data-definition problem](/articles/vqa/2.png)

---

### The label inconsistency problem

When data comes from human judgment, boundary cases produce disagreement:

- radiologists disagree on subtle medical findings
- annotators disagree on nuanced sentiment and sarcasm
- reviewers classify edge events differently across teams

This means the target itself is noisy before the model even trains.

If two annotators label the same sample differently, the model is not learning a single truth; it is learning a mixture of contradictory supervision signals.

![Why label consistency matters](/articles/vqa/lable_inonsistency1.png)

---

### Why this is harder than it looks

The challenge is not just getting labels. It is defining what the label means.

A dataset may look clean on the surface but fail in practice because:

- annotation rubrics are underspecified
- edge cases are not documented
- labelers interpret the same example differently
- class definitions shift over time

This creates a hidden noise floor that no model architecture can fully fix.

![How inconsistent labels distort the learned relationship](/articles/vqa/lable_inonsistency.png)

---

### The statistical impact

If the label is inconsistent, then even a strong model cannot learn a stable signal. In practical terms, the system may have:

- reduced precision on ambiguous examples
- unstable validation trends
- inconsistent human-level performance estimates
- poor transfer from pilot to production

This is why data definition is often the first real engineering task in ML work.

![Human-level performance and evaluation](/articles/vqa/hlp1.png)

![Another human-level performance example](/articles/vqa/4.png)

---

### What good teams do

The best data teams do not just collect examples. They define:

- annotation rules
- edge-case policies
- disagreement review workflows
- inter-annotator agreement checks
- human-level performance baselines

They treat labels as a product, not as an afterthought.

> If your data definition is vague, your ML system will be brittle regardless of the model you choose.
`
  },
  {
    id: 'why-low-average-error-not-enough',
    title: "Why Low Average Error Isn't Good Enough",
    date: 'Aug 20, 2021',
    format: 'md',
    category: 'Model Evaluation',
    readTime: '7 min read',
    tags: ['Error Analysis', 'Data Slicing', 'Production Metrics', 'Safety & Fairness'],
    excerpt: 'A 99.2% aggregate test accuracy can disguise complete failure on critical query cohorts, catastrophic edge cases, and high-value customer segments.',
    content: `
# Why Low Average Error Isn't Good Enough

![Performance on disproportionately important examples](/articles/low-average/ai.png)

A model can have a remarkably low average error and still be unacceptable for production.

This is the core lesson behind slice-based evaluation: **aggregate metrics can hide catastrophic failures on important subgroups**.

---

### The trap of average performance

Suppose a system has 98.7% overall accuracy. On the surface, this looks excellent. But if the model fails on a small but critical subset of examples, then the apparently good number is misleading.

This is especially dangerous in systems where some failure modes are dramatically more costly than others.

![Deployment example from the original notebook](/articles/low-average/deploy.png)

---

### Why slices matter

In many real-world systems, the data is heavily imbalanced:

- the majority of calls are routine
- a small fraction are safety-critical or business-critical
- the minority group drives the most severe consequences

If the model performs poorly there, the average metric becomes irrelevant.

A product can look highly accurate while still being operationally unsafe.

---

### Search engine example

Imagine a ranking system where 95% of queries are informational and only 2% are safety-critical or high-risk.

The model may do extremely well on the majority cohort while failing badly on the small but crucial subset.

That creates a dangerous illusion:

- aggregate accuracy looks great
- true product risk is hidden
- user trust erodes in the most important cases

---

### What production teams need

A better evaluation system includes:

- cohort-based metrics
- error slices by user segment or query class
- calibration checks
- risk-aware thresholds
- cost-sensitive decision evaluation

The goal is not only to minimize mean error, but to make sure the system remains reliable where it matters most.

> A low average error is useful, but it is not sufficient. In production, the dangerous errors are often the rare ones.
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
