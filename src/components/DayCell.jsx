// src/components/DayCell.jsx
import React from 'react';
import EventPill from './EventPill';

export default function DayCell({ day, isToday, events = [] }) {
  // Show up to 2 events then a +N
  const MAX_VISIBLE = 2;
  const visible = events.slice(0, MAX_VISIBLE);
  const remaining = events.length - visible.length;

  return (
    <div className={`p-2 h-28 min-w-0 border border-transparent hover:bg-gray-50 ${isToday ? 'ring-2 ring-indigo-300 rounded-md' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium">{day.getDate()}</div>
      </div>

      <div className="mt-2 space-y-1">
        {visible.map(ev => (
          <EventPill key={ev.id} event={ev} />
        ))}

        {remaining > 0 && (
          <div className="text-xs text-gray-500">+{remaining} more</div>
        )}
      </div>
    </div>
  );
}
