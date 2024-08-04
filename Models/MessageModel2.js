// const mongoose = require('mongoose');
// const User = require('./UserModels')


// const messageSchema = new mongoose.Schema({
//   sender: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
// },
//   recipient: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
// },
//   content: { 
//     type: String, 
//     required: true 
// },
//   timestamp: { 
//     type: Date, 
//     default: Date.now 
// },
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

// models/Chat.js
const mongoose = require('mongoose');
const MessageModel = require("./MessageModel")
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  // participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, { timestamps: true });



module.exports = mongoose.model('Chat', ChatSchema);
