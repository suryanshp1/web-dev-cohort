export const todos = []

export const auditLog = []

let nextId = 1

export function createTodo(title) {
    const todo = { id: nextId++, title, completed: false }
    todos.push(todo)
    return todo
}

export function getTodo(id) {
    return todos.find(t => t.id === id)
}

export function updateTodo(id, patch) {
    const todo = getTodo(id)
    if (!todo) return null
    if (patch.title !== undefined) todo.title = patch.title
    if (patch.completed !== undefined) todo.completed = patch.completed
    return todo
}

export function deleteTodo(id) {
    const todo = getTodo(id)
    if (!todo) return null
    todos.splice(todos.indexOf(todo), 1)
    return todo
}