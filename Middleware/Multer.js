const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}).single('pdf');

module.exports = upload;
