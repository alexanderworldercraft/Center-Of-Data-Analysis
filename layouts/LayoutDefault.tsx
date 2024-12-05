import "./style.css";

import "./tailwind.css";

import React from "react";
import { Link } from "../components/Link.js";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex max-w-5xl m-auto"}>
      <Sidebar>
        <Logo />
        <Link href="/">Liste des Pokémon</Link>
        {""}
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div id="sidebar" className={"p-5 flex flex-col shrink-0 border-r-2 border-r-gray-200"}>
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12 min-h-screen"}>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className={"px-5 mb-2"}>
      <a href="/">
        <img src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif" alt="logo" />
      </a>
    </div>
  );
}
