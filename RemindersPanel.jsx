import { useState } from "react";

const PRIORITY_STYLES = {
  low: "badge-low",
  medium: "badge-med",
  high: "badge-high",
};

export default function RemindersPanel({ reminders, setReminders }) {
  const [newText, setNewText] = useState("");
  const [newTime, setNewTime] = useState("09:00");
  const [newPriority, setNewPriority] = useState("medium");

  const addReminder = () => {
    if (!newText.trim()) return;
    setReminders((prev) => [
      ...prev,
      { id: Date.now(), text: newText.trim(), time: newTime, priority: newPriority, done: false },
    ]);
    setNewText("");
  };

  const toggle = (id) =>
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)));

  const remove = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  const sorted = [...reminders].sort((a, b) => a.time.localeCompare(b.time));

  const now = new Date();
  const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

  return (
    <section className="panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="panel-icon reminders-icon">🔔</span>
          Reminders
        </h2>
        <span className="panel-count">{reminders.filter((r) => !r.done).length} pending</span>
      </div>

      <div className="reminder-list">
        {sorted.length === 0 && <div className="empty-state">No reminders — you're free!</div>}
        {sorted.map((r) => {
          const isPast = r.time < currentTime && !r.done;
          return (
            <div key={r.id} className={`reminder-item ${r.done ? "done" : ""} ${isPast ? "overdue" : ""}`}>
              <div className="reminder-time-col">
                <span className={`reminder-time ${isPast ? "time-overdue" : ""}`}>{r.time}</span>
                {isPast && <span className="overdue-tag">overdue</span>}
              </div>
              <button className={`check-btn ${r.done ? "checked" : ""}`} onClick={() => toggle(r.id)}>
                {r.done ? "✓" : ""}
              </button>
              <span className="task-text">{r.text}</span>
              <span className={`badge ${PRIORITY_STYLES[r.priority]}`}>{r.priority.slice(0, 3)}</span>
              <button className="remove-btn" onClick={() => remove(r.id)}>×</button>
            </div>
          );
        })}
      </div>

      <div className="add-row add-row-reminders">
        <input
          className="add-input"
          type="text"
          placeholder="Add reminder…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addReminder()}
        />
        <input
          className="time-input"
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <select className="priority-select" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          <option value="low">low</option>
          <option value="medium">med</option>
          <option value="high">high</option>
        </select>
        <button className="add-btn" onClick={addReminder}>+</button>
      </div>
    </section>
  );
}
