import type { PokemonDetails } from "../types";

export type Data = PokemonDetails;

export const data = async ({ routeParams }: { routeParams: { slug: string } }) => {
  const { slug } = routeParams;

  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon/${slug}`,
    {
      headers: {
        Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokémon: ${slug}`);
  }

  const pokemon: PokemonDetails = (await response.json()).current;

  return pokemon;
};
