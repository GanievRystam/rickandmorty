import { FiSearch, FiChevronRight, FiFilter } from 'react-icons/fi'
import { FaRegSadTear, FaRegLaughSquint } from 'react-icons/fa'

export default function Characters() {
  // Моковые данные персонажей
  const characters = [
    {
      id: 1,
      name: "Рик Санчез",
      status: "Гений",
      species: "Человек",
      dimension: "C-137",
      image: "/characters/rick.jpg",
      episodes: 51,
      tags: ["главный герой", "ученый", "алкоголик"]
    },
    {
      id: 2,
      name: "Морти Смит",
      status: "Подросток",
      species: "Человек",
      dimension: "C-137",
      image: "/characters/morty.jpg",
      episodes: 51,
      tags: ["главный герой", "школьник", "трусливый"]
    },
    {
      id: 3,
      name: "Саммер Смит",
      status: "Студентка",
      species: "Человек",
      dimension: "C-137",
      image: "/characters/summer.jpg",
      episodes: 42,
      tags: ["сестра", "подросток", "саркастичная"]
    },
    {
      id: 4,
      name: "Бет Смит",
      status: "Хирург",
      species: "Человек",
      dimension: "C-137",
      image: "/characters/beth.jpg",
      episodes: 38,
      tags: ["мать", "врач", "амбициозная"]
    },
    {
      id: 5,
      name: "Джерри Смит",
      status: "Безработный",
      species: "Человек",
      dimension: "C-137",
      image: "/characters/jerry.jpg",
      episodes: 45,
      tags: ["отец", "неудачник", "наивный"]
    },
    {
      id: 6,
      name: "Птичья Личность",
      status: "Мёртв",
      species: "Птичий человек",
      dimension: "C-137",
      image: "/characters/bird-person.jpg",
      episodes: 12,
      tags: ["друг Рика", "воин", "трагичный"]
    },
    {
      id: 7,
      name: "Мистер Жопосранчик",
      status: "Жив",
      species: "Неизвестно",
      dimension: "Неизвестно",
      image: "/characters/poopy.jpg",
      episodes: 5,
      tags: ["загадочный", "комичный", "инопланетянин"]
    },
    {
      id: 8,
      name: "Злой Морти",
      status: "На свободе",
      species: "Человек",
      dimension: "Неизвестно",
      image: "/characters/evil-morty.jpg",
      episodes: 7,
      tags: ["злодей", "гений", "загадочный"]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/img/character-bg-pattern.webp')] bg-fixed bg-cover">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff099b]/20 to-gray-900/90 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-['Orbitron'] tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#42f5a7]">
                Все Персонажи
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Полная энциклопедия всех героев и злодеев мультивселенной
            </p>
            
            {/* Search and Filters */}
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-[#ff099b]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Найти персонажа..."
                    className="block w-full pl-10 pr-3 py-3 border border-[#ff099b]/30 bg-gray-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff099b] focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-[#42f5a7]/30 rounded-xl text-white flex items-center justify-center gap-2 transition">
                  <FiFilter className="text-[#42f5a7]" />
                  <span>Фильтры</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 bg-[#ff099b] text-white rounded-full text-sm font-bold flex items-center">
            Все
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
            <span>Главные герои</span>
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
            <span>Люди</span>
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
            <span>Инопланетяне</span>
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
            <span>Злодеи</span>
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition flex items-center gap-1">
            <span>Из C-137</span>
          </button>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <div key={character.id} className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-[#42f5a7]/30 hover:border-[#ff099b] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,9,155,0.3)]">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-xl mb-1">{character.name}</h3>
                  <p className="text-[#42f5a7] text-sm">{character.species} • {character.dimension}</p>
                </div>
                <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {character.episodes} эп.
                </div>
                {character.status === "Мёртв" ? (
                  <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <FaRegSadTear className="mr-1" /> {character.status}
                  </div>
                ) : character.status === "Гений" ? (
                  <div className="absolute top-3 left-3 bg-[#42f5a7]/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <FaRegLaughSquint className="mr-1" /> {character.status}
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {character.status}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2">{character.name}</h3>
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>{character.species}</span>
                  <span>{character.dimension}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {character.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-[#ff099b]/20 hover:text-white transition">
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
            <button className="px-4 py-2 border border-[#ff099b]/30 text-[#ff099b] rounded-full hover:bg-[#ff099b]/10 transition">
              Назад
            </button>
            <button className="px-4 py-2 bg-[#ff099b] text-white font-bold rounded-full">
              1
            </button>
            <button className="px-4 py-2 border border-[#ff099b]/30 text-[#ff099b] rounded-full hover:bg-[#ff099b]/10 transition">
              2
            </button>
            <button className="px-4 py-2 border border-[#ff099b]/30 text-[#ff099b] rounded-full hover:bg-[#ff099b]/10 transition">
              3
            </button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-4 py-2 border border-[#ff099b]/30 text-[#ff099b] rounded-full hover:bg-[#ff099b]/10 transition">
              8
            </button>
            <button className="px-4 py-2 border border-[#ff099b]/30 text-[#ff099b] rounded-full hover:bg-[#ff099b]/10 transition">
              Вперед
            </button>
          </nav>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#ff099b] opacity-10"
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