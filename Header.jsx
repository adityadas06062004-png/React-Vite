export default function Header({ progress, completedTasks, totalTasks }) {
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-greeting">
          <span className="header-day">{dayName}</span>
          <span className="header-date">{dateStr}</span>
        </div>
        <p className="header-sub">
          {completedTasks} of {totalTasks} tasks done — keep going
        </p>
      </div>

      <div className="header-right">
        <div className="progress-ring-wrap">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--ring-bg)" strokeWidth="5" />
            <circle
              cx="36"
              cy="36"
              r={radius}
              fill="none"
              stroke="var(--ring-fill)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 36 36)"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="ring-label">
            <span className="ring-pct">{progress}%</span>
            <span className="ring-sub">today</span>
          </div>
        </div>
      </div>
    </header>
  );
}
