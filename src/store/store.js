import { configureStore } from "@reduxjs/toolkit";
import alternativesReducer from "./alternativesSlice";
import calendarStylingReducer from "./calendarStylingSlice";
export default configureStore({
  reducer: {
    alternatives: alternativesReducer,
    calendarStyling: calendarStylingReducer,
  },
});
