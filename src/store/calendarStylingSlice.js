import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  selectedColor: "#597773",
  selectedFont: "sans-serif",
  selectedTitleFont: "Lato",
  selectedHatchColor: "#BA824F",
  selectedHatchFontColor: "#c6122e",
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
