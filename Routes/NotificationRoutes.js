const express = require('express');
const router = express.Router();

const notificatonController = require("../Controller/NotificatonController")
const jwtMiddleware = require("../Middleware/jwtMiddleware")



router.post('/notificaton',jwtMiddleware.jwtMiddleware, notificatonController.Notification)
 router.get('/get-notification/:userId', jwtMiddleware.jwtMiddleware, notificatonController.getNotification)

 module.exports = router
