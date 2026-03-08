'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  categories: string[];
  rooms: string[];
  isDarkMode: boolean;
}

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
        border: '2px solid #a7f3d0',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: textColor,
        }}>Add New Task</h2>
        <button
          onClick={onCancel}
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
            Task Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Change AC Filter"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `2px solid ${inputBorder}`,
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              background: inputBg,
              color: textColor,
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#10b981')}
            onBlur={(e) => (e.currentTarget.style.borderColor = inputBorder)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Room *
            </label>
            <select
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            >
              {rooms.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Last Completed
            </label>
            <input
              type="date"
              value={formData.lastCompleted}
              onChange={(e) => setFormData({ ...formData, lastCompleted: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Frequency (days) *
            </label>
            <input
              type="number"
              required
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
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
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
              Cost ($)
            </label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes about this task..."
            style={{
              width: '100%',
              padding: '10px 12px',
              border: `2px solid ${inputBorder}`,
              borderRadius: '8px',
              fontSize: '14px',
              minHeight: '80px',
              fontFamily: '"Inter", sans-serif',
              boxSizing: 'border-box',
              resize: 'vertical',
              background: inputBg,
              color: textColor,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
            Photos
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{
              padding: '10px 12px',
              border: `2px dashed ${inputBorder}`,
              borderRadius: '8px',
              cursor: 'pointer',
              boxSizing: 'border-box',
              width: '100%',
              background: inputBg,
              color: textColor,
            }}
          />
          {formData.photos.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '8px',
              marginTop: '12px',
            }}>
              {formData.photos.map((photo, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <img
                    src={photo}
                    alt="upload"
                    style={{
                      width: '100%',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          background: labelBg,
          padding: '12px',
          borderRadius: '8px',
          border: `1px solid ${inputBorder}`,
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: textColor }}>Contractor (Optional)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <input
              type="text"
              placeholder="Name"
              value={formData.contractor.name}
              onChange={(e) => setFormData({
                ...formData,
                contractor: { ...formData.contractor, name: e.target.value }
              })}
              style={{
                padding: '8px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '6px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.contractor.phone}
              onChange={(e) => setFormData({
                ...formData,
                contractor: { ...formData.contractor, phone: e.target.value }
              })}
              style={{
                padding: '8px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '6px',
                fontSize: '13px',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.contractor.email}
              onChange={(e) => setFormData({
                ...formData,
                contractor: { ...formData.contractor, email: e.target.value }
              })}
              style={{
                padding: '8px 12px',
                border: `2px solid ${inputBorder}`,
                borderRadius: '6px',
                fontSize: '13px',
                gridColumn: '1 / -1',
                boxSizing: 'border-box',
                background: inputBg,
                color: textColor,
              }}
            />
          </div>
        </div>

        <div style={{
          background: labelBg,
          padding: '12px',
          borderRadius: '8px',
          border: `1px solid ${inputBorder}`,
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.warranty.hasWarranty}
              onChange={(e) => setFormData({
                ...formData,
                warranty: { ...formData.warranty, hasWarranty: e.target.checked }
              })}
            />
            <span style={{ fontSize: '14px', fontWeight: '600', color: textColor }}>Has Warranty</span>
          </label>
          {formData.warranty.hasWarranty && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="date"
                placeholder="Expiry Date"
                value={formData.warranty.expiryDate}
                onChange={(e) => setFormData({
                  ...formData,
                  warranty: { ...formData.warranty, expiryDate: e.target.value }
                })}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  background: inputBg,
                  color: textColor,
                }}
              />
              <input
                type="text"
                placeholder="Provider"
                value={formData.warranty.provider}
                onChange={(e) => setFormData({
                  ...formData,
                  warranty: { ...formData.warranty, provider: e.target.value }
                })}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${inputBorder}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                  background: inputBg,
                  color: textColor,
                }}
              />
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
        }}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
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
              flex: 1,
              background: inputBorder,
              color: textColor,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
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