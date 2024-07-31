const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Chat', ChatSchema);
