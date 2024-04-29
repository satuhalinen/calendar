import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {},
  reducers: {
    setScore: (state, action) => {
      state[action.payload.hatchNumber] = action.payload.isChecked;
    },
    fetchScoreFromFirebase: (state, action) => {
      return action.payload;
    },
  },
});

export const { setScore, fetchScoreFromFirebase } = scoreSlice.actions;
export default scoreSlice.reducer;
