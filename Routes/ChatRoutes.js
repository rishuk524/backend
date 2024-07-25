const express = require('express');
const router = express.Router();
const ChatController = require("../Controller/ChatControllerr");
// const upload = require('../Middleware/Multer');

router.post('/chats',  ChatController.createChat);
// router.get('/blogs/:id/download', BlogController.downloadPDF);
router.get('/get-all-chats', ChatController.createChat) ;
module.exports = router;
