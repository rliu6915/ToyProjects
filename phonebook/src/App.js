import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

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
    if (persons.find(person => person.name === newPerson)) {
      const msg = `${newPerson} is already added to phonebook`
      alert(msg);
      return;
    }
    const newPersonObject = {
      name: newPerson,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPersonObject));
    setNewPerson("");
    setNewNumber("");
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
      <Persons personsToShow={personsToShow}/>
    </div>
  );
}
export default App;
