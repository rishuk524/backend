const express = require('express');
const router = express.Router();

const MessageController = require("../Controller/MessageController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")

router.get('/:userId', jwtMiddleware.jwtMiddleware, MessageController.getMessages)
router.post('/new-Message', jwtMiddleware.jwtMiddleware, MessageController.sendMessage)

module.exports = router;    