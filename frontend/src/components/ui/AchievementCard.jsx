import React from 'react';
import Card from './Card';

export default function AchievementCard({ title, description, icon, unlocked }) {
  return (
    <Card className={`flex items-start gap-4 p-5 ${unlocked ? 'opacity-100 bg-canvas' : 'opacity-50 bg-canvas-soft border-dashed'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm border transition-all ${
        unlocked ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-canvas border-hairline text-mute'
      }`}>
        {unlocked ? icon : '🔒'}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-black text-primary leading-tight uppercase tracking-wider">{title}</h4>
        <p className="text-[10px] text-mute leading-relaxed font-semibold">{description}</p>
      </div>
    </Card>
  );
}
