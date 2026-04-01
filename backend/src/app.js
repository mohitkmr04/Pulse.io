import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import multer from "multer";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);


app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);

  // Multer specific errors (file too large etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ msg: err.message });
  }

  // Your custom file type error
  if (err.message === "Only valid video files are allowed") {
    return res.status(400).json({ msg: err.message });
  }

  res.status(500).json({ msg: "Server Error" });
});

export default app;