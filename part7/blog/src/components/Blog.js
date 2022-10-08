import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { like } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { TextField, Button } from "@mui/material";
import { setSuccessMessage } from "../reducers/sucessReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs);
  console.log(blog);
  console.log(blog);
  const id = useParams().id;
  console.log(id);
  const blogs = blog.find((n) => n.id === id);

  const increaseLike = (event) => {
    event.preventDefault();
    const blogUpdate = { ...blogs, likes: blogs.likes + 1 };
    console.log({ ...blogs, likes: blogs.likes + 1 });
    blogService.update(blogUpdate.id, blogUpdate).then((returnedBlog) => {
      dispatch(like(blogUpdate));
      console.log(blogUpdate.title);
      dispatch(setSuccessMessage(`You voted for ${blogUpdate.title}`, 10));
      console.log(returnedBlog);
    });
  };

  const addComment = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;
    const blogUpdate = {
      ...blogs,
      comments: blogs.comments.concat(newComment),
    };
    console.log({ ...blogs, comments: blogs.comments.concat(newComment) });
    blogService.update(blogUpdate.id, blogUpdate).then((returnedBlog) => {
      dispatch(like(blogUpdate));
      console.log(returnedBlog);
    });
  };

  return (
    <div className="blog">
      {!blogs ? null : (
        <div>
          <h2>
            {blogs.title} by {blogs.author}
          </h2>
          <div>
            <Link>{blogs.url}</Link>
          </div>
          <div style={{ marginTop: "1rem" }}>
            like {blogs.likes}{" "}
            <Button variant="outlined" color="primary" onClick={increaseLike}>
              like
            </Button>
          </div>
          <p>
            Added by{" "}
            <strong>
              <em>{blogs.user.name}</em>
            </strong>
          </p>
          <h2>comments</h2>
          {blogs.comments.map((comment) => {
            <li key={Math.floor(Math.random() * 10000)}>{comment}</li>;
          })}
          <div className="formDiv">
            <form onSubmit={addComment}>
              <TextField label="comment" id="comment" name="comment" />
              <br />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Add comment
              </Button>
              <br />
              <br />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
