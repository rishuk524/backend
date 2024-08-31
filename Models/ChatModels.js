// const mongoose = require('mongoose');

// const ChatSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   answer: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Assuming you have a User model
//     required: true,
//   },
// }, {
//   timestamps: true,
// });

// module.exports = mongoose.model('Chat1', ChatSchema);
// models/Conversation.js
 const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  messages: [
    {
      timestamp: { type: Date, default: Date.now },
      message: { type: String, required: true },
      response: { type: String, required: true },
      
    }
  ]
});

const Conversation = mongoose.model('Conversation', conversationSchema);
// console.log('Conversation Model:', Conversation);

module.exports = Conversation;
