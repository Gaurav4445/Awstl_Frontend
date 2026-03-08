'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from './HomeMaintenanceLog';
import { Trash2, Calendar, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onSelectTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
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

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: COLORS.lightBg,
          borderRadius: '16px',
          padding: 'clamp(40px, 8vw, 60px)',
          textAlign: 'center',
          border: `1px dashed ${COLORS.border}`,
        }}
      >
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: COLORS.textLight,
            margin: 0,
          }}
        >
          No tasks found. Create one to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(12px, 2vw, 16px)',
      }}
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, idx) => {
          const daysUntilDue = calculateDaysUntilDue(task.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: idx * 0.05 }}
              layout
            >
              <motion.div
                onClick={() => onSelectTask(task)}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  background:
                    selectedTask?.id === task.id ? COLORS.lightBg : COLORS.background,
                  border:
                    selectedTask?.id === task.id
                      ? `2px solid ${COLORS.primary}`
                      : `1px solid ${COLORS.border}`,
                  borderRadius: '16px',
                  padding: 'clamp(16px, 3vw, 20px)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow:
                    selectedTask?.id === task.id
                      ? `0 8px 24px ${COLORS.primary}15`
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Priority Bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '4px',
                    height: '100%',
                    background:
                      task.priority === 'critical'
                        ? '#ef4444'
                        : task.priority === 'high'
                        ? '#f59e0b'
                        : task.priority === 'medium'
                        ? COLORS.primary
                        : COLORS.accent,
                    borderRadius: '16px 0 0 16px',
                  }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '16px',
                    alignItems: 'flex-start',
                    paddingLeft: '12px',
                  }}
                >
                  {/* Content */}
                  <div>
                    <h4
                      style={{
                        fontSize: 'clamp(14px, 2vw, 16px)',
                        fontWeight: '700',
                        color: COLORS.textDark,
                        margin: '0 0 8px 0',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        opacity: task.completed ? 0.6 : 1,
                      }}
                    >
                      {task.name}
                    </h4>
                    <p
                      style={{
                        fontSize: '13px',
                        color: COLORS.textLight,
                        margin: '0 0 12px 0',
                      }}
                    >
                      {task.room} • {task.category}
                    </p>

                    {/* Meta Info */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: COLORS.textLight,
                          background: COLORS.lightBg,
                          padding: '4px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        <Calendar size={14} />
                        {task.lastCompleted}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: isOverdue
                            ? '#ef4444'
                            : isDueSoon
                            ? '#f59e0b'
                            : COLORS.accent,
                          background: isOverdue
                            ? '#fee2e2'
                            : isDueSoon
                            ? '#fef3c7'
                            : '#d1fae5',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontWeight: '600',
                        }}
                      >
                        {isOverdue ? (
                          <AlertCircle size={14} />
                        ) : (
                          <Clock size={14} />
                        )}
                        {isOverdue
                          ? `${Math.abs(daysUntilDue)}d overdue`
                          : `${daysUntilDue}d left`}
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      alignItems: 'flex-end',
                    }}
                  >
                    {/* Priority Badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        background:
                          task.priority === 'critical'
                            ? '#fee2e2'
                            : task.priority === 'high'
                            ? '#fef3c7'
                            : task.priority === 'medium'
                            ? `${COLORS.primary}15`
                            : `${COLORS.accent}15`,
                        color:
                          task.priority === 'critical'
                            ? '#991b1b'
                            : task.priority === 'high'
                            ? '#92400e'
                            : task.priority === 'medium'
                            ? COLORS.primary
                            : COLORS.accent,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {task.priority}
                    </span>

                    {/* Delete Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: '#fee2e2',
                        color: '#991b1b',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Completion Indicator */}
                {task.completed && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: COLORS.accent,
                      color: 'white',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                    }}
                  >
                    <CheckCircle2 size={16} />
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;