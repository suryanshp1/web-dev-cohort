"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/todos");
      const result = await res.json();
      if (result.success) {
        setTodos(result.data);
      } else {
        setError(result.error || "Failed to fetch todos");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const result = await res.json();
      if (result.success) {
        setTodos([...todos, result.data]);
        setTitle("");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const result = await res.json();
      if (result.success) {
        setTodos(todos.map((t) => (t.id === todo.id ? result.data : t)));
      }
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
            <span className="text-orange-500">❖</span>
            Tasks
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Manage your daily goals with a sleek dark zinc and orange interface.
          </p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm">
            {error}
            <button
              onClick={() => setError("")}
              className="float-right hover:text-red-300"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={addTodo} className="mb-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg px-4 py-3 outline-none transition-all placeholder:text-zinc-600"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-orange-500/20"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-zinc-500 animate-pulse">
              Loading tasks...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 px-6 border border-dashed border-zinc-800 rounded-xl text-zinc-500 bg-zinc-900/50">
              No tasks yet. Add one above to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                  todo.completed
                    ? "bg-zinc-900/50 border-zinc-800/50"
                    : "bg-zinc-900 border-zinc-700/50 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleTodo(todo)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-orange-500 border-orange-500"
                        : "border-zinc-600 hover:border-orange-500 group-hover:border-orange-500/70"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        className="w-3.5 h-3.5 text-zinc-950"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-lg transition-colors duration-200 ${
                      todo.completed
                        ? "text-zinc-600 line-through"
                        : "text-zinc-200"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-zinc-500 hover:text-red-400 p-2 transition-all focus:opacity-100"
                  aria-label="Delete task"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
