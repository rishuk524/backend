const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  // pdfData: {
  //   type: Buffer,
  //   required: true,
  // },
  // pdfName: {
  //   type: String,
  //   required: true,
  // },
  // pdfContentType: {
  //   type: String,
  //   required: true,
  // },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', BlogSchema);
