const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageModel = require('./MessageModel2')
const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
