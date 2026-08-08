🚀 ABTalks 60-Day Challenge — Complete Feature Checklist
1. 🏠 Landing Page /
1.1 Header
ABTalks logo/name
Short tagline
Navigation
Login/Get Started button
Mobile hamburger menu
1.2 Hero Section
Main headline
Short description
Primary CTA: Start 60-Day Challenge
Secondary CTA: See How It Works
60-day challenge visual
Current student/building illustration
1.3 Challenge Stats

Show 3–4 quick numbers:

60 Days
Daily Projects
GitHub Proof
LinkedIn Visibility
1.4 Why ABTalks

Explain:

Build consistently
Stop only watching tutorials
Create real projects
Build a public portfolio
Become visible to recruiters
1.5 How It Works

4 or 5 steps:

01 → Pick a Track
02 → Get Today's Task
03 → Build
04 → Submit Proof
05 → Keep Your Streak
1.6 Tracks

Example:

Full Stack
Frontend
Backend
AI/ML
Data Science
UI/UX

Each track should have:

Icon
Name
Short description
Number of challenges
1.7 Progress Preview

Show an example:

Day 27 / 60

██████████████░░░░░░

45% Complete
1.8 Student Motivation

Example cards:

🔥 Build consistency
🚀 Ship projects
💼 Build your portfolio
🌐 Become visible
1.9 Final CTA

Something strong:

Your first project starts today.

[ Start Day 1 → ]
1.10 Footer
ABTalks
About
Challenge
GitHub
LinkedIn
Contact
Copyright
2. 📊 Student Dashboard /dashboard

This should be your most important screen.

2.1 Dashboard Header

Show:

Profile/avatar
Student name
Greeting
Current track
Current challenge day

Example:

Good evening, Appi 👋

Full Stack Development
Day 12 of 60
2.2 Current Streak

Show:

Current streak
Fire icon
Streak message
Last 7 days

Example:

🔥 11 DAYS

You're on fire!

M T W T F S S
✓ ✓ ✓ ✓ ✓ ✓ ✓
2.3 Streak Shield ⭐

This is your special UX feature.

Show:

🛡️ Streak Shield

Missed a day?

Your progress is protected.

If activated:

Day 11 was missed.

Your streak shield protected
your 10-day streak.
3. 📈 Challenge Progress

Show:

Overall progress
12 / 60 Days

████████░░░░░░░░░░░░
20%
Statistics
Completed     12
Missed         1
Remaining     47
4. 🎯 Today's Challenge

This should be the first major action on the dashboard.

Show:

Day number
Challenge title
Difficulty
Estimated time
Short description
Start button

Example:

TODAY'S MISSION

DAY 12

Build a Weather Dashboard

Intermediate
⏱ 2–3 hours

Build a responsive weather
dashboard with city search.

[ Start Challenge → ]
5. 📅 Challenge Timeline

Show previous/current/upcoming days.

Example:

DAY 09  ✓ Completed
DAY 10  ✓ Completed
DAY 11  ⚠ Missed
DAY 12  ● Today
DAY 13  🔒 Upcoming

This gives the student a sense of journey.

6. 🏆 Achievements

Create achievement cards.

Examples:

First Spark

Complete Day 1

7-Day Builder

Maintain 7-day streak

10 Projects

Complete 10 projects

Halfway Hero

Complete Day 30

Finisher

Complete all 60 days

7. 🧑‍💻 Student Profile

Show:

Name
Avatar
Track
Days completed
Current streak
Total projects
GitHub
LinkedIn

Example:

Appi

Full Stack Developer

🔥 11 Day Streak
🚀 12 Projects

GitHub
LinkedIn
8. ⚠️ Edge Cases

You must implement these because the problem specifically asks for them.
expectedDay = lastSubmittedDay + 1

if submittedDay == expectedDay:
    # Perfect, consecutive day
    currentStreak += 1
    lastSubmittedDay = submittedDay

else if submittedDay > expectedDay:
    gap = submittedDay - expectedDay   # number of days missed

    if shieldAvailable and gap == 1:
        # Streak Shield absorbs exactly one missed day
        currentStreak += 1
        shieldAvailable = false
        missedDays += 1
    else:
        # Streak breaks, restart at 1
        missedDays += gap
        currentStreak = 1
    
    lastSubmittedDay = submittedDay

else:
    # submittedDay <= expectedDay (duplicate/backdated submission)
    reject or ignore — do not change streak

longestStreak = max(longestStreak, currentStreak)


today = currentChallengeDay()  # derived from challenge start date

if today > lastSubmittedDay + 1:
    # user has silently missed a day with no submission yet
    # mark as "at risk" or auto-break streak at day's end
    if not submitted by end of today:
        gap = today - lastSubmittedDay
        missedDays += gap
        currentStreak = 0   # broken until next submission restarts at 1

9. 📱 Mobile Navigation

At 390px, use bottom navigation.

┌──────────────────────────┐
│                          │
│       PAGE CONTENT       │
│                          │
├──────────────────────────┤
│ 🏠       🎯       👤     │
│ Home   Challenge  Profile│
└──────────────────────────┘

Main navigation:

Home
Challenges
Profile
10. 📝 Challenge Day /day/12

This is the complete challenge experience.

10.1 Day Header

Show:

← Back

DAY 12 / 60

Intermediate
⏱ 2–3 hours
11. 🎯 Challenge Title

Example:

Build a Weather Dashboard

Below:

Create a responsive weather
application that allows users
to search for a city and view
current weather information.
12. 📋 Mission

Explain exactly what the student needs to build.

Example:

Your Mission

Build a responsive weather
dashboard where users can:

• Search for a city
• View temperature
• View weather condition
• View humidity
• Handle invalid cities
13. ✅ Requirements

