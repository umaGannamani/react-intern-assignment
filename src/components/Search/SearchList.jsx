import { useState } from "react";

export default function SearchList() {
  const [query, setQuery] = useState("");

  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David Williams",
    "Emma Davis",
    "Frank Miller",
    "Grace Wilson",
    "Henry Moore",
    "Isabella Taylor",
    "Jack Anderson",
    "Kate Thomas",
    "Liam Jackson",
    "Mia White",
    "Noah Harris",
    "Olivia Martin",
    "Peter Thompson",
    "Quinn Garcia",
    "Rachel Martinez",
    "Samuel Robinson",
    "Taylor Clark",
  ];

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  const highlightText = (text, search) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <strong
          key={index}
          style={{ backgroundColor: "#fde68a", fontWeight: "bold" }}
        >
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="card">
      <h2>Live Search</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search names..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />

      {/* Result count + Clear */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>
          {query
            ? `Found ${filteredNames.length} results`
            : `Total ${names.length} names`}
        </strong>

        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              background: "transparent",
              border: "none",
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* SCROLLABLE LIST */}
      <ul
        style={{
          marginTop: "12px",
          maxHeight: "200px",   // 👈 controls scroll height
          overflowY: "auto",   // 👈 scrollbar only here
          paddingRight: "6px",
        }}
      >
        {filteredNames.length === 0 ? (
          <li style={{ color: "red" }}>No results found</li>
        ) : (
          filteredNames.map((name, index) => (
            <li key={index} style={{ padding: "6px 0" }}>
              {highlightText(name, query)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
