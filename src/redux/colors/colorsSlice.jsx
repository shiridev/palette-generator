import { createSlice, current } from "@reduxjs/toolkit";

const colorsSlice = createSlice({
  name: "colorSlice",
  initialState: {
    colors: [],
    inputValue: "",
    errorMessage: "",
  },

  reducers: {
    addColors: (state, param) => {
      if (state.colors.length < 8) {
        state.colors.push(param.payload.color);
      }
    },
    removeColor: (state, param) => {
      var colors = [];
      state.colors.forEach((v, i) => {
        if (v !== param.payload.color) {
          colors.push(v);
        }
      });
      state.colors = colors;
    },
    addInput: (state, param) => {
      state.inputValue = param.payload.inputValue;
    },
    clearInput: (state) => {
      state.inputValue = "";
    },
    setErrorMessage: (state, param) => {
      state.errorMessage = param.payload.message;
    },
  },
});

export { colorsSlice };
