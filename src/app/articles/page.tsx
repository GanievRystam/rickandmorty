import ArticlesList from '@/app/components/ArticlesList'
import { getAllArticles } from '@/lib/articles'

export default function ArticlesPage() {
  const articles = getAllArticles()
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">База знаний</h1>
      <ArticlesList articles={articles} />
    </div>
  )
}