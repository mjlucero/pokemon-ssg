import type { Component } from 'solid-js';

import type { FavoritePokemon } from '@/types/pokemon.types';

type Props = {
  favoritePokemon: FavoritePokemon;
  deleteFavoritePokemon: (favoritePokemonId: string) => void;
};

export const FavoritePokemonCard: Component<Props> = (props) => {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.favoritePokemon.id}.png`;

  return (
    <article class="flex flex-col justify-center items-center">
      <a href={`/pokemons/${props.favoritePokemon.name}`}>
        <img
          src={imgSrc}
          alt={`${props.favoritePokemon.name} Image`}
          width={100}
          height={100}
        />
        <p class="capitalize">
          #{props.favoritePokemon.id} {props.favoritePokemon.name}
        </p>
      </a>
      <button
        class="text-red-500"
        onClick={() => props.deleteFavoritePokemon(props.favoritePokemon.id)}
      >
        Delete
      </button>
    </article>
  );
};
