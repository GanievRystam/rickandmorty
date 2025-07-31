import { Article } from '@/types/article'
import { slugify } from './slugify'
import { store } from '@/store'

const articles = getArticlesFromStore();

function getArticlesFromStore(): Article[] {
  return store.getState().articles.articles
}

export function getAllArticles(): Article[] {
  return getArticlesFromStore()
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getRelatedArticles(currentSlug: string, count = 2): Article[] {
  return articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, count)
}