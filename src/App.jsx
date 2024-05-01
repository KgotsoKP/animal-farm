import './App.css'
import { useState } from 'react'

function Animal({ type, age, name }) {
  return (
    <li>
      <strong>{name}</strong> is a {type} and is {age} years old.
    </li>
  )
}

function App() {
  const [animals, setAnimals] = useState([])

  const search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }))

    const data = await response.json()
    setAnimals(data)
  }

  return (
    <>
      <h1>Animal Farm</h1>
      {/* Add Form */}

      <input type="text" placeholder='Search Animal' onChange={(e) => search(e.target.value)} />


      {/* Display results : Render the response got form the call*/}
      <ul>
        {animals.length === 0 && 'No animals Found'}

        {animals.map((animal) => (
          <Animal type={animal.type} age={animal.age} name={animal.name} key={animal.id} />
        ))}
      </ul>

    </>
  )
}

export default App
