import import1 from "vike-react/__internal/integration/Loading";
import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { L as LayoutDefault, i as import4 } from "../chunks/chunk-B-XHgJ7u.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
/* empty css                       */
/* empty css                       */
import "vike-react/usePageContext";
function getColor(type) {
  const colors = /* @__PURE__ */ new Map([
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
    ["water", "#6390f0"]
  ]);
  return colors.get(type) || "#777";
}
const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 30;
  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * limit;
        const response = await fetch(
          `https://pokedex.coda.memento-dev.fr/pokemon?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
            }
          }
        );
        const data = await response.json();
        const enrichedData = await Promise.all(
          data.map(async (pokemon) => {
            const detailsResponse = await fetch(
              `https://pokedex.coda.memento-dev.fr/pokemon/${pokemon.slug}`,
              {
                headers: {
                  Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
                }
              }
            );
            const details = await detailsResponse.json();
            return { ...pokemon, types: details.current.types };
          })
        );
        setPokemonList(enrichedData);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [currentPage]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`https://pokedex.coda.memento-dev.fr/type`, {
          headers: {
            Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
          }
        });
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des types :", error);
      }
    };
    fetchTypes();
  }, []);
  const getGradient = (types2) => {
    if (types2.length === 1) {
      const color = getColor(types2[0].slug);
      return color;
    } else {
      const colors = types2.map((type) => getColor(type.slug));
      return `linear-gradient(45deg, ${colors.join(", ")})`;
    }
  };
  const filteredPokemons = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? pokemon.types.some((type) => type.slug === typeFilter) : true;
    return matchesSearch && matchesType;
  });
  const handlePageChange = (direction) => {
    if (direction === "next") setCurrentPage((prev) => prev + 1);
    else if (direction === "prev" && currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center mb-4", children: "Liste des Pokémon" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Rechercher un Pokémon...",
          className: "border border-gray-300 rounded p-2 w-full max-w-md"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: typeFilter,
          onChange: (e) => setTypeFilter(e.target.value),
          className: "ml-2 border border-gray-300 rounded p-2",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Tous les types" }),
            types.map((type) => /* @__PURE__ */ jsx("option", { value: type.slug, children: type.name }, type.slug))
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-center", children: "Chargement des Pokémon..." }) : /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4", children: filteredPokemons.map((pokemon) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-0 overflow-x-hidden rounded-md text-center shadow-lg hover:shadow-2xl transition-shadow relative",
          style: {
            background: getGradient(pokemon.types),
            color: "white"
          },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: pokemon.sprites.normal.male,
                alt: pokemon.name,
                className: "mx-auto mt-8"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 to-stone-950/80 absolute bottom-0", children: pokemon.name })
          ]
        },
        pokemon.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: currentPage === 1,
            onClick: () => handlePageChange("prev"),
            className: "bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50",
            children: "Précédent"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          "Page ",
          currentPage
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange("next"),
            className: "bg-gray-500 text-white px-4 py-2 rounded",
            children: "Suivant"
          }
        )
      ] })
    ] })
  ] });
};
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PokemonList
}, Symbol.toStringTag, { value: "Module" }));
const configValuesSerialized = {
  ["isClientRuntimeLoaded"]: {
    type: "computed",
    definedAtData: null,
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["Loading"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/Loading", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: import1
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/onRenderHtml", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: onRenderHtml
    }
  },
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }],
    valueSerialized: [{
      type: "js-serialized",
      value: ["_configFromHook"]
    }]
  },
  ["Layout"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/layouts/LayoutDefault.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "pointer-import",
      value: LayoutDefault
    }]
  },
  ["Head"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/pages/+Head.tsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "plus-file",
      exportValues: import4
    }]
  },
  ["title"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "title"] },
    valueSerialized: {
      type: "js-serialized",
      value: "My Vike App"
    }
  },
  ["description"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "description"] },
    valueSerialized: {
      type: "js-serialized",
      value: "Demo showcasing Vike"
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/index/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  }
};
export {
  configValuesSerialized
};
