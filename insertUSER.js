const mongoose = require('mongoose');
const User = require('./models/User'); // Assure-toi que le modèle User est correct

mongoose.connect('mongodb://localhost:27017/codegenerator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Connexion à MongoDB réussie");

    const user = new User({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'hashedPassword' // Utilise ici un mot de passe simple ou un mot de passe déjà hashé
    });

    user.save()
        .then(() => {
            console.log('Utilisateur créé avec succès');
            mongoose.disconnect(); // Déconnexion de la base de données
        })
        .catch(err => {
            console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
            mongoose.disconnect();
        });
})
.catch(err => console.error('Erreur de connexion à MongoDB:', err));
