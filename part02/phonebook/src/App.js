import React, { useState, useEffect } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [newName, setNewName] = useState('')
  const [allPersons, setAllPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll().then(response => {
        setAllPersons(response)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const person = allPersons.filter(person => person.name === newName)
    const newPerson = person[0]
    const updatedPerson = { ...newPerson, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        personService.update(updatedPerson.id, updatedPerson).then(ans => {
          console.log(`Updated ${ans.name}`)
          setAllPersons(allPersons.map(person => person.id !== newPerson.id ? person : ans))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${updatedPerson.name} was successfully updated`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
          .catch((er) => {
            console.log(er)
            setAllPersons(allPersons.filter(person => person.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService
          .create(newPerson).then(person => {
            setAllPersons(allPersons.concat(person))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(
              `[ERROR] ${error.response.data.error}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            console.log(error.response.data)
          })
      }
    }

    const deletePerson = (id) => {
      const person = allPersons().filter(person => person.id === id)
      const name = person[0].name
      const personId = person[0].id
      if (window.confirm(`Delete ${name}?`)) {
        personService.deletePerson(personId)
        console.log(`Deleted ${name}`)
        setMessage(`Deleted ${name}`)
        setAllPersons(allPersons.filter(person => person.id !== personId))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <h3>Add a new</h3>
        <PersonForm onFormSubmit={addPerson} name={newName} onNameChange={handleNameChange} number={newNumber} onNumberChange={handleNumberChange} />
        <h3>Numbers</h3>
        <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson} />
      </div>
    );
  }
}

export default App