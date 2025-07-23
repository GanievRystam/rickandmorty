export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
}

export interface FilterOptions {
  status: string;
  species: string;
  gender: string;
}