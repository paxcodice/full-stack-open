const Persons = (props) => {
  return (
    <div>
      {props.list.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => props.handleDeletePerson(person.id)}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
