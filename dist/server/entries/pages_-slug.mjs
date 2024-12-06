import import1 from "vike-react/__internal/integration/Loading";
import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { L as LayoutDefault, i as import4 } from "../chunks/chunk-DrAeOq8G.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useData } from "vike-react/useData";
/* empty css                       */
/* empty css                       */
import "vike-react/usePageContext";
function Page() {
  const pokemon = useData();
  if (!pokemon) {
    return /* @__PURE__ */ jsx("p", { className: "text-center text-red-50 italic font-black rounded-full shadow-lg bg-red-500 border-2 border-red-800", children: "⚠️ Aucun Pokémon trouvé." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-4 w-full max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-center mb-6", children: pokemon.name }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: pokemon.sprites.normal.male,
          alt: pokemon.name,
          className: "w-64 h-64 object-contain"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 md:mt-0", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Statistiques" }),
        /* @__PURE__ */ jsx("ul", { children: pokemon.stats.map((stat) => /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
            stat.name,
            ":"
          ] }),
          " ",
          stat.base_stat
        ] }, stat.slug)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-between", children: [
      pokemon.previous && /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/pokemon/${pokemon.previous.slug}`,
          className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600",
          children: [
            "← ",
            pokemon.previous.name
          ]
        }
      ),
      pokemon.next && /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/pokemon/${pokemon.next.slug}`,
          className: "bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600",
          children: [
            pokemon.next.name,
            " →"
          ]
        }
      )
    ] })
  ] });
}
const import5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const data = async ({ routeParams }) => {
  const { slug } = routeParams;
  const response = await fetch(
    `https://pokedex.coda.memento-dev.fr/pokemon/${slug}`,
    {
      headers: {
        Authorization: "Bearer advanced-pokedex-api-key-9sd1u98cvg4t98yi"
      }
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokémon: ${slug}`);
  }
  const pokemon = (await response.json()).current;
  return pokemon;
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
    definedAtData: { "filePathToShowToUser": "/pages/@slug/+Page.tsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import5
    }
  },
  ["data"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/@slug/+data.ts", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import6
    }
  }
};
export {
  configValuesSerialized
};
