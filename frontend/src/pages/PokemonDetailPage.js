import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails } from "../services/api";

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
    return <div className="text-center py-8 text-gray-500">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-gray-500">Aucun détail disponible.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center text-blue-600">{pokemon.name}</h1>

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
              className="px-4 py-1 bg-blue-500 text-white rounded-full"
            >
              {type.name}
            </span>
          )) || <span className="text-gray-500">Types non disponibles</span>}
        </div>

        {/* Boutons pour changer l'image */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => changeImage("normal-male")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Normal Mâle
          </button>
          <button
            onClick={() => changeImage("normal-female")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={!pokemon.sprites?.normal?.female}
          >
            Normal Femelle
          </button>
          <button
            onClick={() => changeImage("shiny-male")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Shiny Mâle
          </button>
          <button
            onClick={() => changeImage("shiny-female")}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            disabled={!pokemon.sprites?.shiny?.female}
          >
            Shiny Femelle
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Statistiques</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {pokemon.stats?.map((stat) => (
            <div
              key={stat.slug}
              className="flex justify-between p-4 bg-gray-100 rounded shadow"
            >
              <span>{stat.name}</span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          )) || <span className="text-gray-500">Statistiques non disponibles</span>}
        </div>
      </div>

      {/* Navigation vers les autres Pokémon */}
      <div className="mt-8 flex justify-between">
        {previousPokemon && (
          <a
            href={`/pokemon/${previousPokemon.slug}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ← {previousPokemon.name}
          </a>
        )}
        {nextPokemon && (
          <a
            href={`/pokemon/${nextPokemon.slug}`}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {nextPokemon.name} →
          </a>
        )}
      </div>
    </div>
  );
}

export default PokemonDetailPage;
