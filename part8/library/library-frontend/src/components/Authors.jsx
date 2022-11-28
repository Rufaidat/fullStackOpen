import { ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import SetBirthYear from "./SetBirthYear";

const Authors = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  const result = useQuery(ALL_AUTHORS);
  if (result.loading) return <p>loading...</p>;
  return (
    <div>
      <h1>authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>

          {result.data.allAuthors.map((author) => (
            <tr key={author.name}>
              {" "}
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Notify errorMessage={errorMessage} />
      <SetBirthYear setError={notify} authors={result.data.allAuthors} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default Authors;
