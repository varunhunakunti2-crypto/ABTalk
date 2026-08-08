import React from 'react';

export default function Input({ label, error, id, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3.5 py-2.5 rounded border text-xs bg-canvas text-primary focus:outline-none focus:ring-1 transition-all ${
          error
            ? 'border-error focus:border-error focus:ring-error'
            : 'border-hairline focus:border-primary focus:ring-primary'
        }`}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-error font-semibold mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
