const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import du modèle utilisateur
const Code = require('./models/Code'); // Import du modèle Code

const app = express();
app.use(express.json());  // Pour lire les requêtes JSON

const PORT = process.env.PORT || 3000;

/*
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connecté !"))
.catch(err => console.error("❌ Erreur MongoDB :", err));
*/


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

        const isMatch = await user.comparePassword(password);
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
/*
// Route de test
app.get("/", (req, res) => {
    res.send("Serveur Express fonctionne ! 🚀");
});
*/

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

  // Route pour récupérer et afficher tous les utilisateurs
app.get('/api/users', async (req, res) => {
    try {
      // Récupérer tous les utilisateurs depuis la collection 'users'
      const users = await User.find(); // Utilise la méthode .find() de Mongoose pour récupérer tous les utilisateurs
      
      // Vérifier s'il y a des utilisateurs
      if (!users.length) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
      }
  
      // Retourner la liste des utilisateurs au format JSON
      res.status(200).json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
      res.status(500).json({ message: 'Erreur interne du serveur', error });
    }
  });  
  
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
