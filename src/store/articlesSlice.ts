import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Article = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  content: string;
};

type ArticlesState = {
  articles: Article[];
};

const initialState: ArticlesState = {
  articles: [
    {
      id: 1,
      title: "Как работает портальная пушка",
      excerpt: "Научный разбор технологии межпространственных путешествий",
      category: "Наука",
      slug: "kak-rabotaet-portalnaya-pushka", // Добавленный slug
      content: "<p>Полное содержание статьи о портальной пушке...</p>",
      publishedAt: "2023-10-15"
    },
    {
      id: 2,
      title: "Все измерения Рика",
      excerpt: "Полный гид по мультивселенной C-137",
      category: "Гайды",
      slug: "vse-izmereniya-rika", // Добавленный slug
      content: "<p>Описание всех измерений...</p>",
      publishedAt: "2023-11-20"
    },
    
    {
      id: 3,
      title: "Лучшие цитаты Рика",
      excerpt: "Сборник самых саркастичных высказываний",
      category: "Цитаты",
      slug: "luchshie-tsitaty-rika", // Добавленный slug
      content: "<p>Подборка цитат...</p>",
      publishedAt: "2023-12-05"
    },
    {
      id: 4,
      title: "Лучшие цитаты Рика 2",
      excerpt: "Сборник самых саркастичных высказываний",
      category: "Цитаты",
      slug: "luchshie-tsitaty-rika2", // Добавленный slug
      content: "<p>Подборка цитат...</p>",
      publishedAt: "2023-12-05"
    }
  ]
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
    addArticle(state, action: PayloadAction<Article>) {
      state.articles.push(action.payload);
    },
    // Можно добавить другие редьюсеры по необходимости
  },
});

export const { setArticles, addArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
export type { Article };