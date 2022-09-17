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
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => {
          if (a.votes - b.votes) return 1;
          if (b.votes - a.votes) return -1;
          return 0;
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
