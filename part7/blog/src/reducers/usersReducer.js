import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { user } = userSlice.actions;

export const setUser = (users) => {
  return (dispatch) => {
    dispatch(user(users));
  };
};
export const removeUser = () => {
  return (dispatch) => {
    dispatch(user(null));
  };
};
export default userSlice.reducer;
