import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mustSeeSlice = createSlice({
  name: "mustSee",
  initialState,
  reducers: {
    addMovieToSee: (state, action) => {
      console.log("Add Movie", action.payload);
      state.value.push(action.payload);
    },
    deleteMovieToSee: (state, action) => {
      console.log("Delete Movie", action.payload);
      const movieToDelete = action.payload;
      state.value = state.value.filter(
        (movie) => movie.title !== movieToDelete
      );
    },
  },
});

export const { addMovieToSee, deleteMovieToSee } = mustSeeSlice.actions;
export default mustSeeSlice.reducer;
