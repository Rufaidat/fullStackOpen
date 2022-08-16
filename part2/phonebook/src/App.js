import { useState } from "react";
import Persons from "./components/persons";
import Filter from "./components/filter";
import PersonForm from "./components/form";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 254785, id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    const checkName = persons.some((elem) => elem.name === newPerson.name);
    if (!checkName) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newPerson.name} is already added to the phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const toShow = persons.every((elem) => elem.name.includes(filter));
  const namesToShow = toShow
    ? persons
    : persons.filter((elem) => elem.name.includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>{" "}
      <div>
        {namesToShow.map((person) => (
          <Persons key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
