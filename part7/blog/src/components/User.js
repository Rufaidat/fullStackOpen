import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Table,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);
  const usersList = useSelector((state) => state.users);
  console.log(usersList);

  const keyGenerator = () => {
    return Math.floor(Math.random() * 10000);
  };

  return (
    <div>
      <h2>Blog App</h2>
      {user.name} logged in
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
            {usersList.map((elem) => (
              <TableRow key={keyGenerator()}>
                <TableCell>
                  <Link to={`/users/${elem.id}`}>{elem.name}</Link>
                </TableCell>
                <TableCell>{elem.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;
