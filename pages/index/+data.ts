export type Data = {
  pokemonList: any[];
  types: any[];
  total: number;
  currentPage: number;
};

export const data = async ({ queryParams }: { queryParams: { page?: string } }) => {
  const limit = 30;
  const currentPage = parseInt(queryParams?.page || "1", 10);

  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error(`Invalid page parameter: ${queryParams?.page}`);
  }

  const offset = (currentPage - 1) * limit;

  const pokemonResponse = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon?limit=${limit}&offset=${offset}&with=types`,
    {
      headers: {
        Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
      },
    }
  );

  const pokemonList = await pokemonResponse.json();
  const total = parseInt(pokemonResponse.headers.get("X-Total-Count") || "0", 10);

  const typesResponse = await fetch(`https://pokedex.coda.memento-dev.fr/type`, {
    headers: {
      Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
    },
  });
  const types = await typesResponse.json();

  return { pokemonList, types, total, currentPage };
};
