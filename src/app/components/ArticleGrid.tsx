import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types/article'

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.slug}`}
          className="group relative rounded-xl border border-[#ff099b]/20 bg-black/70 backdrop-blur-md overflow-hidden transition hover:border-[#ff099b]/60 hover:shadow-[0_0_25px_#ff099baa] hover:scale-[1.01] duration-300"
        >
          {article.image && (
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
            </div>
          )}

          <div className="p-5">
            <span className="text-[11px] font-mono px-2 py-1 bg-[#ff099b]/10 text-[#ff099b] rounded tracking-wide uppercase">
              {article.category}
            </span>
            <h3 className="text-lg font-bold mt-3 mb-2 text-white group-hover:text-[#ff099b] transition">
              {article.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-3 font-light">
              {article.excerpt}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff099b] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </div>
  )
}
