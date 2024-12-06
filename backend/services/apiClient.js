const axios = require("axios");

const apiClient = axios.create({
  baseURL: "https://pokedex.coda.memento-dev.fr", // URL de l'API
  timeout: 5000, // Timeout
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi", // Jeton d'authentification
  },
});

module.exports = apiClient;
