// // socket.js
// const socketIo = require('socket.io');
// const { sendMessage, getConversationMessage, clearConverSationMessage } = require('../Controller/ChatControllerr');

// let io;

// const initializeSocket = (server) => {
//   io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id);

//     // Handle incoming chat messages
//     socket.on('send_message', async (data) => {
//       console.log('Received message from client:', data); // This logs the received message
//       try {
//         const { userId, message } = data;
//         const response = await sendMessage({ userId, message }); // Call your sendMessage function
//         console.log('Response to be sent:', response); // Log the response
//         io.emit('receive_message', response); // Emit the response to all connected clients
//       } catch (error) {
//         console.error('Error handling send_message event:', error);
//       }
//     });

//     // Handle requests to get conversation history
//     socket.on('get_conversation', async (userId) => {
//       console.log('Hiii')
//       console.log('Received get_conversation request for userId:', userId); // Log the userId
//       try {
//         const messages = await getConversationMessage({ params: { userId } }); // Call your getConversationMessage function
//         console.log('Conversation history fetched:', messages); // Log the fetched messages
//         socket.emit('conversation_history', messages); // Emit the conversation history to the requesting client
//       } catch (error) {
//         console.error('Error fetching conversation:', error);
//       }
//      });

//     // Handle requests to clear conversation history
//     socket.on('clear_conversation', async (userId) => {
//       console.log('Received clear_conversation request for userId:', userId); // Log the userId
//       try {
//         await clearConverSationMessage({ params: { userId } }); // Call your clearConverSationMessage function
//         socket.emit('conversation_cleared', { success: true }); // Notify the client that the history was cleared
//       } catch (error) {
//         console.error('Error clearing conversation:', error);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });
//   });

//   return io;
// };

// const getSocketInstance = () => {
//   if (!io) {
//     throw new Error('Socket.io not initialized');
//   }
//   return io;
// };

// module.exports = { initializeSocket, getSocketInstance };
