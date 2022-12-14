import { useState } from "react";
import AddBook from "./components/addBook";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [render, setRender] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  return (
    <>
      <div>
        <button onClick={() => setRender("authors")}>authors</button>
        <button onClick={() => setRender("books")}>books</button>
        {token && (
          <button onClick={() => setRender("addBook")}>add book</button>
        )}
        {!token && <button onClick={() => setRender("login")}>login</button>}
        {token && <button onClick={() => setRender("login")}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      {render === "authors" && <Authors />}
      {render === "books" && <Books />}
      {render === "addBook" && <AddBook render={setRender} />}
      {render === "login" && (
        <LoginForm setToken={setToken} setError={notify} />
      )}
    </>
  );
}

export default App;
