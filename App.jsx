import { useState, useEffect } from "react";
import TasksPanel from "./components/TasksPanel";
import RemindersPanel from "./components/RemindersPanel";
import DecisionPanel from "./components/DecisionPanel";
import Header from "./components/Header";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review morning emails", priority: "medium", done: false, category: "work" },
    { id: 2, text: "Team standup at 10am", priority: "high", done: false, category: "work" },
    { id: 3, text: "Drink 8 glasses of water", priority: "low", done: false, category: "health" },
    { id: 4, text: "30 min walk", priority: "medium", done: true, category: "health" },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, text: "Take medication", time: "08:00", priority: "high", done: false },
    { id: 2, text: "Call Mom", time: "13:00", priority: "medium", done: false },
    { id: 3, text: "Submit project report", time: "17:00", priority: "high", done: false },
    { id: 4, text: "Evening walk", time: "19:30", priority: "low", done: true },
  ]);

  const completedTasks = tasks.filter((t) => t.done).length;
  const completedReminders = reminders.filter((r) => r.done).length;
  const progress = Math.round(
    ((completedTasks + completedReminders) / (tasks.length + reminders.length)) * 100
  );

  return (
    <div className="app">
      <Header progress={progress} completedTasks={completedTasks} totalTasks={tasks.length} />

      <main className="main-grid">
        <TasksPanel tasks={tasks} setTasks={setTasks} />
        <RemindersPanel reminders={reminders} setReminders={setReminders} />
        <DecisionPanel />
      </main>
    </div>
  );
}
