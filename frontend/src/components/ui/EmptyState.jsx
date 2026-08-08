import React from 'react';
import { Target } from 'lucide-react';

export default function EmptyState({ title = 'No items found', description = 'Try checking back later.', actionLabel, onAction, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-canvas border border-hairline border-dashed rounded-xl ${className}`}>
      <div className="w-12 h-12 bg-canvas-soft-2 border border-hairline rounded-full flex items-center justify-center text-mute mb-4">
        <Target className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-black text-primary uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-mute mt-1 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-primary text-canvas rounded text-xs font-bold hover:bg-primary/95 transition-all shadow"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
