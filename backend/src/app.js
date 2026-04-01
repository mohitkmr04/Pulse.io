import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

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
  console.error(err);
  res.status(500).json({ msg: "Server Error" });
});

export default app;