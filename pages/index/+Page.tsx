import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export default function Page() {
  const pokemonList = useData<Data>();
  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold text-center mb-4">Liste des Pokémon</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-10 gap-4">
        {pokemonList.map((pokemon) => (
          <a
            href={`/${pokemon.slug}`}
            key={pokemon.id}
            className="group p-0 h-30 overflow-hidden rounded-lg text-center shadow-md hover:shadow-xl transition-shadow relative border border-black/50"
          >
            <div className="overflow-hidden">
              <img
                src={pokemon.sprites.normal.male}
                alt={pokemon.name}
                className="mx-auto mt-8 drop-shadow-lg group-hover:scale-150 duration-100"
              />
            </div>
            <p className="font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 to-stone-950/80 absolute bottom-0">
              {pokemon.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
