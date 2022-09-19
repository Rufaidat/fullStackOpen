import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filters(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { filters } = filterSlice.actions;
export default filterSlice.reducer;
