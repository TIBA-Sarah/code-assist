import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";  // Importe la fonction d'inscription
import "../Log.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { success, message } = await registerUser(username, email, password);

        if (success) {
            navigate("/login"); // Redirige vers la page de connexion après inscription réussie
        } else {
            setError(message);
        }
        setLoading(false);
    };

    return (
        <div className="register-page">
            <div className="debut">
                <h1>Inscription</h1>
                <p>Créez un compte pour commencer à utiliser l'application.</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleRegister} className="register-form">
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="field"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="field"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="field"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Création du compte..." : "S'inscrire"}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
