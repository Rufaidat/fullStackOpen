import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    setLike(state, action) {
      const blogUpdate = action.payload;
      return state.map((elem) =>
        elem.id !== blogUpdate.id ? elem : blogUpdate
      );
    },
  },
});

export const { appendBlogs, setBlogs, setLike } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
  };
};

export const like = (blog) => {
  const changedBlog = { ...blog, votes: blog.votes + 1 };
  return async (dispatch) => {
    const newBlog = await blogService.update(blog.id, changedBlog);

    console.log(newBlog);

    dispatch(setLike(newBlog));
  };
};

export const remove = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
