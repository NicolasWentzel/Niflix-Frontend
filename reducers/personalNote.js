import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const personalNoteSlice = createSlice({
  name: "personalNote",
  initialState,
  reducers: {
    addNote: (state, action) => {
      console.log("Add Note", action.payload);
      const { note, movie } = action.payload;
      const movieIndex = state.value.findIndex(
        (obj) => obj.title === movie.title
      );
      if (movieIndex === -1) {
        state.value.push({ ...movie, note });
      } else {
        state.value[movieIndex].note = note;
      }
    },

    deleteNote: (state, action) => {
      console.log("Delete Note", action.payload);
      const { movie } = action.payload;
      const movieIndex = state.value.findIndex(
        (obj) => obj.title === movie.title
      );
      if (movieIndex !== -1) {
        delete state.value[movieIndex].note;
      }
    },
  },
});

export const { addNote, deleteNote } = personalNoteSlice.actions;
export default personalNoteSlice.reducer;
