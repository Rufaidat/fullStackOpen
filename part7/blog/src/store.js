import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import errorMessageReducer from "./reducers/errorReducer";
import userListReducer from "./reducers/userListReducer";
import usersReducer from "./reducers/usersReducer";
import blogFormReducer from "./reducers/blogFormReducer";
import successMessageReducer from "./reducers/sucessReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    error: errorMessageReducer,
    user: usersReducer,
    users: userListReducer,
    formVisibility: blogFormReducer,
    success: successMessageReducer,
  },
});

export default store;
