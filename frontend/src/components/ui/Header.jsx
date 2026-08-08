import React from 'react';

export default function Header({ title, subtitle, rightElement, className = '' }) {
  return (
    <header className={`flex items-center justify-between border-b border-hairline pb-4 ${className}`}>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-black text-primary leading-tight uppercase tracking-wider font-mono">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[10px] text-mute font-bold uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </header>
  );
}
