// server/routes/uploads.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB max per file
});

function getBucket() {
  const conn = mongoose.connection;
  if (conn.readyState !== 1) {
    throw new Error('MongoDB not connected');
  }
  // Lazily create bucket
  if (!conn.uploadsBucket) {
    const { GridFSBucket } = require('mongodb');
    conn.uploadsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
  }
  return conn.uploadsBucket;
}

// ------- Public: stream file by id -------
router.get('/:id', async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const bucket = getBucket();

    // Try to grab metadata to set Content-Type
    const files = await bucket.find({ _id: id }).toArray();
    if (!files || !files[0]) {
      res.status(404);
      throw new Error('File not found');
    }
    const file = files[0];
    const contentType = file.contentType || file.metadata?.contentType || 'application/octet-stream';
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=31536000, immutable');

    bucket.openDownloadStream(id).on('error', next).pipe(res);
  } catch (err) {
    next(err);
  }
});

// ------- Private: upload single image -------
router.post('/', protect, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No file uploaded');
    }
    if (!req.file.mimetype?.startsWith('image/')) {
      res.status(400);
      throw new Error('Only image uploads are allowed');
    }

    const bucket = getBucket();
    const cleanName = (req.file.originalname || 'upload').replace(/[^\w.\-]+/g, '_');
    const uploadStream = bucket.openUploadStream(cleanName, {
      contentType: req.file.mimetype,                 // driver stores this on file doc
      metadata: { contentType: req.file.mimetype },   // for older tooling
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on('error', next);
    uploadStream.on('finish', () => {
      const id = uploadStream.id.toString();
      // We return a relative path so your frontend can use it on the same origin
      res.status(201).json({
        id,
        filename: cleanName,
        path: `/api/uploads/${id}`,
        url: `/api/uploads/${id}`,
      });
    });
  } catch (err) {
    next(err);
  }
});

// ------- Private: delete by id -------
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const bucket = getBucket();
    await bucket.delete(id);
    res.json({ message: 'Deleted', id: id.toString() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
