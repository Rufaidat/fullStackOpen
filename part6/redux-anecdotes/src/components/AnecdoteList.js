import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { filters } from "../reducers/filterReducer";
import Filter from "./filterVisibility";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleLike }) => {
  return (
    <div>
      {anecdote.content}{" "}
      <div>
        has {anecdote.votes}
        <button onClick={handleLike}>like</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  const anecdotes = useSelector((state) => state.anecdotes);

  console.log(anecdotes);

  const filter = useSelector((state) => state.filters);

  return (
    <div>
      <Filter filter={(e) => dispatch(filters(e.target.value))} />
      {[...anecdotes]
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .filter((elem) => elem.content.includes(filter))
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleLike={() => {
              dispatch(like(anecdote));
              dispatch(
                setNotification(`you voted for '${anecdote.content}'`, 10)
              );
            }}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
