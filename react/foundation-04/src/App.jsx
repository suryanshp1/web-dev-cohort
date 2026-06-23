import { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState(5)

  const increase = () => {
    setValue(value + 1) // Not so good
  }

  const decrease = () => {
    setValue(value - 1) // Not so good
  }

  return (
    <>
      <div>
        <h1>Value: {value}</h1>
        <button onClick={increase}>Inc</button>
        <br />
        <button onClick={decrease}>Dec</button>
      </div>
    </>
  )
}

export default App
