const express = require('express');
const router = express.Router();
const ChatController = require("../Controller/ChatControllerr");
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")
// const upload = require('../Middleware/Multer');

router.post('/converstaton', jwtMiddleware.jwtMiddleware,ChatController.sendMessage);
router.get('/get-conversaton/:userId',jwtMiddleware.jwtMiddleware,ChatController.getConversationMessage)
router.post('/get-multiple-conversatons',jwtMiddleware.jwtMiddleware,ChatController.getMultipleConversations)
router.delete('/clear-conversation/:userId',jwtMiddleware.jwtMiddleware, ChatController.clearConverSationMessage)
module.exports = router;
