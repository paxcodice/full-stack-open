const Persons = (props) => {
  return (
    <div>
      {props.list.map((person) => {
        return (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
