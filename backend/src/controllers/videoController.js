import Video from "../models/Video.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    // upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      folder: "videos",
    });

    let status = "safe";

    // Example rules
    if (file.size > 80 * 1024 * 1024) {
      status = "flagged"; // large file
    }

    if (!file.mimetype.startsWith("video/")) {
      status = "flagged";
    }

    //  Save in DB
    const video = await Video.create({
      title: file.originalname,
      path: result.secure_url,
      status,
      progress: 100,
      owner: req.user._id,
      tenantId: req.user.tenantId
    });

  res.status(201).json({
  success: true,
  message: "Video uploaded successfully",
  data: video
});

  } catch (err) {
    console.error(err);

    //  If upload fails → flagged
    res.status(500).json({
      msg: "Upload failed",
      status: "flagged"
    });
  }
};

export const getVideos = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {
      owner: req.user._id // ✅ show only user's videos
    };

    // ✅ optional filter
    if (status && status !== "all") {
      filter.status = status;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: videos
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch videos"
    });
  }
};


export const streamVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) return res.status(404).send("Video not found");

  const videoPath = video.path;

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    return res.status(400).send("Requires Range header");
  }

  const CHUNK_SIZE = 1 * 1e6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4"
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
};