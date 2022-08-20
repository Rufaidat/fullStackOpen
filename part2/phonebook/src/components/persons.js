import React from "react";
const Persons = ({ person, handleDelete }) => {
  const deleted = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) handleDelete(person.id);
  };

  return (
    <div className="person">
      {person.name} {person.number}
      <button onClick={() => deleted(person)}>delete</button>
    </div>
  );
};

export default Persons;
