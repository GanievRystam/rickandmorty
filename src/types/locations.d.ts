export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Ссылки на персонажей
}

export interface FilterOptions {
  type:string;
  dimension:string
}