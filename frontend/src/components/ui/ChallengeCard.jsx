import React from 'react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { Clock } from 'lucide-react';

export default function ChallengeCard({ day, title, difficulty, estimatedTime, description, onStart }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-accent font-black tracking-widest uppercase font-mono">
            Today's Challenge • Day {day}
          </span>
          <h3 className="text-lg font-black text-primary leading-tight">
            {title}
          </h3>
        </div>
        <Badge variant={difficulty === 'Hard' ? 'danger' : difficulty === 'Medium' ? 'warning' : 'success'}>
          {difficulty}
        </Badge>
      </div>

      <p className="text-xs text-body leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between border-t border-hairline pt-4 mt-1">
        <div className="flex items-center gap-1.5 text-mute">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono">{estimatedTime}</span>
        </div>
        {onStart && (
          <Button onClick={onStart} className="px-4 py-2 text-xs">
            Start Challenge
          </Button>
        )}
      </div>
    </Card>
  );
}
