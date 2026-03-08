'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { Appliance } from './HomeMaintenanceLog';

interface HomeInventoryProps {
  appliances: Appliance[];
  onAddAppliance: (appliance: Appliance) => void;
  onDeleteAppliance: (id: number) => void;
  rooms: string[];
  isDarkMode: boolean;
}

const HomeInventory: React.FC<HomeInventoryProps> = ({
  appliances,
  onAddAppliance,
  onDeleteAppliance,
  rooms,
  isDarkMode,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    room: 'Kitchen',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onAddAppliance({
      id: Date.now(),
      ...formData,
    });

    setFormData({
      name: '',
      room: 'Kitchen',
      brand: '',
      model: '',
      serialNumber: '',
      purchaseDate: '',
      warrantyExpiry: '',
      notes: '',
    });
    setShowForm(false);
  };

  const isWarrantyExpiring = (expiryDate: string): boolean => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isWarrantyExpired = (expiryDate: string): boolean => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const cardBg = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const inputBg = isDarkMode ? '#1e293b' : 'white';
  const inputBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const labelBg = isDarkMode ? '#475569' : '#f8fafc';

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          fontFamily: '"Playfair Display", serif',
          color: textColor,
        }}>
          Home Appliances
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 10px 15px rgba(16, 185, 129, 0.3)',
          }}
        >
          <Plus size={20} />
          Add Appliance
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              background: cardBg,
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
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
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: textColor,
              }}>Add New Appliance</h3>
              <button
                onClick={() => setShowForm(false)}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
                    Appliance Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Washing Machine"
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
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., LG"
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
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., WM2000XW"
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
                  Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  placeholder="For warranty claims"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
                    Purchase Date
                  </label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
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
                    Warranty Expiry
                  </label>
                  <input
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: textColor }}>
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `2px solid ${inputBorder}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '60px',
                    fontFamily: '"Inter", sans-serif',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    background: inputBg,
                    color: textColor,
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
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
                  Add Appliance
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowForm(false)}
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
        )}
      </AnimatePresence>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
      }}>
        <AnimatePresence mode="popLayout">
          {appliances.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                gridColumn: '1 / -1',
                background: cardBg,
                borderRadius: '12px',
                padding: '48px 24px',
                textAlign: 'center',
                border: `2px dashed ${inputBorder}`,
              }}
            >
              <p style={{ color: secondaryText, fontSize: '16px' }}>No appliances added yet. Start by adding your home appliances!</p>
            </motion.div>
          ) : (
            appliances.map((appliance) => (
              <motion.div
                key={appliance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                layout
                style={{
                  background: cardBg,
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: `1px solid ${inputBorder}`,
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: textColor,
                      marginBottom: '4px',
                    }}>
                      {appliance.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: secondaryText }}>{appliance.room}</p>
                  </div>
                  <motion.button
                    onClick={() => onDeleteAppliance(appliance.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      padding: '4px',
                    }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>

                <div style={{
                  background: labelBg,
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  color: secondaryText,
                }}>
                  {appliance.brand && <p><strong>Brand:</strong> {appliance.brand}</p>}
                  {appliance.model && <p><strong>Model:</strong> {appliance.model}</p>}
                  {appliance.serialNumber && <p><strong>S/N:</strong> {appliance.serialNumber}</p>}
                </div>

                {appliance.warrantyExpiry && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: isWarrantyExpired(appliance.warrantyExpiry)
                      ? (isDarkMode ? '#7f1d1d' : '#fee2e2')
                      : isWarrantyExpiring(appliance.warrantyExpiry)
                      ? (isDarkMode ? '#7c2d12' : '#fef3c7')
                      : (isDarkMode ? '#1b4332' : '#dcfce7'),
                    color: isWarrantyExpired(appliance.warrantyExpiry)
                      ? (isDarkMode ? '#fca5a5' : '#991b1b')
                      : isWarrantyExpiring(appliance.warrantyExpiry)
                      ? (isDarkMode ? '#fdba74' : '#92400e')
                      : (isDarkMode ? '#86efac' : '#15803d'),
                  }}>
                    {isWarrantyExpired(appliance.warrantyExpiry)
                      ? 'Warranty Expired'
                      : isWarrantyExpiring(appliance.warrantyExpiry)
                      ? 'Warranty Expiring Soon'
                      : `Warranty Valid`}
                  </div>
                )}

                {appliance.notes && (
                  <p style={{
                    fontSize: '12px',
                    color: secondaryText,
                    fontStyle: 'italic',
                    borderTop: `1px solid ${inputBorder}`,
                    paddingTop: '8px',
                  }}>
                    {appliance.notes}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeInventory;