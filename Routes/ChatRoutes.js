const express = require('express');
const router = express.Router();
const ChatController = require("../Controller/ChatControllerr");
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")
// const upload = require('../Middleware/Multer');

router.post('/chats', jwtMiddleware.jwtMiddleware, jwtMiddlewareTest.jwtMiddlewareTest,ChatController.createChat);
// router.get('/blogs/:id/download', BlogController.downloadPDF);
router.get('/get-all-chats',jwtMiddleware.jwtMiddleware, jwtMiddlewareTest.jwtMiddlewareTest, ChatController.getAllChat) ;
module.exports = router;
