const express = require('express');
const router = express.Router();
const BlogController = require("../Controller/BlogController");
// const upload = require('../Middleware/Multer');

router.post('/blogs',  BlogController.createBlog);
// router.get('/blogs/:id/download', BlogController.downloadPDF);
router.get('/get-all-blogs', BlogController.getAllBlogs) ;
module.exports = router;
