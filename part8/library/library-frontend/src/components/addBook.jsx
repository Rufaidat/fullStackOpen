import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, NEW_BOOK } from "../queries";

const AddBook = ({ render }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [newBook] = useMutation(NEW_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  // useEffect(() => {
  //   console.log(genres);
  // }, [genres]);
  const submit = (event) => {
    event.preventDefault();

    newBook({ variables: { title, author, published, genres } });

    setAuthor("");
    setTitle("");
    setPublished("");
    setGenres([]);
    render("books");
  };

  const addGenre = () => {
    setGenres(genres.concat(newGenre));
    setNewGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {" "}
          title{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          {" "}
          author{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          {" "}
          published{" "}
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          {" "}
          genre{" "}
          <input
            value={newGenre}
            onChange={({ target }) => setNewGenre(target.value)}
          />{" "}
          <button type="button" onClick={addGenre}>
            add genre
          </button>
        </div>
        <div> genres:{[...genres].map((genre) => genre).join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default AddBook;
