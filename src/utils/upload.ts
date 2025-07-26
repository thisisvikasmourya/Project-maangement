import { Request } from 'express';
// src/utils/upload.ts or src/config/multer.ts
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

// Set storage config
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`;
    cb(null, filename);
  },
});

// Optional: File type filter (images only)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
