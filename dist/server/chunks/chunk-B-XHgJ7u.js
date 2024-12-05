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
  return /* @__PURE__ */ jsxs("div", { className: "flex max-w-5xl m-auto", children: [
    /* @__PURE__ */ jsxs(Sidebar, { children: [
      /* @__PURE__ */ jsx(Logo, {}),
      /* @__PURE__ */ jsx(Link, { href: "/", children: "Liste des Pokémon" }),
      ""
    ] }),
    /* @__PURE__ */ jsx(Content, { children })
  ] });
}
function Sidebar({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "sidebar", className: "p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200", children });
}
function Content({ children }) {
  return /* @__PURE__ */ jsx("div", { id: "page-container", children: /* @__PURE__ */ jsx("div", { id: "page-content", className: "p-5 pb-12 min-h-screen", children }) });
}
function Logo() {
  return /* @__PURE__ */ jsx("div", { className: "px-5 mb-2", children: /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("img", { src: "https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif", alt: "logo" }) }) });
}
const logoUrl = "/assets/static/logo.DLJJsk-H.svg";
function HeadDefault() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("link", { rel: "icon", href: logoUrl }) });
}
const import4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HeadDefault
}, Symbol.toStringTag, { value: "Module" }));
export {
  LayoutDefault as L,
  import4 as i
};
