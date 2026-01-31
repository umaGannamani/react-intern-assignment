export default function FilterControls({ filter, setFilter, todos }) {
  const count = (type) =>
    todos.filter((t) =>
      type === "All" ? true : type === "Active" ? !t.done : t.done
    ).length;

  return (
    <div className="filters">
      {["All", "Active", "Completed"].map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f} ({count(f)})
        </button>
      ))}
    </div>
  );
}
