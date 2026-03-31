import express from "express";
import multer from "multer";
import {
  uploadVideo,
  getVideos,
  streamVideo
} from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", protect(["editor", "admin"]), upload.single("video"), uploadVideo);
router.get("/", protect(), getVideos);
router.get("/stream/:id", streamVideo);

export default router;