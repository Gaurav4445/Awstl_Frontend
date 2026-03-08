'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from './HomeMaintenanceLog';

interface CalendarViewProps {
  tasks: Task[];
  isDarkMode: boolean;
}

const COLORS = {
  primary: '#0f766e',
  accent: '#059669',
  secondary: '#f3f4f6',
  textDark: '#111827',
  textLight: '#6b7280',
  border: '#e5e7eb',
  background: '#ffffff',
  lightBg: '#f9fafb',
};

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, isDarkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((t) => {
      const taskDate = new Date(t.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
      style={{
        background: COLORS.background,
        borderRadius: '20px',
        border: `1px solid ${COLORS.border}`,
        padding: 'clamp(28px, 5vw, 36px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <motion.button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: `0 4px 12px ${COLORS.primary}20`,
          }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <h2
          style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '700',
            color: COLORS.textDark,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <motion.button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            boxShadow: `0 4px 12px ${COLORS.primary}20`,
          }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Weekdays */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontWeight: '700',
              color: COLORS.textLight,
              fontSize: '12px',
              padding: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '12px',
        }}
      >
        {days.map((date, idx) => {
          const tasksForDate = date ? getTasksForDate(date) : [];
          const isToday =
            date && new Date().toDateString() === date.toDateString();

          return (
            <motion.div
              key={idx}
              whileHover={date ? { scale: 1.05 } : {}}
              style={{
                background: date
                  ? isToday
                    ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`
                    : COLORS.lightBg
                  : 'transparent',
                borderRadius: '12px',
                padding: '12px',
                minHeight: '100px',
                border: isToday ? 'none' : `1px solid ${COLORS.border}`,
                cursor: date ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: isToday ? `0 8px 16px ${COLORS.primary}25` : 'none',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: isToday ? 'white' : COLORS.textDark,
                  margin: 0,
                }}
              >
                {date ? date.getDate() : ''}
              </p>

              {tasksForDate.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  {tasksForDate.slice(0, 2).map((task) => (
                    <motion.div
                      key={task.id}
                      style={{
                        background: isToday
                          ? 'rgba(255, 255, 255, 0.2)'
                          : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={task.name}
                    >
                      {task.name}
                    </motion.div>
                  ))}
                  {tasksForDate.length > 2 && (
                    <p
                      style={{
                        fontSize: '10px',
                        color: isToday ? 'rgba(255, 255, 255, 0.7)' : COLORS.textLight,
                        margin: 0,
                      }}
                    >
                      +{tasksForDate.length - 2} more
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CalendarView;