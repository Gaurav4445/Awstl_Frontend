'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Check, Phone, Mail, Calendar, Save, AlertCircle, Upload, Trash2 } from 'lucide-react';
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
  const [editData, setEditData] = useState<Task>(task);

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
        borderRadius: '24px',
        padding: 'clamp(28px, 5vw, 40px)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
        border: `2px solid ${COLORS.accent}`,
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
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: `2px solid ${COLORS.border}`,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(20px, 4vw, 32px)',
              fontWeight: '800',
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: '700',
                boxShadow: `0 4px 12px ${COLORS.primary}20`,
              }}
            >
              <Edit2 size={16} />
              Edit All
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
        // EDIT MODE - Full form to edit everything
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Task Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Task Name
            </label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${COLORS.border}`,
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box',
                background: COLORS.lightBg,
                color: COLORS.textDark,
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category & Room */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Category
              </label>
              <select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Room
              </label>
              <select
                value={editData.room}
                onChange={(e) => setEditData({ ...editData, room: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              >
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Last Completed
              </label>
              <input
                type="date"
                value={editData.lastCompleted}
                onChange={(e) => setEditData({ ...editData, lastCompleted: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Due Date
              </label>
              <input
                type="date"
                value={editData.dueDate}
                onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
            </div>
          </div>

          {/* Priority & Frequency */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
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
                onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '8px',
                  color: COLORS.textDark,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Frequency (days)
              </label>
              <input
                type="number"
                value={editData.frequency}
                onChange={(e) => setEditData({ ...editData, frequency: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.lightBg,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
            </div>
          </div>

          {/* Cost */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Cost ($)
            </label>
            <input
              type="number"
              value={editData.cost}
              onChange={(e) => setEditData({ ...editData, cost: parseFloat(e.target.value) })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${COLORS.border}`,
                borderRadius: '12px',
                fontSize: '14px',
                boxSizing: 'border-box',
                background: COLORS.lightBg,
                color: COLORS.textDark,
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
              }}
            />
          </div>

          {/* Notes */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
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
                border: `2px solid ${COLORS.border}`,
                borderRadius: '12px',
                fontSize: '14px',
                minHeight: '100px',
                fontFamily: '"Inter", sans-serif',
                boxSizing: 'border-box',
                background: COLORS.lightBg,
                color: COLORS.textDark,
                resize: 'vertical',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
              }}
            />
          </div>

          {/* Contractor Section */}
          <div
            style={{
              background: COLORS.lightBg,
              padding: '20px',
              borderRadius: '16px',
              border: `2px solid ${COLORS.border}`,
            }}
          >
            <h4
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: COLORS.textDark,
                marginBottom: '16px',
                margin: '0 0 16px 0',
              }}
            >
              Contractor Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="text"
                placeholder="Name"
                value={editData.contractor?.name || ''}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    contractor: { ...editData.contractor, name: e.target.value },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={editData.contractor?.phone || ''}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    contractor: { ...editData.contractor, phone: e.target.value },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={editData.contractor?.email || ''}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    contractor: { ...editData.contractor, email: e.target.value },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  gridColumn: '1 / -1',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
              <input
                type="number"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                value={editData.contractor?.rating || 5}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    contractor: { ...editData.contractor, rating: parseFloat(e.target.value) },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `2px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  gridColumn: '1 / -1',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                }}
              />
            </div>
          </div>

          {/* Warranty Section */}
          <div
            style={{
              background: COLORS.lightBg,
              padding: '20px',
              borderRadius: '16px',
              border: `2px solid ${COLORS.border}`,
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={editData.warranty?.hasWarranty || false}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    warranty: {
                      ...editData.warranty,
                      hasWarranty: e.target.checked,
                    },
                  })
                }
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                }}
              >
                Has Warranty
              </span>
            </label>

            {editData.warranty?.hasWarranty && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  type="date"
                  value={editData.warranty?.expiryDate || ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      warranty: { ...editData.warranty, expiryDate: e.target.value },
                    })
                  }
                  style={{
                    padding: '10px 12px',
                    border: `2px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    background: COLORS.background,
                    color: COLORS.textDark,
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                  }}
                />
                <input
                  type="text"
                  placeholder="Provider"
                  value={editData.warranty?.provider || ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      warranty: { ...editData.warranty, provider: e.target.value },
                    })
                  }
                  style={{
                    padding: '10px 12px',
                    border: `2px solid ${COLORS.border}`,
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    background: COLORS.background,
                    color: COLORS.textDark,
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                  }}
                />
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '700',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Photos
            </label>
            <div
              style={{
                position: 'relative',
                border: `2px dashed ${COLORS.border}`,
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                background: COLORS.lightBg,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                (e.currentTarget as HTMLElement).style.background = `${COLORS.primary}05`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                (e.currentTarget as HTMLElement).style.background = COLORS.lightBg;
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
              <Upload size={24} style={{ color: COLORS.primary, marginBottom: '8px' }} />
              <p
                style={{
                  fontSize: '14px',
                  color: COLORS.textDark,
                  margin: '8px 0 0 0',
                  fontWeight: '600',
                }}
              >
                Click to upload photos
              </p>
            </div>

            {editData.photos.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '12px',
                  marginTop: '16px',
                }}
              >
                {editData.photos.map((photo, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img
                      src={photo}
                      alt={`upload-${idx}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <motion.button
                      type="button"
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
                      <Trash2 size={12} />
                    </motion.button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save/Cancel Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            <motion.button
              onClick={handleSaveEdit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                color: 'white',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: `0 4px 12px ${COLORS.primary}20`,
              }}
            >
              <Save size={16} />
              Save Changes
            </motion.button>
            <motion.button
              onClick={() => {
                setEditData(task);
                setIsEditing(false);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: COLORS.lightBg,
                color: COLORS.textDark,
                padding: '14px',
                borderRadius: '12px',
                border: `2px solid ${COLORS.border}`,
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
        // VIEW MODE
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Status Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                background: isOverdue
                  ? '#fee2e2'
                  : isDueSoon
                  ? '#fef3c7'
                  : '#d1fae5',
                padding: '20px',
                borderRadius: '16px',
                border: `2px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Due Status
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
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
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                background: `${COLORS.primary}15`,
                padding: '20px',
                borderRadius: '16px',
                border: `2px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Priority Level
              </p>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: COLORS.primary,
                  margin: 0,
                  textTransform: 'capitalize',
                }}
              >
                {editData.priority}
              </p>
            </motion.div>
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
              borderRadius: '14px',
              padding: '16px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: task.completed ? 'none' : `0 8px 20px ${COLORS.primary}30`,
            }}
          >
            <Check size={20} />
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </motion.button>

          {/* Task Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
                  fontSize: '11px',
                  fontWeight: '700',
                  color: COLORS.textLight,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Frequency
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  margin: 0,
                }}
              >
                Every {editData.frequency} days
              </p>
            </div>

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
                  fontSize: '11px',
                  fontWeight: '700',
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
                  fontSize: '18px',
                  fontWeight: '800',
                  color: COLORS.primary,
                  margin: 0,
                }}
              >
                ${editData.cost.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Notes */}
          {editData.notes && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
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
                  background: COLORS.lightBg,
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {editData.notes}
              </p>
            </div>
          )}

          {/* Photos */}
          {editData.photos.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
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
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: `2px solid ${COLORS.border}`,
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
                background: `linear-gradient(135deg, ${COLORS.primary}10 0%, ${COLORS.accent}10 100%)`,
                padding: '20px',
                borderRadius: '16px',
                border: `2px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
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
                  fontSize: '16px',
                  fontWeight: '800',
                  color: COLORS.textDark,
                  margin: '0 0 12px 0',
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
                    gap: '8px',
                    margin: '8px 0',
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
                    gap: '8px',
                    margin: '8px 0',
                  }}
                >
                  <Mail size={14} />
                  {editData.contractor.email}
                </p>
              )}
              {editData.contractor.rating && (
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    margin: '8px 0 0 0',
                  }}
                >
                  Rating: {editData.contractor.rating}/5 ⭐
                </p>
              )}
            </div>
          )}

          {/* Warranty */}
          {editData.warranty?.hasWarranty && (
            <div
              style={{
                background: '#fef3c7',
                padding: '20px',
                borderRadius: '16px',
                border: `2px solid ${COLORS.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
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
                    fontSize: '16px',
                    fontWeight: '800',
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
                    color: '#92400e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
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