import React, { useState } from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

function getColor(type: string): string {
  const colors = new Map([
    ["bug", "#a6b91a"],
    ["dark", "#705746"],
    ["dragon", "#6f35fc"],
    ["electric", "#f7d02c"],
    ["fairy", "#d685ad"],
    ["fighting", "#c22e28"],
    ["fire", "#ee8130"],
    ["flying", "#a98ff3"],
    ["ghost", "#735797"],
    ["grass", "#7ac74c"],
    ["ground", "#e2bf65"],
    ["ice", "#96d9d6"],
    ["normal", "#a8a77a"],
    ["poison", "#a33ea1"],
    ["psychic", "#f95587"],
    ["rock", "#b6a136"],
    ["steel", "#b7b7ce"],
    ["water", "#6390f0"],
  ]);
  return colors.get(type) || "#777";
}

export default function Page() {
  const { pokemonList, types, total, currentPage } = useData<Data>();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const limit = 30;

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter
      ? pokemon.types.some((type: any) => type.slug === typeFilter)
      : true;
    return matchesSearch && matchesType;
  });

  const getGradient = (types: any[]) => {
    if (types.length === 1) {
      return getColor(types[0].slug);
    }
    const colors = types.map((type) => getColor(type.slug));
    return `linear-gradient(45deg, ${colors.join(", ")})`;
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold text-center mb-4">Liste des Pokémon</h1>

      {/* Recherche et filtre */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un Pokémon..."
          className="bg-black text-white border border-grey-100 shadow-lg rounded p-2 w-full max-w-md"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="ml-2 bg-black text-white border border-gray-100 rounded p-2"
        >
          <option value="">Tous les types</option>
          {types.map((type) => (
            <option key={type.slug} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des Pokémon */}
      <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-10 gap-4">
        {filteredPokemon.map((pokemon) => (
          <a
            href={`/pokemon/${pokemon.slug}`}
            key={pokemon.id}
            className="group p-0 h-30 overflow-hidden rounded-lg text-center shadow-md hover:shadow-xl transition-shadow relative border border-black/50"
            style={{
              background: getGradient(pokemon.types),
              color: "white",
            }}
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <a
          href={`?page=${currentPage - 1}`}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Précédent
        </a>
        <p>
          Page {currentPage} / {Math.ceil(total / limit)}
        </p>
        <a
          href={`?page=${currentPage + 1}`}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage * limit >= total ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Suivant
        </a>
      </div>
    </div>
  );
}
