import API from "../api/axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const role = useSelector(state => state.auth.role);

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

    try {
      setLoading(true);
      setProgress(0);

      const form = new FormData();
      form.append("video", file);

      await API.post("/videos/upload", form, {
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        }
      });

      setLoading(false);
      alert("Upload successful ✅");

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="p-4 border rounded-lg w-80">
      <input type="file" onChange={upload} />

      {/* Progress Bar */}
      {loading && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="bg-blue-500 h-3 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{progress}%</p>
        </div>
      )}
    </div>
  );
}