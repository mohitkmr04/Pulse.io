import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import multer from "multer";

const app = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL_1,
    process.env.CLIENT_URL_2
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ msg: err.message });
  }

  if (err.message === "Only valid video files are allowed") {
    return res.status(400).json({ msg: err.message });
  }

  res.status(500).json({ msg: "Server Error" });
});

export default app;