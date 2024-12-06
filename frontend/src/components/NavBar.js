import React from "react";

function Navbar() {
  return (
    <nav className="bg-transparent text-white py-4 sticky top-0 border-b border-black backdrop-blur-xl z-50">
      <div className="container mx-auto px-4 flex justify-between">
        <a href="/" className="text-xl font-bold drop-shadow">
          Pokédex
        </a>
        <div>
          <a href="/" className="mr-4 drop-shadow">Accueil</a>
          <a href="/team" className="drop-shadow">Équipe</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
