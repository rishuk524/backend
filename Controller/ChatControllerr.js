const ChatModels = require('../Models/ChatModels');

const createChat = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const userId = req.user.id; // Get the authenticated user's ID

    const newChat = new ChatModels({
      question,
      answer,
      userId // Link the chat to the user
    });

    await newChat.save();
    res.status(201).json(newChat);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getAllChat = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID

    // Fetch all chats for the authenticated user
    const chats = await ChatModels.find({ userId });

    // Send the list of chats as a JSON response
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch chats', error: error.message });
  }
};

module.exports = {
  createChat,
  getAllChat
};

