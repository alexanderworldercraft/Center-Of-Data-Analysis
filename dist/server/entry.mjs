import { setImportBuildGetters } from "vike/__internal/loadImportBuild";
import { setTelefuncLoaders } from "telefunc/__internal/loadBuild";
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const pageConfigsSerialized = [
  {
    pageId: "/pages/_error",
    isErrorPage: true,
    routeFilesystem: void 0,
    loadConfigValuesAll: () => import("./entries/pages_error.mjs"),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedBy": "/pages/index/" },
    loadConfigValuesAll: () => import("./entries/pages_index.mjs"),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  }
];
const pageConfigGlobalSerialized = {
  configValuesSerialized: {}
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const pageFiles = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
const telefuncFilesGlob = /* @__PURE__ */ Object.assign({});
const telefuncFiles = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  telefuncFilesGlob
}, Symbol.toStringTag, { value: "Module" }));
{
  const assetsManifest = {
  "_chunk-!~{004}~.js": {
    "file": "assets/static/layouts_style-b34a8e57.a91n6qlS.css",
    "src": "_chunk-!~{004}~.js"
  },
  "_chunk-!~{005}~.js": {
    "file": "assets/static/layouts_tailwind-00e65532.DQBkZJ65.css",
    "src": "_chunk-!~{005}~.js"
  },
  "_chunk-!~{006}~.js": {
    "file": "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
    "src": "_chunk-!~{006}~.js"
  },
  "_chunk-25N4ygma.js": {
    "file": "assets/chunks/chunk-25N4ygma.js",
    "name": "executeHook"
  },
  "_chunk-BK4YcTEG.js": {
    "file": "assets/chunks/chunk-BK4YcTEG.js",
    "name": "_onPageTransitionStart",
    "imports": [
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.a91n6qlS.css",
      "assets/static/layouts_tailwind-00e65532.DQBkZJ65.css"
    ]
  },
  "node_modules/vike/dist/esm/client/client-routing-runtime/entry.js": {
    "file": "assets/entries/entry-client-routing.CeNmEJNo.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/client-routing-runtime/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-25N4ygma.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigValuesAll:client:/pages/_error",
      "virtual:vike:pageConfigValuesAll:client:/pages/index"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/_error": {
    "file": "assets/entries/pages_error.DRTjU-dk.js",
    "name": "entries/pages/_error",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BK4YcTEG.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.a91n6qlS.css",
      "assets/static/layouts_tailwind-00e65532.DQBkZJ65.css"
    ],
    "assets": [
      "assets/static/logo.DLJJsk-H.svg"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/index": {
    "file": "assets/entries/pages_index.DGshaPBE.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-BK4YcTEG.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.a91n6qlS.css",
      "assets/static/layouts_tailwind-00e65532.DQBkZJ65.css"
    ],
    "assets": [
      "assets/static/logo.DLJJsk-H.svg"
    ]
  }
};
  const pluginManifest = {
    "version": "0.4.206",
    "usesClientRouter": false,
    "baseServer": "/",
    "baseAssets": "/",
    "includeAssetsImportedByServer": true,
    "redirects": {},
    "trailingSlash": false,
    "disableUrlNormalization": false
  };
  setImportBuildGetters({
    pageFiles: () => pageFiles,
    getAssetsManifest: () => assetsManifest,
    pluginManifest: () => pluginManifest
  });
}
setTelefuncLoaders({
  loadTelefuncFiles: () => telefuncFiles,
  loadManifest: () => ({
    "version": "0.1.82",
    "config": {}
  })
});
