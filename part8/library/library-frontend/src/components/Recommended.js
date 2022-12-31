import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, USER } from "../queries";

function Recommended() {
  const user = useQuery(USER);
  const allBooks = useQuery(ALL_BOOKS, {
    variables: { genre: user.data.me.favouriteGenre },
  });
  if (user.loading || allBooks.loading) {
    return <h1>loading...</h1>;
  }
  const favorite = user.data.me.favouriteGenre;

  const recommend = allBooks.data.allBooks.filter((data) =>
    data.genres.includes(favorite)
  );
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{favorite}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommend.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recommended;
