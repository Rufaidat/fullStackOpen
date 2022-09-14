import { useDispatch, useSelector } from "react-redux";
import { like } from "../reducers/anecdoteReducer";
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
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleLike={() => dispatch(like(anecdote.id))}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