Use checkboxes.

REQUIREMENTS

☐ City search
☐ Temperature display
☐ Weather condition
☐ Humidity
☐ Error state
☐ Responsive design
14. ⭐ Bonus Challenge

Give optional advanced requirements.

Example:

BONUS

⭐ Add a 5-day forecast
⭐ Add location detection
⭐ Add dark mode

This encourages stronger projects.

15. 🛠️ Recommended Tech

Optional but useful.

Example:

Suggested Stack

React
Tailwind CSS
OpenWeather API

Don't make it mandatory.

16. 📦 Deliverables

Tell the student exactly what they need to submit.

YOUR DELIVERABLES

✓ Working project
✓ GitHub repository
✓ GitHub commit
✓ LinkedIn post
✓ Live deployment
17. 🔗 GitHub Repository

Input:

GitHub Repository

┌────────────────────────┐
│ https://github.com/... │
└────────────────────────┘

Validation:

Required
Valid URL
GitHub URL
18. 🔗 GitHub Commit

Input:

GitHub Commit

┌────────────────────────┐
│ https://github.com/... │
└────────────────────────┘

Validation:

Required
Valid commit URL
19. 💼 LinkedIn Post

Input:

LinkedIn Post

┌────────────────────────┐
│ https://linkedin.com/..│
└────────────────────────┘
20. 🌐 Live Deployment

Input:

Live Deployment

┌────────────────────────┐
│ https://myproject.ver..│
└────────────────────────┘
21. 📤 Submit Button

Main CTA:

[ Submit Day 12 → ]

Before submission:

✓ GitHub repository
✓ GitHub commit
✓ LinkedIn post
✓ Live deployment

4/4 completed

Then enable submit.

22. ❌ Submission Validation

If GitHub is missing:

⚠️ Add your GitHub repository

If LinkedIn is missing:

⚠️ Add your LinkedIn post

If URL is invalid:

⚠️ Please enter a valid URL
23. 🎉 Submission Success

After submission:

        ✓

DAY 12 COMPLETE

You shipped another project.

🔥 12 Day Streak

12 / 60 Complete

[ View Dashboard ]

Next Challenge
Day 13 → 

This is a very important interaction.

24. 🔌 Backend

Your backend should have these major sections.

24.1 Student API
GET /api/student

Returns:

Name
Track
Current day
Streak
Completed days
Missed days
Achievements
Streak shield
25. Challenge API
GET /api/challenges

Returns all challenges.

GET /api/challenges/:day

Returns a specific challenge.

Example:

GET /api/challenges/12
26. Submission API
POST /api/submissions

Receives:

GitHub repository
GitHub commit
LinkedIn post
Live URL
Day number
27. Submission Status API
GET /api/submissions/:day

Returns:

submitted: true
github: true
commit: true
linkedin: true
deployment: true
28. Backend Validation

Backend should check:

Day exists
GitHub URL exists
Commit URL exists
LinkedIn URL exists
Live URL exists
Required fields aren't empty

Then:

Validate
   ↓
Save submission
   ↓
Mark day completed
   ↓
Update streak
   ↓
Update progress
   ↓
Return success
29. 📁 Mock Data
Student data

Include:

ID
Name
Track
Current day
Streak
Completed days
Missed days
Achievements
Profile status
Streak shield
Challenge data

Each challenge:

Day
Title
Description
Difficulty
Estimated time
Requirements
Bonus
Suggested technologies
30. 🎨 Design System

Create these before designing the pages.

Colors
Background    #F8FAFC
Primary       #111827
Accent        #FF6B35
Success       #16A34A
Warning       #F59E0B
Danger        #EF4444
Muted         #64748B
Border        #E2E8F0
31. Typography

Use:

Inter

Recommended:

Hero       40–48px
Page title 28–32px
Section    20–24px
Body       14–16px
Caption    12–13px

At 390px, don't make text unnecessarily huge.

32. UI Components

Create reusable components:

Button
Card
Badge
ProgressBar
StreakCard
ChallengeCard
AchievementCard
Input
BottomNav
Header
Modal
Toast
EmptyState
ErrorState
SuccessState
33. Loading States

Don't leave the page blank while API loads.

Show:

████████████
██████░░░░░
████████░░░

Skeleton loading.

34. Error States

If backend fails:

Something went wrong.

We couldn't load your challenge.

[ Try Again ]
35. Responsive Design
Primary
390px
Secondary
768px
Desktop
1024px+

Your priority:

390px ⭐⭐⭐⭐⭐
768px ⭐⭐⭐
1440px ⭐⭐
36. Backend + Frontend Communication

Your final architecture:

             React
               │
        React Router
               │
     ┌─────────┼─────────┐
     ↓         ↓         ↓
     /     /dashboard   /day/12
     │         │         │
     └─────────┼─────────┘
               │
             Axios
               │
               ↓
          Express API
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
    Student Challenge Submission
       │       │        │
       └───────┼────────┘
               ↓
           JSON Data
37. 🚀 Final Submission Checklist

Before submitting, verify:

Landing
 / works
 Mobile design
 CTA works
 Clear explanation
 Trust/motivation
Dashboard
 /dashboard works
 Streak
 Today's task
 Progress
 Achievements
 Missed day
 First day
 Empty profile
Challenge
 /day/12 works
 Task description
 Requirements
 GitHub repository
 GitHub commit
 LinkedIn post
 Live URL
 Validation
 Submit
 Success state
Backend
 Student API
 Challenge API
 Submission API
 Validation
 Mock data
Final
 Test at 390px
 Test all routes
 Test submission
 Test empty states
 Test missed day
 Test first day
 Deploy
 Add README
 Add Route Map