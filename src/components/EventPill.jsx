import React from 'react';

export default function EventPill({ event }) {
  return (
    <div
      className="text-xs truncate px-1 py-[2px] rounded-md"
      title={`${event.title} ${event.startTime} - ${event.endTime}`}
      style={{ background: event.color, color: '#fff' }}
    >
      {event.title}
    </div>
  );
}
