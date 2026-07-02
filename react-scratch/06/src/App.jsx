import { useEffect, useState } from 'react'
import './App.css'
import { ChaiMenu } from './ChaiMenu.jsx'
import { useSpecialChai } from './hooks/useSpecialChai.js'

function App() {
  const [data, setData] = useState(null)
  console.log(`${import.meta.env.VITE_API_URL}`)

  const { chai, loading, error } = useSpecialChai()

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then(res => res.json())
  //     .then((data) => setData(data))
  //     .then(() => console.log(data))
  //     .catch((err) => console.log(err))
  // }, [])

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/all-chai`)
  //     .then(res => res.json())
  //     .then((data) => {
  //       setData(data)
  //       console.log(data)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.message}</h1>
  }

  if (chai) {
    return (
      <>
        <h1>
          Welcome to RAW react
        </h1>
        <p>Data : {JSON.stringify(chai)}</p>
        <ChaiMenu />
      </>
    )
  }

  return (
    <>
      <h1>
        Welcome to RAW react
      </h1>
      {/* <p>Data : {data ? JSON.stringify(data) : "loading"}</p> */}
      <ChaiMenu />
    </>
  )
}

export default App
