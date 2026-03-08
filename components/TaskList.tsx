'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Clock, AlertCircle, Check } from 'lucide-react';
import { Task } from './HomeMaintenanceLog';

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onSelectTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  isDarkMode: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTask,
  onSelectTask,
  onDeleteTask,
  isDarkMode,
}) => {
  const calculateDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusIcon = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return { icon: AlertCircle, color: '#dc2626' };
    if (daysUntilDue <= 7) return { icon: Clock, color: '#ea580c' };
    return { icon: Check, color: '#16a34a' };
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: isDarkMode ? '#7f1d1d' : '#fee2e2',
      high: isDarkMode ? '#7c2d12' : '#ffedd5',
      medium: isDarkMode ? '#1e3a8a' : '#dbeafe',
      low: isDarkMode ? '#1b4332' : '#dcfce7',
    };
    return colors[priority] || (isDarkMode ? '#1e3a8a' : '#dbeafe');
  };

  const cardBg = isDarkMode ? '#334155' : 'white';
  const cardBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const hoverBg = isDarkMode ? '#475569' : '#f8fafc';

  if (tasks.length === 0) {
    return (
      <div style={{
        background: cardBg,
        borderRadius: '12px',
        padding: '32px 24px',
        textAlign: 'center',
        border: `2px dashed ${cardBorder}`,
      }}>
        <p style={{ color: secondaryText, fontSize: '16px' }}>No tasks found</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => {
          const daysUntilDue = calculateDaysUntilDue(task.dueDate);
          const status = getStatusIcon(daysUntilDue);
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
              onClick={() => onSelectTask(task)}
              style={{
                background: selectedTask?.id === task.id ? (isDarkMode ? '#475569' : '#f0fdf4') : cardBg,
                border: selectedTask?.id === task.id ? '2px solid #10b981' : `1px solid ${cardBorder}`,
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (selectedTask?.id !== task.id) {
                  (e.currentTarget as HTMLElement).style.background = hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTask?.id !== task.id) {
                  (e.currentTarget as HTMLElement).style.background = cardBg;
                }
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: textColor,
                  }}>
                    {task.name}
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: secondaryText,
                    marginBottom: '8px',
                  }}>
                    {task.room} • {task.category}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '12px',
                    color: secondaryText,
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <Calendar size={14} />
                      {task.lastCompleted}
                    </span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: status.color,
                      fontWeight: '600',
                    }}>
                      <StatusIcon size={14} />
                      {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d overdue` : `${daysUntilDue}d left`}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{
                    background: getPriorityColor(task.priority),
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  }}>
                    {task.priority}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTask(task.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      padding: '4px',
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;