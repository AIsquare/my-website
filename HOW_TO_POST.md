# How to Write Articles, Notebooks & Documents in Your Portfolio

This guide explains how to add content directly to your portfolio, how to embed images, and how to publish Jupyter Notebooks and PDFs.

---

## 1. How to Write an Article Directly with Images

To write a technical post directly on your website with diagrams, plots, or photos:

### Step 1: Place Your Images in `public/images/`
Place your image file in the `public/images/` directory:
```bash
public/
  images/
    my-model-architecture.png
    propensity-decile-curve.png
```

### Step 2: Add Your Article in `lib/articlesData.ts`
Open `lib/articlesData.ts` and add your article to the `ARTICLES_DATA` list:

```typescript
{
  id: 'my-new-deep-dive',
  title: 'Optimizing Latency in High-Throughput RAG Systems',
  date: 'Oct 2026',
  format: 'md',
  category: 'GenAI & Systems',
  readTime: '7 min read',
  tags: ['RAG', 'Pinecone', 'Latency', 'FastAPI'],
  excerpt: 'A practical breakdown of how we achieved sub-50ms vector retrieval in enterprise pipelines.',
  content: `
# Optimizing Latency in High-Throughput RAG Systems

When deploying retrieval-augmented pipelines at scale, network latency between vector databases and LLM inference endpoints quickly becomes the bottleneck.

Here is the system architecture:

![System Architecture](/images/my-model-architecture.png)

### Key Optimization Strategies
1. **Vector Caching**: Storing high-frequency query embeddings.
2. **Schema Pruning**: Pre-filtering table metadata before prompt injection.
  `
}
```

The article will immediately show up in your portfolio's list, search bar, and In-App Reader with full image rendering!

---

## 2. How to Bring Jupyter Notebooks (`.ipynb`) Directly In-App

You **do not need** to point visitors to external repositories like GitHub. Your portfolio features a native **In-App Jupyter Notebook Viewer** that renders cells (`In [1]:`, `Out [1]:`), Python code blocks, and outputs directly.

To add a notebook:
1. Open your `.ipynb` notebook file in VS Code or Jupyter.
2. Add its code and markdown cells to `lib/articlesData.ts`:
```typescript
{
  id: 'my-new-notebook',
  title: 'Bayesian Approaches to Customer Propensity',
  date: '2026',
  format: 'ipynb',
  category: 'Statistics & ML',
  readTime: '14 cells · 6 min read',
  tags: ['Bayesian', 'Propensity', 'Decile Lift'],
  excerpt: 'Exploring beta-binomial priors for skewed customer conversion datasets.',
  notebookCells: [
    {
      type: 'markdown',
      source: '# Bayesian Customer Propensity Analysis\n\nFormulating prior distributions for conversion rates.'
    },
    {
      type: 'code',
      executionCount: 1,
      source: `import numpy as np
import scipy.stats as stats

# Beta-binomial prior
alpha_prior, beta_prior = 2, 50
print("Prior Mean Conversion Rate:", alpha_prior / (alpha_prior + beta_prior))`,
      output: `Prior Mean Conversion Rate: 0.03846`
    }
  ],
  content: '...'
}
```

---

## 3. How PDF Documents Open Directly

When a visitor clicks a PDF publication (e.g., your Thomson Reuters Case Law Whitepaper):
- It opens inside the **PDF Document Viewer** modal.
- Includes pagination (`Page 1 of 2`), whitepaper typography, and a direct **"Download PDF"** button.
- To add a real downloadable PDF file, place it in `public/documents/my-paper.pdf` and link it!

---

## 4. How to Update Your Profile Photo

1. Save your photograph as `public/profile.jpg`.
2. The portfolio will automatically detect and render your headshot in the hero micro-card.
