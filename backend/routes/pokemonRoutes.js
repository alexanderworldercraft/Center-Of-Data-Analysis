const { getPokemonList, getPokemonDetails } = require("../controllers/pokemonController");

async function pokemonRoutes(fastify, options) {
  // Route pour récupérer la liste des Pokémon
  fastify.get("/pokemon", getPokemonList);

  // Route pour récupérer les détails d'un Pokémon spécifique
  fastify.get("/pokemon/:slug", getPokemonDetails);
}

module.exports = pokemonRoutes;
