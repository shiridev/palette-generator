import { configureStore } from "@reduxjs/toolkit";
import { colorsSlice } from "./redux/colors/colorsSlice";

const store = configureStore({
  reducer: {
    colorReducer: colorsSlice.reducer,
  },
});

export default store;
