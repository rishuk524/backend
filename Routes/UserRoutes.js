const express = require('express');
const router = express.Router();

const userController = require("../Controller/UserController")
const  jwtMiddleware = require("../Middleware/jwtMiddleware")

router.get('/:id', jwtMiddleware.jwtMiddleware, userController.getUserDetails);
router.get('/search', jwtMiddleware.jwtMiddleware, userController.searchUsers);
router.post('/:id/friends', jwtMiddleware.jwtMiddleware, userController.addFriend);
router.delete('/:id/friends', jwtMiddleware.jwtMiddleware, userController.removeFriend);

module.exports = router;