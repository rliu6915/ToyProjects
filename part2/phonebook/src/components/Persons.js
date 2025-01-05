import Person from "./Person";

const Persons = ({personsToShow, handleDeletePerson}) => {
    return (
        <ul>
            {personsToShow.map((person) => (
                <Person
                    key={person.id}
                    id={person.id}
                    name={person.name} 
                    number={person.number}
                    handleDeletePerson={handleDeletePerson}
                />
            ))}
        </ul>
    )
}
export default Persons;