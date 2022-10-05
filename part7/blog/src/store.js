import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userListReducer from "./reducers/userListReducer";
import usersReducer from "./reducers/usersReducer";
// import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    user: usersReducer,
    users: userListReducer,
    // notifications: notificationReducer,
    // filters: filterReducer,
  },
});

export default store;
