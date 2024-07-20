const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
    generatedPetition: String,
    references: String,
    procedure: String
}, { timestamps: true });

module.exports = mongoose.model('Petition', petitionSchema);
