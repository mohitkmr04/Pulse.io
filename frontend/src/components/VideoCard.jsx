import { useState } from "react";

export default function VideoCard({ video }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">

      {/* Title */}
      <h3 className="font-semibold text-gray-800">
        {video.title}
      </h3>

      {/* Status Badge */}
      <span
        className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
          video.status === "safe"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {video.status}
      </span>

      {/* Video Section */}
      <div className="mt-3">
        
        {/* ❌ Flagged Video */}
        {video.status === "flagged" ? (
          <div className="h-40 flex items-center justify-center bg-red-100 text-red-500 rounded-lg">
            🚫 This video is flagged
          </div>
        ) : !play ? (
          /* ▶️ Play Button */
          <div
            className="h-40 bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg hover:bg-gray-300 transition"
            onClick={() => setPlay(true)}
          >
            ▶️ Click to Play
          </div>
        ) : (
          /* 🎬 Video Player */
          <video
            controls
            autoPlay
            className="w-full rounded-lg"
            src={video.path} // ✅ Cloudinary URL
          />
        )}
      </div>

    </div>
  );
}