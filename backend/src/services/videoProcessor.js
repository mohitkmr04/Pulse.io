import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");
import Video from "../models/Video.js";
import path from "path";

export const processVideo = async (videoId) => {
  const video = await Video.findById(videoId);

  video.status = "processing";
  await video.save();

  const outputPath = `uploads/processed-${Date.now()}.mp4`;

  ffmpeg(video.path)
    .output(outputPath) // ✅ REQUIRED
    .on("progress", async (p) => {
      const percent = Math.round(p.percent || 0);

      // ✅ SAFE UPDATE (no parallel save issue)
      await Video.findByIdAndUpdate(videoId, {
        progress: percent,
      });

      global.io.to(video.owner.toString()).emit("progress", {
        videoId,
        percent,
      });
    })
    .on("end", async () => {
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          status: Math.random() > 0.3 ? "safe" : "flagged",
          progress: 100,
          path: outputPath,
        },
        { new: true },
      );

      global.io
        .to(updatedVideo.owner.toString())
        .emit("completed", updatedVideo);
    })
    .on("error", (err) => {
      console.error("FFmpeg error:", err);
    })
    .run();
};
