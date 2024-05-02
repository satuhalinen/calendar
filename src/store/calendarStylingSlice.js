import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generatedImage: null,
  uploadedImage: null,
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
    setGeneratedImage: (state, action) => {
      state.generatedImage = action.payload;
      state.selectedImage = action.payload;
    },
    setUploadedImage: (state, action) => {
      state.uploadedImage = action.payload;
    },
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
      return {
        ...state,
        colorShow: !state.colorShow,
      };
    },
    setFontShow: (state) => {
      return {
        ...state,
        fontShow: !state.fontShow,
      };
    },
    setTitleFontShow: (state) => {
      return {
        ...state,
        titleFontShow: !state.titleFontShow,
      };
    },
    setImageShow: (state) => {
      return {
        ...state,
        imageShow: !state.imageShow,
      };
    },
    setHatchColorShow: (state) => {
      return {
        ...state,
        hatchColorShow: !state.hatchColorShow,
      };
    },
    setHatchFontColorShow: (state) => {
      return {
        ...state,
        hatchFontColorShow: !state.hatchFontColorShow,
      };
    },

    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});

export const {
  setGeneratedImage,
  setUploadedImage,
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
