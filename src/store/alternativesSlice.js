import { createSlice } from "@reduxjs/toolkit";

const alternativesSlice = createSlice({
  name: "alternatives",
  initialState: {
    availableAlternatives: [],
    savedAlternatives: {},
  },
  reducers: {
    setAvailableAlternatives: (state, action) => {
      state.availableAlternatives = action.payload;
    },
    saveAlternatives: (state, action) => {
      state.savedAlternatives[action.payload.number] =
        action.payload.alternative;
    },
  },
});

export const { setAvailableAlternatives, saveAlternatives } =
  alternativesSlice.actions;
export default alternativesSlice.reducer;
