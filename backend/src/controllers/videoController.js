import Video from "../models/Video.js";
import fs from "fs";
import { processVideo } from "../services/videoProcessor.js";

export const uploadVideo = async (req, res) => {
  const video = await Video.create({
    title: req.body.title,
    filename: req.file.filename,
    path: req.file.path,
    owner: req.user._id,
    tenantId: req.user.tenantId
  });

  processVideo(video._id);

  res.json(video);
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