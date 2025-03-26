const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Création du schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Méthode pour hasher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Création du modèle
const User = mongoose.model('User', userSchema);
module.exports = User;
