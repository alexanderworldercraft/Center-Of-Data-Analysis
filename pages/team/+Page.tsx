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

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 30;

  // Récupérer la liste des Pokémon avec filtre global
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * limit;

        // Construire la querystring
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
          with: "types",
          ...(search && { search }), // Ajoute "search" si non vide
          ...(typeFilter && { type: typeFilter }), // Ajoute "type" si un type est sélectionné
        });

        const response = await fetch(
          `https://pokedex.coda.memento-dev.fr/pokemon?${params.toString()}`,
          {
            headers: {
              Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi",
            },
          }
        );
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage, search, typeFilter]); // Recharge lorsque la page, la recherche ou le filtre changent

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

  // Gestion de la recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Gestion du filtre
  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Gérer le changement de page
  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") setCurrentPage((prev) => prev + 1);
    else if (direction === "prev" && currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold text-center mb-4">Liste des Pokémon</h1>

      {/* Recherche et filtre */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Rechercher un Pokémon..."
          className="bg-black text-white border border-grey-100 shadow-lg rounded p-2 w-full max-w-md"
        />
        <select
          value={typeFilter}
          onChange={handleTypeFilterChange}
          className="ml-2 bg-black text-white border border-gray-100 rounded p-2"
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
        <div>
          <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-10 gap-4">
            {pokemonList.map((pokemon: any) => (
              <a
                href={`/pokemon/${pokemon.slug}`}
                key={pokemon.id}
                className="group p-0 h-30 overflow-x-hidden rounded-lg text-center shadow-md hover:shadow-xl transition-shadow relative border border-black/50"
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
                <p className="font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 via-65% to-stone-950/80 absolute bottom-0">
                  {pokemon.name}
                </p>
              </a>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange("prev")}
              className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <p>Page {currentPage}</p>
            <button
              onClick={() => handlePageChange("next")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;