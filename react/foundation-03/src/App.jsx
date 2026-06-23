
import './App.css'
import AvatarCard from './components/AvatarCard.jsx'

const avatars = [
  {
    id: 1,
    name: "Astra Nova",
    role: "Commander",
    power: "Cosmic Energy Manipulation",
    initials: "AN"
  },
  {
    id: 2,
    name: "Blaze Fury",
    role: "Warrior",
    power: "Fire Control",
    initials: "BF"
  },
  {
    id: 3,
    name: "Cipher Shadow",
    role: "Assassin",
    power: "Invisibility",
    initials: "CS"
  },
  {
    id: 4,
    name: "Titan Forge",
    role: "Guardian",
    power: "Super Strength",
    initials: "TF"
  },
  {
    id: 5,
    name: "Luna Spark",
    role: "Mage",
    power: "Lightning Magic",
    initials: "LS"
  }
];

function Shell({title, children}) {
  return (
    <section>
      <p>Reusable Shell</p>
      <h2>{title}</h2>
      {children}
      <p>this is for test</p>
    </section>
  )
}

function App() {

  return (
    <>
      <h1>Children in react</h1>
      <Shell title="Batman">
      <div>
        <h1>This is inside shell</h1>
        <p>This is also inside shell</p>
      </div>
      </Shell>

      <h1>Hello from Surya</h1>
      <section>
        {avatars.map((avatar) => (
          <AvatarCard 
          key={avatar.id}
          level={avatar.id === 1 ? "Captain" : undefined}
          avatar={avatar} 
          />
        ))}
      </section>
    </>
  )
}

export default App
