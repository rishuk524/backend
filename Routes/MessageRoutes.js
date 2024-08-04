const express = require('express');
const router = express.Router();

const MessageController = require("../Controller/MessageController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")


// router.get('/fetch/:userId', jwtMiddleware.jwtMiddleware, MessageController.getMessages)
// router.post('/new-Message', jwtMiddleware.jwtMiddleware, MessageController.sendMessage)

router.post('/users-chat', jwtMiddleware.jwtMiddleware, MessageController.createChat);
router.get('/get-chats', jwtMiddleware.jwtMiddleware, MessageController.getChats);
router.get('/chats/:id', jwtMiddleware.jwtMiddleware, MessageController.getChatById);

//message routes

router.post('/create-chats/:id', jwtMiddleware.jwtMiddleware, MessageController.createMessage);

// Get all messages in a chat
router.get('/get-chats/:id', jwtMiddleware.jwtMiddleware, MessageController.getMessages);

// Delete a message
router.delete('/delete-chats/:id/:messageId', jwtMiddleware.jwtMiddleware, MessageController.deleteMessage);
//notification routes
router.post('/notificaton',jwtMiddleware.jwtMiddleware, MessageController.Notification)
router.get('/get-notiffication', jwtMiddleware.jwtMiddleware, MessageController.getNotification)



module.exports = router;    