const express = require('express');
const router = express.Router();
const PdfController = require("../Controller/PdfController");
const upload = require('../Middleware/Multer');

router.post('/savepdf',upload, PdfController.savePdf);
router.get('/download/:id', PdfController.downloadPDF);

module.exports = router;
