import { useState } from "react";

export default function MultiProgressBar() {
  const [values, setValues] = useState([10, 50, 100]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;

  return (
    <div className="card">
      <h2>Dynamic Progress Bar</h2>

      <div className="progress main">
        <div style={{ width: `${avg}%` }}>{avg.toFixed(1)}%</div>
      </div>

      {values.map((v, i) => (
        <input
          key={i}
          type="number"
          value={v}
          onChange={(e) => {
            const copy = [...values];
            copy[i] = Number(e.target.value);
            setValues(copy);
          }}
        />
      ))}
    </div>
  );
}
