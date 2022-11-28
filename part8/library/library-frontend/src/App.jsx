import { useState } from "react";
import AddBook from "./components/addBook";
import Authors from "./components/Authors";
import Books from "./components/Books";

function App() {
  const [render, setRender] = useState("authors");
  return (
    <>
      <div>
        <button onClick={() => setRender("authors")}>authors</button>
        <button onClick={() => setRender("books")}>books</button>
        <button onClick={() => setRender("addBook")}>add book</button>
      </div>
      {render === "authors" && <Authors />}
      {render === "books" && <Books />}
      {render === "addBook" && <AddBook render={setRender} />}
    </>
  );
}

export default App;
