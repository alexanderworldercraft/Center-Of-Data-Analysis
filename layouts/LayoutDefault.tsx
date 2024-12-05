import "./style.css";

import "./tailwind.css";

import React from "react";
import { Link } from "../components/Link.js";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex flex-col"}>
      <img id="background" src="assets/fond.jpg" />
      <Sidebar>
        <div className="flex flex-row justify-between">
          <Logo />
          <div className="flex flex-col gap-3">
          <Link href="/">Liste des Pokémons</Link>
          <Link href="/team">Liste des Équipes</Link>
          </div>
        </div>
        {""}
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div id="sidebar" className={"p-3 flex flex-col shrink-0 border-b-2 border-gray-950/70 sticky top-0 z-50 backdrop-blur bg-yellow/50 shadow-xl"}>
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className={"p-5 pb-12"}>
        {children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div>
      <a href="/">
        <img src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif" width={50} alt="logo" />
      </a>
    </div>
  );
}
