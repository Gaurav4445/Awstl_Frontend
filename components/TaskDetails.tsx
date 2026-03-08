'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Check, Phone, Mail, Calendar, Save, AlertCircle } from 'lucide-react';
import { Task } from './HomeMaintenanceLog';

interface TaskDetailsProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onClose: () => void;
  categories: string[];
  rooms: string[];
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
      lastCompleted: !task.completed
        ? new Date().toISOString().split('T')[0]
        : task.lastCompleted,
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

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={SPRING}
      style={{
        background: COLORS.background,
        borderRadius: '20px',
        padding: 'clamp(28px, 5vw, 36px)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${COLORS.border}`,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '28px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: '700',
              color: COLORS.textDark,
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px',
            }}
          >
            {editData.name}
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: COLORS.textLight,
              margin: 0,
            }}
          >
            {editData.room} • {editData.category}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {!isEditing && (
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: COLORS.lightBg,
                color: COLORS.primary,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              <Edit2 size={14} />
              Edit
            </motion.button>
          )}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: COLORS.lightBg,
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: COLORS.textDark,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>

      {isEditing ? (
        // Edit Mode
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Notes */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Notes
            </label>
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                fontSize: '14px',
                minHeight: '100px',
                fontFamily: '"Inter", sans-serif',
                boxSizing: 'border-box',
                background: COLORS.background,
                color: COLORS.textDark,
              }}
            />
          </div>

          {/* Cost & Priority */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Cost
              </label>
              <input
                type="number"
                value={editData.cost}
                onChange={(e) =>
                  setEditData({ ...editData, cost: parseFloat(e.target.value) })
                }
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Priority
              </label>
              <select
                value={editData.priority}
                onChange={(e) =>
                  setEditData({ ...editData, priority: e.target.value as any })
                }
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Add Photos
            </label>
            <div
              style={{
                position: 'relative',
                border: `2px dashed ${COLORS.border}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: COLORS.lightBg,
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddPhoto}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
              <p
                style={{
                  fontSize: '13px',
                  color: COLORS.textDark,
                  margin: 0,
                }}
              >
                Click to add photos
              </p>
            </div>
          </div>

          {/* Photos */}
          {editData.photos.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '12px',
              }}
            >
              {editData.photos.map((photo, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <img
                    src={photo}
                    alt={`photo-${idx}`}
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <motion.button
                    onClick={() => removePhoto(idx)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >
                    <X size={12} />
                  </motion.button>
                </div>
              ))}
            </div>
          )}

          {/* Save/Cancel Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <motion.button
              onClick={handleSaveEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                color: 'white',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Save size={16} />
              Save Changes
            </motion.button>
            <motion.button
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: COLORS.lightBg,
                color: COLORS.textDark,
                padding: '12px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`,
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        // View Mode
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Status Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <div
              style={{
                background: isOverdue
                  ? '#fee2e2'
                  : isDueSoon
                  ? '#fef3c7'
                  : '#d1fae5',
                padding: '16px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Status
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: isOverdue
                    ? '#991b1b'
                    : isDueSoon
                    ? '#92400e'
                    : COLORS.accent,
                  margin: 0,
                }}
              >
                {isOverdue
                  ? `${Math.abs(daysUntilDue)}d Overdue`
                  : isDueSoon
                  ? `${daysUntilDue}d Due`
                  : 'On Track'}
              </p>
            </div>

            <div
              style={{
                background: `${COLORS.primary}10`,
                padding: '16px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Priority
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: COLORS.primary,
                  margin: 0,
                  textTransform: 'capitalize',
                }}
              >
                {editData.priority}
              </p>
            </div>
          </div>

          {/* Complete Button */}
          <motion.button
            onClick={handleCompleteTask}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: task.completed
                ? '#fee2e2'
                : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              color: task.completed ? '#991b1b' : 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: task.completed ? 'none' : `0 8px 16px ${COLORS.primary}25`,
            }}
          >
            <Check size={18} />
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </motion.button>

          {/* Details Sections */}
          {editData.notes && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.textLight,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Notes
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.textDark,
                  margin: 0,
                  lineHeight: '1.6',
                }}
              >
                {editData.notes}
              </p>
            </div>
          )}

          {editData.cost > 0 && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Cost
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: COLORS.primary,
                  margin: 0,
                }}
              >
                ${editData.cost.toFixed(2)}
              </p>
            </div>
          )}

          {/* Photos */}
          {editData.photos.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.textLight,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Photos ({editData.photos.length})
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '12px',
                }}
              >
                {editData.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`task-${idx}`}
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

          {/* Contractor */}
          {editData.contractor?.name && (
            <div
              style={{
                background: COLORS.lightBg,
                padding: '16px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: COLORS.primary,
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Contractor
              </p>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  margin: '0 0 8px 0',
                }}
              >
                {editData.contractor.name}
              </p>
              {editData.contractor.phone && (
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    margin: '6px 0',
                  }}
                >
                  <Phone size={14} />
                  {editData.contractor.phone}
                </p>
              )}
              {editData.contractor.email && (
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    margin: '6px 0',
                  }}
                >
                  <Mail size={14} />
                  {editData.contractor.email}
                </p>
              )}
            </div>
          )}

          {/* Warranty */}
          {editData.warranty?.hasWarranty && (
            <div
              style={{
                background: '#fef3c7',
                padding: '16px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#92400e',
                  margin: '0 0 12px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Warranty
              </p>
              {editData.warranty.provider && (
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: COLORS.textDark,
                    margin: '0 0 8px 0',
                  }}
                >
                  {editData.warranty.provider}
                </p>
              )}
              {editData.warranty.expiryDate && (
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    margin: 0,
                  }}
                >
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