import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState("idle")
  const [seconds, setSeconds] = useState(10)

  // const addData = () => {
  //   setPosts([
  //     ...posts,
  //     "Surya",
  //     "Suraj",
  //     "Raj",
  //   ]);
  // }

  useEffect(() => {
    const timeId = setInterval(() => {
      setSeconds((current) => Math.max(current-1, 0))
    }, 1000)

    return () => {
      // cleanup
      clearInterval(timeId)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadPost() {
      try {
        setStatus("loading")
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {signal: controller.signal})
        const data = await response.json()
        setPosts(data)
        setStatus("success")
      } catch (error) {
        console.log(error)
        setStatus("error")
      }
    }
    loadPost();

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <div>
        <h1>useEffect</h1>
        <h1>{seconds}</h1>
        {posts.map((post) => {
           <section>
          {post.id}
          {post.title}
          {post.userId}
          {post.body}
          <br />
          </section>
        })}
      </div>
    </>
  )
}

export default App
