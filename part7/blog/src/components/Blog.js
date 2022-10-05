import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { like, setBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";

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
      console.log(returnedBlog);
    });
  };

  const addComment = async (event) => {
    event.preventDefault();
    const blogUpdate = {
      ...blogs,
      comments: blogs.comments.concat(event.target.comment.value),
    };
    console.log(blogUpdate);
    await blogService.update(blogUpdate.id, blogUpdate);
    const newBlog = await blogService.getAll();
    console.log(newBlog);
    dispatch(setBlogs(newBlog));
  };

  // const remove = (blog) => {
  //   return async (dispatch) => {
  //     await blogService.remove(blog.id);
  //     const blogs = await blogService.getAll();
  //     dispatch(setBlogs(newBlog));
  //   };
  // };
  return (
    <div className="blog">
      {!blogs ? null : (
        <div>
          <h2>
            {blogs.title} {blogs.author}
          </h2>
          <div>
            <Link>{blogs.url}</Link>
          </div>
          like {blogs.likes}{" "}
          <Button variant="outlined" color="primary" onClick={increaseLike}>
            like
          </Button>
          <p>added by {blogs.user.name}</p>
          <h2>comments</h2>
          {blogs.comments.map((comment) => {
            <li key={Math.floor(Math.random() * 10000)}>{comment}</li>;
          })}
          <div className="formDiv">
            <form onSubmit={addComment}>
              <input id="comment" name="comment" />
              <br />
              <button type="submit">add comment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
