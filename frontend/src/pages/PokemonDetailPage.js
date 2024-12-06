import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../services/api";

// Fonction pour obtenir la couleur en fonction du type
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

function PokemonDetailPage() {
  const { slug } = useParams(); // Récupérer le slug depuis l'URL
  const [pokemon, setPokemon] = useState(null); // Détails du Pokémon actuel
  const [previousPokemon, setPreviousPokemon] = useState(null); // Détails du Pokémon précédent
  const [nextPokemon, setNextPokemon] = useState(null); // Détails du Pokémon suivant
  const [loading, setLoading] = useState(true); // Chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [currentImage, setCurrentImage] = useState(""); // Image actuellement affichée

  // Charger les détails du Pokémon
  useEffect(() => {
    setLoading(true);
    setError(null);

    getPokemonDetails(slug)
      .then((response) => {
        const current = response.data.current;
        setPokemon(current); // Extraire le Pokémon actuel
        setPreviousPokemon(response.data.previous); // Extraire le Pokémon précédent
        setNextPokemon(response.data.next); // Extraire le Pokémon suivant

        // Définir l'image par défaut sur la version normale mâle
        setCurrentImage(current.sprites?.normal?.male || "https://via.placeholder.com/150");

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des détails :", err);
        setError("Impossible de charger les détails du Pokémon.");
        setLoading(false);
      });
  }, [slug]);

  // Mettre à jour l'image affichée selon le bouton cliqué
  const changeImage = (variant) => {
    if (!pokemon || !pokemon.sprites) return;

    switch (variant) {
      case "normal-male":
        setCurrentImage(pokemon.sprites.normal.male || "https://via.placeholder.com/150");
        break;
      case "normal-female":
        setCurrentImage(pokemon.sprites.normal.female || "https://via.placeholder.com/150");
        break;
      case "shiny-male":
        setCurrentImage(pokemon.sprites.shiny.male || "https://via.placeholder.com/150");
        break;
      case "shiny-female":
        setCurrentImage(pokemon.sprites.shiny.female || "https://via.placeholder.com/150");
        break;
      default:
        setCurrentImage("https://via.placeholder.com/150");
    }
  };

  if (loading) {
    return <div class="mt-6 bg-blue-500 text-white font-black w-fit mx-auto flex px-4 py-2 rounded-md shadow-md border-2 border-blue-800">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>Chargement des Pokémon...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-gray-500">Aucun détail disponible.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-white">{pokemon.name}</h1>

      {/* Image et types */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={currentImage}
          alt={pokemon.name}
          className="h-40 w-40"
        />
        <div className="flex gap-2 mt-4">
          {pokemon.types?.map((type) => (
            <span
              key={type.slug}
              className="px-4 py-1 text-white font-bold italic rounded-full"
              style={{
                backgroundColor: getColor(type.slug), // Utilisation de la couleur du type
                boxShadow: `0 0 10px ${getColor(type.slug)}`,
              }}
            >
              {type.name}
            </span>
          )) || <span className="text-gray-500">Types non disponibles</span>}
        </div>

        {/* Boutons pour changer l'image */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          <button
            onClick={() => changeImage("normal-male")}
            className="px-4 py-2 text-black border border-black shadow-md rounded hover:bg-blue-600 bg-blue-500"
          >
            Normal Mâle
          </button>
          <button
            onClick={() => changeImage("normal-female")}
            disabled={!pokemon.sprites?.normal?.female}
            className={`px-4 py-2 text-black border border-black shadow-md rounded ${!pokemon.sprites?.normal?.female
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            Normal Femelle
          </button>
          <button
            onClick={() => changeImage("shiny-male")}
            className="px-4 py-2 text-black border border-black shadow-md rounded hover:bg-yellow-600 bg-yellow-500"
          >
            Shiny Mâle
          </button>
          <button
            onClick={() => changeImage("shiny-female")}
            disabled={!pokemon.sprites?.shiny?.female}
            className={`px-4 py-2 text-black border border-black shadow-md rounded ${!pokemon.sprites?.shiny?.female
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
              }`}
          >
            Shiny Femelle
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Statistiques</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {pokemon.stats?.map((stat) => {
            const percentage = (stat.base_stat / 255) * 100; // Calculer le pourcentage
            return (
              <div
                key={stat.slug}
                className="p-4 bg-gray-950 rounded-md border-2 border-gray-950 shadow-md relative overflow-hidden"
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: "#b91c1c", // Couleur du remplissage
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    opacity: 1,
                  }}
                ></div>
                <div className="flex justify-between relative z-10 text-white">
                  <span className="italic">{stat.name}</span>
                  <span className="font-bold italic">{stat.base_stat}</span>
                </div>
              </div>
            );
          }) || <span className="text-gray-500">Statistiques non disponibles</span>}
        </div>
      </div>

      {/* Navigation vers les autres Pokémon */}
      <div className="mt-8 flex justify-between">
        {previousPokemon && (
          <a
            href={`/pokemon/${previousPokemon.slug}`}
            className="px-6 py-2 bg-blue-500 border border-black shadow-md text-white rounded hover:bg-blue-600"
          >
            ← {previousPokemon.name}
          </a>
        )}
        {nextPokemon && (
          <a
            href={`/pokemon/${nextPokemon.slug}`}
            className="px-6 py-2 bg-blue-500 border border-black shadow-md text-white rounded hover:bg-blue-600"
          >
            {nextPokemon.name} →
          </a>
        )}
      </div>
    </div>
  );
}

export default PokemonDetailPage;
