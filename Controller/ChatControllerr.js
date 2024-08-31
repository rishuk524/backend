// 
const Conversation = require('../Models/ChatModels');
//  console.log(Conversation);

const sendMessage =  async (req, res) => {
  try {
    const { userId, message, response } = req.body;
    console.log(req.body);
    

    if (!userId ||!message ||!response) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    // Find or create conversation
    let conversation = await Conversation.findOne({ userId });
    console.log(conversation);
    
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    // Add new message and response
    conversation.messages.push({ message, response  });
    await conversation.save();

    res.status(200).json({ userId, message, response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Conversation History
 const getConversationMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversation = await Conversation.findOne({ userId });

    if (!conversation) {
      return res.status(404).json({ message: 'No conversation found' });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Clear Conversation History
 const clearConverSationMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    await Conversation.deleteOne({ userId });

    res.status(200).json({ sucess: "true", message: 'Conversation history cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversationMessage,
  clearConverSationMessage
}