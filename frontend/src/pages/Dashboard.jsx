import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api/axios";
import { setVideos, updateProgress } from "../features/videoSlice";
import Upload from "../components/Upload";
import VideoCard from "../components/VideoCard";
import socket from "../sockets/socket";
import { toast } from "react-toastify";

export default function Dashboard() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video.videos) || [];

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ Fetch Videos
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await API.get("/videos");

      // 🔥 IMPORTANT FIX (backend returns { success, data })
      dispatch(setVideos(res.data.data));

    } catch (err) {
      console.error("Error fetching videos:", err);

      toast.error(
        err.response?.data?.message ||
        "Failed to load videos ❌"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();

    // ✅ Optional socket support (future-ready)
    const handleProgress = (data) => {
      dispatch(updateProgress(data));
    };

    const handleCompleted = () => {
      fetchVideos();
    };

    socket.on("progress", handleProgress);
    socket.on("completed", handleCompleted);

    return () => {
      socket.off("progress", handleProgress);
      socket.off("completed", handleCompleted);
    };
  }, [dispatch]);
    
  const filteredVideos = videos
    .filter((v) => (filter === "all" ? true : v.status === filter))
    .filter((v) =>
      v.title?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Video Dashboard 🎬
        </h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        {/* 🔥 Pass refresh function */}
        <Upload onUploadSuccess={fetchVideos} />
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-md mt-6 flex flex-col md:flex-row gap-4 items-center">
        
        {/* Filter */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Videos</option>
          <option value="safe">Safe</option>
          <option value="flagged">Flagged</option>
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search videos..."
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">No videos found 😕</p>
            <p className="text-sm">Try adjusting filters or search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((v) => (
              <VideoCard key={v._id} video={v} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}