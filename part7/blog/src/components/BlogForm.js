// import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { TextField, Button } from "@mui/material";
const BlogForm = (props) => {
  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
      comments: [],
    };
    dispatch(createBlog(newBlog));
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <TextField label="title" id="title" name="title" />
        <br />
        <br />
        <TextField label="author" id="author" name="author" />
        <br />
        <br />
        <TextField label="url" id="url" name="url" />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          create
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default BlogForm;
