const express = require('express');
const router = express.Router();
const jwtMiddleware = require("../Middleware/jwtMiddleware")
const jwtMiddlewareTest = require("../Controller/JwtMiddlewareTest")

const GeneratedpdfController = require("../Controller/GeneratedpdfController")

router.post("/save",jwtMiddleware.jwtMiddleware, GeneratedpdfController.saveGeneratedContent)
router.put("/update/:id",jwtMiddleware.jwtMiddleware,GeneratedpdfController.updateContent)
router.get("/get-all-content", jwtMiddleware.jwtMiddleware,GeneratedpdfController.getAllContent)




module.exports = router