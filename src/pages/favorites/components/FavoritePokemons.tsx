import { createSignal, For, onMount } from 'solid-js';

import { getPokemons, removeFavoritePokemon } from '@/services/indexDB.service';
import type { FavoritePokemon } from '@/types/pokemon.types';
import { FavoritePokemonCard } from './FavoritePokemonCard';

export const FavoritePokemons = () => {
  const [favoritePokemons, setFavoritePokemons] = createSignal<
    FavoritePokemon[]
  >([]);

  onMount(async () => {
    const favoritePokemons = await getPokemons();
    setFavoritePokemons(favoritePokemons);
  });

  const deleteFavoritePokemon = (favoritePokemonId: string) => {
    removeFavoritePokemon(favoritePokemonId).then(() => {
      const filteredFavoritePokemons = favoritePokemons().filter(
        (favoritePokemon) => favoritePokemon.id !== favoritePokemonId
      );

      setFavoritePokemons(filteredFavoritePokemons);
    });
  };

  return (
    <section class="mt-4 grid grid-cols-2 sm:grid-cols-4">
      <For each={favoritePokemons()}>
        {(favoritePokemon) => (
          <FavoritePokemonCard
            favoritePokemon={favoritePokemon}
            deleteFavoritePokemon={deleteFavoritePokemon}
          />
        )}
      </For>
    </section>
  );
};
