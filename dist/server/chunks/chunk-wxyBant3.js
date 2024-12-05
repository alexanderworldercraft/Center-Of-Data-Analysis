import { jsx, jsxs, Fragment } from "react/jsx-runtime";
/* empty css               */
/* empty css               */
import { usePageContext } from "vike-react/usePageContext";
function Link({ href, children }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return /* @__PURE__ */ jsx("a", { href, className: isActive ? "is-active" : void 0, children });
}
function LayoutDefault({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxs(Sidebar, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", children: "Liste des Pokémons" }),
          /* @__PURE__ */ jsx(Link, { href: "/team", children: "Liste des Équipes" })
        ] })
      ] }),
      ""
    ] }),
    /* @__PURE__ */ jsx(Content, { children })
  ] });
}
function Sidebar({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "sidebar", className: "p-3 flex flex-col shrink-0 border-b-2 border-gray-950/70 sticky top-0 z-50 backdrop-blur bg-white/50 shadow-xl", children });
}
function Content({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "page-container", children: /* @__PURE__ */ jsx("div", { id: "page-content", className: "p-5 pb-12 min-h-screen", children }) });
}
function Logo() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif", width: 50, alt: "logo" }) }) });
}
function HeadDefault() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("link", { rel: "icon", href: "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif" }) });
}
const import4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeadDefault
}, Symbol.toStringTag, { value: "Module" }));
export {
  LayoutDefault as L,
  import4 as i
};
