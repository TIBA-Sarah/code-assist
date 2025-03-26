import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // État du menu

  const handleLinkClick = () => {
    setMenuOpen(false); //  Fermer le menu après un clic
  };

  return (
    <>
      <nav className="navbar">
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="navbar-text">
          <h1>Générateur</h1>
          <span>Code Assistant</span>
        </div>
      </nav>

      {/*  Le menu se ferme après chaque clic sur un lien */}
      {menuOpen && (
        <ul className="menu-dropdown">
          <li><Link to="/Accueil" onClick={handleLinkClick}>Accueil</Link></li>
          <li><Link to="/about" onClick={handleLinkClick}>À propos</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        </ul>
      )}
    </>
  );
}
