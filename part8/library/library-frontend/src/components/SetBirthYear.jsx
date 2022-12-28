import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const SetBirthYear = ({ setError, authors }) => {
  const [name, setName] = useState("");
  const [setBornTo, setSetBornTo] = useState("");

  const [updatesetBornTo, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    updatesetBornTo({ variables: { name, setBornTo: Number(setBornTo) } });
    setName("");
    setSetBornTo("");
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("Author not found");
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h1>Set birthYear</h1>
      <form onSubmit={submit}>
        <select name="name" onChange={({ target }) => setName(target.value)}>
          <option>Select an author</option>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
