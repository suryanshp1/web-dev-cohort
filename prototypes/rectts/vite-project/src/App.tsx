import './App.css'
import { ChaiCard } from './components/ChaiCard.tsx'
import { Counter } from './components/Counter.tsx'
import ChaiList from './components/ChaiList.tsx'
import OrderForm from './components/OrderForm.tsx'

import type { Chai } from './types.ts'
import Card from './components/Card.tsx'

const menu: Chai[] = [
  {id: 1, name: "Masala", price: 30},
  {id: 1, name: "Ginger", price: 40},
  {id: 1, name: "Lemon", price: 60}
]
function App() {

  return (
    <>
      <div>

        <h1>Vite + React</h1>
        <ChaiCard 
        name="Headphones"
        price={5000}
        />

        <ChaiCard 
        name="IPhone"
        price={50000}
        />
      </div>

      <div>
        <Counter />
      </div>

      <div>
        {/* <ChaiList items={menu} /> */}
        <OrderForm 
        onSubmit={(order) => {
          console.log("Placed ", order.name, order.cups)
        }}
        />
        
      </div>

      <div>
        <Card
        title='Chai aur typescript'
        footer={<button>Order Now</button>}
        />
      </div>
    </>
  )
}

export default App
