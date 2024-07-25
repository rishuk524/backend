const ChatModels = require('../Models/ChatModels');

const createChat = async (req, res) => {
  try {
    const { question, answer } = req.body;
    // const pdfData = req.file.buffer;
    // const pdfName = req.file.originalname;
    // const pdfContentType = req.file.mimetype;
    // console.log(req.body,  pdfName, pdfContentType);

    const newBlog = new ChatModels({
      question,
      answer,
      // pdfData,
      // pdfName,
      // pdfContentType,
    });
    console.log(newBlog);
    await newBlog.save();
    res.status(201).json(newBlog);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



//  const downloadPDF = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const blog = await BlogModels.findById(blogId);

//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     res.set({
//       'Content-Type': blog.pdfContentType,
//       'Content-Disposition': `attachment; filename="${blog.pdfName}"`,
//     });

//     res.send(blog.pdfData);

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
const getAllChat = async (req, res) => {
  try {
    const blogs = await ChatModels.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};


module.exports = {
  createChat,
  // downloadPDF,
  getAllChat
}