import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Flame, Shield, Award, Calendar, ChevronRight, 
  Home, BookOpen, User, Sparkles, RefreshCw, AlertCircle,
  Github, Linkedin, Target
} from 'lucide-react';

export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const [todaysChallenge, setTodaysChallenge] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('challenges'); // 'home', 'challenges', 'profile'

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(false);
      const studentRes = await axios.get('http://localhost:3001/api/student');
      const studentData = studentRes.data;
      setStudent(studentData);
      
      const challengeRes = await axios.get(`http://localhost:3001/api/challenges/${studentData.currentDay}`);
      setTodaysChallenge(challengeRes.data);

      // Generate Timeline Range: from currentDay - 3 to currentDay + 1 (exactly 5 days)
      const currentDay = studentData.currentDay;
      const timelineRange = Array.from({ length: 5 }, (_, i) => currentDay - 3 + i);

      // Fetch statuses in parallel
      const timelineData = await Promise.all(
        timelineRange.map(async (day) => {
          if (day < 1) return null; // edge case for first days
          if (day > 60) return null; // edge case for last days

          if (day === currentDay) {
            return { day, label: "Today", status: "today", icon: "●" };
          } else if (day > currentDay) {
            return { day, label: "Upcoming", status: "upcoming", icon: "🔒" };
          } else {
            // Check submission
            try {
              const subRes = await axios.get(`http://localhost:3001/api/submissions/${day}`);
              if (subRes.data.submitted) {
                return { day, label: "Completed", status: "completed", icon: "✓" };
              } else {
                return { day, label: "Missed", status: "missed", icon: "⚠" };
              }
            } catch (e) {
              return { day, label: "Missed", status: "missed", icon: "⚠" };
            }
          }
        })
      );

      setTimeline(timelineData.filter(Boolean));
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Determine Greeting based on current time
  const getGreeting = () => {
    const hours = new Date().getHours();
    let timeGreeting = "Good evening";
    if (hours < 12) {
      timeGreeting = "Good morning";
    } else if (hours < 17) {
      timeGreeting = "Good afternoon";
    }
    return `${timeGreeting}, ${student?.name || 'Appi'} 👋`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-soft flex flex-col justify-between pb-16 md:pb-0">
        <div className="max-w-md mx-auto w-full px-6 py-12 flex-grow flex flex-col gap-6">
          {/* Skeleton Loader */}
          <div className="h-20 bg-canvas-soft-2 animate-pulse rounded-lg border border-hairline" />
          <div className="h-48 bg-canvas-soft-2 animate-pulse rounded-lg border border-hairline" />
          <div className="h-32 bg-canvas-soft-2 animate-pulse rounded-lg border border-hairline" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-canvas-soft flex items-center justify-center p-6">
        <div className="bg-canvas border border-hairline p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-bold text-primary mb-2">Something went wrong</h3>
          <p className="text-sm text-body mb-6">We couldn't load your challenge and profile information. Please try again.</p>
          <button 
            onClick={fetchStudentData} 
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-canvas px-4 py-2.5 rounded font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // Weekdays representations for streak calendar grid
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Mock last 7 days checkmark grid representation
  const streakCheckmarks = [true, true, true, true, true, true, true]; // M to S

  return (
    <div className="min-h-screen bg-canvas-soft font-sans flex flex-col pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* Top Desktop Bar */}
      <header className="bg-canvas border-b border-hairline h-16 hidden md:flex items-center">
        <div className="max-w-5xl mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="w-8 h-8 bg-primary rounded flex items-center justify-center text-canvas font-bold">AB</a>
            <span className="font-bold text-primary">Student Center</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm text-body hover:text-primary transition-colors">Home</a>
            <button 
              onClick={() => setActiveTab('challenges')} 
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeTab === 'challenges' ? 'text-primary' : 'text-body hover:text-primary'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeTab === 'profile' ? 'text-primary' : 'text-body hover:text-primary'}`}
            >
              Profile
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto w-full px-6 pt-8 flex-grow flex flex-col gap-6">
        {activeTab === 'profile' ? (
          /* Student Profile Section */
          <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col items-center text-center gap-3">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-soft/60 to-violet/10 text-violet-deep flex items-center justify-center font-black text-3xl border border-violet-soft shadow-md">
                {student?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{student?.name || 'Appi'}</h2>
                <p className="text-xs text-mute font-semibold mt-1">{student?.track || 'Full Stack'} Developer</p>
              </div>
            </div>

            <div className="border-t border-b border-hairline py-4 grid grid-cols-2 gap-4 text-center">
              <div className="bg-canvas-soft p-3 rounded border border-hairline flex flex-col items-center shadow-inner">
                <span className="text-xl">🔥</span>
                <span className="text-xs font-bold text-primary mt-1">{student?.streak || 0} Day Streak</span>
              </div>
              <div className="bg-canvas-soft p-3 rounded border border-hairline flex flex-col items-center shadow-inner">
                <span className="text-xl">🚀</span>
                <span className="text-xs font-bold text-primary mt-1">{student?.completedDays || 0} Projects</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-mute font-semibold uppercase tracking-wider">Public Credentials</span>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded border border-hairline bg-canvas hover:bg-canvas-soft-2 transition-all hover:scale-[1.01] duration-150 group"
              >
                <span className="text-xs font-bold text-primary flex items-center gap-2">
                  <Github className="w-4 h-4 text-body group-hover:text-primary transition-colors" /> GitHub
                </span>
                <ChevronRight className="w-4 h-4 text-mute transition-transform group-hover:translate-x-0.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded border border-hairline bg-canvas hover:bg-canvas-soft-2 transition-all hover:scale-[1.01] duration-150 group"
              >
                <span className="text-xs font-bold text-primary flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-body group-hover:text-primary transition-colors" /> LinkedIn
                </span>
                <ChevronRight className="w-4 h-4 text-mute transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </section>
        ) : (
          /* Dashboard Flow Content */
          <>
            {/* Dashboard Header */}
            <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex items-center gap-4">
              {/* Avatar Icon */}
              <div className="w-12 h-12 rounded-full bg-violet-soft/50 text-violet-deep flex items-center justify-center font-bold text-lg border border-violet-soft">
                {student?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary leading-tight">{getGreeting()}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-mute font-medium">{student?.track || 'Full Stack'} Development</span>
                  <span className="w-1 h-1 bg-hairline-strong rounded-full" />
                  <span className="text-xs text-link font-semibold">Day {student?.currentDay || 1} of 60</span>
                </div>
              </div>
            </section>

            {/* Current Streak */}
            <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6 text-warning fill-warning" />
                  <span className="text-lg font-bold text-primary font-mono">{student?.streak || 0} DAYS</span>
                </div>
                <span className="text-xs font-semibold text-warning-deep bg-warning-soft px-2 py-0.5 rounded">
                  You're on fire!
                </span>
              </div>
              
              <div>
                <div className="text-xs text-mute font-semibold uppercase tracking-wider mb-2">Last 7 Days Streak</div>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <span className="text-[10px] text-mute font-semibold">{day}</span>
                      <div className="w-8 h-8 rounded-full bg-success/10 text-success border border-success/30 flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Streak Shield ⭐ */}
            <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-link/5 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-link">
                <Shield className="w-5 h-5 fill-link/25" />
                <h3 className="font-bold text-primary text-sm">Streak Shield</h3>
              </div>
              <div>
                <div className="text-xs text-body font-medium">Missed a day?</div>
                <div className="text-xs text-mute mt-0.5">Your progress is protected.</div>
              </div>

              <div className="mt-2 border-t border-hairline pt-3">
                {student?.streakShieldStatus === "Active" ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                    <span className="text-xs text-success font-semibold">Active & Armed</span>
                  </div>
                ) : (
                  <div className="bg-canvas-soft-2 p-3 rounded border border-hairline">
                    <div className="text-xs text-warning-deep font-semibold">🛡️ Streak Shield Protection Triggered</div>
                    <div className="text-[11px] text-body mt-1">
                      Day 11 was missed. Your streak shield protected your {student?.streak || 10}-day streak.
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Challenge Progress */}
            <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-xs text-mute font-semibold uppercase tracking-wider font-mono">Overall Progress</span>
                <div className="flex items-end justify-between mt-1">
                  <span className="text-xl font-bold text-primary">{student?.completedDays || 0} / 60 Days</span>
                  <span className="text-sm font-bold text-primary">{Math.round(((student?.completedDays || 0) / 60) * 100)}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-3 w-full bg-canvas-soft-2 rounded-full border border-hairline overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.round(((student?.completedDays || 0) / 60) * 100)}%` }}
                />
              </div>

              <div className="border-t border-hairline pt-3 mt-1">
                <span className="text-xs text-mute font-semibold uppercase tracking-wider block mb-3">Statistics</span>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-canvas-soft border border-hairline p-2 rounded">
                    <span className="text-xs text-mute font-medium block">Completed</span>
                    <span className="text-lg font-bold text-success mt-0.5 block">{student?.completedDays || 0}</span>
                  </div>
                  <div className="bg-canvas-soft border border-hairline p-2 rounded">
                    <span className="text-xs text-mute font-medium block">Missed</span>
                    <span className="text-lg font-bold text-error mt-0.5 block">{student?.missedDays || 0}</span>
                  </div>
                  <div className="bg-canvas-soft border border-hairline p-2 rounded">
                    <span className="text-xs text-mute font-medium block">Remaining</span>
                    <span className="text-lg font-bold text-primary mt-0.5 block">{60 - (student?.completedDays || 0) - (student?.missedDays || 0)}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Today's Challenge */}
            {todaysChallenge && (
              <section className="bg-primary text-canvas border border-primary p-6 rounded-xl shadow-lg flex flex-col gap-4 relative overflow-hidden">
                {/* Ambient accent background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-link/20 to-transparent rounded-bl-full pointer-events-none" />
                
                <div>
                  <span className="text-[10px] text-link font-extrabold uppercase tracking-widest font-mono">Today's Mission</span>
                  <div className="text-3xl font-black mt-1 font-mono">DAY {todaysChallenge.day}</div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-canvas leading-tight">{todaysChallenge.title}</h3>
                  <div className="flex gap-3 mt-2">
                    <span className="px-2 py-0.5 bg-canvas/10 rounded text-[10px] font-mono text-[#a1a1a1] font-semibold tracking-wide border border-canvas/5">
                      {todaysChallenge.difficulty}
                    </span>
                    <span className="px-2 py-0.5 bg-canvas/10 rounded text-[10px] font-mono text-[#a1a1a1] font-semibold tracking-wide border border-canvas/5 flex items-center gap-1">
                      ⏱ {todaysChallenge.estimatedTime}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#a1a1a1] leading-relaxed">
                  {todaysChallenge.description}
                </p>

                <a 
                  href={`/day/${todaysChallenge.day}`}
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-canvas text-primary px-5 py-3 rounded font-bold text-sm hover:bg-canvas-soft transition-all hover:scale-[1.01] text-center w-full group shadow-md"
                >
                  Start Challenge <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </section>
            )}

            {/* Challenge Timeline */}
            {timeline.length > 0 && (
              <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-hairline pb-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-primary text-sm">Challenge Timeline</h3>
                </div>
                
                <div className="flex flex-col gap-3">
                  {timeline.map((item) => {
                    let statusColor = "text-mute";
                    let statusBg = "bg-canvas-soft-2 border-hairline";
                    
                    if (item.status === "completed") {
                      statusColor = "text-success font-semibold";
                      statusBg = "bg-success/5 border-success/20";
                    } else if (item.status === "missed") {
                      statusColor = "text-error font-semibold";
                      statusBg = "bg-error/5 border-error/20";
                    } else if (item.status === "today") {
                      statusColor = "text-link font-bold";
                      statusBg = "bg-link/5 border-link/30 ring-1 ring-link/10";
                    }
                    
                    return (
                      <div 
                        key={item.day} 
                        className={`flex items-center justify-between p-3 rounded border text-xs ${statusBg}`}
                      >
                        <span className="font-mono font-bold text-primary">DAY {String(item.day).padStart(2, '0')}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono ${statusColor}`}>{item.icon}</span>
                          <span className={`font-medium ${statusColor}`}>{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Achievements */}
            <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-primary text-sm">Achievements</h3>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: "first_spark", title: "First Spark", desc: "Complete Day 1", icon: "⚡" },
                  { id: "seven_day", title: "7-Day Builder", desc: "Maintain 7-day streak", icon: "🔥" },
                  { id: "ten_projects", title: "10 Projects", desc: "Complete 10 projects", icon: "📦" },
                  { id: "halfway_hero", title: "Halfway Hero", desc: "Complete Day 30", icon: "🏆" },
                  { id: "finisher", title: "Finisher", desc: "Complete all 60 days", icon: "👑" }
                ].map((ach) => {
                  const isUnlocked = student?.achievements?.some(a => a.id === ach.id);
                  return (
                    <div 
                      key={ach.id} 
                      className={`flex items-center gap-3 p-3 rounded border transition-all ${
                        isUnlocked 
                          ? 'bg-canvas border-hairline opacity-100' 
                          : 'bg-canvas-soft-2 border-hairline/50 opacity-50 select-none'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isUnlocked ? 'bg-link-bg-soft text-link font-bold' : 'bg-canvas-soft-2 text-mute border border-dashed border-hairline-strong'}`}>
                        {isUnlocked ? ach.icon : "🔒"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-primary truncate">{ach.title}</div>
                        <div className="text-[10px] text-mute truncate">{ach.desc}</div>
                      </div>
                      {isUnlocked && (
                        <span className="text-[9px] font-bold text-success bg-success/10 px-2 py-0.5 rounded">Unlocked</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (390px Priority) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-canvas border-t border-hairline h-16 flex items-center justify-around z-50 animate-in fade-in duration-200">
        <button 
          onClick={() => {
            setActiveTab('home');
            window.location.href = '/';
          }}
          className={`flex flex-col items-center justify-center w-20 h-full cursor-pointer ${activeTab === 'home' ? 'text-primary font-semibold' : 'text-mute'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab('challenges')}
          className={`flex flex-col items-center justify-center w-20 h-full cursor-pointer ${activeTab === 'challenges' ? 'text-primary font-semibold' : 'text-mute'}`}
        >
          <Target className="w-5 h-5" />
          <span className="text-[10px] mt-1">Challenge</span>
        </button>

        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center w-20 h-full cursor-pointer ${activeTab === 'profile' ? 'text-primary font-semibold' : 'text-mute'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
