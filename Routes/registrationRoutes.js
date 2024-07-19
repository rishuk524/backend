const express = require('express');
const router = express.Router();

const registrationController = require('../Controller/registrationController');

//register User
router.post('/register', registrationController.registerUser);
router.post('/login', registrationController.loginUser);

module.exports = router;