import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
// import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    // notifications: notificationReducer,
    // filters: filterReducer,
  },
});

export default store;
