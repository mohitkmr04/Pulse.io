export default function VideoCard({ video }) {
  return (
    <div className="border p-3 rounded-lg">
      <h3>{video.title}</h3>

      <p>Status: {video.status}</p>

      {video.status !== "processing" && (
        <video controls className="w-full mt-2">
          <source
            src={`http://localhost:5000/api/videos/stream/${video._id}`}
            type="video/mp4"
          />
        </video>
      )}
    </div>
  );
}