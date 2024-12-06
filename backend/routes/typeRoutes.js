const apiClient = require("../services/apiClient");

async function typeRoutes(fastify, options) {
  fastify.get("/types", async (req, reply) => {
    try {
      const { data } = await apiClient.get("/type");
      reply.send(data); // Retourne les types à l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération des types :", error.message);
      reply.status(500).send({ error: "Impossible de récupérer les types." });
    }
  });
}

module.exports = typeRoutes;
