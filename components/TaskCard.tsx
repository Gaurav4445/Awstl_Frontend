'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Task } from './HomeMaintenanceLog';
import { Calendar, Clock, AlertCircle, Check, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isSelected: boolean;
  onSelect: (task: Task) => void;
  onDelete: (id: number) => void;
  isDarkMode: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isSelected,
  onSelect,
  onDelete,
  isDarkMode,
}) => {
  const calculateDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysUntilDue = calculateDaysUntilDue(task.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

  const getPriorityGradient = (priority: string) => {
    const gradients: Record<string, string> = {
      critical: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      high: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      medium: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      low: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    };
    return gradients[priority] || gradients.medium;
  };

  const cardBg = isDarkMode ? '#334155' : 'white';
  const cardBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';

  return (
    <motion.div
      onClick={() => onSelect(task)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: isSelected
          ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
          : `linear-gradient(135deg, ${cardBg} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
        border: isSelected ? '2px solid white' : `2px solid ${cardBorder}`,
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isSelected
          ? '0 20px 40px rgba(16, 185, 129, 0.3)'
          : '0 10px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Priority Bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '4px',
          height: '100%',
          background: getPriorityGradient(task.priority),
          borderRadius: '16px 0 0 16px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px',
        }}>
          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: isSelected ? 'white' : textColor,
                margin: '0 0 4px 0',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.name}
            </h4>
            <p
              style={{
                fontSize: '12px',
                color: isSelected ? 'rgba(255,255,255,0.7)' : secondaryText,
                margin: 0,
              }}
            >
              {task.room} • {task.category}
            </p>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8 }}
            style={{
              background: isSelected ? 'rgba(255,255,255,0.2)' : '#fee2e2',
              color: isSelected ? 'white' : '#991b1b',
              border: 'none',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash2 size={14} />
          </motion.button>
        </div>

        {/* Meta Info */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: isSelected ? 'rgba(255,255,255,0.8)' : secondaryText,
              background: isSelected ? 'rgba(255,255,255,0.1)' : (isDarkMode ? '#1e293b' : '#f8fafc'),
              padding: '4px 8px',
              borderRadius: '6px',
            }}
          >
            <Calendar size={12} />
            {task.lastCompleted}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              color: isOverdue
                ? '#ef4444'
                : isDueSoon
                ? '#f59e0b'
                : '#10b981',
              background: isOverdue
                ? (isDarkMode ? '#7f1d1d' : '#fee2e2')
                : isDueSoon
                ? (isDarkMode ? '#3a2f1a' : '#fef3c7')
                : (isDarkMode ? '#1f3a2a' : '#dcfce7'),
              padding: '4px 8px',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          >
            {isOverdue ? <AlertCircle size={12} /> : <Clock size={12} />}
            {isOverdue
              ? `${Math.abs(daysUntilDue)}d overdue`
              : `${daysUntilDue}d left`}
          </div>
        </div>

        {/* Priority Badge */}
        <motion.div
          style={{
            display: 'inline-block',
            background: getPriorityGradient(task.priority),
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
          whileHover={{ scale: 1.1 }}
        >
          {task.priority}
        </motion.div>

        {/* Cost Badge */}
        {task.cost > 0 && (
          <div
            style={{
              display: 'inline-block',
              marginLeft: '8px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
            }}
          >
            ${task.cost}
          </div>
        )}
      </div>

      {/* Completion Indicator */}
      {task.completed && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#10b981',
            color: 'white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          <Check size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;