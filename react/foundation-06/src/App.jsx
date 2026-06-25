import { useState } from 'react'
import './App.css'

import HookForm from './HookForm.jsx'
import ManualForm from './ManualForm.jsx'

function App() {
  const [tab, setTab] = useState("manual")

  return (
    <>
      <div>
        <div className='shell'>
          <h1>Job Application</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis tempora, molestiae nihil</p>
        </div>
        <div className="tab">
          <button style={{backgroundColor: tab === "rhf" ? "var(--accent)" : "var(--bg)"}} onClick={() => {setTab("manual")}}>Controlled - Manual</button>
          <button onClick={() => {setTab("rhf")}}>React hook form</button>
        </div>
        <h1>Getting started with react</h1>
        {tab === "manual" ? <ManualForm /> : <HookForm />}
      </div>
    </>
  )
}

export default App
