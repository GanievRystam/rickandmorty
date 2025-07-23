import React, { useState, useEffect } from 'react';
import { Character, FilterOptions } from '@/types/characters'; // Типы вынесены в отдельный файл

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-green-400">
          Meet the Characters
        </h2>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            name="status"
            onChange={handleFilterChange}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <select
            name="species"
            onChange={handleFilterChange}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            <option value="">All Species</option>
            <option value="human">Human</option>
            <option value="alien">Alien</option>
            <option value="robot">Robot</option>
          </select>

          <select
            name="gender"
            onChange={handleFilterChange}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <div
              key={character.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                <p className="text-gray-400">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    character.status === 'Alive' ? 'bg-green-500' :
                    character.status === 'Dead' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                  {character.status} - {character.species}
                </p>
                <p className="text-gray-400 mt-1">Last seen: {character.location.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Characters;