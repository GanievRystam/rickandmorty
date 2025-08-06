import ArticlesList from '@/app/components/ArticlesList'
import { getAllArticles } from '@/lib/articles'
import { FiSearch, FiChevronRight } from 'react-icons/fi'

export default function ArticlesPage() {
  const articles = getAllArticles()
  
  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/img/portal-bg-pattern.webp')] bg-fixed bg-cover">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff099b]/20 to-gray-900/90 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-['Orbitron'] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#42f5a7]">
                База знаний
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Вселенная Рика и Морти - научные факты, персонажи и технологии
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-[#ff099b]" />
              </div>
              <input
                type="text"
                placeholder="Найти статью..."
                className="block w-full pl-10 pr-3 py-3 border border-[#ff099b]/30 bg-gray-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff099b] focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 bg-[#ff099b] text-white rounded-full text-sm font-medium">
            Все
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition">
            Наука
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition">
            Персонажи
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition">
            Технологии
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition">
            Измерения
          </button>
        </div>

        {/* Articles Grid */}
        <ArticlesList articles={articles}/>

        {/* View More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-[#ff099b] text-[#ff099b] rounded-full hover:bg-[#ff099b] hover:text-white transition-all duration-300 group">
            Показать больше статей
            <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#ff099b] opacity-20"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}