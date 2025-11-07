// src/components/Calendar.jsx
import React, { useMemo, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import DayCell from './DayCell';
import events from '../data/events.json';

function getMonthGrid(current) {
  const start = startOfWeek(startOfMonth(current), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(current), { weekStartsOn: 0 });

  const grid = [];
  let cursor = start;
  while (cursor <= end) {
    grid.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }
  return grid;
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const grid = useMemo(() => getMonthGrid(currentMonth), [currentMonth]);

  // Map events by ISO date (yyyy-MM-dd)
  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach(ev => {
      const key = ev.date;
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    // sort events by startTime
    Object.keys(map).forEach(k => {
      map[k].sort((a,b) => a.startTime.localeCompare(b.startTime));
    });
    return map;
  }, []);

  function prevMonth() { setCurrentMonth(subMonths(currentMonth, 1)); }
  function nextMonth() { setCurrentMonth(addMonths(currentMonth, 1)); }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</div>
        </div>
        <div className="space-x-2">
          <button onClick={prevMonth} className="px-3 py-1 rounded border">Prev</button>
          <button onClick={nextMonth} className="px-3 py-1 rounded border">Next</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-gray-600 font-semibold">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2">
        {grid.map((day, idx) => {
          const iso = format(day, 'yyyy-MM-dd');
          const list = eventsByDate[iso] || [];
          const isToday = isSameDay(day, new Date());
          const inMonth = isSameMonth(day, currentMonth);

          return (
            <div key={idx} className={`${inMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}`}>
              <DayCell day={day} isToday={isToday} events={list} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
