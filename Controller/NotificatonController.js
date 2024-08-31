const socketIo = require('socket.io');
const notificationModel = require("../Models/NotificatonModel")
const { getSocketInstance} = require("../Utils/SocketHandler")

exports.Notification = async (req, res) => {
    try {
      const { userId, message } = req.body;
      const notification = new notificationModel({ userId, message });
      console.log(notification);
      
      await notification.save();
      res.status(201).json(notification);
      console.log(notification);
      
  
      // Send notification to the user via WebSocket
      const io = getSocketInstance();
       // Ensure this is correctly retrieved
      io.emit('notification', notification);
      console.log('Notification sent via WebSocket:', notification);
    
      // Ensure we do not continue executing after sending a response
      return; 
    } catch (err) {
      console.error('Error in POST /api/notifications:', err);
      if (!res.headersSent) {
        res.status(500).json({ msg: 'Server Error' });
      }
      return; // Ensure we do not continue executing after sending a response
    }
  };
  
  
  exports.getNotification = async (req, res) => {
      try {
        const { userId } = req.params;
        const notifications = await notificationModel.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(notifications);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  