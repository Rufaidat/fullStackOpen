import { useState, useEffect, useRef } from "react";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Notification from "../components/Notification";
import Success from "../components/successMessage";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { like, setBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/usersReducer";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderColor: "blue",
    borderRadius: 2,
  };
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  // const [user, setUser] = useState(null);
  //   const [errorMessage, setErrorMessage] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState(null);
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // setUser(user);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      // setUser(user);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      //   setErrorMessage("wrong username or password");
      //   setTimeout(() => {
      //     setErrorMessage(null);
      //   }, 5000);
    }
  };

  // const removeBlog = (blogObject) => {
  //   if (
  //     window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
  //   ) {
  //     dispatch(setBlogs(blogs.filter((elem) => blogObject.id !== elem.id)));
  //     blogService.remove(blogObject.id);
  //   }
  // };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        {/* <TextField label="username" /> */}

        <TextField
          type="text"
          label="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <br />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <br />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
      <br />
      <br />
    </form>
  );

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <Success />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blog App</h2>
          <Notification />
          <Success />
          <Togglable buttonLabel="Create new" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <div key={blog.id} style={blogStyle} className="blog">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default BlogList;
