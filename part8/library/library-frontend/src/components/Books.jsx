import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) return <p>loading...</p>;
  if (!result.loading) console.log(result.data);

  return (
    <div>
      <h1>books</h1>
      {/* <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Books;
