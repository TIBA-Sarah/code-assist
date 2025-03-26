import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Acceuil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Contact from "./Pages/Contact";
import LoginPage from "./Components/Login";
import RegisterPage from "./Components/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    console.log("Vérification de l'authentification:", auth); // Debugging
    setIsAuthenticated(auth === "true");
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/Accueil"
            element={isAuthenticated ? <Acceuil /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={isAuthenticated ? <Apropos /> : <Navigate to="/" />}
          />
          <Route
            path="/Contact"
            element={isAuthenticated ? <Contact /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
