import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notification(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { notification } = notificationSlice.actions;

export const setNotification = (...args) => {
  const message = args[0];
  const time = Number(args[1]) * 1000;
  return (dispatch) => {
    dispatch(notification(message));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, time);
  };
};
export default notificationSlice.reducer;
