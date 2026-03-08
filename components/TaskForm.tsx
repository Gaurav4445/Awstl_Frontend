'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
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

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  categories,
  rooms,
  isDarkMode,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Maintenance',
    room: 'Kitchen',
    lastCompleted: new Date().toISOString().split('T')[0],
    frequency: '30',
    priority: 'medium',
    cost: 0,
    notes: '',
    photos: [] as string[],
    contractor: { name: '', phone: '', email: '', rating: 5 },
    warranty: { hasWarranty: false, expiryDate: '', provider: '' },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setFormData({
            ...formData,
            photos: [...formData.photos, base64],
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700',
            color: COLORS.textDark,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Create New Task
        </h2>
        <motion.button
          onClick={onCancel}
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

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        {/* Task Name */}
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
            Task Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Change AC Filter"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              fontSize: '14px',
              boxSizing: 'border-box',
              background: COLORS.background,
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

        {/* Category & Room Grid */}
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
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
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
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '8px',
                color: COLORS.textDark,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Room
            </label>
            <select
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
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
            >
              {rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates Grid */}
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
              Last Completed
            </label>
            <input
              type="date"
              value={formData.lastCompleted}
              onChange={(e) =>
                setFormData({ ...formData, lastCompleted: e.target.value })
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
              Frequency (days)
            </label>
            <input
              type="number"
              required
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
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
        </div>

        {/* Priority & Cost Grid */}
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
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
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
                fontSize: '13px',
                fontWeight: '600',
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
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: parseFloat(e.target.value) })
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
        </div>

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
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes about this task..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              fontSize: '14px',
              minHeight: '80px',
              fontFamily: '"Inter", sans-serif',
              boxSizing: 'border-box',
              resize: 'vertical',
              background: COLORS.background,
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
              onChange={handlePhotoUpload}
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
                fontWeight: '500',
              }}
            >
              Click to upload photos
            </p>
          </div>

          {formData.photos.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '12px',
                marginTop: '16px',
              }}
            >
              {formData.photos.map((photo, idx) => (
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

        {/* Contractor Section */}
        <div
          style={{
            background: COLORS.lightBg,
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${COLORS.border}`,
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
            Contractor Information (Optional)
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.contractor.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contractor: { ...formData.contractor, name: e.target.value },
                })
              }
              style={{
                padding: '10px 12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: COLORS.background,
                color: COLORS.textDark,
              }}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.contractor.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contractor: { ...formData.contractor, phone: e.target.value },
                })
              }
              style={{
                padding: '10px 12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: COLORS.background,
                color: COLORS.textDark,
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.contractor.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contractor: { ...formData.contractor, email: e.target.value },
                })
              }
              style={{
                padding: '10px 12px',
                border: `1px solid ${COLORS.border}`,
                borderRadius: '8px',
                fontSize: '13px',
                gridColumn: '1 / -1',
                boxSizing: 'border-box',
                background: COLORS.background,
                color: COLORS.textDark,
              }}
            />
          </div>
        </div>

        {/* Warranty Section */}
        <div
          style={{
            background: COLORS.lightBg,
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={formData.warranty.hasWarranty}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  warranty: {
                    ...formData.warranty,
                    hasWarranty: e.target.checked,
                  },
                })
              }
              style={{ cursor: 'pointer' }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: COLORS.textDark,
              }}
            >
              Has Warranty
            </span>
          </label>

          {formData.warranty.hasWarranty && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <input
                type="date"
                value={formData.warranty.expiryDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    warranty: {
                      ...formData.warranty,
                      expiryDate: e.target.value,
                    },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
              />
              <input
                type="text"
                placeholder="Provider"
                value={formData.warranty.provider}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    warranty: {
                      ...formData.warranty,
                      provider: e.target.value,
                    },
                  })
                }
                style={{
                  padding: '10px 12px',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  background: COLORS.background,
                  color: COLORS.textDark,
                }}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <motion.button
            type="submit"
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
              boxShadow: `0 8px 16px ${COLORS.primary}25`,
            }}
          >
            Create Task
          </motion.button>
          <motion.button
            type="button"
            onClick={onCancel}
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
      </form>
    </motion.div>
  );
};

export default TaskForm;