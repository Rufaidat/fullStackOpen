import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const SuccessMessageSlice = createSlice({
  name: "SuccessMessage",
  initialState,
  reducers: {
    SuccessMessage(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { SuccessMessage } = SuccessMessageSlice.actions;

export const setSuccessMessage = (...args) => {
  const message = args[0];
  const time = Number(args[1]) * 1000;
  return (dispatch) => {
    dispatch(SuccessMessage(message));
    setTimeout(() => {
      dispatch(setSuccessMessage(""));
    }, time);
  };
};
export default SuccessMessageSlice.reducer;
