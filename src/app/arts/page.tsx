import { FiHeart, FiDownload, FiShare2 } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'

export default function Arts() {
  // Моковые данные фан-артов
  const fanArts = [
    {
      id: 1,
      title: "Рик в мультивселенной",
      author: "MortyArt",
      image: "/fanarts/rick-multiverse.jpg",
      likes: 1428,
      tags: ["рик", "мультивселенная", "порталы"],
      comments: 56
    },
    {
      id: 2,
      title: "Эпичная битва",
      author: "SpacePainter",
      image: "/fanarts/epic-battle.jpg",
      likes: 892,
      tags: ["битва", "персонажи", "экшен"],
      comments: 23
    },
    {
      id: 3,
      title: "Морти и Джессика",
      author: "LoveGazer",
      image: "/fanarts/morty-jessica.jpg",
      likes: 756,
      tags: ["морти", "романтика", "школа"],
      comments: 18
    },
    {
      id: 4,
      title: "Злой Рик",
      author: "DarkDimension",
      image: "/fanarts/evil-rick.jpg",
      likes: 2103,
      tags: ["злой рик", "тьма", "альтернативная вселенная"],
      comments: 124
    },
    {
      id: 5,
      title: "Саммер воительница",
      author: "FemmeFatale",
      image: "/fanarts/summer-warrior.jpg",
      likes: 1687,
      tags: ["саммер", "экшен", "оружие"],
      comments: 87
    },
    {
      id: 6,
      title: "Птичья личность",
      author: "SciFiMaster",
      image: "/fanarts/bird-person.jpg",
      likes: 3056,
      tags: ["птичья личность", "друзья", "грусть"],
      comments: 203
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/img/portal-bg-pattern.webp')] bg-fixed bg-cover">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#42f5a7]/20 to-gray-900/90 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-['Orbitron'] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#42f5a7] to-[#b362f5]">
                Фан-Арт Галактика
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Творчество фанатов со всех уголков мультивселенной
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#42f5a7] text-gray-900 rounded-full text-sm font-bold flex items-center">
              <span>Все работы</span>
              <span className="ml-2 bg-gray-900 text-[#42f5a7] rounded-full px-2 py-0.5 text-xs">
                126
              </span>
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
              <span>Популярные</span>
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
              <span>Новые</span>
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
              <span>Конкурсные</span>
            </button>
          </div>

          <div className="relative w-full md:w-auto">
            <select className="appearance-none bg-gray-800 border border-[#b362f5]/50 text-white pl-4 pr-8 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b362f5] cursor-pointer">
              <option>Сортировать по</option>
              <option>Лучшие за месяц</option>
              <option>Самые обсуждаемые</option>
              <option>Свежие</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#b362f5]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fan Arts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fanArts.map((art) => (
            <div key={art.id} className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-[#42f5a7]/30 hover:border-[#b362f5] transition-all duration-300 hover:shadow-[0_0_20px_rgba(179,98,245,0.3)]">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{art.title}</h3>
                  <p className="text-[#42f5a7] text-sm">by @{art.author}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-300 hover:text-[#42f5a7] transition">
                      <FiHeart className="mr-1" />
                      <span>{art.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-300 hover:text-[#42f5a7] transition">
                      <FaRegComment className="mr-1" />
                      <span>{art.comments}</span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-300 hover:text-[#b362f5] hover:bg-gray-700/50 rounded-full transition">
                      <FiDownload />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-[#b362f5] hover:bg-gray-700/50 rounded-full transition">
                      <FiShare2 />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {art.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-[#42f5a7]/20 hover:text-white transition">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-[#42f5a7]/30 text-[#42f5a7] rounded-full hover:bg-[#42f5a7]/10 transition">
              Назад
            </button>
            <button className="px-4 py-2 bg-[#42f5a7] text-gray-900 font-bold rounded-full">
              1
            </button>
            <button className="px-4 py-2 border border-[#42f5a7]/30 text-[#42f5a7] rounded-full hover:bg-[#42f5a7]/10 transition">
              2
            </button>
            <button className="px-4 py-2 border border-[#42f5a7]/30 text-[#42f5a7] rounded-full hover:bg-[#42f5a7]/10 transition">
              3
            </button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-4 py-2 border border-[#42f5a7]/30 text-[#42f5a7] rounded-full hover:bg-[#42f5a7]/10 transition">
              8
            </button>
            <button className="px-4 py-2 border border-[#42f5a7]/30 text-[#42f5a7] rounded-full hover:bg-[#42f5a7]/10 transition">
              Вперед
            </button>
          </nav>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#42f5a7] opacity-20"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}