import type { Pokemon } from "../types";

export type Data = Pokemon[];

export const data = async () => {
  const response = await fetch("https://pokedex.coda.memento-dev.fr/pokemon", {
    headers: {
      Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon data");
  }

  const pokemonList: Pokemon[] = await response.json();

  return pokemonList;
};
