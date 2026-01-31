import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "countdown_timer";

export default function CountdownTimer() {
  const intervalRef = useRef(null);

  const [initialTime, setInitialTime] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState("idle"); // idle | running | paused | completed

  /* ---------------- LOAD FROM LOCALSTORAGE ---------------- */
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

  /* ---------------- TIMER LOGIC ---------------- */
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

  /* ---------------- SAVE TO LOCALSTORAGE ---------------- */
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

  /* ---------------- BUTTON HANDLERS ---------------- */
  const start = () => {
    setTimeLeft(initialTime);
    setStatus("running");
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setStatus("paused");
  };

  const resume = () => {
    setStatus("running");
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(initialTime);
    setStatus("idle");
    localStorage.removeItem(STORAGE_KEY);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="card center">
      <h2>Advanced Countdown Timer</h2>

      <input
        type="number"
        min="1"
        disabled={status !== "idle"}
        value={initialTime}
        onChange={(e) => {
          setInitialTime(+e.target.value);
          setTimeLeft(+e.target.value);
        }}
      />

      <h1>{timeLeft.toFixed(3)}</h1>
      <p>Status: <b>{status}</b></p>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {status === "idle" && <button onClick={start}>Start</button>}

        {status === "running" && (
          <>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button>
          </>
        )}

        {status === "paused" && (
          <>
            <button onClick={resume}>Resume</button>
            <button onClick={reset}>Reset</button>
          </>
        )}

        {status === "completed" && (
          <>
            <p>⏰ Time’s up!</p>
            <button onClick={reset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}
