import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    errorMessage(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { errorMessage } = errorMessageSlice.actions;

export const seterrorMessage = (...args) => {
  const message = args[0];
  const time = Number(args[1]) * 1000;
  return (dispatch) => {
    dispatch(errorMessage(message));
    setTimeout(() => {
      dispatch(seterrorMessage(""));
    }, time);
  };
};
export default errorMessageSlice.reducer;
