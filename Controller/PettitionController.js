const express = require('express');
const router = express.Router();
const Petition = require('../Models/PettitionModel');

// Create a new petition
 const pettitonSave = async (req, res) => {
    try {
        const { generatedPetition, references, procedure } = req.body;
        const newPetition = new Petition({ generatedPetition, references, procedure });
        await newPetition.save();
        res.status(201).json(newPetition);
        console.log(newPetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing petition
 const pettitionUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { generatedPetition, references, procedure } = req.body;
        const updatedPetition = await Petition.findByIdAndUpdate(id, { generatedPetition, references, procedure }, { new: true });
        res.status(200).json(updatedPetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all petitions
 const getAllPettition = async (req, res) => {
    try {
        const petitions = await Petition.find({userId });
        res.status(200).json(petitions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single petition by ID
 const singlePettiton = async (req, res) => {
    try {
        const { id } = req.params;
        const petition = await Petition.findById(id);
        res.status(200).json(petition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    pettitonSave,
    pettitionUpdate,
    getAllPettition,
    singlePettiton
}
