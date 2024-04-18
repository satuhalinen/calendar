import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  savedImageURL: null,
  selectedColor: "#ab7244",
  selectedFont: "Raleway",
  selectedTitleFont: "Raleway",
  selectedHatchColor: "#c18e60",
  selectedHatchFontColor: "#f5ebeb",
  selectedHatchesNumber: 31,
  colorShow: false,
  fontShow: false,
  titleFontShow: false,
  imageShow: false,
  hatchColorShow: false,
  hatchFontColorShow: false,
  inputValue: "Title",
};

const calendarStylingSlice = createSlice({
  name: "calendarStyling",
  initialState,
  reducers: {
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    saveImageURL: (state, action) => {
      state.savedImageURL = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedFont: (state, action) => {
      state.selectedFont = action.payload;
    },
    setSelectedTitleFont: (state, action) => {
      state.selectedTitleFont = action.payload;
    },
    setSelectedHatchColor: (state, action) => {
      state.selectedHatchColor = action.payload;
    },
    setSelectedHatchFontColor: (state, action) => {
      state.selectedHatchFontColor = action.payload;
    },
    setSelectedHatchesNumber: (state, action) => {
      state.selectedHatchesNumber = action.payload;
    },
    setColorShow: (state) => {
      state.colorShow = !state.colorShow;
    },
    setFontShow: (state) => {
      state.fontShow = !state.fontShow;
    },
    setTitleFontShow: (state) => {
      state.titleFontShow = !state.titleFontShow;
    },
    setImageShow: (state) => {
      state.imageShow = !state.imageShow;
    },
    setHatchColorShow: (state) => {
      state.hatchColorShow = !state.hatchColorShow;
    },
    setHatchFontColorShow: (state) => {
      state.hatchFontColorShow = !state.hatchFontColorShow;
    },

    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const {
  saveImageURL,
  setSelectedImage,
  setSelectedColor,
  setSelectedFont,
  setSelectedTitleFont,
  setSelectedHatchColor,
  setSelectedHatchFontColor,
  setSelectedHatchesNumber,
  setColorShow,
  setFontShow,
  setTitleFontShow,
  setImageShow,
  setHatchColorShow,
  setHatchFontColorShow,
  setInputValue,
} = calendarStylingSlice.actions;

export default calendarStylingSlice.reducer;
