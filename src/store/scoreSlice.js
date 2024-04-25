import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: 0,
  reducers: {
    setScore: (state, action) => {
      return action.payload;
    },
  },
});

export const { setScore } = scoreSlice.actions;
export default scoreSlice.reducer;
