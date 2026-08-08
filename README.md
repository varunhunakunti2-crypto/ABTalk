# ABTalks 60-Day Challenge — Student Center

A highly polished, responsive Web App built with **Astro, React, Tailwind CSS v4, and Express** to track and submit projects for the 60-Day Challenge.

---

## 🗺️ Route Map

```
[Browser Client]
   │
   ├── / (Landing Page) ──► LandingPage.jsx (Tagline, Stats, Why ABTalks, Tracks)
   │
   ├── /dashboard ────────► Dashboard.jsx (Streak Card, Challenge Timeline, Achievements, Profile Tab)
   │
   └── /day/:dayNumber ──► ChallengeDay.jsx (Requirements checklists, URL validator form, Success screen)
```

---

## 🏗️ Project Architecture

```
ABtalks/
├── frontend/             # Astro & React Frontend
│   ├── src/
│   │   ├── components/   # Page & Reusable UI Components
│   │   ├── layouts/      # Layout templates
│   │   ├── pages/        # Astro File-based Routes
│   │   └── styles/       # Global CSS (Tailwind v4 theme setup)
│   ├── public/           # Static assets
│   ├── astro.config.mjs  # Astro configuration
│   └── package.json      # Frontend package configuration
│
├── backend/              # Express Mock Server
│   ├── server.js         # API Server (Student stats, submissions tracker, streak logic)
│   └── package.json      # Backend package configuration
│
└── package.json          # Root Orchestrator (concurrently starts both servers)
```

---

## ⚡ API Endpoints

### 1. Student API
- `GET /api/student`: Returns student profile details (Streak, Achievements, Streak Shield status).

### 2. Challenge API
- `GET /api/challenges`: Returns the 60 days challenge timeline list.
- `GET /api/challenges/:day`: Returns metadata for a specific day's challenge.

### 3. Submission API
- `POST /api/submissions`: Validates URLs (GitHub repo, GitHub commit, LinkedIn, Live Url) and marks challenge day complete, updating streak metrics.
- `GET /api/submissions/:day`: Returns submission completeness booleans.

---

## 🚀 Running Locally

1. **Install Dependencies** (from the root directory):
   ```bash
   npm run install:all
   ```
2. **Start Dev Servers** (fires both frontend on `:4321` and backend on `:3001` concurrently):
   ```bash
   npm run dev
   ```
