import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getPokemonList = (params) => api.get("/pokemon", { params });
export const getPokemonDetails = (slug) => api.get(`/pokemon/${slug}`);
