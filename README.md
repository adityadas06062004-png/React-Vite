# Daily Assistant

A personal daily assistant app with tasks, reminders, and an AI-powered decision helper.

## Setup

```bash
npm install
npm run dev
```

App runs at http://localhost:3000

## Features

- **Tasks Panel** — Add daily tasks with priority levels (low/medium/high), filter by status, check off when done
- **Reminders Panel** — Time-based reminders sorted chronologically, overdue items highlighted in red
- **Decision Helper** — Type any dilemma, get a structured AI-powered pros/cons breakdown with a recommendation

## Notes

- The Decision Helper calls the Anthropic API directly. Make sure your environment has the API key configured, or update `DecisionPanel.jsx` to use your backend proxy.
- Built with React 18 + Vite. No other dependencies. 
