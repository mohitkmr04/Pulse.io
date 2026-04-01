import multer from "multer";
import path from "path";
import fs from "fs";

const MAX_SIZE = 100 * 1024 * 1024; 

const allowedTypes = [
  "video/mp4",
  "video/mkv",
  "video/webm",
  "video/avi"
];

const allowedExt = [".mp4", ".mkv", ".webm", ".avi"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "temp/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {

  const ext = path.extname(file.originalname).toLowerCase();

  //  Invalid MIME type
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Invalid file type (${file.mimetype}). Only MP4, MKV, WEBM, AVI allowed.`
      ),
      false
    );
  }

  // Invalid extension
  if (!allowedExt.includes(ext)) {
    return cb(
      new Error(
        `Invalid file extension (${ext}). Allowed: ${allowedExt.join(", ")}`
      ),
      false
    );
  }

  cb(null, true);
};

export const uploadVideoMiddleware = multer({
  storage,
  limits: {
    fileSize: MAX_SIZE
  },
  fileFilter
});