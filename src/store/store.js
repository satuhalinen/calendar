import { configureStore } from "@reduxjs/toolkit";
import alternativesReducer from "./alternativesSlice";
import calendarStylingReducer from "./calendarStylingSlice";
import scoreReducer from "./scoreSlice";
import profileImageReducer from "./profileImageSlice";

export default configureStore({
  reducer: {
    alternatives: alternativesReducer,
    calendarStyling: calendarStylingReducer,
    score: scoreReducer,
    profileImage: profileImageReducer,
  },
});
