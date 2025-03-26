import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Log.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log("Inscription avec :", email, password);
    navigate("/Accueil"); //  Redirige vers Accueil après inscription
  };

  const handleGoToLogin = () => {
    console.log("Bouton 'Déjà un compte ? Se connecter' cliqué !"); // Debugging
    navigate("/"); // Vérifie bien que "/" correspond à ta page de login
  };

  return (
    <div className="login-page"> 
      <h1>Créer un compte</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister} className="login-form">
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
            className="field"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Mot de passe"
            className="field"
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label="Confirmer le mot de passe"
            className="field"
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>

      <button onClick={handleGoToLogin} className="secondary-button">
        Déjà un compte ? Se connecter
      </button>
    </div>
  );
};

export default RegisterPage;
