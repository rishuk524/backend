const express = require('express');
const router = express.Router();

const GeneratedpdfController = require("../Controller/GeneratedpdfController")

router.post("/save", GeneratedpdfController.saveGeneratedContent)
router.put("/update/:id",GeneratedpdfController.updateContent)

module.exports = router