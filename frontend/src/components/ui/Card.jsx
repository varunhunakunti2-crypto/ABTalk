import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-canvas border border-hairline p-6 rounded-xl shadow-sm flex flex-col gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
