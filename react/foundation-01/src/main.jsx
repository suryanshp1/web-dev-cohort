import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Surya from './Surya.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Surya />
  </>,
)
