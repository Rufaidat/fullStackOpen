import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import BlogList from "./components/blogList";
import Notification from "./components/Notification";
import Success from "./components/successMessage";
import User from "./components/User";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import { removeUser } from "./reducers/usersReducer";
import Blog from "./components/Blog";
import { like } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userListReducer";
import UserBlogs from "./components/UserBlogs";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };

  return (
    <Container>
      {" "}
      <Router>
        {/* <Link to="/">blogs</Link>
        <Link to="/users">users</Link> */}
        {user === null ? null : (
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              <p>{user.name} logged in</p>
              {/* {user === null ? null : <p>{user.name} logged in</p>} */}
              {/* <p>{user.name} logged in</p>
              {user === null ? null : (
                <Button onClick={handleLogout} component={Link} color="inherit">
                  log out
                </Button>
              )} */}
              <Button onClick={handleLogout} component={Link} color="inherit">
                log out
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <div>
          <Notification />
          <Success />
        </div>
        <Routes>
          <Route
            path="/blogs/:id"
            element={<Blog blog={useSelector((state) => state.blogs)} />}
          />
          <Route path="/users/:id" element={<UserBlogs />} />
          <Route path="/" element={<BlogList />} />
          <Route
            path="/users"
            element={user === null ? <Navigate replace to="/" /> : <User />}
          />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
