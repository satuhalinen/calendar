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
      const { number, alternative, topic } = action.payload;
      state.savedAlternatives[number] = { ...alternative, topic };
    },
    resetSavedAlternatives: (state) => {
      state.savedAlternatives = {};
    },

    showCalendarText: (state, action) => {
      state.calendarText = action.payload;
    },
    fetchFromFirebase: (state, action) => {
      return {
        ...state,
        savedAlternatives: action.payload,
      };
    },
  },
});

export const {
  setAvailableAlternatives,
  saveAlternatives,
  showCalendarText,
  fetchFromFirebase,
  resetSavedAlternatives,
} = alternativesSlice.actions;

export default alternativesSlice.reducer;
