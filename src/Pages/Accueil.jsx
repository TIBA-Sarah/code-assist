import React from "react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
const Acceuil = () => {
   const [input, setInput] = useState("");
    return (
    <div className="accueil">
        {/* Contenu principal */}
      <h1>Bonjour !</h1>
      <p>En quoi puis-je vous être utile ?</p>

      {/* Champ de saisie */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Donne-moi une fonction..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>
          
          <MdSend className="icon" />  {/* Utilisation de l'icône d'envoi */}
        </button>
      </div>
    </div>
        );
};
 
export default Acceuil;

