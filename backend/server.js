import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory Mock Data
let student = {
  id: "student_1",
  name: "Nano Banana",
  track: "Full Stack",
  currentDay: 12,
  streak: 11, // Streak protected at 11 days
  completedDays: 10,
  missedDays: 1,
  achievements: [
    { id: "first_spark", title: "First Spark", description: "Completed Day 1 challenge", icon: "⚡" },
    { id: "seven_day", title: "7-Day Builder", description: "Maintained a 7-day streak", icon: "🔥" },
    { id: "ten_projects", title: "10 Projects", description: "Built 10 total projects", icon: "📦" }
  ],
  profileStatus: "active",
  streakShield: false, // Shield has been used for Day 11
  lastSubmittedDay: 10, // last submitted was day 10, day 11 was missed
  longestStreak: 11
};

// Generate 60 Days of Challenges
const tracks = ["Full Stack", "Frontend", "Backend", "AI/ML", "Data Science", "UI/UX"];
const difficulties = ["Easy", "Medium", "Hard"];
const techStacks = {
  "Full Stack": ["React", "Express", "Node.js", "MongoDB"],
  "Frontend": ["React", "Tailwind CSS", "Vite", "TypeScript"],
  "Backend": ["Express", "Node.js", "PostgreSQL", "Redis"],
  "AI/ML": ["Python", "PyTorch", "Hugging Face", "FastAPI"],
  "Data Science": ["Python", "Pandas", "Jupyter", "Matplotlib"],
  "UI/UX": ["Figma", "Design System", "Prototyping", "Wireframing"]
};

const challenges = Array.from({ length: 60 }, (_, index) => {
  const day = index + 1;
  // Make challenges align with student's track
  const track = "Full Stack";
  
  // Specific override to match the Day 12 intermediate / 2-3 hours example specs
  const difficulty = day === 12 ? "Intermediate" : difficulties[index % difficulties.length];
  const estimatedTime = day === 12 ? "2–3 hours" : `${1.5 + (day % 3) * 0.5} hours`;
  const title = day === 12 ? "Build a Weather Dashboard" : `${track} Task: Day ${day} Challenge`;
  const description = day === 12 ? "Build a responsive weather dashboard with city search." : `Build a highly polished, responsive project focusing on core principles of ${track}. Implement a clean visual hierarchy, semantic code structures, and comprehensive documentation.`;
  
  return {
    day,
    title,
    description,
    difficulty,
    estimatedTime,
    requirements: day === 12 ? [
      "Search for a city",
      "View temperature",
      "View weather condition",
      "View humidity",
      "Handle invalid cities"
    ] : [
      `Create a fully responsive layout optimized for mobile (390px) up to desktop (1024px)`,
      `Use clean CSS or Tailwind classes without ad-hoc inline styles`,
      `Structure the HTML semantically with correct headers, main, and footer tags`,
      `Implement basic accessibility features (alt texts, proper button and input labels)`
    ],
    bonus: day === 12 ? [
      "Add a 5-day forecast",
      "Add location detection",
      "Add dark mode"
    ] : [
      `Add dynamic hover animations and micro-interactions`,
      `Incorporate a toggleable dark mode or custom theme selection`
    ],
    suggestedTech: day === 12 ? [
      "React",
      "Tailwind CSS",
      "OpenWeather API"
    ] : (techStacks[track] || ["HTML", "CSS", "JS"])
  };
});

// Submissions Tracker
let submissions = {};

// Initial submissions for days 1 to 10 to support the student's completedDays count
for (let i = 1; i <= 10; i++) {
  submissions[i] = {
    submitted: true,
    github: `https://github.com/appi/challenge-day-${i}`,
    commit: `https://github.com/appi/challenge-day-${i}/commit/abc123xyz`,
    linkedin: `https://linkedin.com/posts/appi-challenge-day-${i}`,
    deployment: `https://challenge-day-${i}.vercel.app`
  };
}

// Helpers
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

function isGithubUrl(str) {
  return isValidUrl(str) && str.includes('github.com');
}

// GET /api/student
app.get('/api/student', (req, res) => {
  // End-of-day silent miss check
  const today = student.currentDay;
  if (today > student.lastSubmittedDay + 1) {
    if (!submissions[today]) {
      const gap = today - student.lastSubmittedDay - 1;
      if (gap > 0) {
        student.missedDays += gap;
        student.streak = 0; // broken
        student.lastSubmittedDay = today - 1;
      }
    }
  }

  res.json({
    name: student.name,
    track: student.track,
    currentDay: student.currentDay,
    streak: student.streak,
    completedDays: student.completedDays,
    missedDays: student.missedDays,
    achievements: student.achievements,
    streakShieldStatus: student.streakShield ? "Active" : "Used"
  });
});

