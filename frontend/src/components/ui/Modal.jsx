import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-canvas border border-hairline w-full max-w-md rounded-xl shadow-lg flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${className}`}>
        <div className="flex items-center justify-between p-5 border-b border-hairline">
          <h3 className="font-black text-primary text-base uppercase tracking-wider">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-canvas-soft-2 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-mute" />
          </button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
