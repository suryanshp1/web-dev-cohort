import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const shows = [
  {
    id: 1,
    title: "The Component Returns",
    time: "10:00 AM",
    hall: "Hall A",
  },
  {
    id: 2,
    title: "The Avengers",
    time: "12:30 PM",
    hall: "Hall B",
  },
  {
    id: 3,
    title: "The Spider Man",
    time: "13:00 PM",
    hall: "Hall C",
  },
]

const name = ["Surya"]

function App() {

  return (
    <div>
      <h1>Hello </h1>
      <section className="grid">
        {shows.map((show) => (
          <article>
            <p className="tag">
              {show.hall}
            </p>
            <h3>{show.title}</h3>
            <p className="muted">
              {show.time}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
