const Message = require('../Models/MessageModels');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        const { sender, recipient, content } = data;
        const newMessage = new Message({ sender, recipient, content });
        await newMessage.save();
        console.log(newMessage);

        io.to(recipient).emit('newMessage', newMessage);
        io.to(sender).emit('messageSent', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};