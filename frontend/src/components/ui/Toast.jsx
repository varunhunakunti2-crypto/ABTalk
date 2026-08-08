import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    info: <Info className="w-4 h-4 text-accent" />,
    success: <CheckCircle className="w-4 h-4 text-success" />,
    error: <AlertCircle className="w-4 h-4 text-error" />
  };

  const bgColors = {
    info: 'bg-canvas border-accent/20',
    success: 'bg-canvas border-success/20',
    error: 'bg-canvas border-error/20'
  };

  return (
    <div className={`fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-bottom duration-200 ${bgColors[type]}`}>
      {icons[type]}
      <span className="text-xs font-bold text-primary">{message}</span>
      <button onClick={onClose} className="p-0.5 rounded hover:bg-canvas-soft-2 cursor-pointer transition-colors ml-2">
        <X className="w-3.5 h-3.5 text-mute" />
      </button>
    </div>
  );
}
