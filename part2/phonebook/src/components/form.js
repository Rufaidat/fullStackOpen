import React from "react";

const PersonForm = (persons) => {
  return (
    <form onSubmit={persons.addName}>
      <div>
        name:{" "}
        <input value={persons.newName} onChange={persons.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input
          value={persons.newNumber}
          onChange={persons.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
