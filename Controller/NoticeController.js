const NoticePetition = require('../Models/NoticeModels');

// Create a new petition
const NoticepetitionSave = async (req, res) => {
    try {
        const { generatedPetition, references, procedure } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID

        const newPetition = new NoticePetition({
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
const NoticepetitionUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { generatedPetition, references, procedure } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID

        const updatedPetition = await NoticePetition.findOneAndUpdate(
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
const getAllNoticePetitions = async (req, res) => {
    try {
        const userId = req.user.id; // Get the authenticated user's ID
        const petitions = await NoticePetition.find({ userId }); // Filter by user ID
        
        res.status(200).json({sucess: true, petitions});
        console.log(petitions)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single petition by ID for the authenticated user
const singleNoticePetition = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Get the authenticated user's ID

        const petition = await NoticePetition.findOne({ _id: id, userId }); // Ensure the petition belongs to the user

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found or unauthorized' });
        }

        res.status(200).json(petition);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
   NoticepetitionSave,
   NoticepetitionUpdate,
   getAllNoticePetitions,
   singleNoticePetition
};
