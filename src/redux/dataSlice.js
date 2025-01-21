// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    movieDetails: {},
  },
  reducers: {
    setmovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setmovieDetails } = dataSlice.actions;
export default dataSlice.reducer;
