import type { Todo } from "../types";

interface DashboardProps {
  todos: Todo[];
}

function isToday(timestamp: number): boolean {
  const d = new Date(timestamp);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function getStats(todos: Todo[]) {
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;
  const remaining = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  const createdToday = todos.filter((t) => isToday(t.createdAt)).length;
  return { total, completed, remaining, completionRate, createdToday };
}

export function Dashboard({ todos }: DashboardProps) {
  const { total, completed, remaining, completionRate, createdToday } = getStats(todos);

  if (total === 0) {
    return <p className="empty">아직 할 일이 없어요. 할 일을 추가하면 통계가 여기 나타나요.</p>;
  }

  return (
    <div className="dashboard">
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{total}</span>
          <span className="stat-label">전체</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">완료</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{remaining}</span>
          <span className="stat-label">남음</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{createdToday}</span>
          <span className="stat-label">오늘 추가</span>
        </div>
      </div>

      <div className="progress">
        <div className="progress-label">
          <span>완료율</span>
          <span>
            {completed} / {total} ({completionRate}%)
          </span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="progress-fill" style={{ width: `${completionRate}%` }} />
        </div>
      </div>
    </div>
  );
}
