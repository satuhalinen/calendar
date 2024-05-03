import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: { hatches: {} },
  reducers: {
    setScore: (state, action) => {
      const { hatchNumber, isChecked } = action.payload;
      if (!state.hatches[hatchNumber]) {
        state.hatches[hatchNumber] = {};
      }
      state.hatches[hatchNumber].isChecked = isChecked;
    },
    fetchScoreFromFirebase: (state, action) => {
      return action.payload;
    },
    setOpen: (state, action) => {
      const { hatchNumber } = action.payload;
      if (!state.hatches[hatchNumber]) {
        state.hatches[hatchNumber] = {};
      }
      state.hatches[hatchNumber].isOpened = true;
    },
    saveToMyCalendar: (state, action) => {
      state.startedUsing = action.payload;
    },
    resetState: () => {
      return { hatches: {} };
    },
  },
});

export const {
  setScore,
  fetchScoreFromFirebase,
  setOpen,
  saveToMyCalendar,
  resetState,
} = scoreSlice.actions;
export default scoreSlice.reducer;
