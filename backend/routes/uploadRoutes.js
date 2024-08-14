import express from 'express';
import cloudinaryUploader from '../config/cloudinaryConfig.js';
import upload from '../helpers/multer.js';

const router = express.Router();

router.route('/').patch(upload.single('logo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const localFilePath = req.file.path;
  const result = await cloudinaryUploader(localFilePath);

  res.send(result.url);
});

export default router;
