const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Avant d'enregistrer, hacher le mot de passe
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword; // Remplacer le mot de passe par sa version hachée
      next();
    } catch (err) {
      next(err); // En cas d'erreur pendant le hachage
    }
  } else {
    next(); // Si le mot de passe n'est pas modifié, on continue sans changer
  }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password); // Comparer le mot de passe en texte clair avec le mot de passe haché
};

const User = mongoose.model('User', userSchema);
module.exports = User;
