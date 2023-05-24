import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  // console.log("render.....");

  useEffect(() => {
    console.log("effect");
    personsServices.getAll().then(initialPersons => {
      console.log("promise fulfilled GET");
      setPersons(initialPersons);
    });
  }, []);

  const [newPerson, setNewPerson] = useState("");
  const handlePersonChange = (event) => {
    console.log("handlePersonChange", event.target.value);
    setNewPerson(event.target.value);
  };

  const [newNumber, setNewNumber] = useState("");
  const handleNumberChange = (event) => {
    console.log("handleNumberChange", event.target.value);
    setNewNumber(event.target.value);
  };

  const [newFilter, setNewFilter] = useState("");
  const handleFilterChange = (event) => {
    console.log("handleFilterChange", event.target.value);
    setNewFilter(event.target.value);
  };
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
    console.log("newPerson", newPerson);
    const person = persons.find(person => person.name.toLowerCase() === newPerson.toLowerCase());
    console.log("person", person);
    if (person) {
      const msg = `${newPerson} is already added to phonebook, repalce the old number with a new one?`;
      if (window.confirm(msg)) {
        const newPersonObject = {...person, number: newNumber};
        personsServices.update(person.id, newPersonObject).then(returnedPerson => {
          console.log("promise fulfilled PUT");
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson));
        })
      }
    } else {
      const newPersonObject = {
        name: newPerson,
        number: newNumber,
        id: persons.length + 1,
      };
      personsServices.create(newPersonObject).then(returnedPerson => {
        console.log("promise fulfilled POST");
        setPersons(persons.concat(returnedPerson));
      });
    }
    setNewPerson("");
    setNewNumber("");
  };

  const handleDeletePerson = (e) => {
    console.log("handleDeletePerson", e.target.id);
    const id = parseInt(e.target.id);
    const person = persons.find(person => person.id === id);

    const msg = `Delete ${person.name}?`;
    if (window.confirm(msg)) {
      personsServices.deletePerson(id).then(() => {
        console.log("promise fulfilled DELETE");
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <Form addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>People's names & numbers</h2>
      <Persons 
        personsToShow={personsToShow}
        handleDeletePerson={(e) => handleDeletePerson(e)}
      />
    </div>
  );
}
export default App;
