import React from 'react';

export default function ProgressBar({ value, max = 100, className = '', ...props }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full bg-canvas-soft-2 border border-hairline h-3 rounded-full overflow-hidden ${className}`} {...props}>
      <div
        className="bg-accent h-full transition-all duration-300 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
