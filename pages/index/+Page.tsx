import React, { useState, useEffect } from "react";

// Fonction pour récupérer la couleur d'un type
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

// Composant principal
const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Récupérer la liste des Pokémon
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pokedex.coda.memento-dev.fr/pokemon?limit=30`,
          {
            headers: {
              Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
            },
          }
        );
        const data = await response.json();

        // Enrichir les données avec leurs types via le slug
        const enrichedData = await Promise.all(
          data.map(async (pokemon: any) => {
            const detailsResponse = await fetch(
              `https://pokedex.coda.memento-dev.fr/pokemon/${pokemon.slug}`,
              {
                headers: {
                  Authorization:
                    "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
                },
              }
            );
            const details = await detailsResponse.json();
            return { ...pokemon, types: details.current.types };
          })
        );

        setPokemonList(enrichedData);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Récupérer la liste des types pour le filtre
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://pokedex.coda.memento-dev.fr/type`, {
          headers: {
            Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
          },
        });
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des types :", error);
      }
    };

    fetchTypes();
  }, []);

  // Calculer le gradient des types
  const getGradient = (types: any[]) => {
    if (types.length === 1) {
      const color = getColor(types[0].slug);
      return color; // Couleur unique si un seul type
    } else {
      const colors = types.map((type: any) => getColor(type.slug));
      return `linear-gradient(45deg, ${colors.join(", ")})`; // Gradient pour deux types
    }
  };

  // Gérer la recherche et le filtre
  const filteredPokemons = pokemonList.filter((pokemon: any) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter
      ? pokemon.types.some((type: any) => type.slug === typeFilter)
      : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Liste des Pokémon</h1>

      {/* Recherche et filtre */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un Pokémon..."
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="ml-2 border border-gray-300 rounded p-2"
        >
          <option value="">Tous les types</option>
          {types.map((type: any) => (
            <option key={type.slug} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Liste des Pokémon */}
      {loading ? (
        <p className="text-center">Chargement des Pokémon...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredPokemons.map((pokemon: any) => (
            <div
              key={pokemon.id}
              className="p-0 overflow-x-hidden rounded-md text-center shadow-lg hover:shadow-2xl transition-shadow relative"
              style={{
                background: getGradient(pokemon.types),
                color: "white"
              }}
            >
              <img
                src={pokemon.sprites.normal.male}
                alt={pokemon.name}
                className="mx-auto mt-8"
              />
              <p className="font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 to-stone-950/80 absolute bottom-0">{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;