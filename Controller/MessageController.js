const Message = require('../Models/MessageModels');

const getMessages = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('Request user ID:', req.user.id); // Authenticated user ID
      console.log('Requested user ID:', userId); // URL parameter user ID
  
      // Ensure userId is not undefined
      if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter' });
      }
  
      const messages = await Message.find({
        $or: [
          { sender: req.user.id, recipient: userId },
          { sender: userId, recipient: req.user.id }
        ]
      }).sort({ timestamp: 1 });
  
      console.log('Fetched messages:', messages); 
  
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

 const sendMessage = async (req, res) => {
  try {
    const { recipient, content } = req.body;
    console.log('Request body:', req.body);
    console.log('Authenticated user ID:', req.user.id);
    const newMessage = new Message({
      sender: req.user.  id,
      recipient,
      content
    });
    await newMessage.save();
    console.log(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
    getMessages,
    sendMessage
}