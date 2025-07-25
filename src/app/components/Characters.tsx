import React, { useState, useEffect } from 'react';
import { Character, FilterOptions } from '@/types/characters';

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    species: '',
    gender: '',
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        let url = 'https://rickandmortyapi.com/api/character';
        const queryParams = new URLSearchParams();

        if (filters.status) queryParams.append('status', filters.status);
        if (filters.species) queryParams.append('species', filters.species);
        if (filters.gender) queryParams.append('gender', filters.gender);

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch characters');
        const data = await response.json();
        setCharacters(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-8 text-white">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <section className="py-12 px-6 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-10 text-center text-[#ff099b] tracking-tight">
          Characters Universe
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['status', 'species', 'gender'].map((field) => (
            <select
              key={field}
              name={field}
              onChange={handleFilterChange}
              className="relative bg-black/50 border border-pink-500/50 backdrop-blur-md text-white px-4 py-2 pr-10 rounded-lg hover:border-pink-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 transition-all duration-300 ease-in-out appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=%22%23ff099b%22 height=%2220%22 viewBox=%220 0 24 24%22 width=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px] hover:scale-105 focus:scale-105"
            >
              <option value="">All {field.charAt(0).toUpperCase() + field.slice(1)}</option>
              {field === 'status' && ['alive', 'dead', 'unknown'].map(v => <option key={v} value={v} className="bg-gray-900 text-white">{v}</option>)}
              {field === 'species' && ['human', 'alien', 'robot'].map(v => <option key={v} value={v} className="bg-gray-900 text-white">{v}</option>)}
              {field === 'gender' && ['male', 'female', 'genderless'].map(v => <option key={v} value={v} className="bg-gray-900 text-white">{v}</option>)}
            </select>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative group bg-black/60 backdrop-blur-md border border-[#ff099b]/20 hover:border-[#ff099b]/60 rounded-xl overflow-hidden transition-shadow hover:shadow-[0_0_20px_#ff099baa]"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="relative p-4">
                <h3 className="text-xl font-semibold text-[#ff099b]">{character.name}</h3>
                <p className="text-gray-300 mt-1 text-sm">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${character.status === 'Alive' ? 'bg-green-500' :
                      character.status === 'Dead' ? 'bg-red-500' : 'bg-yellow-400'
                    }`} />
                  {character.status} — {character.species}
                </p>
                <p className="text-gray-400 mt-1 text-sm">Last seen: {character.location.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Characters;
