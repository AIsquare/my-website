# Portfolio + Research Articles

This project is a personal portfolio and technical writing site for ML, data science, and systems work.

## Writing and publishing a Markdown article

1. Add an entry to `ARTICLES_DATA` in `lib/articlesData.ts`. Use a unique, URL-friendly `id`; it becomes `/articles/<id>`.
2. Set `format: 'md'`, then fill in the title, date, category, read time, excerpt, tags, and `content`.
3. Write `content` as Markdown. Use `##`/`###` headings, blank lines between paragraphs, `-` or numbered lists, `**bold**`, links, and fenced code blocks.
4. Put figures under `public/articles/<topic>/` and refer to them with their public URL, such as `![Architecture diagram](/articles/my-topic/architecture.png)`. Use the real notebook figures rather than remote placeholder images.
5. Preview the article locally, then run `npm run build` before committing and pushing.

Example entry:

```ts
{
  id: 'my-new-article',
  title: 'My New Article',
  date: 'Oct 2026',
  format: 'md',
  category: 'Machine Learning',
  readTime: '6 min read',
  excerpt: 'A short summary shown in the articles list.',
  tags: ['ML', 'MLOps'],
  content: `
# My New Article

Opening paragraph goes here.

## A section

More article text.

![A figure from this article](/articles/my-topic/figure.png)

Inline math uses $x^2$ and display math uses:

$$
P(y \mid x)
$$
`
}
```

Run `npm run dev` and open `/articles/my-new-article` to preview it. Article routes are statically generated from `ARTICLES_DATA`; add the entry before building/deploying.

## Adding an existing PDF as-is

The PDF is served from the `public/` directory and embedded in its own article page, with a download link. No conversion to Markdown is needed.

1. Copy the PDF into a descriptive folder, for example `public/papers/my-paper.pdf`.
2. Add an entry in `lib/articlesData.ts` with a unique `id`, metadata, `format: 'pdf'`, and `pdfUrl: '/papers/my-paper.pdf'`.
3. Keep `content` as an empty string when the PDF is the whole article. The list uses the excerpt and metadata; the article page displays the original PDF.
4. Verify `/articles/<id>` locally, then run `npm run build` and commit/push the change.

Example PDF entry:

```ts
{
  id: 'my-research-paper',
  title: 'My Research Paper',
  date: 'Oct 2026',
  format: 'pdf',
  category: 'Research',
  readTime: '12 pages',
  excerpt: 'A short summary of the paper.',
  tags: ['Research'],
  pdfUrl: '/papers/my-paper.pdf',
  content: ''
}
```

PDF display depends on the visitor's browser supporting embedded PDFs. The download link remains available if their browser does not display the preview.

## Legacy notebook migration

Keep the original `.ipynb` as source material, but convert its narrative and figures to Markdown for the site. Copy referenced notebook images into `public/articles/<topic>/` and use local public URLs in the content. The site renders articles as full pages with readable typography, responsive figures, and LaTeX math. Current figure bundles live in `public/articles/vqa/`, `public/articles/ml-data/`, and `public/articles/low-average/`.

## Local checks

```powershell
npm ci
npm run dev -- -p 3001
npm run build
```