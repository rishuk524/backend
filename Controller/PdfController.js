const { response } = require("express");
const PdfModel = require("../Models/Pdf");

const savePdf = async (req, res) => {
  try {
    const pdfData = req.file.buffer;
    const pdfName = req.file.originalname;
    const pdfContentType = req.file.mimetype;
    const newPdf = new PdfModel({
      pdfData,
      pdfName,
      pdfContentType,
    });

    await newPdf.save();
    console.log(newPdf);
    res.status(201).json({ message: "PDF is successfully uploaded", newPdf });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const downloadPDF = async (req, res) => {
  try {
    const pdfId = req.params.id;
    const pdf = await PdfModel.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    res.set({
      'Content-Type': pdf.pdfContentType,
      'Content-Disposition': `attachment; filename="${pdf.pdfName}"`,
    });

    res.send(pdf.pdfData);
    console.log(pdf);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  savePdf,
  downloadPDF
};
