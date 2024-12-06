import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetails } from "../services/api";
import axios from "axios";

// Fonction pour récupérer la couleur selon le type
function getColor(type) {
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

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]); // Liste complète des Pokémon avec détails
  const [filteredPokemonList, setFilteredPokemonList] = useState([]); // Liste filtrée
  const [loading, setLoading] = useState(true); // Chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [types, setTypes] = useState([]); // Liste des types
  const [selectedType, setSelectedType] = useState(""); // Type sélectionné
  const itemsPerPage = 30; // Nombre de Pokémon à afficher par page
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  // Charger la liste de base des Pokémon et compléter avec leurs détails
  const fetchAllPokemonWithDetails = async () => {
    setLoading(true);
    setError(null);
    let allPokemon = [];
    let offset = 0;

    try {
      while (true) {
        const response = await getPokemonList({ limit: itemsPerPage, offset });
        const data = response.data || [];
        allPokemon = [...allPokemon, ...data];

        // Si moins de 30 Pokémon sont retournés, c'est la dernière page
        if (data.length < itemsPerPage) break;

        offset += itemsPerPage; // Passer à la page suivante
      }

      // Récupérer les détails pour chaque Pokémon
      const detailedPokemon = await Promise.all(
        allPokemon.map((pokemon) =>
          getPokemonDetails(pokemon.slug)
            .then((res) => ({ ...pokemon, types: res.data.current.types }))
            .catch((err) => {
              console.error(`Erreur lors de la récupération des détails pour ${pokemon.name}:`, err);
              return pokemon; // Retourner le Pokémon sans type en cas d'échec
            })
        )
      );

      setPokemonList(detailedPokemon);
      setFilteredPokemonList(detailedPokemon); // Initialiser la liste filtrée
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des Pokémon :", err);
      setError("Impossible de charger les Pokémon.");
      setLoading(false);
    }
  };

  // Charger les types
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/types")
      .then((response) => setTypes(response.data || []))
      .catch((err) => console.error("Erreur lors de la récupération des types :", err));
  }, []);

  // Charger tous les Pokémon au montage
  useEffect(() => {
    fetchAllPokemonWithDetails();
  }, []);

  // Appliquer les filtres de recherche et de type
  useEffect(() => {
    let filteredList = pokemonList;

    // Filtrer par nom (recherche)
    if (searchTerm) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par type
    if (selectedType) {
      filteredList = filteredList.filter((pokemon) => {
        if (pokemon.types && Array.isArray(pokemon.types)) {
          return pokemon.types.some((type) => type.slug === selectedType);
        }
        return false;
      });
    }

    setFilteredPokemonList(filteredList);
  }, [searchTerm, selectedType, pokemonList]);

  // Pagination
  const paginatedPokemon = filteredPokemonList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredPokemonList.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1); // Réinitialiser la pagination
  };

  const getBackgroundStyle = (types) => {
    if (!types || types.length === 0) {
      return { background: "#ddd" }; // Couleur par défaut si aucun type
    }

    if (types.length === 1) {
      const color = getColor(types[0].slug);
      return { background: color }; // Couleur unique si un seul type
    }

    // Si deux types, créer un dégradé
    const color1 = getColor(types[0].slug);
    const color2 = getColor(types[1].slug);
    return {
      background: `linear-gradient(45deg, ${color1}, ${color2})`,
    };
  };

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (loading) {
    return <div class="mt-6 bg-blue-500 text-white font-black w-fit mx-auto flex px-4 py-2 rounded-md shadow-md border-2 border-blue-800">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>Chargement des Pokémon...</div>;
  }

  return (
    <div className="container mx-2 sm:mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Pokédex</h1>

      {/* Barre de recherche */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Rechercher un Pokémon par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md border-white bg-black text-white px-4 py-2 w-full max-w-md"
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="border border-white bg-black text-white rounded-md px-4 py-2"
        >
          <option value="">Tous les types</option>
          {types.map((type) => (
            <option key={type.slug} value={type.slug}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 m-4">
        {paginatedPokemon.map((pokemon) => (
          <a
            key={pokemon.slug}
            href={`/pokemon/${pokemon.slug}`}
            className="p-4 text-center border border-black rounded-lg shadow-lg"
            style={getBackgroundStyle(pokemon.types)} // Appliquer le style de fond
          >
            <img
              src={pokemon.sprites?.normal?.male || "https://via.placeholder.com/150"}
              alt={pokemon.name}
              className="mx-auto drop-shadow-2xl"
            />
            <p className="text-white font-semibold">{pokemon.name}</p>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Précédent
        </button>
        <span className="text-gray-700">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredPokemonList.length}
          className={`px-4 py-2 rounded ${
            currentPage * itemsPerPage >= filteredPokemonList.length
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default HomePage;
