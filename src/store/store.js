import { configureStore } from "@reduxjs/toolkit";
import alternativesReducer from "./alternativesSlice";
import calendarStylingReducer from "./calendarStylingSlice";
import scoreReducer from "./scoreSlice";

export default configureStore({
  reducer: {
    alternatives: alternativesReducer,
    calendarStyling: calendarStylingReducer,
    score: scoreReducer,
  },
});
