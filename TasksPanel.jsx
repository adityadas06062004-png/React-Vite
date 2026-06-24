import { useState } from "react";

const PRIORITIES = ["low", "medium", "high"];

const PRIORITY_STYLES = {
  low: { label: "low", cls: "badge-low" },
  medium: { label: "med", cls: "badge-med" },
  high: { label: "high", cls: "badge-high" },
};

export default function TasksPanel({ tasks, setTasks }) {
  const [newText, setNewText] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!newText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newText.trim(), priority: newPriority, done: false, category: "work" },
    ]);
    setNewText("");
  };

  const toggle = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const filtered =
    filter === "all" ? tasks : filter === "done" ? tasks.filter((t) => t.done) : tasks.filter((t) => !t.done);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-icon tasks-icon">✓</span>
          Today's Tasks
        </h2>
        <span className="panel-count">{tasks.filter((t) => !t.done).length} left</span>
      </div>

      <div className="filter-tabs">
        {["all", "active", "done"].map((f) => (
          <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="task-list">
        {filtered.length === 0 && (
          <div className="empty-state">
            {filter === "done" ? "No completed tasks yet" : "All clear — add something below"}
          </div>
        )}
        {filtered.map((task) => (
          <div key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
            <button className={`check-btn ${task.done ? "checked" : ""}`} onClick={() => toggle(task.id)}>
              {task.done ? "✓" : ""}
            </button>
            <span className="task-text">{task.text}</span>
            <span className={`badge ${PRIORITY_STYLES[task.priority].cls}`}>
              {PRIORITY_STYLES[task.priority].label}
            </span>
            <button className="remove-btn" onClick={() => remove(task.id)}>×</button>
          </div>
        ))}
      </div>

      <div className="add-row">
        <input
          className="add-input"
          type="text"
          placeholder="Add a task…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select className="priority-select" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button className="add-btn" onClick={addTask}>+</button>
      </div>
    </section>
  );
}
