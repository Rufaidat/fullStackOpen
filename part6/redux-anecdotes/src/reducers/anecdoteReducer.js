import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    setLike(state, action) {
      const anecdoteUpdate = action.payload;
      return state.map((elem) =>
        elem.id !== anecdoteUpdate.id ? elem : anecdoteUpdate
      );
    },
  },
});

export const { appendAnecdote, setAnecdotes, setLike } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const like = (anecdote) => {
  const changedNote = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.update(anecdote.id, changedNote);

    console.log(newAnecdote);

    dispatch(setLike(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
