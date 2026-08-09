import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, Clock, Award, AlertCircle, RefreshCw, CheckCircle, Flame } from 'lucide-react';
import ErrorState from './ui/ErrorState';

export default function ChallengeDay({ dayNumber }) {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkedRequirements, setCheckedRequirements] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [formData, setFormData] = useState({
    githubRepo: '',
    githubCommit: '',
    linkedinPost: '',
    liveUrl: ''
  });
  const [errors, setErrors] = useState({
    githubRepo: '',
    githubCommit: '',
    linkedinPost: '',
    liveUrl: ''
  });

  const fetchChallengeData = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`/api/challenges/${dayNumber}`);
      setChallenge(response.data);
    } catch (err) {
      console.error("Error loading challenge day:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    let errMsg = '';
    if (!value) {
      if (field === 'githubRepo') errMsg = '⚠️ Add your GitHub repository';
      if (field === 'githubCommit') errMsg = '⚠️ Add your GitHub commit';
      if (field === 'linkedinPost') errMsg = '⚠️ Add your LinkedIn post';
      if (field === 'liveUrl') errMsg = '⚠️ Add your live deployment';
    } else {
      try {
        new URL(value);
        if (field === 'githubRepo' && !value.includes('github.com')) {
          errMsg = '⚠️ Please enter a valid URL';
        } else if (field === 'githubCommit' && (!value.includes('github.com') || !value.includes('/commit/'))) {
          errMsg = '⚠️ Please enter a valid URL';
        } else if (field === 'linkedinPost' && !value.includes('linkedin.com')) {
          errMsg = '⚠️ Please enter a valid URL';
        }
      } catch (_) {
        errMsg = '⚠️ Please enter a valid URL';
      }
    }
    
    setErrors(prev => ({ ...prev, [field]: errMsg }));
  };

  const getValidFieldsCount = () => {
    let count = 0;
    if (formData.githubRepo && !errors.githubRepo) count++;
    if (formData.githubCommit && !errors.githubCommit) count++;
    if (formData.linkedinPost && !errors.linkedinPost) count++;
    if (formData.liveUrl && !errors.liveUrl) count++;
    return count;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (getValidFieldsCount() !== 4) return;
    
    try {
      setSubmitting(true);
      const res = await axios.post('/api/submissions', {
        day: dayNumber,
        githubRepoUrl: formData.githubRepo,
        githubCommitUrl: formData.githubCommit,
        linkedinPostUrl: formData.linkedinPost,
        liveUrl: formData.liveUrl
      });
      
      setSubmissionResult(res.data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong during submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchChallengeData();
  }, [dayNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas-soft flex flex-col p-6">
        <div className="max-w-md mx-auto w-full flex flex-col gap-6">
          <div className="h-10 bg-canvas-soft-2 animate-pulse rounded border border-hairline w-24" />
          <div className="h-40 bg-canvas-soft-2 animate-pulse rounded-lg border border-hairline" />
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-canvas-soft flex items-center justify-center p-6">
        <ErrorState onRetry={fetchChallengeData} />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-canvas-soft flex items-center justify-center p-6 animate-in zoom-in duration-200">
        <div className="bg-canvas border border-hairline p-8 rounded-xl shadow-lg max-w-sm w-full text-center flex flex-col gap-6">
          <div className="w-16 h-16 rounded-full bg-success/10 text-success border border-success/30 flex items-center justify-center font-bold text-3xl mx-auto shadow-sm">
            ✓
          </div>
          <div>
            <h2 className="text-2xl font-black text-primary leading-tight uppercase font-mono">
              DAY {challenge.day} COMPLETE
            </h2>
            <p className="text-xs text-mute mt-1 font-semibold tracking-wide">
              You shipped another project.
            </p>
          </div>
          
          <div className="border-t border-b border-hairline py-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-canvas-soft p-3 rounded border border-hairline flex flex-col items-center">
              <span className="text-xl">🔥</span>
              <span className="text-xs font-bold text-primary mt-1">
                {submissionResult?.streak || 0} Day Streak
              </span>
            </div>
            <div className="bg-canvas-soft p-3 rounded border border-hairline flex flex-col items-center">
              <span className="text-xl">🚀</span>
              <span className="text-xs font-bold text-primary mt-1 font-mono">
                {submissionResult?.completedDays || 0} / 60 Complete
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <a 
              href="/dashboard"
              className="w-full inline-flex items-center justify-center bg-primary text-canvas px-4 py-3 rounded font-bold text-sm hover:bg-primary/95 hover:scale-[1.01] transition-all shadow"
            >
              View Dashboard
            </a>
            {challenge.day < 60 && (
              <a 
                href={`/day/${challenge.day + 1}`}
                className="text-xs font-extrabold text-link hover:underline transition-colors mt-1"
              >
                Next Challenge Day {challenge.day + 1} →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isValid = getValidFieldsCount() === 4;

  return (
    <div className="min-h-screen bg-canvas-soft font-sans flex flex-col pb-12 animate-in fade-in duration-200">
      <main className="max-w-md mx-auto w-full px-6 pt-6 flex-grow flex flex-col gap-6">
        
        {/* Day Header */}
        <header className="flex flex-col gap-4">
          <a 
            href="/dashboard" 
            className="inline-flex items-center gap-1 text-xs font-bold text-mute hover:text-primary transition-colors w-max"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </a>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
              DAY {challenge.day} / 60
            </span>
            <h1 className="text-2xl font-black text-primary leading-tight">
              {challenge.title}
            </h1>
            <div className="flex gap-3 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-canvas border border-hairline rounded text-[10px] font-mono text-body font-semibold tracking-wide shadow-sm">
                <Award className="w-3 h-3 text-link" /> {challenge.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-canvas border border-hairline rounded text-[10px] font-mono text-body font-semibold tracking-wide shadow-sm">
                <Clock className="w-3 h-3 text-mute" /> {challenge.estimatedTime}
              </span>
            </div>
          </div>
        </header>

        {/* Challenge Mission */}
        <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
            Mission
          </span>
          <p className="text-sm text-body leading-relaxed">
            {challenge.description}
          </p>
        </section>

        {/* Your Mission Requirements Checklist */}
        <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
            Your Mission
          </span>
          <div className="text-sm text-primary font-semibold">
            Build a responsive weather dashboard where users can:
          </div>
          <ul className="flex flex-col gap-2 pl-2">
            {challenge.requirements.map((req, idx) => (
              <li key={idx} className="text-xs text-body flex items-start gap-2.5 leading-relaxed">
                <span className="text-mute select-none">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements Checklist */}
        <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
              Requirements
            </span>
            <div className="text-xs text-mute font-medium">Check off items as you complete them:</div>
          </div>
          <div className="flex flex-col gap-2">
            {(challenge.day === 12 
              ? ["City search", "Temperature display", "Weather condition", "Humidity", "Error state", "Responsive design"]
              : challenge.requirements
            ).map((req, idx) => {
              const isChecked = !!checkedRequirements[req];
              return (
                <label 
                  key={idx} 
                  className={`flex items-start gap-3 p-3.5 rounded border border-hairline cursor-pointer select-none transition-all duration-150 ${
                    isChecked 
                      ? 'bg-success-soft/20 border-success/30 text-primary' 
                      : 'bg-canvas hover:bg-canvas-soft-2 border-hairline'
                  }`}
                >
                  <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      setCheckedRequirements(prev => ({
                        ...prev,
                        [req]: !prev[req]
                      }));
                    }}
                    className="mt-0.5 rounded border-hairline text-primary focus:ring-primary focus:ring-offset-canvas cursor-pointer"
                  />
                  <span className={`text-xs font-semibold leading-relaxed transition-all duration-150 ${isChecked ? 'line-through text-mute font-medium' : 'text-body'}`}>
                    {req}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Bonus Challenge */}
        {challenge.bonus && challenge.bonus.length > 0 && (
          <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3">
            <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
              Bonus
            </span>
            <ul className="flex flex-col gap-2.5">
              {challenge.bonus.map((item, idx) => (
                <li key={idx} className="text-xs text-body flex items-start gap-2.5 leading-relaxed">
                  <span className="text-warning text-sm select-none">⭐</span>
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Suggested Stack */}
        {challenge.suggestedTech && challenge.suggestedTech.length > 0 && (
          <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3">
            <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
              Suggested Stack
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {challenge.suggestedTech.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-canvas-soft border border-hairline rounded-full text-xs font-semibold text-primary shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Deliverables */}
        <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
            Your Deliverables
          </span>
          <ul className="flex flex-col gap-2.5">
            {[
              "Working project",
              "GitHub repository",
              "GitHub commit",
              "LinkedIn post",
              "Live deployment"
            ].map((del, idx) => (
              <li key={idx} className="text-xs text-body flex items-start gap-2.5 leading-relaxed">
                <span className="text-success font-bold select-none">✓</span>
                <span className="font-semibold">{del}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Submission Form */}
        <section className="bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-5">
          <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
            Submit Proof
          </span>
          
          <div className="flex flex-col gap-4">
            {/* GitHub Repository Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="githubRepo" className="text-xs font-bold text-primary">
                GitHub Repository
              </label>
              <input 
                id="githubRepo"
                type="text"
                placeholder="https://github.com/username/project"
                value={formData.githubRepo}
                onChange={(e) => handleInputChange('githubRepo', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded border text-xs bg-canvas text-primary focus:outline-none focus:ring-1 transition-all ${
                  errors.githubRepo 
                    ? 'border-error focus:border-error focus:ring-error' 
                    : 'border-hairline focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.githubRepo && (
                <span className="text-[10px] text-error font-semibold mt-1">
                  {errors.githubRepo}
                </span>
              )}
            </div>
            
            {/* GitHub Commit Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="githubCommit" className="text-xs font-bold text-primary">
                GitHub Commit
              </label>
              <input 
                id="githubCommit"
                type="text"
                placeholder="https://github.com/username/project/commit/sha"
                value={formData.githubCommit}
                onChange={(e) => handleInputChange('githubCommit', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded border text-xs bg-canvas text-primary focus:outline-none focus:ring-1 transition-all ${
                  errors.githubCommit 
                    ? 'border-error focus:border-error focus:ring-error' 
                    : 'border-hairline focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.githubCommit && (
                <span className="text-[10px] text-error font-semibold mt-1">
                  {errors.githubCommit}
                </span>
              )}
            </div>
            
            {/* LinkedIn Post Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="linkedinPost" className="text-xs font-bold text-primary">
                LinkedIn Post
              </label>
              <input 
                id="linkedinPost"
                type="text"
                placeholder="https://linkedin.com/posts/activity..."
                value={formData.linkedinPost}
                onChange={(e) => handleInputChange('linkedinPost', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded border text-xs bg-canvas text-primary focus:outline-none focus:ring-1 transition-all ${
                  errors.linkedinPost 
                    ? 'border-error focus:border-error focus:ring-error' 
                    : 'border-hairline focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.linkedinPost && (
                <span className="text-[10px] text-error font-semibold mt-1">
                  {errors.linkedinPost}
                </span>
              )}
            </div>
            
            {/* Live Deployment Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="liveUrl" className="text-xs font-bold text-primary">
                Live Deployment
              </label>
              <input 
                id="liveUrl"
                type="text"
                placeholder="https://myproject.vercel.app"
                value={formData.liveUrl}
                onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded border text-xs bg-canvas text-primary focus:outline-none focus:ring-1 transition-all ${
                  errors.liveUrl 
                    ? 'border-error focus:border-error focus:ring-error' 
                    : 'border-hairline focus:border-primary focus:ring-primary'
                }`}
              />
              {errors.liveUrl && (
                <span className="text-[10px] text-error font-semibold mt-1">
                  {errors.liveUrl}
                </span>
              )}
            </div>
            {/* Submission Progress Checklist */}
            <div className="bg-canvas-soft p-4 rounded-lg border border-hairline mt-2 flex flex-col gap-2.5">
              <span className="text-[10px] text-mute font-extrabold uppercase tracking-widest font-mono">
                Submission Progress ({getValidFieldsCount()}/4 completed)
              </span>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "GitHub repository", valid: formData.githubRepo && !errors.githubRepo },
                  { label: "GitHub commit", valid: formData.githubCommit && !errors.githubCommit },
                  { label: "LinkedIn post", valid: formData.linkedinPost && !errors.linkedinPost },
                  { label: "Live deployment", valid: formData.liveUrl && !errors.liveUrl }
                ].map((item, idx) => (
                  <li key={idx} className="text-xs flex items-center gap-2">
                    {item.valid ? (
                      <span className="text-success font-black">✓</span>
                    ) : (
                      <span className="text-mute font-mono select-none">○</span>
                    )}
                    <span className={item.valid ? 'text-primary font-semibold' : 'text-mute font-medium'}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={!isValid || submitting}
              className={`w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-bold text-sm transition-all shadow-md cursor-pointer ${
                isValid && !submitting
                  ? 'bg-primary text-canvas hover:bg-primary/95 hover:scale-[1.01]'
                  : 'bg-canvas-soft-2 text-mute border border-hairline cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Day {challenge.day} →
                </>
              )}
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
