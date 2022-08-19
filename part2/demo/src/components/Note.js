import React from "react";

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return <li onClick={toggleImportance}>{label}</li>;
};

export default Note;
