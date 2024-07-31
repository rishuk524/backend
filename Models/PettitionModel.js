const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
    generatedPetition: String,
    references: String,
    procedure: String,
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Petition', petitionSchema);
