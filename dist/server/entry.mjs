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
    pageId: "/pages/@slug",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/@slug", "definedBy": "/pages/@slug/" },
    loadConfigValuesAll: () => import("./entries/pages_-slug.mjs"),
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
  },
  {
    pageId: "/pages/team",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/team", "definedBy": "/pages/team/" },
    loadConfigValuesAll: () => import("./entries/pages_team.mjs"),
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
  "_chunk-!~{006}~.js": {
    "file": "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
    "src": "_chunk-!~{006}~.js"
  },
  "_chunk-!~{007}~.js": {
    "file": "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css",
    "src": "_chunk-!~{007}~.js"
  },
  "_chunk-!~{008}~.js": {
    "file": "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
    "src": "_chunk-!~{008}~.js"
  },
  "_chunk-25N4ygma.js": {
    "file": "assets/chunks/chunk-25N4ygma.js",
    "name": "executeHook"
  },
  "_chunk-DVQDC-Ak.js": {
    "file": "assets/chunks/chunk-DVQDC-Ak.js",
    "name": "_onPageTransitionStart",
    "imports": [
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
      "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css"
    ]
  },
  "_chunk-DuAeG4Zh.js": {
    "file": "assets/chunks/chunk-DuAeG4Zh.js",
    "name": "useData",
    "imports": [
      "_chunk-DVQDC-Ak.js"
    ]
  },
  "node_modules/vike/dist/esm/client/client-routing-runtime/entry.js": {
    "file": "assets/entries/entry-client-routing.DBU_qBVe.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/client-routing-runtime/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-25N4ygma.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigValuesAll:client:/pages/@slug",
      "virtual:vike:pageConfigValuesAll:client:/pages/_error",
      "virtual:vike:pageConfigValuesAll:client:/pages/index",
      "virtual:vike:pageConfigValuesAll:client:/pages/team"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/@slug": {
    "file": "assets/entries/pages_-slug.COjeR48F.js",
    "name": "entries/pages/@slug",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/@slug",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DVQDC-Ak.js",
      "_chunk-DuAeG4Zh.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
      "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/_error": {
    "file": "assets/entries/pages_error.BGAvbgR5.js",
    "name": "entries/pages/_error",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DVQDC-Ak.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
      "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/index": {
    "file": "assets/entries/pages_index.D7FzbHBH.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DVQDC-Ak.js",
      "_chunk-DuAeG4Zh.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
      "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/team": {
    "file": "assets/entries/pages_team.ByOg_Pbv.js",
    "name": "entries/pages/team",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/team",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DVQDC-Ak.js",
      "_chunk-25N4ygma.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
      "assets/static/layouts_style-b34a8e57.CJD3xOJt.css",
      "assets/static/layouts_tailwind-00e65532.B6xOwzkv.css"
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
