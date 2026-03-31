import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  filename: String,
  path: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tenantId: String,
  status: {
    type: String,
    enum: ["uploaded", "processing", "safe", "flagged"],
    default: "uploaded"
  },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);