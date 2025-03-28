import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Acceuil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Contact from "./Pages/Contact";
import LoginPage from "./Components/Login";
import RegisterPage from "./Components/Register";
import { generateCode } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    console.log("Vérification de l'authentification:", auth);
    setIsAuthenticated(auth === "true");
  }, []);

  const handleGenerate = async () => {
    const result = await generateCode(prompt);
    if (result) {
      setGeneratedCode(result);
    } else {
      setGeneratedCode("Erreur lors de la génération.");
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/Accueil" element={isAuthenticated ? <Acceuil /> : <Navigate to="/" />} />
          <Route path="/about" element={isAuthenticated ? <Apropos /> : <Navigate to="/" />} />
          <Route path="/Contact" element={isAuthenticated ? <Contact /> : <Navigate to="/" />} />
        </Routes>

        {/* Générateur de Code */}
        <div>
          <h1>Générateur de Code</h1>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tapez votre prompt ici..."
          />
          <button onClick={handleGenerate}>Générer</button>
          <pre>{generatedCode}</pre>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
