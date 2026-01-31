import { useState } from "react";
import TodoApp from "./components/Todo/TodoApp";
import UserForm from "./components/Form/UserForm";
import MultiProgressBar from "./components/Progress/MultiProgressBar";
import CountdownTimer from "./components/Timer/CountdownTimer";
import SearchList from "./components/Search/SearchList";

export default function App() {
  const [tab, setTab] = useState(1);

  return (
    <>
      <header className="header">
        <h1>React Assignments</h1>
        <div className="tabs">
          {[1, 2, 3, 4, 5].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              Task {t}
            </button>
          ))}
        </div>
      </header>

      <main className="content">
        {tab === 1 && <TodoApp />}
        {tab === 2 && <UserForm />}
        {tab === 3 && <MultiProgressBar />}
        {tab === 4 && <CountdownTimer />}
        {tab === 5 && <SearchList />}
      </main>
    </>
  );
}
