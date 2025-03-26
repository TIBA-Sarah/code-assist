import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Log.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Connexion avec:", email, password);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      navigate("/Accueil"); //  Redirige vers Accueil après connexion
    } catch (err) {
      setError("Échec de la connexion. Vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueWithoutAccount = () => {
    navigate("/Accueil");
  };

  return (
    <div className="login-page">
        <div className="debut">
      <h1>Bienvenue</h1>
      <p>Pour commencer une recherche vous pouvez vous enregister ou le faire sans</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
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
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

      </form>
      <button onClick={handleContinueWithoutAccount} className="secondary-button">
        Continuer sans compte
      </button>
      <button onClick={() => navigate("/register")} className="secondary-button">
        S'inscrire
      </button>
    </div>
  );
};

export default LoginPage;
