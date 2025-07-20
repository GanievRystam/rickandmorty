import { getAllArticles } from '@/lib/articles'

export default async function sitemap() {
  const articles = getAllArticles()
  
  return [
    {
      url: 'https://yourdomain.com/articles',
      lastModified: new Date(),
    },
    ...articles.map(article => ({
      url: `https://yourdomain.com/articles/${article.slug}`,
      lastModified: new Date(article.publishedAt),
    })),
  ]
}