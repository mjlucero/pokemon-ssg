export type PokemonItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: PokemonItem[];
};

export type FavoritePokemon = {
  id: string;
  name: string;
};
