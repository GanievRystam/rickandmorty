import { Article } from '@/types/article'
import { slugify } from './slugify'

export const articles: Article[] = [
  {
    id: 1,
    title: "Как работает портальная пушка",
    excerpt: "Научный разбор технологии межпространственных путешествий",
    content: "<p>Подробное описание работы портальной пушки...</p>",
    category: "Наука",
    slug: "kak-rabotaet-portalnaya-pushka", // Правильный slug
    publishedAt: "2023-10-15",
    image: "/images/portal-gun.jpg"
  },
  {
    id: 2,
    title: "Все измерения Рика",
    excerpt: "Полный гид по мультивселенной C-137",
    content: "<p>Описание всех измерений...</p>",
    category: "Гайды",
    slug: "vse-izmereniya-rika",
    publishedAt: "2023-11-20"
  },
  {
    id: 3,
    title: "Лучшие цитаты Рика",
    excerpt: "Сборник самых саркастичных высказываний",
    content: "<p>Подборка цитат...</p>",
    category: "Цитаты",
    slug: "luchshie-tsitaty-rika",
    publishedAt: "2023-12-05"
  }
]


export function getAllArticles(): Article[] {
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  console.log('articles', articles);
  return articles.find(article => article.slug === slug)
}

export function getRelatedArticles(currentSlug: string, count = 2): Article[] {
  return articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, count)
}