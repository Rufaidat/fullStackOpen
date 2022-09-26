import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Success from "./components/successMessage";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialNotes) => {
      setBlogs(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(
        `a new blog "${blogObject.title}" ${blogObject.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const increaseLike = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then((returnedBlog) => {
      setBlogs(
        blogs.map((elem) => (elem.id === returnedBlog.id ? returnedBlog : elem))
      );
      console.log(returnedBlog);
    });
  };

  const removeBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      setBlogs(blogs.filter((elem) => blogObject.id !== elem.id));
      blogService.remove(blogObject.id);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification error={errorMessage} />
          <Success success={successMessage} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification error={errorMessage} />
          <Success success={successMessage} />
          <p>{user.name} logged in</p>{" "}
          <button type="submit" onClick={handleLogout}>
            log out
          </button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={increaseLike}
                handleRemove={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default App;
