const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  pdfData: {
    type: Buffer,
    required: true,
  },
  pdfName: {
    type: String,
    required: true,
  },
  pdfContentType: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Pdf", pdfSchema);
