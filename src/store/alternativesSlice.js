import { createSlice } from "@reduxjs/toolkit";

const alternativesSlice = createSlice({
  name: "alternatives",
  initialState: {
    availableAlternatives: [],
    savedAlternatives: {},
    calendarText: {},
  },
  reducers: {
    setAvailableAlternatives: (state, action) => {
      state.availableAlternatives = action.payload;
    },
    saveAlternatives: (state, action) => {
      state.savedAlternatives[action.payload.number] =
        action.payload.alternative;
    },
    showCalendarText: (state, action) => {
      state.calendarText = action.payload;
    },
  },
});

export const { setAvailableAlternatives, saveAlternatives, showCalendarText } =
  alternativesSlice.actions;
export default alternativesSlice.reducer;
