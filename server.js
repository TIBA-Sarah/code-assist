const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import du modèle utilisateur
const Code = require('./models/Code'); // Import du modèle Code

const app = express();
app.use(express.json());  // Pour lire les requêtes JSON
const cors = require("cors");
app.use(cors()); // pour qu'il utilise le dossier cors et qu'on puisse écouter sur le port 5000 pour le server

const PORT = 5000;

// Route d'inscription (register)
app.post('/api/register', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
      res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error });
  }
});

// Route de connexion (login)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur introuvable" });

        // Comparer le mot de passe haché avec celui entré
        const isMatch = await user.comparePassword(password);
        console.log(password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        // Création du token JWT
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la connexion", error });
    }
});

// Route pour générer un code
app.post('/api/generate-code', async (req, res) => {
    try {
        const code = Math.random().toString(36).substring(2, 15); // Générer un code aléatoire
        const newCode = new Code({ code });
        await newCode.save();
        res.status(201).json({ message: "Code généré avec succès", code: newCode });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la génération du code", error });
    }
});

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/codegenerator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connecté avec succès'))
    .catch(err => console.error('❌ Échec de la connexion à MongoDB', err));

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Serveur Express connecté à MongoDB');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
