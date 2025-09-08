'use client';
import { FiHeart, FiDownload, FiShare2, FiSearch, FiX } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { useState, useMemo } from 'react'

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
      comments: 56,
      createdAt: "2024-01-15",
      isContest: false
    },
    {
      id: 2,
      title: "Эпичная битва",
      author: "SpacePainter",
      image: "/fanarts/epic-battle.jpg",
      likes: 892,
      tags: ["битва", "персонажи", "экшен"],
      comments: 23,
      createdAt: "2024-01-20",
      isContest: true
    },
    {
      id: 3,
      title: "Морти и Джессика",
      author: "LoveGazer",
      image: "/fanarts/morty-jessica.jpg",
      likes: 756,
      tags: ["морти", "романтика", "школа"],
      comments: 18,
      createdAt: "2024-01-18",
      isContest: false
    },
    {
      id: 4,
      title: "Злой Рик",
      author: "DarkDimension",
      image: "/fanarts/evil-rick.jpg",
      likes: 2103,
      tags: ["злой рик", "тьма", "альтернативная вселенная"],
      comments: 124,
      createdAt: "2024-01-10",
      isContest: true
    },
    {
      id: 5,
      title: "Саммер воительница",
      author: "FemmeFatale",
      image: "/fanarts/summer-warrior.jpg",
      likes: 1687,
      tags: ["саммер", "экшен", "оружие"],
      comments: 87,
      createdAt: "2024-01-22",
      isContest: false
    },
    {
      id: 6,
      title: "Птичья личность",
      author: "SciFiMaster",
      image: "/fanarts/bird-person.jpg",
      likes: 3056,
      tags: ["птичья личность", "друзья", "грусть"],
      comments: 203,
      createdAt: "2024-01-05",
      isContest: true
    }
  ]

  // Состояния для фильтрации и поиска
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Все работы')
  const [sortBy, setSortBy] = useState<'popular' | 'new' | 'comments'>('popular')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Доступные фильтры
  const filters = [
    { id: 'Все работы', label: 'Все работы', count: 126 },
    { id: 'Популярные', label: 'Популярные' },
    { id: 'Новые', label: 'Новые' },
    { id: 'Конкурсные', label: 'Конкурсные' }
  ]

  // Все доступные теги
  const allTags = Array.from(new Set(fanArts.flatMap(art => art.tags)))

  // Функция для переключения тегов
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Функция для очистки всех фильтров
  const clearFilters = () => {
    setSearchQuery('')
    setActiveFilter('Все работы')
    setSelectedTags([])
    setSortBy('popular')
  }

  // Фильтрация и сортировка фан-артов
  const filteredFanArts = useMemo(() => {
    let result = fanArts.filter(art => {
      // Поиск по названию, автору и тегам
      const matchesSearch = searchQuery === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Фильтрация по категории
      const matchesFilter = activeFilter === 'Все работы' ||
        (activeFilter === 'Популярные' && art.likes > 1000) ||
        (activeFilter === 'Новые' && new Date(art.createdAt) > new Date('2024-01-15')) ||
        (activeFilter === 'Конкурсные' && art.isContest)

      // Фильтрация по тегам
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => art.tags.includes(tag))

      return matchesSearch && matchesFilter && matchesTags
    })

    // Сортировка
    result.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes
        case 'new':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'comments':
          return b.comments - a.comments
        default:
          return 0
      }
    })

    return result
  }, [fanArts, searchQuery, activeFilter, selectedTags, sortBy])

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

            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-[#42f5a7]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию, автору или тегам..."
                className="block w-full pl-10 pr-10 py-3 border border-[#42f5a7]/30 bg-gray-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#42f5a7] focus:border-transparent text-white placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-[#42f5a7] transition-colors"
                >
                  <FiX className="h-5 w-5 text-gray-400 hover:text-[#42f5a7]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-[#42f5a7] text-gray-900'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>{filter.label}</span>
                  {filter.count && (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      activeFilter === filter.id
                        ? 'bg-gray-900 text-[#42f5a7]'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tags Filter */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-300 text-sm">Выбранные теги:</span>
                {selectedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1 bg-[#b362f5] text-white text-xs rounded-full hover:bg-[#b362f5]/80 transition flex items-center gap-1"
                  >
                    #{tag}
                    <FiX className="h-3 w-3" />
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-3 py-1 text-red-300 text-xs hover:text-red-400 transition"
                >
                  Очистить все
                </button>
              </div>
            )}
          </div>

          {/* Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'new' | 'comments')}
                className="appearance-none bg-gray-800 border border-[#b362f5]/50 text-white pl-4 pr-8 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b362f5] cursor-pointer"
              >
                <option value="popular">Лучшие за месяц</option>
                <option value="new">Свежие</option>
                <option value="comments">Самые обсуждаемые</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#b362f5]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {(searchQuery || activeFilter !== 'Все работы' || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm hover:bg-red-500/30 transition flex items-center gap-2"
              >
                <FiX className="h-4 w-4" />
                Очистить всё
              </button>
            )}
          </div>
        </div>

        {/* Available Tags */}
        <div className="mb-8">
          <h3 className="text-gray-300 text-sm mb-3">Популярные теги:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 10).map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  selectedTags.includes(tag)
                    ? 'bg-[#42f5a7] text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {(searchQuery || activeFilter !== 'Все работы' || selectedTags.length > 0) && (
          <div className="mb-6">
            <p className="text-gray-300">
              Найдено работ: <span className="text-[#42f5a7] font-medium">{filteredFanArts.length}</span>
              {searchQuery && (
                <span className="ml-3">
                  По запросу: <span className="text-[#b362f5]">"{searchQuery}"</span>
                </span>
              )}
            </p>
          </div>
        )}

        {/* Fan Arts Grid */}
        {filteredFanArts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFanArts.map((art) => (
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
                  {art.isContest && (
                    <div className="absolute top-3 left-3 bg-[#b362f5] text-white px-2 py-1 rounded-full text-xs font-medium">
                      Конкурс
                    </div>
                  )}
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
                      <span
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full hover:bg-[#42f5a7]/20 hover:text-white transition cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              Фан-арты не найдены
            </div>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#42f5a7] text-gray-900 rounded-full hover:bg-[#42f5a7]/90 transition"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

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