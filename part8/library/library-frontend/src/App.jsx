import { useState } from "react";
import AddBook from "./components/addBook";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommended from "./components/Recommended";
import { USER } from "./queries";
import { useQuery } from "@apollo/client";
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const user = useQuery(USER);
  const [render, setRender] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

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
        {token && <button onClick={logout}>logout</button>}
        {token && (
          <button onClick={() => setRender("recommend")}>recommend</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      {render === "authors" && <Authors />}
      {render === "books" && <Books />}
      {render === "addBook" && <AddBook render={setRender} setError={notify} />}
      {render === "login" && (
        <LoginForm
          setToken={setToken}
          setError={notify}
          setRender={setRender}
        />
      )}
      {render === "recommend" && <Recommended user={user} />}
    </>
  );
}

export default App;
