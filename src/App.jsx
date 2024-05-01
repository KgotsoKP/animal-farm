import './App.css'
import { useState, useEffect } from 'react'

function useAnimalsSearch () {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);


  const search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }))

    const data = await response.json()
    setAnimals(data)

    localStorage.setItem('lastQuery', q)
  }

  return { search , animals}
}

function App() {

  const { search, animals } = useAnimalsSearch()

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

// eslint-disable-next-line react/prop-types
function Animal({ type, age, name }) {
  return (
    <li>
      <strong>{name}</strong> is a {type} and is {age} years old.
    </li>
  )
}

export default App
