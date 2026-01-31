import { useState } from "react";
import TodoItem from "./TodoItem";
import FilterControls from "./FilterControls";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, priority, done: false }]);
    setText("");
  };

  const filtered = todos.filter((t) =>
    filter === "All"
      ? true
      : filter === "Active"
      ? !t.done
      : t.done
  );

  return (
    <div className="card">
      <h2>Todo App</h2>

      <div className="todo-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <select onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTodo}>+ Add</button>
      </div>

      <FilterControls filter={filter} setFilter={setFilter} todos={todos} />

      {filtered.map((t) => (
        <TodoItem key={t.id} todo={t} setTodos={setTodos} />
      ))}
    </div>
  );
}
