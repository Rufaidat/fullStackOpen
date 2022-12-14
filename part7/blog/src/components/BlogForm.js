import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { TextField, Button } from "@mui/material";
import { formVisibility } from "../reducers/blogFormReducer";
import { setSuccessMessage } from "../reducers/sucessReducer";
const BlogForm = () => {
  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();
    dispatch(formVisibility(false));
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
      comments: [],
    };
    dispatch(createBlog(newBlog));
    dispatch(
      setSuccessMessage(`You added ${newBlog.title} by ${newBlog.author}`, 10)
    );
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
