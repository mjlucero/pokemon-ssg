import type { PokemonListResponse } from '../types/pokemon.types';

export async function getPokemons() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');

  return (await res.json()) as PokemonListResponse;
}
