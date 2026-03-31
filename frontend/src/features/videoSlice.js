import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: []
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    updateProgress: (state, action) => {
      const { videoId, percent } = action.payload;
      const video = state.videos.find(v => v._id === videoId);
      if (video) video.progress = percent;
    }
  }
});

export const { setVideos, updateProgress } = videoSlice.actions;
export default videoSlice.reducer;