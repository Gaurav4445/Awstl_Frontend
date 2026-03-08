'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, AlertCircle, Package, Calendar } from 'lucide-react';

export interface Appliance {
  id: number;
  name: string;
  room: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
  notes: string;
}

interface HomeInventoryProps {
  appliances: Appliance[];
  onAddAppliance: (appliance: Appliance) => void;
  onDeleteAppliance: (id: number) => void;
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
    room: rooms[0] || 'Kitchen',
    brand: '',
    model: '',
    serialNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyExpiry: '',
    notes: '',
  });

  const handleAddAppliance = () => {
    if (formData.name && formData.brand) {
      const newAppliance: Appliance = {
        id: Date.now(),
        ...formData,
      };
      onAddAppliance(newAppliance);
      setFormData({
        name: '',
        room: rooms[0] || 'Kitchen',
        brand: '',
        model: '',
        serialNumber: '',
        purchaseDate: new Date().toISOString().split('T')[0],
        warrantyExpiry: '',
        notes: '',
      });
      setShowForm(false);
    }
  };

  const isWarrantyExpiring = (expiryDate: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isWarrantyExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Home Inventory
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: COLORS.textLight,
              margin: '4px 0 0 0',
            }}
          >
            Track appliances and warranties
          </p>
        </div>

        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: `0 4px 12px ${COLORS.primary}20`,
          }}
        >
          <Plus size={18} />
          Add Appliance
        </motion.button>
      </motion.div>

      {/* Appliances Grid */}
      {appliances.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(clamp(280px, 100%, 380px), 1fr))',
            gap: 'clamp(20px, 4vw, 28px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {appliances.map((appliance, idx) => {
              const warrantyExpiring = isWarrantyExpiring(appliance.warrantyExpiry);
              const warrantyExpired = isWarrantyExpired(appliance.warrantyExpiry);

              return (
                <motion.div
                  key={appliance.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: COLORS.background,
                    border:
                      warrantyExpired
                        ? '2px solid #ef4444'
                        : warrantyExpiring
                        ? '2px solid #f59e0b'
                        : `1px solid ${COLORS.border}`,
                    borderRadius: '20px',
                    padding: 'clamp(20px, 4vw, 28px)',
                    boxShadow:
                      warrantyExpired
                        ? '0 8px 16px #ef444425'
                        : warrantyExpiring
                        ? '0 8px 16px #f59e0b25'
                        : '0 4px 12px rgba(0, 0, 0, 0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background Accent */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
                      opacity: 0.05,
                      borderRadius: '50%',
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '16px',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '16px',
                            fontWeight: '700',
                            color: COLORS.textDark,
                            margin: 0,
                          }}
                        >
                          {appliance.name}
                        </h3>
                        <p
                          style={{
                            fontSize: '12px',
                            color: COLORS.textLight,
                            margin: '4px 0 0 0',
                          }}
                        >
                          {appliance.brand} • {appliance.room}
                        </p>
                      </div>
                      <motion.button
                        onClick={() => onDeleteAppliance(appliance.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          background: '#fee2e2',
                          color: '#991b1b',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 8px',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>

                    {/* Details Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '16px',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: COLORS.textLight,
                            margin: '0 0 4px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                          }}
                        >
                          Model
                        </p>
                        <p
                          style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: COLORS.textDark,
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={appliance.model}
                        >
                          {appliance.model || 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: COLORS.textLight,
                            margin: '0 0 4px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                          }}
                        >
                          Serial #
                        </p>
                        <p
                          style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: COLORS.textDark,
                            margin: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={appliance.serialNumber}
                        >
                          {appliance.serialNumber || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Purchase Date */}
                    <div
                      style={{
                        background: COLORS.lightBg,
                        padding: '12px',
                        borderRadius: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: COLORS.textLight,
                          margin: '0 0 4px 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}
                      >
                        Purchase Date
                      </p>
                      <p
                        style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: COLORS.textDark,
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Calendar size={14} />
                        {new Date(appliance.purchaseDate).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>

                    {/* Warranty Status */}
                    {appliance.warrantyExpiry && (
                      <div
                        style={{
                          background: warrantyExpired
                            ? '#fee2e2'
                            : warrantyExpiring
                            ? '#fef3c7'
                            : '#d1fae5',
                          padding: '12px',
                          borderRadius: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: warrantyExpired
                              ? '#991b1b'
                              : warrantyExpiring
                              ? '#92400e'
                              : COLORS.accent,
                            margin: '0 0 4px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {(warrantyExpired || warrantyExpiring) && (
                            <AlertCircle size={12} />
                          )}
                          Warranty
                        </p>
                        <p
                          style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            color: warrantyExpired
                              ? '#991b1b'
                              : warrantyExpiring
                              ? '#92400e'
                              : COLORS.accent,
                            margin: 0,
                          }}
                        >
                          {warrantyExpired
                            ? 'Expired'
                            : warrantyExpiring
                            ? 'Expiring Soon'
                            : 'Active'}{' '}
                          •{' '}
                          {new Date(appliance.warrantyExpiry).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    )}

                    {/* Notes */}
                    {appliance.notes && (
                      <div>
                        <p
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: COLORS.textLight,
                            margin: '0 0 4px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px',
                          }}
                        >
                          Notes
                        </p>
                        <p
                          style={{
                            fontSize: '13px',
                            color: COLORS.textLight,
                            margin: 0,
                            lineHeight: '1.5',
                          }}
                        >
                          {appliance.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
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
          <Package
            size={40}
            style={{ color: COLORS.textLight, marginBottom: '16px' }}
          />
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: COLORS.textLight,
              margin: 0,
            }}
          >
            No appliances tracked yet. Add one to get started.
          </p>
        </motion.div>
      )}

      {/* Add Appliance Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: COLORS.background,
                borderRadius: '20px',
                padding: 'clamp(28px, 5vw, 40px)',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '28px',
                  paddingBottom: '20px',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(18px, 4vw, 24px)',
                    fontWeight: '700',
                    color: COLORS.textDark,
                    margin: 0,
                  }}
                >
                  Add Appliance
                </h3>
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: COLORS.lightBg,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    padding: '6px',
                    color: COLORS.textDark,
                  }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddAppliance();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: COLORS.textDark,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Appliance Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Washing Machine"
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
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Room & Brand */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
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
                      onChange={(e) =>
                        setFormData({ ...formData, room: e.target.value })
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
                      {rooms.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: COLORS.textDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      placeholder="e.g., Samsung"
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
                </div>

                {/* Model & Serial */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: COLORS.textDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) =>
                        setFormData({ ...formData, model: e.target.value })
                      }
                      placeholder="Model number"
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
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: COLORS.textDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Serial Number
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, serialNumber: e.target.value })
                      }
                      placeholder="Serial #"
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
                </div>

                {/* Dates */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: COLORS.textDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) =>
                        setFormData({ ...formData, purchaseDate: e.target.value })
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
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: COLORS.textDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Warranty Expiry
                    </label>
                    <input
                      type="date"
                      value={formData.warrantyExpiry}
                      onChange={(e) =>
                        setFormData({ ...formData, warrantyExpiry: e.target.value })
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
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
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
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Add any notes..."
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
                    }}
                  />
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginTop: '12px',
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
                      boxShadow: `0 4px 12px ${COLORS.primary}20`,
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeInventory;