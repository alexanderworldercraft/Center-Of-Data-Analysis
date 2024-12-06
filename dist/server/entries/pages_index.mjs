import import1 from "vike-react/__internal/integration/Loading";
import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { L as LayoutDefault, i as import4 } from "../chunks/chunk-DrAeOq8G.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useData } from "vike-react/useData";
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
function Page() {
  const { pokemonList, types, total, currentPage } = useData();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const limit = 30;
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? pokemon.types.some((type) => type.slug === typeFilter) : true;
    return matchesSearch && matchesType;
  });
  const getGradient = (types2) => {
    if (types2.length === 1) {
      return getColor(types2[0].slug);
    }
    const colors = types2.map((type) => getColor(type.slug));
    return `linear-gradient(45deg, ${colors.join(", ")})`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-4 w-full", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center mb-4", children: "Liste des Pokémon" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center mb-6", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Rechercher un Pokémon...",
          className: "bg-black text-white border border-grey-100 shadow-lg rounded p-2 w-full max-w-md"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: typeFilter,
          onChange: (e) => setTypeFilter(e.target.value),
          className: "ml-2 bg-black text-white border border-gray-100 rounded p-2",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Tous les types" }),
            types.map((type) => /* @__PURE__ */ jsx("option", { value: type.slug, children: type.name }, type.slug))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-5 xl:grid-cols-10 gap-4", children: filteredPokemon.map((pokemon) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: `/pokemon/${pokemon.slug}`,
        className: "group p-0 h-30 overflow-hidden rounded-lg text-center shadow-md hover:shadow-xl transition-shadow relative border border-black/50",
        style: {
          background: getGradient(pokemon.types),
          color: "white"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: pokemon.sprites.normal.male,
              alt: pokemon.name,
              className: "mx-auto mt-8 drop-shadow-lg group-hover:scale-150 duration-100"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-lg h-full w-full bg-gradient-to-t from-stone-950/0 via-stone-950/0 to-stone-950/80 absolute bottom-0", children: pokemon.name })
        ]
      },
      pokemon.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `?page=${currentPage - 1}`,
          className: `bg-gray-500 text-white px-4 py-2 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`,
          children: "Précédent"
        }
      ),
      /* @__PURE__ */ jsxs("p", { children: [
        "Page ",
        currentPage,
        " / ",
        Math.ceil(total / limit)
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `?page=${currentPage + 1}`,
          className: `bg-gray-500 text-white px-4 py-2 rounded ${currentPage * limit >= total ? "opacity-50 cursor-not-allowed" : ""}`,
          children: "Suivant"
        }
      )
    ] })
  ] });
}
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const data = async ({ queryParams }) => {
  const limit = 30;
  const currentPage = parseInt((queryParams == null ? void 0 : queryParams.page) || "1", 10);
  if (isNaN(currentPage) || currentPage < 1) {
    throw new Error(`Invalid page parameter: ${queryParams == null ? void 0 : queryParams.page}`);
  }
  const offset = (currentPage - 1) * limit;
  const pokemonResponse = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon?limit=${limit}&offset=${offset}&with=types`,
    {
      headers: {
        Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
      }
    }
  );
  const pokemonList = await pokemonResponse.json();
  const typesResponse = await fetch(`https://pokedex.coda.memento-dev.fr/type`, {
    headers: {
      Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
    }
  });
  const types = await typesResponse.json();
  const total = parseInt(pokemonResponse.headers.get("X-Total-Count") || "0", 10);
  return {
    pokemonList,
    types,
    total,
    currentPage
  };
};
const import6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
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
      value: "Center Of Data Analysis"
    }
  },
  ["description"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "description"] },
    valueSerialized: {
      type: "js-serialized",
      value: "Vous travaillez pour Center Of Data Analysis (CODA, quelle originalité 😏)."
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/index/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/index/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import6
    }
  }
};
export {
  configValuesSerialized
};
