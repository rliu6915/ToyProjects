import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
  ]);

  const [newPerson, setNewPerson] = useState("");
  const handlePersonChange = (event) => {
    console.log("handlePersonChange", event.target.value);
    setNewPerson(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const newPersonObject = {
      name: newPerson,
    };
    setPersons(persons.concat(newPersonObject));
    setNewPerson("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>debug: {newPerson}</div>
        <div>
          name: 
          <input 
            value={newPerson}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>People's names</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
