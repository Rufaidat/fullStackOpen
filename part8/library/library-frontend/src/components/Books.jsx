import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import Try from "./Try";
const Books = () => {
  const [genre, setGenre] = useState("all genres");
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <p>loading...</p>;
  }
  const genres = Array.from(
    new Set(result.data.allBooks.map((book) => book.genres).flat())
  ).flat();

  return (
    <div>
      <h1>books</h1>
      <p>
        in genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {genre === "all genres"
            ? result.data.allBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))
            : result.data.allBooks
                .filter((book) => book.genres.includes(genre))
                .map((book) => (
                  <tr key={book.title}>
                    <td>{book.title}</td>
                    <td>{book.author.name}</td>
                    <td>{book.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre("all genres")}>all genres</button>
      <Try />
    </div>
  );
};

export default Books;
