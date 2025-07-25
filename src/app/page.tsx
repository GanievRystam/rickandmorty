"use client";
import ArticleGrid from './components/ArticleGrid';
import GoToChat from './components/GoToChat';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SliderFun from './components/sliderFun';
import Characters from './components/Characters';
import Locations from './components/Locations';
import QuizPlay from './components/QuizPlay';
export default function Home() {
  const articles = useSelector((state: RootState) => state.articles.articles);

  return (
    <div className="min-h-screen bg-[black] text-white overflow-x-hidden">

      <GoToChat/>

      {/* Слайдер статей */}
      <section className="py-16 bg-gradient-to-b from-black/0 bg-[black]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#42f5a7] flex items-center">
            <span className="w-4 h-4 rounded-full bg-[black] mr-3"></span>
            База знаний
          </h2>

            <ArticleGrid
              articles={
                articles.map(article => ({
                  ...article,
                  id: String(article.id),
                }))
              }
            />
        </div>
      </section>
      <SliderFun/>
      <Characters/>
      <QuizPlay/>
      <Locations/>

      
    </div>
  )
}