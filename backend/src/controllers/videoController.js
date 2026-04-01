import Video from "../models/Video.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      folder: "videos",
    });

    const video = await Video.create({
      title: file.originalname,
      path: result.secure_url, // ✅ Cloudinary URL
      status: "safe",
      progress: 100,
      owner: req.user._id,
    });

    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
};

export const getVideos = async (req, res) => {
  const { status } = req.query;

  const filter = {
    tenantId: req.user.tenantId
  };

  if (status) filter.status = status;

  const videos = await Video.find(filter);

  res.json(videos);
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