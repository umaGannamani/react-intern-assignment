import { MdDelete } from "react-icons/md";

export default function TodoItem({ todo, setTodos }) {
  return (
    <div className={`todo-item ${todo.priority.toLowerCase()}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() =>
          setTodos((prev) =>
            prev.map((t) =>
              t.id === todo.id ? { ...t, done: !t.done } : t
            )
          )
        }
      />
      <span className={todo.done ? "done" : ""}>{todo.text}</span>
      <span className="priority">{todo.priority}</span>
      <button
        onClick={() =>
          setTodos((prev) => prev.filter((t) => t.id !== todo.id))
        }
      >
        <MdDelete size={20} />
      </button>
    </div>
  );
}
