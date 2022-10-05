import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services/blogs";

const initialState = [];

const usersSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAllUsers();
    dispatch(setUsers(users));
  };
};

export default usersSlice.reducer;
