import { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Persons from './components/Persons';
import Form from './components/Form';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      axios
        .post('http://localhost:3001/persons', personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
        });
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
