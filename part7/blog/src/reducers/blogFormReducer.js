import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = false;

const blogFormSlice = createSlice({
  name: "formVisibility",
  initialState,
  reducers: {
    formVisibility(state, action) {
      state = action.payload;
      return state;
    },
  },
});
export const { formVisibility } = blogFormSlice.actions;

export const toggleVisibility = () => {
  return async (dispatch) => {
    const visible = useSelector((state) => state.formVisibility);
    dispatch(formVisibility(visible ? false : true));
  };
};

export default blogFormSlice.reducer;
