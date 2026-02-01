import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const STORAGE_KEY = "countdown_timer";

export default function CountdownTimer() {
  const intervalRef = useRef(null);

  const [initialTime, setInitialTime] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState("idle"); // idle | running | paused | completed

  /* -------- Load from localStorage -------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;

    const { remainingTime, status, lastUpdated } = saved;

    if (status === "running") {
      const elapsed = (Date.now() - lastUpdated) / 1000;
      const newTime = Math.max(0, remainingTime - elapsed);

      setTimeLeft(newTime);
      setStatus(newTime === 0 ? "completed" : "running");
    } else {
      setTimeLeft(remainingTime);
      setStatus(status);
    }
  }, []);

  /* -------- Timer logic -------- */
  useEffect(() => {
    if (status !== "running") return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.01) {
          clearInterval(intervalRef.current);
          setStatus("completed");
          return 0;
        }
        return prev - 0.01;
      });
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, [status]);

  /* -------- Save state -------- */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        remainingTime: timeLeft,
        status,
        lastUpdated: Date.now(),
      })
    );
  }, [timeLeft, status]);

  /* -------- Handlers -------- */
  const start = () => {
    setTimeLeft(initialTime);
    setStatus("running");
  };

  const pause = () => setStatus("paused");

  const resume = () => setStatus("running");

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(initialTime);
    setStatus("idle");
    localStorage.removeItem(STORAGE_KEY);
  };

  const formatTime = (t) => {
    const minutes = String(Math.floor(t / 60)).padStart(2, "0");
    const seconds = String(Math.floor(t % 60)).padStart(2, "0");
    const ms = String(Math.floor((t % 1) * 1000)).padStart(3, "0");
    return `${minutes}:${seconds}.${ms}`;
  };

  return (
    <div className="timer-wrapper">
      <h1 className="page-title">Advanced Countdown Timer</h1>

      <div className="timer-card">
        <label className="timer-label">Set Timer (seconds)</label>

        <input
          className="timer-input"
          type="number"
          min="1"
          disabled={status !== "idle"}
          value={initialTime}
          onChange={(e) => {
            setInitialTime(+e.target.value);
            setTimeLeft(+e.target.value);
          }}
        />

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div
          className={`timer-status ${
            status === "paused" ? "paused" : ""
          }`}
        >
          {status === "idle" && "Ready"}
          {status === "running" && "Running"}
          {status === "paused" && "Paused"}
          {status === "completed" && "Time’s Up"}
        </div>

        <div className="timer-actions">
          {status === "idle" && (
            <button className="btn primary" onClick={start}>
              <FaPlay /> Start
            </button>
          )}

          {status === "running" && (
            <>
              <button className="btn warning" onClick={pause}>
                <FaPause /> Pause
              </button>
              <button className="btn secondary" onClick={reset}>
                <FaRedo /> Reset
              </button>
            </>
          )}

          {status === "paused" && (
            <>
              <button className="btn success" onClick={resume}>
                <FaPlay /> Resume
              </button>
              <button className="btn secondary" onClick={reset}>
                <FaRedo /> Reset
              </button>
            </>
          )}

          {status === "completed" && (
    <button className="btn primary" onClick={reset}>
      <FaRedo /> Reset
    </button>
  )}
        </div>

        <div className="timer-summary">
          <div>
            <p>Initial Time</p>
            <strong>{initialTime} seconds</strong>
          </div>
          <div>
            <p>Remaining</p>
            <strong>{timeLeft.toFixed(3)}s</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
