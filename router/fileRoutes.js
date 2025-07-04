const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Setup storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

router.post('/upload', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]), (req, res) => {
  console.log(req.files); // { avatar: [...], gallery: [...] }
  res.send('Files uploaded');
});


module.exports = router;
