import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles'
import type { Metadata } from 'next'
import ArticlesList from '@/app/components/ArticlesList'

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
  const articles = await getAllArticles() // Используем функцию для получения статей
  return articles.map((article: { slug: any }) => ({ slug: article.slug }))
}

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug) // Используем импортированную функцию
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(article.slug)

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{article.category}</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
          </time>
        </div>
      </header>

      <div 
        className="prose prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />

      {relatedArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
          <ArticlesList articles={relatedArticles} />
        </section>
      )}
    </article>
  )
}
