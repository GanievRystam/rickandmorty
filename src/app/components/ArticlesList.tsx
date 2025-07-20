import Link from 'next/link'
import { Article } from '@/types/article'

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map(article => (
        <Link
          key={article.id}
          href={`/articles/${article.slug}`}
          className="group block bg-black/50 border border-[#42f5a7]/20 rounded-xl p-6 hover:border-[#42f5a7]/50 transition"
        >
          <span className="text-xs font-mono px-2 py-1 bg-[#42f5a7]/10 text-[#42f5a7] rounded">
            {article.category}
          </span>
          <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-[#42f5a7] transition">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm">{article.excerpt}</p>
        </Link>
      ))}
    </div>
  )
}