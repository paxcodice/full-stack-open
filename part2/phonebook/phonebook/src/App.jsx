import { useState } from 'react';
import Search from './components/Search';
import Persons from './components/Persons';
import Form from './components/Form';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // SEARCH FUNCTION
  const handleSearchName = (event) => {
    setSearchName(event.target.value);
    console.log(event.target.value);
  };

  const filteredList = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchName.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>

      <Search value={searchName} onChange={handleSearchName} />
      <h2>add a new</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons list={filteredList} />
    </div>
  );
};

export default App;
