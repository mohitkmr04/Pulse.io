import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: [],
    selectedVideo: null // 🎬 for playback (optional modal later)
  },

  reducers: {
    // ✅ Set all videos (from API)
    setVideos: (state, action) => {
      state.videos = action.payload;
    },

    // ✅ Add newly uploaded video instantly (UX boost)
    addVideo: (state, action) => {
      state.videos.unshift(action.payload);
    },

    // ✅ Update progress (for future sockets / streaming)
    updateProgress: (state, action) => {
      const { videoId, percent } = action.payload;

      const video = state.videos.find((v) => v._id === videoId);
      if (video) {
        video.progress = percent;
      }
    },

    // ✅ Update status (safe / flagged)
    updateStatus: (state, action) => {
      const { videoId, status } = action.payload;

      const video = state.videos.find((v) => v._id === videoId);
      if (video) {
        video.status = status;
      }
    },

    // ✅ Select video (for player/modal)
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },

    // ✅ Clear selection
    clearSelectedVideo: (state) => {
      state.selectedVideo = null;
    }
  }
});

export const {
  setVideos,
  addVideo,
  updateProgress,
  updateStatus,
  setSelectedVideo,
  clearSelectedVideo
} = videoSlice.actions;

export default videoSlice.reducer;