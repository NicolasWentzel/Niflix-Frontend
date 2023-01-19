import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideoId: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideoId = action.payload;
    },
    clearCurrentVideo: (state) => {
      state.currentVideoId = null;
    },
  },
});

export const { setCurrentVideo, clearCurrentVideo } = movieSlice.actions;
export default movieSlice.reducer;
