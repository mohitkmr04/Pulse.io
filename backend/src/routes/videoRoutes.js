import express from "express";

import {
  uploadVideo,
  getVideos,
  streamVideo
} from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadVideoMiddleware } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post(
  "/upload",
  protect(),
  uploadVideoMiddleware.single("video"),
  uploadVideo
);
router.get("/", protect(), getVideos);

export default router;