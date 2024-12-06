require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const pokemonRoutes = require("./routes/pokemonRoutes");
const typeRoutes = require("./routes/typeRoutes");

// Activer CORS pour le frontend
fastify.register(require("@fastify/cors"), {
    origin: "http://localhost:3000", // Autorise uniquement le frontend
  });  

// Enregistrer les routes
fastify.register(typeRoutes, { prefix: "/api" });
fastify.register(pokemonRoutes, { prefix: "/api" });

// Lancer le serveur
const start = async () => {
    try {
      await fastify.listen({ port: 5000, host: '0.0.0.0' }); // Précision explicite de l'objet avec port et host
      console.log("Serveur backend en cours d'exécution sur le port 5000");
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  start();
  