import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx"

const e = document.getElementById('my-react-container')

// function MyComponent() {
//   return (
//     <>
//     <h1>
//       <span>Hello There</span>
//     </h1>
//     <h2>Kya hall chal</h2>
//     </>
//   );
// }

// function MyComponent1() {
//   return (
//     <h2>Kya hall chal</h2>
//   );
// }

// function MyComponent2() {
//   return (
//       <h1>Hello There</h1>
//   );
// }

createRoot(e).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
