import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong', description = "We couldn't load your challenge.", onRetry, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-canvas border border-hairline rounded-xl shadow-sm ${className}`}>
      <div className="w-12 h-12 bg-error/10 border border-error/20 rounded-full flex items-center justify-center text-error mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-black text-primary uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-mute mt-1 max-w-xs">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-canvas px-4 py-2.5 rounded font-bold text-xs hover:bg-primary/95 transition-all shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      )}
    </div>
  );
}
