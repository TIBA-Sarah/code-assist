const mongoose = require('mongoose');

// Création du schéma de code généré
const codeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Création du modèle
const Code = mongoose.model('Code', codeSchema);
module.exports = Code;
