import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

type View = "list" | "dashboard";

function App() {
  const { todos, addTodo, toggleTodo, removeTodo, clearCompleted } = useTodos();
  const [text, setText] = useState("");
  const [view, setView] = useState<View>("list");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTodo(text);
    setText("");
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="app">
      <h1>할 일</h1>

      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={view === "list"}
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          목록
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === "dashboard"}
          className={view === "dashboard" ? "active" : ""}
          onClick={() => setView("dashboard")}
        >
          대시보드
        </button>
      </div>

      {view === "dashboard" ? (
        <Dashboard todos={todos} />
      ) : (
        <>
          <form className="add-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="할 일을 입력하세요"
              aria-label="새 할 일"
            />
            <button type="submit">추가</button>
          </form>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  type="button"
                  className="remove"
                  onClick={() => removeTodo(todo.id)}
                  aria-label={`${todo.text} 삭제`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {todos.length === 0 && <p className="empty">아직 할 일이 없습니다.</p>}

          <div className="footer">
            <span>{remaining}개 남음</span>
            <button type="button" onClick={clearCompleted}>
              완료 항목 지우기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
