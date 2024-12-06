const apiClient = require("../services/apiClient");

// Récupérer la liste des Pokémon
const getPokemonList = async (req, reply) => {
  const { limit = 30, offset = 0, search, with: withRelations } = req.query;

  try {
    const params = { limit, offset };
    if (search) params.search = search;
    if (withRelations) params.with = withRelations;

    const { data } = await apiClient.get("/pokemon", { params });
    reply.send(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon :", error.message);
    reply.status(500).send({ error: "Impossible de récupérer les Pokémon." });
  }
};

// Récupérer les détails d’un Pokémon
const getPokemonDetails = async (req, reply) => {
  const { slug } = req.params;

  try {
    const { data } = await apiClient.get(`/pokemon/${slug}`);
    reply.send(data);
  } catch (error) {
    console.error("Erreur lors de la récupération du Pokémon :", error.message);
    reply.status(500).send({ error: "Impossible de récupérer le Pokémon." });
  }
};

module.exports = { getPokemonList, getPokemonDetails };
