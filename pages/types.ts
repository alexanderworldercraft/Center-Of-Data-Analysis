export type Pokemon = {
    id: number;
    slug: string;
    name: string;
    sprites: {
      shiny: { male: string | null; female: string | null };
      normal: { male: string | null; female: string | null };
    };
  };
  
  export type PokemonDetails = Pokemon & {
    types: Array<{ name: string; slug: string }>;
    stats: Array<{ name: string; slug: string; base_stat: number }>;
    previous?: Pokemon;
    next?: Pokemon;
  };
  
  