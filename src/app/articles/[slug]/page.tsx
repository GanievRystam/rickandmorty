import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import type { Metadata } from 'next'
import ArticlesList from '@/app/components/ArticlesList'
import './styles.css'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}

  return {
    title: `${article.title} | Рик и Морти Wiki`,
    description: article.excerpt,
    openGraph: {
      images: article.image ? [article.image] : [],
    },
    alternates: {
      canonical: `/articles/${article.slug}`,
    }
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article: { slug: any }) => ({ slug: article.slug }))
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(article.slug)

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/img/portal-bg-pattern.webp')] bg-fixed bg-cover">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="inset-0 bg-gradient-to-b from-[#ff099b]/20 to-gray-900/90 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-[#ff099b] bg-[#ff099b]/10 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {article.title}
            </h1>
            <div className="flex justify-center items-center gap-4 text-gray-300">
              <time dateTime={article.publishedAt} className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[#ff099b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
              </time>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[#ff099b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {Math.ceil(article.content.split(' ').length / 200)} мин. чтения
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Floating sidebar for table of contents (optional) */}
        <div className="hidden lg:block left-0 mb-4 w-full">
          <div className="sticky top-32 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-[#ff099b]/20 shadow-lg">
            <h3 className="text-[#ff099b] font-bold">Содержание</h3>
            <ul className="space-y-2 text-sm">
              {article.headings?.map((heading: { id: string, text: string }) => (
                <li key={heading.id}>
                  <a 
                    href={`#${heading.id}`} 
                    className="hover:text-[#ff099b] transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-[#ff099b]/20 shadow-xl">
          {article.image && (
            <div className="mb-10 rounded-xl overflow-hidden border border-[#ff099b]/30">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <article 
            className="prose prose-invert prose-lg max-w-none 
                      prose-headings:text-[#ff099b] prose-a:text-[#42f5a7]
                      prose-blockquote:border-l-[#ff099b] prose-blockquote:bg-gray-700/50
                      prose-code:bg-gray-700 prose-pre:bg-gray-900
                      prose-img:rounded-xl prose-img:border prose-img:border-[#ff099b]/30"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm bg-[#ff099b]/10 text-[#ff099b] rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#42f5a7]">
              Похожие статьи
            </span>
          </h2>
          <ArticlesList 
            articles={relatedArticles} 
          />
        </section>
      )}

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8">
        <button 
          className="p-3 bg-[#ff099b] text-white rounded-full shadow-lg hover:bg-[#e00080] transition-all hover:scale-110"
          aria-label="Наверх"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  )
}