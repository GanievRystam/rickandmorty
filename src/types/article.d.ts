export interface Article {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    publishedAt: string
    image?: string
    metaDescription?: string
    tags?: string[]
  }