import Link from 'next/link';
import { notFound } from 'next/navigation';
import type {Metadata} from 'next';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { ARTICLES_DATA } from '@/lib/articlesData';

interface ArticlePageProps {
  params: Promise<{slug: string}>;
}

export function generateStaticParams() {
  return ARTICLES_DATA.map(({id}) => ({slug: id}));
}

export async function generateMetadata({params}: ArticlePageProps): Promise<Metadata> {
  const {slug} = await params;
  const article = ARTICLES_DATA.find(({id}) => id === slug);

  if (!article) return {};

  return {
    title: `${article.title} | Md Aamir Iqbal`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({params}: ArticlePageProps) {
  const {slug} = await params;
  const article = ARTICLES_DATA.find(({id}) => id === slug);

  if (!article) notFound();

  const content = article.content.replace(/^\s*#\s+.+\n+/, '');

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-900">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <nav className="mb-12 flex items-center justify-between border-b border-slate-200 pb-4 font-mono text-xs">
          <Link
            href="/#writing"
            className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-indigo-700"
          >
            <ArrowLeft size={14} />
            All writing
          </Link>
          <Link href="/" className="font-semibold text-slate-900 hover:text-indigo-700">
            MD AAMIR IQBAL
          </Link>
        </nav>

        <article className="mx-auto max-w-[720px]">
          <header className="mb-10">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
              {article.category}
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-slate-600">
              {article.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-200 py-3 font-mono text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                {article.readTime}
              </span>
            </div>
          </header>

          {article.format === 'pdf' && article.pdfUrl ? (
            <div>
              <p className="mb-3 text-right font-mono text-xs">
                <a
                  href={article.pdfUrl}
                  download
                  className="text-indigo-700 underline underline-offset-2 hover:text-indigo-900"
                >
                  Download the original PDF
                </a>
              </p>
              <iframe
                src={article.pdfUrl}
                title={article.title}
                className="h-[80vh] min-h-[640px] w-full rounded border border-slate-200 bg-white"
              />
            </div>
          ) : (
            <div className="article-prose">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  img: ({src, alt}) => (
                    // Markdown supplies arbitrary image dimensions, so preserve their intrinsic aspect ratios.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={alt ?? ''} loading="lazy" />
                  ),
                  a: ({href, children}) => (
                    <a href={href} target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          <footer className="mt-16 border-t border-slate-200 pt-6">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/#writing"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold text-indigo-700 hover:text-indigo-900"
            >
              <ArrowLeft size={14} />
              Back to all writing
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
