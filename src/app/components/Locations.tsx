import React, { useState, useEffect } from 'react';
import { Location } from '@/types/locations';
import { FilterOptions } from '@/types/locations';

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    dimension: '',
  });

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center py-16 text-pink-400">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-16">Error: {error}</div>;

  return (
    <section className="py-16 px-4 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-pink-400 to-fuchsia-500 text-transparent bg-clip-text">
          Explore the Multiverse
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <select
            name="type"
            onChange={handleFilterChange}
            className="bg-gray-800 text-white border border-pink-500 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">All Types</option>
            <option value="planet">Planet</option>
            <option value="space station">Space Station</option>
            <option value="dimension">Dimension</option>
          </select>

          <select
            name="dimension"
            onChange={handleFilterChange}
            className="bg-gray-800 text-white border border-pink-500 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          >
            <option value="">All Dimensions</option>
            <option value="unknown">Unknown</option>
            <option value="Dimension C-137">Dimension C-137</option>
            <option value="Post-Apocalyptic">Post-Apocalyptic</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map(location => (
            <div
              key={location.id}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-[2px] rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gray-900 rounded-2xl p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{location.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">
                    <span className="text-pink-400 font-medium">Type:</span> {location.type}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    <span className="text-pink-400 font-medium">Dimension:</span> {location.dimension}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="text-pink-400 font-medium">Residents:</span> {location.residents.length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
