import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const UserBlogs = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  console.log(id);
  const userMatch = users.find((n) => n.id == id);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>Blog App</h2>
      {user.name} logged in
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {" "}
        {userMatch.blogs.map((elem) => (
          <li key={elem.id}>{elem.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserBlogs;
