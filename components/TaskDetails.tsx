'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Edit2, Check, Phone, Mail, Calendar } from 'lucide-react';
import { Task } from './HomeMaintenanceLog';

interface TaskDetailsProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onClose: () => void;
  categories: string[];
  rooms: string[];
  isDarkMode: boolean;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onUpdate,
  onClose,
  categories,
  rooms,
  isDarkMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const calculateDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysUntilDue = calculateDaysUntilDue(task.dueDate);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

  const handleCompleteTask = () => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
      lastCompleted: !task.completed ? new Date().toISOString().split('T')[0] : task.lastCompleted,
    };
    onUpdate(updatedTask);
  };

  const handleSaveEdit = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setEditData({
            ...editData,
            photos: [...editData.photos, base64],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setEditData({
      ...editData,
      photos: editData.photos.filter((_, i) => i !== index),
    });
  };

  const cardBg = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const inputBg = isDarkMode ? '#1e293b' : 'white';
  const inputBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const labelBg = isDarkMode ? '#475569' : '#f8fafc';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        background: cardBg,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${inputBorder}`,
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: textColor,
            marginBottom: '4px',
          }}>
            {editData.name}
          </h2>
          <p style={{ fontSize: '12px', color: secondaryText }}>
            {editData.room} • {editData.category}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isEditing && (
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              <Edit2 size={14} />
              Edit
            </motion.button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: textColor,
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <div style={{
          background: isOverdue ? (isDarkMode ? '#7f1d1d' : '#fee2e2') : isDueSoon ? (isDarkMode ? '#7c2d12' : '#ffedd5') : (isDarkMode ? '#1b4332' : '#dcfce7'),
          padding: '12px',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '12px', color: secondaryText, marginBottom: '4px' }}>Status</p>
          <p style={{
            fontSize: '16px',
            fontWeight: '600',
            color: isOverdue ? '#fca5a5' : isDueSoon ? '#fdba74' : '#86efac',
          }}>
            {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : isDueSoon ? `${daysUntilDue} days until due` : `On track`}
          </p>
        </div>
        <div style={{
          background: isDarkMode ? '#1e3a5f' : '#dbeafe',
          padding: '12px',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '12px', color: secondaryText, marginBottom: '4px' }}>Priority</p>
          <p style={{ fontSize: '16px', fontWeight: '600', color: isDarkMode ? '#93c5fd' : '#1e40af', textTransform: 'capitalize' }}>
            {editData.priority}
          </p>
        </div>
      </div>

      <motion.button
        onClick={handleCompleteTask}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          background: task.completed ? '#ef4444' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <Check size={18} />
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </motion.button>

      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: textColor }}>Notes</label>
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '13px',
                minHeight: '80px',
                fontFamily: '"Inter", sans-serif',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: textColor }}>Cost ($)</label>
              <input
                type="number"
                value={editData.cost}
                onChange={(e) => setEditData({ ...editData, cost: parseFloat(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  background: inputBg,
                  color: textColor,
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: textColor }}>Priority</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: inputBg,
                  color: textColor,
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: textColor }}>Add Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleAddPhoto}
              style={{
                padding: '8px',
                border: `2px dashed ${inputBorder}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                width: '100%',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <motion.button
              onClick={handleSaveEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Save Changes
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                background: inputBorder,
                color: textColor,
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {editData.notes && (
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: secondaryText, marginBottom: '4px' }}>Notes</p>
              <p style={{ fontSize: '14px', color: textColor, lineHeight: '1.5' }}>{editData.notes}</p>
            </div>
          )}

          {editData.cost > 0 && (
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: secondaryText, marginBottom: '4px' }}>Cost</p>
              <p style={{ fontSize: '18px', fontWeight: '600', color: '#10b981' }}>${editData.cost.toFixed(2)}</p>
            </div>
          )}

          {editData.photos.length > 0 && (
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: secondaryText, marginBottom: '8px' }}>Photos ({editData.photos.length})</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '8px',
              }}>
                {editData.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt="task"
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    onClick={() => window.open(photo, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          {editData.contractor?.name && (
            <div style={{
              background: isDarkMode ? '#1b4332' : '#f0fdf4',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#22c55e' : '#bbf7d0'}`,
            }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: isDarkMode ? '#86efac' : '#15803d', marginBottom: '8px' }}>Contractor</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: textColor, marginBottom: '4px' }}>
                {editData.contractor.name}
              </p>
              {editData.contractor.phone && (
                <p style={{ fontSize: '13px', color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} />
                  {editData.contractor.phone}
                </p>
              )}
              {editData.contractor.email && (
                <p style={{ fontSize: '13px', color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} />
                  {editData.contractor.email}
                </p>
              )}
            </div>
          )}

          {editData.warranty?.hasWarranty && (
            <div style={{
              background: isDarkMode ? '#3a2f1a' : '#fef3c7',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${isDarkMode ? '#f59e0b' : '#fde68a'}`,
            }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: isDarkMode ? '#fcd34d' : '#92400e', marginBottom: '8px' }}>Warranty</p>
              {editData.warranty.provider && (
                <p style={{ fontSize: '14px', color: textColor, fontWeight: '500', marginBottom: '4px' }}>
                  {editData.warranty.provider}
                </p>
              )}
              {editData.warranty.expiryDate && (
                <p style={{ fontSize: '13px', color: secondaryText, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  Expires: {editData.warranty.expiryDate}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TaskDetails;