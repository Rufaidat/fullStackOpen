import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { like } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { filters } from "../reducers/filterReducer";
import Filter from "./filterVisibility";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

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

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = props.anecdotes;

  console.log(anecdotes);

  const filter = props.filter;

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
              props.like(anecdote);
              props.setNotification(`you voted for '${anecdote.content}'`, 5);
            }}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filters,
  };
};

const mapDispatchToProps = {
  like,
  setNotification,
};

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedNotes;
