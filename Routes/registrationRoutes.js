const express = require('express');
const router = express.Router();

const registrationController = require('../Controller/registrationController');
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest.js")
//register User
router.post('/register', registrationController.registerUser);
router.post('/login', registrationController.loginUser);
router.get("/get-all-user", registrationController.getAllUsers)

//jwtMiddleware routes
router.get('/verify-token', jwtMiddleware.jwtMiddleware, jwtMiddlewareTest.jwtMiddlewareTest)

module.exports = router;