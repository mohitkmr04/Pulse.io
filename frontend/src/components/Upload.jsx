import API from "../api/axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Upload({ onUploadSuccess }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const role = useSelector((state) => state.auth.role);

  // 🔒 RBAC: Block viewer
  if (role === "viewer") {
    return (
      <div className="p-4 text-red-500">
        You don’t have permission to upload
      </div>
    );
  }

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("video", file);

    try {
      setLoading(true);
      setProgress(0);

      const res = await API.post("/videos/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        }
      });

      // ✅ Success message (from backend)
      toast.success(res.data.message || "Upload successful ✅");

      // 🔥 Refresh dashboard (IMPORTANT)
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Upload failed ❌"
      );
    } finally {
      setLoading(false);
      setProgress(0);
      e.target.value = ""; // 🔥 reset file input
    }
  };

  return (
    <div className="p-4 border rounded-xl w-full max-w-md bg-white shadow-sm">

      <h2 className="font-semibold mb-3 text-gray-700">
        Upload Video 🎥
      </h2>

      <input
        type="file"
        accept="video/*"
        onChange={upload}
        disabled={loading}
        className="w-full border p-2 rounded"
      />

      {/* Progress Bar */}
      {loading && (
  <div className="mt-4">

    {/* Progress Container */}
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
      
      {/* Progress Fill */}
      <div
        className="h-4 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-all duration-300 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </div>

    </div>

    {/* Progress Info */}
    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
      <span className="font-medium">
        Uploading...
      </span>

      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md text-xs font-semibold">
        {progress}%
      </span>
    </div>

  </div>
)}

    </div>
  );
}