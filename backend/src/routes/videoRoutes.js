import express from "express";
import multer from "multer";
import {
  uploadVideo,
  getVideos,
  streamVideo
} from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "temp/" });

router.post("/upload", protect(), upload.single("video"), uploadVideo);
router.get("/", protect(), getVideos);

export default router;