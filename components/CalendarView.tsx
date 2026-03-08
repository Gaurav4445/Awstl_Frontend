'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from './HomeMaintenanceLog';

interface CalendarViewProps {
  tasks: Task[];
  isDarkMode: boolean;
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks, isDarkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(t => {
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

  const bgColor = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const borderColor = isDarkMode ? '#475569' : '#e2e8f0';
  const cellBg = isDarkMode ? '#1e293b' : '#f8fafc';

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: `linear-gradient(135deg, ${isDarkMode ? '#334155' : '#ffffff'} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
        borderRadius: '16px',
        border: `2px solid ${borderColor}`,
        padding: '32px',
        boxShadow: isDarkMode ? '0 20px 25px rgba(0, 0, 0, 0.3)' : '0 20px 25px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <motion.button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: textColor,
          fontFamily: '"Playfair Display", serif',
        }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <motion.button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Weekdays */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '12px',
        marginBottom: '16px',
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontWeight: '600',
            color: isDarkMode ? '#cbd5e1' : '#64748b',
            fontSize: '12px',
            padding: '12px',
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '12px',
      }}>
        {days.map((date, idx) => {
          const tasksForDate = date ? getTasksForDate(date) : [];
          const isToday = date && new Date().toDateString() === date.toDateString();

          return (
            <motion.div
              key={idx}
              whileHover={date ? { scale: 1.05 } : {}}
              style={{
                background: date ? (isToday ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' : cellBg) : 'transparent',
                borderRadius: '12px',
                padding: '12px',
                minHeight: '100px',
                border: isToday ? '2px solid #10b981' : `1px solid ${borderColor}`,
                cursor: date ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                color: isToday ? 'white' : textColor,
              }}>
                {date ? date.getDate() : ''}
              </p>

              {tasksForDate.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {tasksForDate.slice(0, 2).map(task => (
                    <motion.div
                      key={task.id}
                      style={{
                        background: isToday ? 'rgba(255, 255, 255, 0.2)' : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '500',
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
                    <p style={{
                      fontSize: '10px',
                      color: isToday ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
                    }}>
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