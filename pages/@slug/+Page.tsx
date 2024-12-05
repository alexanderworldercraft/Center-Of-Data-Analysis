import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export default function Page() {
  const pokemon = useData<Data>();

  if (!pokemon) {
    return (
      <p className="text-center text-red-50 italic font-black rounded-full shadow-lg bg-red-500 border-2 border-red-800">
        ⚠️ Aucun Pokémon trouvé.
      </p>
    );
  }

  return (
    <div className="p-4 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">{pokemon.name}</h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <img
          src={pokemon.sprites.normal.male}
          alt={pokemon.name}
          className="w-64 h-64 object-contain"
        />
        <div className="mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.slug} className="mb-2">
                <span className="font-semibold">{stat.name}:</span>{" "}
                {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {pokemon.previous && (
          <a
            href={`/pokemon/${pokemon.previous.slug}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← {pokemon.previous.name}
          </a>
        )}
        {pokemon.next && (
          <a
            href={`/pokemon/${pokemon.next.slug}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {pokemon.next.name} →
          </a>
        )}
      </div>
    </div>
  );
}
