import { useState } from 'react'
import "./App.css";

export interface Todo {
  id: string
  title: string
  isCompleted: boolean
}

function App() {

  const [currentValue, setCurrentValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  function handleRemove(id: string) {
    const result = todos.filter(e => e.id !== id)
    setTodos(result)
  }

  function handleClickAddButton() {
    todos.push({ id: `${Date.now()}`, title: currentValue, isCompleted: false })
    const newArray = [...todos]
    setTodos(newArray)
  }

  return (
  <div className="container">
    <h1>Todo App</h1>

    <div className="input-group">
      <input
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        type="text"
        placeholder="Enter your todo"
      />
      <button onClick={handleClickAddButton}>Add</button>
    </div>

    {todos.length === 0 ? (
      <p className="empty">No todos yet.</p>
    ) : (
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <button onClick={() => handleRemove(todo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default App
