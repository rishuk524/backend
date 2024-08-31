// const Message = require('../Models/MessageModels');

// const getMessages = async (req, res) => {
//     try {
//       const { userId } = req.params;
//       console.log('Request user ID:', req.user.id); // Authenticated user ID
//       console.log('Requested user ID:', userId); // URL parameter user ID
  
//       // Ensure userId is not undefined
//       if (!userId) {
//         return res.status(400).json({ error: 'Missing userId parameter' });
//       }
  
//       const messages = await Message.find({
//         $or: [
//           { sender: req.user.id, recipient: userId },
//           { sender: userId, recipient: req.user.id }
//         ]
//       }).sort({ timestamp: 1 });
  
//       console.log('Fetched messages:', messages); 
  
//       res.json(messages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   };
  

//  const sendMessage = async (req, res) => {
//   try {
//     const { recipient, content } = req.body;
//     console.log('Request body:', req.body);
//     console.log('Authenticated user ID:', req.user.id);
//     const newMessage = new Message({
//       sender: req.user.  id,
//       recipient,
//       content
//     });
//     await newMessage.save();
//     console.log(newMessage);

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// module.exports = {
//     getMessages,
//     sendMessage
// }

// controllers/chatController.js
const Chat1 = require('../Models/MessageModel2');
const User = require('../Models/UserModels');
const MessageModel = require('../Models/MessageModel');
// const {initializeSocket, getSocketInstance} = require("../Utils/SocketHandler")


exports.createChat = async (req, res) => {
  try {
    const {userId, users } = req.body;
    console.log(users);
    
    const chat = new Chat1({userId, users });
    await chat.save();
    res.json(chat);
    console.log(chat);
    
  } catch (err) {
    console.error('Error creating chat:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getChats = async (req, res) => {
  try {
    // Find chats where the authenticated user is a participant
    const chats = await Chat1.find({ users: req.user.id })
      .populate('users', '-password')
      .populate('messages');  // Populate the messages field
    res.json(chats);
  } catch (err) {
    console.error('Error fetching chats:', err.message);
    res.status(500).send('Server Error');
  }
};

exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat1.findById(req.params.id).populate('users', '-password').populate('messages');
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }
    res.json(chat);
  } catch (err) {
    res.status(500).send('Server Error');
  }

}



// Create a new message
exports.createMessage = async (req, res) => {
  const { id } = req.params; 
  const { content } = req.body; 
  const userId = req.user.id; 
  console.log(userId);
  

  try {
    const chat = await Chat1.findById(id);
    console.log(chat);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = new MessageModel({
      sender: userId,
      content,
      chat: id,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all messages in a chat
exports.getMessages = async (req, res) => {
  const { id } = req.params; // Chat ID

  try {
    const messages = await MessageModel.find({ chat: id }).populate('sender', 'name email');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  const { id, messageId } = req.params; // Chat ID and Message ID
  console.log(messageId);
  
  const userId = req.user.id; // Sender ID from JWT

  try {
    const message = await MessageModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await message.deleteOne();

    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Assuming Chat1 is your Notification model
// exports.Notification = async (req, res) => {
//   try {
//     const { userId, message } = req.body;
//     const notification = new Chat1({ userId, message });
//     console.log(notification);
    
//     await notification.save();
//     res.status(201).json(notification);
//     console.log(notification);
    

//     // Send notification to the user via WebSocket
//     const io = getSocketInstance(); // Ensure this is correctly retrieved
//     io.emit('notification', notification);

//     // Ensure we do not continue executing after sending a response
//     return; 
//   } catch (err) {
//     console.error('Error in POST /api/notifications:', err);
//     if (!res.headersSent) {
//       res.status(500).json({ msg: 'Server Error' });
//     }
//     return; // Ensure we do not continue executing after sending a response
//   }
// };


// exports.getNotification = async (req, res) => {
//   try {
//     const notifications = await Chat1.find({ userId: req.user.id });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server Error' });
//   }
// };