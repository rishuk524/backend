const express = require('express');
const router = express.Router();

const GeneratedController = require("../Controller/GeneratedController")

router.post("/save", GeneratedController.saveGeneratedContent)
router.put("/update/:id",GeneratedController.updateContent)

module.exports = router