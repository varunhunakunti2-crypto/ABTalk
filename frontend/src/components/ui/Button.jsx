import React from 'react';

export default function Button({ children, onClick, disabled, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded font-bold text-sm transition-all duration-150 cursor-pointer select-none';
  const variants = {
    primary: 'bg-primary text-canvas hover:bg-primary/95 active:scale-95 shadow',
    secondary: 'bg-canvas-soft border border-hairline text-primary hover:bg-canvas-soft-2 active:scale-95 shadow-sm',
    accent: 'bg-accent text-canvas hover:bg-accent/90 active:scale-95 shadow',
    danger: 'bg-error text-canvas hover:bg-error/90 active:scale-95 shadow'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
