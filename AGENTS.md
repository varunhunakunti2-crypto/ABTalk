Always Use:
- atro, tailwind-4-docs, web-design-guidelines,flutter-build-responsive-layout these 4 skills for this project
- DESIGN.md for this project design








ABTalks 60-Day Challenge — Build Instructions
Project Type

React frontend + Express backend + mock JSON data (no real database, no real auth, no real GitHub/LinkedIn API integration — just URL input validation).

Rules for the AI building this
Do NOT invent features not listed below.
Do NOT add extra pages, extra tracks, extra APIs, or extra UI elements beyond what's specified.
Follow the exact route structure, exact API endpoints, and exact edge-case logic given.
Use the exact colors, fonts, and spacing values given in the Design System.
Mobile-first: build and test at 390px before 768px or 1024px.
Use mock data only — no real backend persistence beyond in-memory/JSON.
1. Pages / Routes
/ — Landing Page
Header: logo, tagline, nav, Login/Get Started button, mobile hamburger menu
Hero: headline, description, primary CTA ("Start 60-Day Challenge"), secondary CTA ("See How It Works"), visual
Challenge Stats: 3–4 numbers (60 Days, Daily Projects, GitHub Proof, LinkedIn Visibility)
"Why ABTalks" section (5 points: build consistently, stop watching tutorials, create real projects, build public portfolio, become visible to recruiters)
"How It Works": 4–5 numbered steps (Pick a Track → Get Today's Task → Build → Submit Proof → Keep Your Streak)
Tracks section: Full Stack, Frontend, Backend, AI/ML, Data Science, UI/UX — each with icon, name, short description, number of challenges
Progress Preview example (e.g. Day 27/60, progress bar, 45% Complete)
Motivation cards (4): Build consistency, Ship projects, Build your portfolio, Become visible
Final CTA: "Your first project starts today." → "Start Day 1"
Footer: ABTalks, About, Challenge, GitHub, LinkedIn, Contact, Copyright
/dashboard — Student Dashboard
Header: avatar, name, greeting, current track, current day (e.g. "Day 12 of 60")
Current Streak: streak count, fire icon, message, last 7 days (checkmark grid)
Streak Shield: shows protection status; if activated, shows message that a missed day was covered
Challenge Progress: X/60 days, progress bar %, stats (Completed / Missed / Remaining)
Today's Challenge card: day number, title, difficulty, estimated time, short description, "Start Challenge" button
Challenge Timeline: list of days with status (✓ Completed / ⚠ Missed / ● Today / 🔒 Upcoming)
Achievements: cards for First Spark (Day 1), 7-Day Builder (7-day streak), 10 Projects, Halfway Hero (Day 30), Finisher (Day 60)
Student Profile section: name, avatar, track, days completed, current streak, total projects, GitHub link, LinkedIn link
/day/:dayNumber — Challenge Day Page
Day header: back button, "Day X / 60", difficulty, estimated time
Challenge title + description
Mission: bullet list of what to build
Requirements: checklist (checkboxes)
Bonus Challenge: optional advanced requirements (starred)
Recommended Tech: optional, non-mandatory stack suggestion
Deliverables list: Working project, GitHub repository, GitHub commit, LinkedIn post, Live deployment
Input fields (with validation):
GitHub Repository URL (required, valid URL, must be GitHub URL)
GitHub Commit URL (required, valid commit URL)
LinkedIn Post URL (required, valid URL)
Live Deployment URL (required, valid URL)
Submit button: disabled until all 4 fields valid; show "X/4 completed" progress
Validation error messages exactly as specified:
Missing GitHub → "⚠️ Add your GitHub repository"
Missing LinkedIn → "⚠️ Add your LinkedIn post"
Invalid URL → "⚠️ Please enter a valid URL"
Success screen after submit: checkmark, "Day X Complete", motivational line, streak count, X/60 complete, "View Dashboard" button, "Next Challenge Day X+1" link
2. Mobile Navigation (390px)

Bottom nav bar with 3 items only: Home, Challenges, Profile (icons + labels), fixed at bottom.

3. Backend API (Express)
GET /api/student

Returns: name, track, current day, streak, completed days, missed days, achievements, streak shield status.

GET /api/challenges

Returns array of all challenges.

GET /api/challenges/:day

Returns single challenge object for that day.

POST /api/submissions

Accepts: day number, github repo URL, github commit URL, linkedin post URL, live URL.
Backend validates:

Day exists
All 4 URLs present and non-empty
URLs are valid format
On success: save submission → mark day completed → update streak (using edge-case logic below) → update progress → return success response.
GET /api/submissions/:day

Returns: { submitted, github, commit, linkedin, deployment } booleans.

4. Streak Logic (implement exactly)
expectedDay = lastSubmittedDay + 1

if submittedDay == expectedDay:
    currentStreak += 1
    lastSubmittedDay = submittedDay

else if submittedDay > expectedDay:
    gap = submittedDay - expectedDay

    if shieldAvailable and gap == 1:
        currentStreak += 1
        shieldAvailable = false
        missedDays += 1
    else:
        missedDays += gap
        currentStreak = 1

    lastSubmittedDay = submittedDay

else:
    # duplicate/backdated submission — ignore, don't change streak

longestStreak = max(longestStreak, currentStreak)

# End-of-day silent miss check
today = currentChallengeDay()
if today > lastSubmittedDay + 1:
    if not submitted by end of today:
        gap = today - lastSubmittedDay
        missedDays += gap
        currentStreak = 0
5. Mock Data

Student object: id, name, track, currentDay, streak, completedDays, missedDays, achievements, profileStatus, streakShield.



Reusable Components: Button, Card, Badge, ProgressBar, StreakCard, ChallengeCard, AchievementCard, Input, BottomNav, Header, Modal, Toast, EmptyState, ErrorState, SuccessState.

Loading state: skeleton loaders (gray bars), not blank screens.

Error state: "Something went wrong. We couldn't load your challenge." + "Try Again" button.

7. Responsive Priorities
390px — highest priority (must be fully functional)
768px — secondary
1024px+ — desktop, lower priority
8. Architecture
React (Router: /, /dashboard, /day/:day)
   → Axios
   → Express API
      → Student / Challenge / Submission controllers
      → Mock JSON data
      → JSON responses
9. Final Checklist (must all pass before done)

Landing: page works, mobile responsive, CTAs work, sections clear.
Dashboard: loads correctly, streak shown, today's task shown, progress shown, achievements shown, missed-day case handled, first-day case handled, empty profile case handled.
Challenge Day: loads correctly, requirements shown, all 4 inputs work, validation works, submit works, success state shown.
Backend: Student API, Challenge API, Submission API, validation, mock data all working.
Final: tested at 390px, all routes tested, submission flow tested, empty states tested, missed-day case tested, first-day case tested, deployed, README added, route map added.

Challenge object (per day): day, title, description, difficulty, estimatedTime, requirements[], bonus[], suggestedTech[].