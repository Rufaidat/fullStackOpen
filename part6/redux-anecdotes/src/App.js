import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

export let inputValue;
const App = () => {
  const filter = (event) => {
    inputValue = event.target.value;
    console.log(inputValue);
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      <input onChange={filter} />
      {/* <Notification /> */}
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
