import { useState, useEffect } from 'react';
import Search from './components/Search';
import Persons from './components/Persons';
import Form from './components/Form';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const replaceNumber = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`,
      );
      if (replaceNumber) {
        const person = persons.find((p) => p.name === newName);

        const updatedPerson = {
          ...person,
          number: newNumber,
        };

        personService
          .updatePerson(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson)),
            );
            setNewName('');
            setNewNumber('');
            setMessage({
              text: `${person.name}'s number has been changed`,
              type: 'success',
            });
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${person.name} has already been removed from server`,
              type: 'error',
            });
            setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage({ text: `Added ${newName}`, type: 'success' });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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

  // DELETE PERSON
  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${person.name}?`);

    if (result) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setMessage({
          text: `${person.name} has been deleted`,
          type: 'success',
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    }
  };

  const filteredList = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchName.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons list={filteredList} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
