import React from 'react';
import { Home, Target, User } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home, link: '/' },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-canvas border-t border-hairline py-2 px-6 flex justify-around items-center md:hidden shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        const handleClick = (e) => {
          if (item.link) {
            e.preventDefault();
            window.location.href = item.link;
          } else {
            onTabChange(item.id);
          }
        };

        return (
          <a
            key={item.id}
            href={item.link || '#'}
            onClick={handleClick}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
              isActive ? 'text-accent font-bold' : 'text-mute hover:text-primary'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] tracking-wide uppercase font-mono">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
