const generatedModels = require("../Models/Genratedpdf")

const saveGeneratedContent = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID

    // Ensure content and userId are provided
    if (!content || !userId) {
        return res.status(400).json({ message: "Content and user ID are required." });
    }

    const newContent = new generatedModels({
        content,
        userId // Include userId in the new content
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
    const userId = req.user.id; // Get the authenticated user's ID

    try {
        // Find the content by ID
        const existingContent = await generatedModels.findById(id);

        // Check if the content exists
        if (!existingContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        // Ensure the authenticated user is the owner of the content
        if (existingContent.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this content' });
        }

        // Update the content
        const updatedContent = await generatedModels.findByIdAndUpdate(
            id,
            { content, updatedAt: Date.now() },
            { new: true }
        );

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
  