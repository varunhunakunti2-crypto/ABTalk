import React, { useState } from 'react';
import { 
  Menu, X, ArrowRight, Github, Linkedin, CheckCircle2, 
  Layers, Cpu, Globe, Database, Palette, BarChart, 
  Sparkles, Award, Play, CheckSquare, Zap 
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Full Stack');

  const stats = [
    { value: "60 Days", label: "Structured Roadmap" },
    { value: "60 Projects", label: "Daily Hands-on Building" },
    { value: "GitHub Proof", label: "Version Controlled Progress" },
    { value: "LinkedIn", label: "Recruiter Visibility" }
  ];

  const whyPoints = [
    { title: "Build Consistently", desc: "Develop the daily habit of writing code and shipping software." },
    { title: "Stop Tutorial Hell", desc: "Move away from passive watching and start active coding." },
    { title: "Create Real Projects", desc: "Solve real-world problems with production-ready builds." },
    { title: "Public Portfolio", desc: "Build a solid, visible timeline of your technical capabilities." },
    { title: "Get Noticed by Recruiters", desc: "Showcase daily commitment that speaks louder than a resume." }
  ];

  const steps = [
    { num: "01", title: "Pick a Track", desc: "Select Full Stack, Frontend, Backend, AI/ML, Data Science, or UI/UX." },
    { num: "02", title: "Get Today's Task", desc: "Receive a brand-new real-world prompt every morning." },
    { num: "03", title: "Build", desc: "Code the project locally, commit your work, and deploy it live." },
    { num: "04", title: "Submit Proof", desc: "Share your GitHub repository, commit hash, live URL, and a LinkedIn post." },
    { num: "05", title: "Keep Your Streak", desc: "Maintain your momentum. Protect your streak with the Streak Shield." }
  ];

  const tracks = [
    { icon: Globe, name: "Full Stack", desc: "End-to-end web apps with React frontends and Node.js/Express backends.", count: 60 },
    { icon: Layers, name: "Frontend", desc: "Stunning user interfaces, pixel-perfect layout styling, and client-side interactions.", count: 60 },
    { icon: Database, name: "Backend", desc: "Robust server logic, RESTful APIs, SQL/NoSQL databases, and optimization.", count: 60 },
    { icon: Cpu, name: "AI/ML", desc: "Integration of large language models, agent systems, and machine learning pipelines.", count: 60 },
    { icon: BarChart, name: "Data Science", desc: "Data processing, analytics dashboards, statistical modeling, and visualizations.", count: 60 },
    { icon: Palette, name: "UI/UX", desc: "High-fidelity wireframes, typography design systems, and beautiful prototypes.", count: 60 }
  ];

  const motivations = [
    { emoji: "🔥", title: "Build consistency", desc: "Small daily steps accumulate into a massive portfolio of engineering accomplishments." },
    { emoji: "🚀", title: "Ship projects", desc: "Stop watching videos. Write the code, run it, test it, deploy it, and show it to the world." },
    { emoji: "💼", title: "Build your portfolio", desc: "No more simple todo apps. Build unique, production-grade tools with real specifications." },
    { emoji: "🌐", title: "Become visible", desc: "Share your progress publicly on LinkedIn to build a personal brand recruiters love." }
  ];

  return (
    <div className="min-h-screen bg-canvas font-sans selection:bg-primary selection:text-canvas-soft flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-hairline h-16 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="h-10 w-auto text-primary" viewBox="0 0 280 88" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="88" height="88" rx="20" fill="currentColor"/>
              <path d="M20 32 C30 26 38 26 44 32 L44 60 C38 54 30 54 20 60 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
              <path d="M68 32 C58 26 50 26 44 32 L44 60 C50 56 58 54 68 60 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
              <path d="M56 20 L64 20 L64 40 L60 36 L56 40 Z" fill="#ffffff"/>
              <text x="106" y="42" font-family="sans-serif" font-size="28" font-weight="600" fill="currentColor">ABTalks</text>
              <text x="107" y="62" font-family="sans-serif" font-size="13" fill="#64748B">60-Day Challenge</text>
            </svg>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#why" className="text-body hover:text-primary text-sm font-medium transition-colors">Why ABTalks</a>
            <a href="#how" className="text-body hover:text-primary text-sm font-medium transition-colors">How It Works</a>
            <a href="#tracks" className="text-body hover:text-primary text-sm font-medium transition-colors">Tracks</a>
            <a href="#preview" className="text-body hover:text-primary text-sm font-medium transition-colors">Preview</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="/dashboard" className="text-primary hover:text-body text-sm font-medium transition-colors">Log In</a>
            <a href="/dashboard" className="bg-primary text-canvas px-4 py-2 rounded-sm text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            className="md:hidden text-primary hover:text-body focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-canvas border-b border-hairline absolute top-16 left-0 w-full px-6 py-6 flex flex-col gap-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-250">
            <a 
              href="#why" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-body hover:text-primary text-base font-medium py-2 border-b border-hairline"
            >
              Why ABTalks
            </a>
            <a 
              href="#how" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-body hover:text-primary text-base font-medium py-2 border-b border-hairline"
            >
              How It Works
            </a>
            <a 
              href="#tracks" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-body hover:text-primary text-base font-medium py-2 border-b border-hairline"
            >
              Tracks
            </a>
            <a 
              href="#preview" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-body hover:text-primary text-base font-medium py-2 border-b border-hairline"
            >
              Preview
            </a>
            <div className="flex flex-col gap-3 pt-4">
              <a 
                href="/dashboard" 
                className="text-center text-primary border border-hairline py-2.5 rounded text-sm font-medium hover:bg-canvas-soft transition-colors"
              >
                Log In
              </a>
              <a 
                href="/dashboard" 
                className="text-center bg-primary text-canvas py-2.5 rounded text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Section */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-hairline">
          {/* Subtle Ambient Mesh Background */}
          <div className="absolute top-[-10%] left-[20%] w-[60%] h-[50%] bg-gradient-to-r from-cyan-soft/40 via-violet-soft/30 to-highlight-pink/10 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-soft/40 text-violet-deep border border-violet-soft mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Stop Watching Tutorials, Start Building
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              The 60-Day Challenge to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-link via-violet to-highlight-pink">
                Master Real Projects
              </span>
            </h1>
            <p className="text-lg md:text-xl text-body max-w-2xl mx-auto mb-10 leading-relaxed">
              Accelerate your engineering skills by shipping one targeted project every day. Commit the code, push to GitHub, post on LinkedIn, and build consistency that recruiters value.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/dashboard" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-canvas px-8 py-4 rounded-full text-base font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-md group"
              >
                Start 60-Day Challenge <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#how" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-canvas border border-hairline text-primary px-8 py-4 rounded-full text-base font-semibold hover:bg-canvas-soft hover:border-hairline-strong transition-all"
              >
                See How It Works
              </a>
            </div>

            {/* Hero Visual Mockup */}
            <div className="mt-16 border border-hairline rounded-xl bg-canvas-soft p-4 shadow-xl max-w-3xl mx-auto relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-link/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-xs text-mute font-mono">abtalks-challenge-dashboard.sh</div>
                <div className="w-4" />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 py-4 px-2">
                <div className="text-left flex-1">
                  <div className="text-xs text-link font-mono uppercase tracking-wider mb-2">Live Progress Preview</div>
                  <h3 className="text-xl font-bold text-primary mb-2">Day 27: RESTful Server Optimization</h3>
                  <p className="text-sm text-body mb-4">Implement Redis caching middleware for high-traffic database query routes. Benchmarking results must be submitted.</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-canvas-soft-2 border border-hairline rounded text-[11px] font-mono text-body font-semibold">EST. TIME: 2h</span>
                    <span className="px-2 py-1 bg-violet-soft/30 border border-violet-soft/50 rounded text-[11px] font-mono text-violet-deep font-semibold">DIFFICULTY: HARD</span>
                  </div>
                </div>
                <div className="bg-primary text-canvas-soft p-4 rounded-lg w-full md:w-72 font-mono text-[11px] leading-relaxed text-left border border-primary/90 shadow-inner">
                  <div className="text-[#50e3c2]">$ npm run benchmark</div>
                  <div className="text-mute">Running DB read queries benchmarking...</div>
                  <div>Direct queries: 240ms</div>
                  <div className="text-[#aaffec]">Redis cached: 12ms (95.0% performance boost)</div>
                  <div className="text-[#ff0080] mt-2">✓ Git commit pushed to origin/main</div>
                  <div className="text-[#0070f3]">✓ Challenge submission validation successful!</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Stats */}
        <section className="bg-canvas-soft border-b border-hairline py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-5xl font-extrabold text-primary mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-xs md:text-sm text-mute uppercase tracking-wider font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why ABTalks */}
        <section id="why" className="py-20 md:py-24 border-b border-hairline">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Why ABTalks?</h2>
              <p className="text-body text-base md:text-lg max-w-xl mx-auto">
                Most bootcamps teach theory. The 60-Day Challenge builds the critical habit that sets exceptional developers apart: hands-on, daily consistency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whyPoints.map((point, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-lg border border-hairline bg-canvas hover:border-hairline-strong transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-link/10 text-link flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base mb-1">{point.title}</h3>
                    <p className="text-sm text-body leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="bg-canvas-soft-2 border-b border-hairline py-20 md:py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">How It Works</h2>
              <p className="text-body text-base md:text-lg max-w-xl mx-auto">
                No complex portals. A straightforward workflow to keep you building day in and day out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-canvas p-6 rounded-lg border border-hairline relative hover:scale-[1.02] transition-transform duration-200">
                  <span className="text-4xl font-black text-canvas-soft-2 absolute top-2 right-4 font-mono select-none">{step.num}</span>
                  <h3 className="font-bold text-primary text-base mb-2 mt-4 relative z-10">{step.title}</h3>
                  <p className="text-xs text-body leading-relaxed relative z-10">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracks Section */}
        <section id="tracks" className="py-20 md:py-24 border-b border-hairline">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Choose Your Track</h2>
              <p className="text-body text-base md:text-lg max-w-xl mx-auto">
                Select your engineering path. Every track contains 60 sequential, carefully crafted coding challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {tracks.map((track, idx) => {
                const IconComponent = track.icon;
                const isSelected = selectedTrack === track.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTrack(track.name)}
                    className={`text-left p-6 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'border-primary bg-canvas shadow-md scale-[1.01]' 
                        : 'border-hairline bg-canvas hover:border-hairline-strong'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-primary text-canvas' : 'bg-canvas-soft text-body'}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-mute font-mono">{track.count} Challenges</span>
                    </div>
                    <h3 className="font-bold text-primary text-base mb-2">{track.name}</h3>
                    <p className="text-xs text-body leading-relaxed">{track.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Progress Preview */}
        <section id="preview" className="bg-canvas-soft border-b border-hairline py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary tracking-tight mb-4">Challenge Progress Preview</h2>
              <p className="text-body text-sm">Visualize your daily journey as you push towards the 60-day milestone.</p>
            </div>

            <div className="bg-canvas border border-hairline p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-semibold text-mute uppercase tracking-wider font-mono">Current Challenge</span>
                  <div className="text-xl font-bold text-primary mt-1">Day 27 / 60</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-mute font-mono">Progress</span>
                  <div className="text-xl font-extrabold text-primary mt-1">45% Complete</div>
                </div>
              </div>
              
              {/* Progress Bar Visual Representation */}
              <div className="h-6 w-full bg-canvas-soft-2 rounded-full border border-hairline overflow-hidden mb-6 flex">
                <div 
                  className="bg-primary h-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                  style={{ width: '45%' }}
                >
                  <span className="text-[10px] text-canvas font-bold font-mono">27 Days</span>
                </div>
                <div className="flex-1" />
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 14 }).map((_, i) => {
                  const dayNum = 20 + i;
                  const isCompleted = dayNum < 27;
                  const isCurrent = dayNum === 27;
                  return (
                    <div 
                      key={i} 
                      className={`h-10 rounded flex flex-col items-center justify-center border font-mono text-[10px] ${
                        isCompleted 
                          ? 'bg-primary text-canvas border-primary' 
                          : isCurrent 
                            ? 'bg-link/10 text-link border-link ring-2 ring-link/25' 
                            : 'bg-canvas-soft text-mute border-hairline'
                      }`}
                    >
                      <span className="font-semibold">D{dayNum}</span>
                      <span className="text-[8px]">{isCompleted ? '✓' : isCurrent ? '●' : '🔒'}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-mute mt-4">Showing checklist sample from Day 20 to Day 33</p>
            </div>
          </div>
        </section>

        {/* Student Motivation Section */}
        <section className="py-20 md:py-24 border-b border-hairline">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">Unlocking Professional Habits</h2>
              <p className="text-body text-base md:text-lg max-w-xl mx-auto">
                Accelerate your technical mastery through daily, public milestones.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {motivations.map((card, idx) => (
                <div key={idx} className="bg-canvas border border-hairline p-6 rounded-xl hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <span className="text-3xl mb-4 block" role="img" aria-label="motivation emoji">{card.emoji}</span>
                    <h3 className="font-bold text-primary text-base mb-2">{card.title}</h3>
                    <p className="text-xs text-body leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary text-canvas py-20 md:py-24 relative overflow-hidden">
          {/* Accent lighting effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0070f3] rounded-full blur-[160px] opacity-20 pointer-events-none" />
          
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Your first project starts today.</h2>
            <p className="text-[#a1a1a1] text-base md:text-lg mb-10 max-w-lg mx-auto">
              Join students worldwide building consistency, launching portfolios, and landing engineering jobs.
            </p>
            <a 
              href="/dashboard" 
              className="inline-flex items-center gap-2 bg-canvas text-primary px-8 py-4 rounded-full text-base font-semibold hover:bg-canvas-soft transition-all hover:scale-[1.02] shadow-lg group"
            >
              Start Day 1 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-primary" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-canvas border-t border-hairline py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-8 w-auto text-primary" viewBox="0 0 280 88" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="0" width="88" height="88" rx="20" fill="currentColor"/>
                  <path d="M20 32 C30 26 38 26 44 32 L44 60 C38 54 30 54 20 60 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
                  <path d="M68 32 C58 26 50 26 44 32 L44 60 C50 56 58 54 68 60 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
                  <path d="M56 20 L64 20 L64 40 L60 36 L56 40 Z" fill="#ffffff"/>
                  <text x="106" y="42" font-family="sans-serif" font-size="28" font-weight="600" fill="currentColor">ABTalks</text>
                  <text x="107" y="62" font-family="sans-serif" font-size="13" fill="#64748B">60-Day Challenge</text>
                </svg>
              </div>
              <p className="text-xs text-mute leading-relaxed max-w-xs">
                A highly structured 60-day programming challenge for ambitious web developers and software engineers.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Challenge</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="#tracks" className="text-xs text-body hover:text-primary transition-colors">Tracks</a></li>
                <li><a href="#how" className="text-xs text-body hover:text-primary transition-colors">How it works</a></li>
                <li><a href="#preview" className="text-xs text-body hover:text-primary transition-colors">Progress Preview</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Community</h4>
              <ul className="flex flex-col gap-2.5">
                <li><a href="https://github.com" className="text-xs text-body hover:text-primary transition-colors flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</a></li>
                <li><a href="https://linkedin.com" className="text-xs text-body hover:text-primary transition-colors flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a></li>
                <li><a href="/dashboard" className="text-xs text-body hover:text-primary transition-colors">Student Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Contact</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-body">
                <li>Email: support@abtalks.com</li>
                <li>About: abtalks.com/about</li>
                <li>Copyright © 2026 ABTalks.</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-hairline pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-mute font-mono">Designed for premium engineering outcomes.</span>
            <span className="text-xs text-mute">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
