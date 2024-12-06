import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <a href="/" className="text-xl font-bold">
          Pokédex
        </a>
        <div>
          <a href="/" className="mr-4">Accueil</a>
          <a href="/team">Équipe</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
