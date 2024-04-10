import { createSlice } from "@reduxjs/toolkit";

const alternativesSlice = createSlice({
  name: "alternatives",
  initialState: [],
  reducers: {
    setAlternatives: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAlternatives } = alternativesSlice.actions;
export default alternativesSlice.reducer;
