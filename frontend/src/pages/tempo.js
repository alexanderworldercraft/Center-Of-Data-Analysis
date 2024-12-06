import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { getPokemonList, getPokemonDetails } from "../services/api";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Fonction pour obtenir la couleur selon le type
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

function TeamPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [team, setTeam] = useState([]);

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

        if (data.length < itemsPerPage) break;
        offset += itemsPerPage;
      }

      const detailedPokemon = await Promise.all(
        allPokemon.map((pokemon) =>
          getPokemonDetails(pokemon.slug)
            .then((res) => ({
              ...pokemon,
              sprites: res.data.current.sprites,
              types: res.data.current.types,
              stats: res.data.current.stats,
            }))
            .catch((err) => {
              console.error(`Erreur lors de la récupération des détails pour ${pokemon.name}:`, err);
              return pokemon;
            })
        )
      );

      setPokemonList(detailedPokemon);
      setFilteredPokemonList(detailedPokemon);
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

  // Appliquer les filtres
  useEffect(() => {
    let filteredList = pokemonList;

    if (searchTerm) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.types?.some((type) => type.slug === selectedType)
      );
    }

    setFilteredPokemonList(filteredList);
  }, [searchTerm, selectedType, pokemonList]);

  const addToTeam = (pokemon, variant) => {
    if (team.length < 6 && !team.some((p) => p.slug === pokemon.slug && p.variant === variant)) {
      const selectedPokemon = {
        ...pokemon,
        variant,
        sprite: pokemon.sprites[variant.split("-")[0]][variant.split("-")[1]],
      };
      setTeam([...team, selectedPokemon]);
    }
  };

  const removeFromTeam = (pokemonSlug, variant) => {
    setTeam(team.filter((p) => p.slug !== pokemonSlug || p.variant !== variant));
  };

  // Calculer la moyenne des statistiques
  const calculateAverageStats = () => {
    const stats = { hp: 0, attack: 0, defense: 0, "special-attack": 0, "special-defense": 0, speed: 0 };

    if (team.length === 0) return stats;

    team.forEach((pokemon) => {
      pokemon.stats.forEach((stat) => {
        stats[stat.slug] += stat.base_stat;
      });
    });

    Object.keys(stats).forEach((key) => {
      stats[key] = Math.round(stats[key] / team.length);
    });

    return stats;
  };

  // Générer les données pour le graphique radar
  const averageStats = calculateAverageStats();
  const radarData = {
    labels: ["PV", "Attaque", "Défense", "Attaque Spéciale", "Défense Spéciale", "Vitesse"],
    datasets: [
      {
        label: "Moyenne des statistiques",
        data: [
          averageStats.hp,
          averageStats.attack,
          averageStats.defense,
          averageStats["special-attack"],
          averageStats["special-defense"],
          averageStats.speed,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Chargement des Pokémon...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Construisez votre Équipe</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          {/* ... Liste des Pokémon, pagination, etc. */}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Votre Équipe</h2>
          <div className="grid grid-cols-3 gap-4">
            {team.map((pokemon) => (
              <div key={`${pokemon.slug}-${pokemon.variant}`} className="p-4 text-center border rounded-lg shadow">
                <img src={pokemon.sprite} alt={pokemon.name} className="h-16 mx-auto" />
                <p>{pokemon.name}</p>
                <button
                  onClick={() => removeFromTeam(pokemon.slug, pokemon.variant)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Moyenne des statistiques de l'équipe</h2>
        <Radar data={radarData} />
      </div>
    </div>
  );
}

export default TeamPage;
