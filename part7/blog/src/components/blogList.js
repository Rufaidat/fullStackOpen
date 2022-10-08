import { useState, useEffect, useRef } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { seterrorMessage } from "../reducers/errorReducer";
import { setSuccessMessage } from "../reducers/sucessReducer";
import { setUser } from "../reducers/usersReducer";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogStyle = {
    padding: "0 2rem",
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
  const blogFormRef = useRef();

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
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
      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      dispatch(setSuccessMessage(`welcome ${user.username}`, 10));
    } catch (exception) {
      dispatch(seterrorMessage(`wrong username or password`, 10));
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
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

          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>Blog App</h2>

          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <div key={blog.id} style={blogStyle} className="blog">
                <Link
                  to={`/blogs/${blog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p>
                    {" "}
                    {blog.title} <strong>{blog.author}</strong>
                  </p>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default BlogList;
