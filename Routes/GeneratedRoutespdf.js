const express = require('express');
const router = express.Router();
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")

const GeneratedpdfController = require("../Controller/GeneratedpdfController")

router.post("/save",jwtMiddleware.jwtMiddleware, jwtMiddlewareTest.jwtMiddlewareTest, GeneratedpdfController.saveGeneratedContent)
router.put("/update/:id",GeneratedpdfController.updateContent)




module.exports = router