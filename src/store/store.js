import { configureStore } from "@reduxjs/toolkit";
import alternativesReducer from "./alternativesSlice";
export default configureStore({
  reducer: {
    alternatives: alternativesReducer,
  },
});
