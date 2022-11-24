import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/Form";
import phoneService from "./services/phone";
import Notification from "./components/Notification";
import Success from "./components/SuccessMessage";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 254785, id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //fetch data from db.json
  useEffect(() => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // function add name or not for form event listener
  const addName = (event) => {
    event.preventDefault();
    // create a new object containing data to be added or not
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    // check if a contact name exist
    const checkName = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    if (newName.length < 3) {
      setErrorMessage(` ${newName} is shorter than the minimum length (3)`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    if (!/\d{2,3}-\d{6,}/.test(newNumber)) {
      setErrorMessage(` ${newNumber} is not a valid number`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    if (!checkName) {
      //add contact if it doesnt exist
      phoneService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          // send a success message if send is successful
          setSuccessMessage(`added ${newPerson.name} successfully`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } else {
      if (
        //if name exist ask the user to update or not
        window.confirm(
          `${newPerson.name} is already added to the phonebook,replace the old number with a new one`
        ) &&
        /\d{2,3}-\d{6,}/.test(newNumber)
      ) {
        //update if user asks to
        phoneService
          .update(checkName.id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                if (
                  person.name.trim().toLowerCase() ===
                  checkName.name.trim().toLowerCase()
                )
                  person.number = newNumber;
                return person;
              })
            );

            //set a success message
            setSuccessMessage(` ${newPerson.name} updated successfully`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            //set an error message

            setErrorMessage(
              `information of ${newPerson.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((n) => n.id !== checkName.id));
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  //event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // filter contacts
  const namesToShow = persons.filter((elem) =>
    elem.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
  );
  // handle deleting a contact
  const handleDelete = (id) => {
    const checkName = persons.find((person) => person.id === id);
    phoneService.remove(id).then((returnedPerson) => {
      setPersons(persons.filter((person) => person.id !== id));
      setSuccessMessage(`${checkName.name} removed successfully`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={errorMessage} />
      <Success success={successMessage} />
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
