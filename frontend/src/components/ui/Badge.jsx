import React from 'react';

export default function Badge({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono';
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-canvas-soft-2 text-mute border border-hairline',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    danger: 'bg-error/10 text-error border border-error/20'
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
