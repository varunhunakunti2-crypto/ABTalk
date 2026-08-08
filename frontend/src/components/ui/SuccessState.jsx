import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function SuccessState({ title = 'Action Successful', description, actionLabel, onAction, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-canvas border border-hairline rounded-xl shadow-sm ${className}`}>
      <div className="w-12 h-12 bg-success/10 border border-success/20 rounded-full flex items-center justify-center text-success mb-4">
        <CheckCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-black text-primary uppercase tracking-wider">{title}</h3>
      {description && <p className="text-xs text-mute mt-1 max-w-xs">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-canvas px-4 py-2.5 rounded font-bold text-xs hover:bg-primary/95 transition-all shadow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
