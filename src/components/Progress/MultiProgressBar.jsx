import { useState } from "react";
import { MdDelete } from "react-icons/md";


export default function MultiProgressBar() {
  const [values, setValues] = useState([10, 50, 100]);

  const clamp = (val) => Math.min(100, Math.max(0, val));

  const total = values.reduce((a, b) => a + b, 0);
  const average = values.length ? total / values.length : 0;

  const getColor = (val) => {
    if (val < 40) return "red";
    if (val > 70) return "green";
    return "yellow";
  };

  const updateValue = (index, val) => {
    const copy = [...values];
    copy[index] = clamp(Number(val));
    setValues(copy);
  };

  const addInput = () => {
    setValues([...values, 0]);
  };

  const removeInput = (index) => {
    setValues(values.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <h2 className="page-title">Dynamic Progress Bar</h2>

      {/* Main Progress */}
      <div className="main-progress-header">
        <span>Main Progress Bar</span>
        <strong>{average.toFixed(1)}%</strong>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${getColor(average)}`}
          style={{ width: `${average}%` }}
        >
          {average.toFixed(1)}%
        </div>
      </div>

      {/* Inputs */}
      <div className="inputs-header">
        <h3>Individual Progress Inputs</h3>
        <button className="add-btn" onClick={addInput}>
          + Add Input
        </button>
      </div>

      {values.map((val, i) => (
        <div className="progress-row" key={i}>
          <input
            type="number"
            value={val}
            onChange={(e) => updateValue(i, e.target.value)}
          />

          <span className="progress-label">Progress {i + 1}</span>

          <div className="progress-track small">
            <div
              className={`progress-fill ${getColor(val)}`}
              style={{ width: `${val}%` }}
            />
          </div>

          <span className="percent-text">{val}%</span>

          <button className="delete-btn" onClick={() => removeInput(i)}>
            <MdDelete size={20} />
          </button>
        </div>
      ))}

      {/* Stats */}
      <div className="stats">
        <div>
          <p>Total Inputs</p>
          <strong>{values.length}</strong>
        </div>
        <div>
          <p>Total Progress</p>
          <strong>{total}%</strong>
        </div>
        <div>
          <p>Average</p>
          <strong>{average.toFixed(1)}%</strong>
        </div>
      </div>
    </div>
  );
}
