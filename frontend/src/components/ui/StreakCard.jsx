import React from 'react';
import Card from './Card';

export default function StreakCard({ streak, lastSevenDays = [] }) {
  const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl select-none">🔥</span>
        <div className="flex flex-col">
          <span className="text-xl font-black text-primary font-mono">{streak} Day Streak</span>
          <span className="text-[10px] text-mute font-bold uppercase tracking-wider">Keep up the consistency</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-canvas-soft-2 p-3 rounded-lg border border-hairline mt-1">
        {lastSevenDays.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-bold text-mute">{weekdayNames[index]}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
              item.completed 
                ? 'bg-success/10 border-success/30 text-success' 
                : item.missed 
                ? 'bg-error/10 border-error/20 text-error'
                : 'bg-canvas border-hairline text-mute'
            }`}>
              {item.completed ? '✓' : item.missed ? '×' : '•'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
