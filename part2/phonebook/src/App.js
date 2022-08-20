import { useState, useEffect } from "react";
import axios from "axios";
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

  //fetch data from db.json
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  // use useeffect to change the state of persons
  useEffect(hook, []);

  // function add name or not for form event listener
  const addName = (event) => {
    event.preventDefault();
    // create a new object containing data to be added or not
    const newPerson = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };
    // check if a contact name exist
    const checkName = persons.some((elem) => elem.name === newPerson.name);

    if (!checkName) {
      //add contact if it doesnt exist
      setPersons(persons.concat(newPerson));
    } else {
      //alert it already exist
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

  // handle deleting a contact
  const handleDelete = (id) => {
    setPersons(persons.filter((n) => n.id !== id));
  };

  // check if persons name include the fiter input value
  const toShow = persons.every((elem) => elem.name.includes(filter));

  //assign persons that contain the filter value to a variable
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
          <Persons
            key={person.id}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