// GET /api/challenges
app.get('/api/challenges', (req, res) => {
  res.json(challenges);
});

// GET /api/challenges/:day
app.get('/api/challenges/:day', (req, res) => {
  const day = parseInt(req.params.day);
  const challenge = challenges.find(c => c.day === day);
  if (!challenge) {
    return res.status(404).json({ error: "Challenge not found" });
  }
  res.json(challenge);
});

// GET /api/submissions/:day
app.get('/api/submissions/:day', (req, res) => {
  const day = parseInt(req.params.day);
  const sub = submissions[day];
  if (!sub) {
    res.json({
      submitted: false,
      github: false,
      commit: false,
      linkedin: false,
      deployment: false
    });
  } else {
    res.json({
      submitted: true,
      github: true,
      commit: true,
      linkedin: true,
      deployment: true
    });
  }
});

// POST /api/submissions
app.post('/api/submissions', (req, res) => {
  const { day, githubRepoUrl, githubCommitUrl, linkedinPostUrl, liveUrl } = req.body;
  const dayNum = parseInt(day);

  // 1. Validation
  const challengeExists = challenges.some(c => c.day === dayNum);
  if (!challengeExists) {
    return res.status(400).json({ error: "Day does not exist" });
  }

  if (!githubRepoUrl || !githubCommitUrl || !linkedinPostUrl || !liveUrl) {
    return res.status(400).json({ error: "All 4 URLs are required" });
  }

  if (!isGithubUrl(githubRepoUrl)) {
    return res.status(400).json({ error: "⚠️ Add your GitHub repository" });
  }

  if (!isGithubUrl(githubCommitUrl) || !githubCommitUrl.includes('/commit/')) {
    return res.status(400).json({ error: "⚠️ Please enter a valid commit URL" });
  }

  if (!isValidUrl(linkedinPostUrl) || !linkedinPostUrl.includes('linkedin.com')) {
    return res.status(400).json({ error: "⚠️ Add your LinkedIn post" });
  }

  if (!isValidUrl(liveUrl)) {
    return res.status(400).json({ error: "⚠️ Please enter a valid URL" });
  }

  // 2. Mark day completed
  submissions[dayNum] = {
    submitted: true,
    github: githubRepoUrl,
    commit: githubCommitUrl,
    linkedin: linkedinPostUrl,
    deployment: liveUrl
  };

  student.completedDays = Object.keys(submissions).length;

  // 3. Streak Logic
  const expectedDay = student.lastSubmittedDay + 1;

  if (dayNum === expectedDay) {
    student.streak += 1;
    student.lastSubmittedDay = dayNum;
  } else if (dayNum > expectedDay) {
    const gap = dayNum - expectedDay;

    if (student.streakShield && gap === 1) {
      student.streak += 1;
      student.streakShield = false;
      student.missedDays += 1;
    } else {
      student.missedDays += gap;
      student.streak = 1;
    }
    student.lastSubmittedDay = dayNum;
  } else {
    // Duplicate/backdated submission — ignore, don't change streak
  }

  student.longestStreak = Math.max(student.longestStreak, student.streak);

  // Auto-unlock next day if completing current day
  if (dayNum === student.currentDay && student.currentDay < 60) {
    student.currentDay += 1;
  }

  // Update achievements
  if (student.completedDays >= 1 && !student.achievements.some(a => a.id === "first_spark")) {
    student.achievements.push({ id: "first_spark", title: "First Spark", description: "Completed Day 1 challenge", icon: "⚡" });
  }
  if (student.streak >= 7 && !student.achievements.some(a => a.id === "seven_day")) {
    student.achievements.push({ id: "seven_day", title: "7-Day Builder", description: "Maintained a 7-day streak", icon: "🔥" });
  }
  if (student.completedDays >= 10 && !student.achievements.some(a => a.id === "ten_projects")) {
    student.achievements.push({ id: "ten_projects", title: "10 Projects", description: "Built 10 total projects", icon: "📦" });
  }
  if (student.completedDays >= 30 && !student.achievements.some(a => a.id === "halfway_hero")) {
    student.achievements.push({ id: "halfway_hero", title: "Halfway Hero", description: "Completed 30 days of challenge", icon: "🏆" });
  }
  if (student.completedDays >= 60 && !student.achievements.some(a => a.id === "finisher")) {
    student.achievements.push({ id: "finisher", title: "Finisher", description: "Completed the 60-day challenge", icon: "👑" });
  }

  res.json({
    success: true,
    student: {
      name: student.name,
      track: student.track,
      currentDay: student.currentDay,
      streak: student.streak,
      completedDays: student.completedDays,
      missedDays: student.missedDays,
      achievements: student.achievements,
      streakShieldStatus: student.streakShield ? "Active" : "Used"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Mock Backend Server running on http://localhost:${PORT}`);
});
