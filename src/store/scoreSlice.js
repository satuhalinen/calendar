import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: {},
  reducers: {
    setScore: (state, action) => {
      const { hatchNumber, isChecked } = action.payload;
      if (!state[hatchNumber]) {
        state[hatchNumber] = {};
      }
      state[hatchNumber].isChecked = isChecked;
    },
    fetchScoreFromFirebase: (state, action) => {
      return action.payload;
    },
    setOpen: (state, action) => {
      const { hatchNumber } = action.payload;
      if (!state[hatchNumber]) {
        state[hatchNumber] = {};
      }
      state[hatchNumber].isOpened = true;
    },
  },
});

export const { setScore, fetchScoreFromFirebase, setOpen } = scoreSlice.actions;
export default scoreSlice.reducer;
