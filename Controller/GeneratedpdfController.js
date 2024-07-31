const generatedModels = require("../Models/Genratedpdf")

const saveGeneratedContent = async (req, res) => {
    const { content } = req.body;

    const newContent = new generatedModels({
        content
    });

    try {
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
        console.log(savedContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
const updateContent = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const updatedContent = await generatedModels.findByIdAndUpdate(
            id,
            { content, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(updatedContent);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllContent = async (req, res) => {
    try {
         const userId = req.user.id;
        // Fetch all content from the database
        const allContent = await generatedModels.find({userId});

        // Send the list of content as a JSON response
        res.status(200).json({ success: true, content: allContent });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}; 
  module.exports = {
   saveGeneratedContent,
   updateContent,
   getAllContent
  };
  