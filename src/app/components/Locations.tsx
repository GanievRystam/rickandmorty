import React, { useState, useEffect } from 'react';
import { Location} from '@/types/locations'; // Общие типы
import { FilterOptions } from '@/types/locations'; // Общие типы

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    dimension: '',
  });

  // Загрузка локаций
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        let url = 'https://rickandmortyapi.com/api/location';
        const queryParams = new URLSearchParams();

        if (filters.type) queryParams.append('type', filters.type);
        if (filters.dimension) queryParams.append('dimension', filters.dimension);

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [filters]);

  // Обработчик фильтров
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">
          Explore the Multiverse
        </h2>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            name="type"
            onChange={handleFilterChange}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            <option value="">All Types</option>
            <option value="planet">Planet</option>
            <option value="space station">Space Station</option>
            <option value="dimension">Dimension</option>
          </select>

          <select
            name="dimension"
            onChange={handleFilterChange}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            <option value="">All Dimensions</option>
            <option value="unknown">Unknown</option>
            <option value="Dimension C-137">Dimension C-137</option>
            <option value="Post-Apocalyptic">Post-Apocalyptic</option>
          </select>
        </div>

        {/* Сетка локаций */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map(location => (
            <div
              key={location.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/30"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                <p className="text-gray-400 mb-1">
                  <span className="font-semibold text-purple-400">Type:</span> {location.type}
                </p>
                <p className="text-gray-400 mb-1">
                  <span className="font-semibold text-purple-400">Dimension:</span> {location.dimension}
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold text-purple-400">Residents:</span> {location.residents.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;