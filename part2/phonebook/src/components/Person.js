const Person = ({id, name, number, handleDeletePerson}) => {
    return (
        <li className="person">
            {name}: {number}{'  '}
            <button id={id} onClick={handleDeletePerson}>
                delete
            </button>
        </li>
    );
}
export default Person;