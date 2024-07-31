const Petition = require('../Models/PettitionModel');

// Create a new petition
const petitionSave = async (req, res) => {
    try {
        const { generatedPetition, references, procedure } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID

        const newPetition = new Petition({
            generatedPetition,
            references,
            procedure,
            userId // Save the user's ID with the petition
        });

        await newPetition.save();
        res.status(201).json(newPetition);
        console.log(newPetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing petition
const petitionUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { generatedPetition, references, procedure } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID

        const updatedPetition = await Petition.findOneAndUpdate(
            { _id: id, userId }, // Ensure that the petition belongs to the user
            { generatedPetition, references, procedure },
            { new: true }
        );

        if (!updatedPetition) {
            return res.status(404).json({ error: 'Petition not found or unauthorized' });
        }

        res.status(200).json(updatedPetition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all petitions for the authenticated user
const getAllPetitions = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID
        const petitions = await Petition.find({ userId }); // Filter by user ID
        
        res.status(200).json({sucess: true, petitions});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single petition by ID for the authenticated user
const singlePetition = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Get the authenticated user's ID

        const petition = await Petition.findOne({ _id: id, userId }); // Ensure the petition belongs to the user

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found or unauthorized' });
        }

        res.status(200).json(petition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    petitionSave,
    petitionUpdate,
    getAllPetitions,
    singlePetition
};
