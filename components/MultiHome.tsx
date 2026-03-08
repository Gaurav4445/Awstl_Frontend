'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, X, Home, MapPin, Ruler, DollarSign } from 'lucide-react';

interface HomeData {
  id: number;
  name: string;
  address: string;
  type: 'House' | 'Apartment' | 'Condo' | 'Other';
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  squareFeet: number;
  estimatedValue: number;
  members: number;
}

interface MultiHomeProps {
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

const MultiHome: React.FC<MultiHomeProps> = ({ isDarkMode }) => {
  const [homes, setHomes] = useState<HomeData[]>([
    {
      id: 1,
      name: 'Main Residence',
      address: '123 Oak Street, Springfield, IL 62701',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2015,
      squareFeet: 3500,
      estimatedValue: 450000,
      members: 3,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<HomeData>>({
    name: '',
    address: '',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: new Date().getFullYear(),
    squareFeet: 2000,
    estimatedValue: 300000,
    members: 1,
  });

  const handleAddHome = () => {
    if (editingId) {
      setHomes(
        homes.map((h) =>
          h.id === editingId ? { ...formData as HomeData, id: editingId } : h
        )
      );
      setEditingId(null);
    } else {
      setHomes([
        ...homes,
        {
          ...(formData as HomeData),
          id: Date.now(),
        },
      ]);
    }
    setFormData({
      name: '',
      address: '',
      type: 'House',
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: new Date().getFullYear(),
      squareFeet: 2000,
      estimatedValue: 300000,
      members: 1,
    });
    setShowForm(false);
  };

  const handleEditHome = (home: HomeData) => {
    setFormData(home);
    setEditingId(home.id);
    setShowForm(true);
  };

  const handleDeleteHome = (id: number) => {
    setHomes(homes.filter((h) => h.id !== id));
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
            My Properties
          </h2>
          <p
            style={{
              fontSize: '13px',
              color: COLORS.textLight,
              margin: '4px 0 0 0',
            }}
          >
            Manage multiple properties
          </p>
        </div>

        <motion.button
          onClick={() => {
            setEditingId(null);
            setFormData({
              name: '',
              address: '',
              type: 'House',
              bedrooms: 3,
              bathrooms: 2,
              yearBuilt: new Date().getFullYear(),
              squareFeet: 2000,
              estimatedValue: 300000,
              members: 1,
            });
            setShowForm(true);
          }}
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
          Add Property
        </motion.button>
      </motion.div>

      {/* Homes Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 100%, 400px), 1fr))',
          gap: 'clamp(20px, 4vw, 28px)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {homes.map((home, idx) => (
            <motion.div
              key={home.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '20px',
                padding: 'clamp(20px, 4vw, 28px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
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
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div
                      style={{
                        background: `${COLORS.primary}15`,
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Home size={22} style={{ color: COLORS.primary }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: COLORS.textDark,
                          margin: 0,
                        }}
                      >
                        {home.name}
                      </h3>
                      <p
                        style={{
                          fontSize: '12px',
                          color: COLORS.textLight,
                          margin: '4px 0 0 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <MapPin size={12} />
                        {home.type}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <motion.button
                      onClick={() => handleEditHome(home)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: COLORS.lightBg,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: '8px',
                        padding: '6px',
                        cursor: 'pointer',
                        color: COLORS.primary,
                      }}
                    >
                      <Edit2 size={14} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteHome(home.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: '#fee2e2',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px',
                        cursor: 'pointer',
                        color: '#991b1b',
                      }}
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>

                {/* Address */}
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    margin: '0 0 16px 0',
                    lineHeight: '1.5',
                  }}
                >
                  {home.address}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: COLORS.border,
                    margin: '16px 0',
                  }}
                />

                {/* Details Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: COLORS.textLight,
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}
                    >
                      Bedrooms
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: COLORS.textDark,
                        margin: 0,
                      }}
                    >
                      {home.bedrooms}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: COLORS.textLight,
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}
                    >
                      Bathrooms
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: COLORS.textDark,
                        margin: 0,
                      }}
                    >
                      {home.bathrooms}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: COLORS.textLight,
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}
                    >
                      Square Feet
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: COLORS.textDark,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Ruler size={14} />
                      {home.squareFeet.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: COLORS.textLight,
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                      }}
                    >
                      Year Built
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: COLORS.textDark,
                        margin: 0,
                      }}
                    >
                      {home.yearBuilt}
                    </p>
                  </div>
                </div>

                {/* Value */}
                <div
                  style={{
                    background: `${COLORS.primary}10`,
                    borderRadius: '12px',
                    padding: '12px',
                    marginTop: '16px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: COLORS.primary,
                      margin: '0 0 4px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}
                  >
                    Estimated Value
                  </p>
                  <p
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: COLORS.primary,
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <DollarSign size={18} />
                    {home.estimatedValue.toLocaleString()}
                  </p>
                </div>

                {/* Members */}
                <p
                  style={{
                    fontSize: '12px',
                    color: COLORS.textLight,
                    margin: '12px 0 0 0',
                  }}
                >
                  {home.members} member{home.members !== 1 ? 's' : ''} managing this property
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Form Modal */}
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
                  {editingId ? 'Edit Property' : 'Add New Property'}
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
                  handleAddHome();
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
                    Property Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Main Residence"
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
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Address */}
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
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter full address"
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
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Type */}
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
                    Property Type
                  </label>
                  <select
                    value={formData.type || 'House'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
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
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.primary;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Bedrooms & Bathrooms */}
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
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bedrooms: parseInt(e.target.value),
                        })
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
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bathrooms: parseInt(e.target.value),
                        })
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

                {/* Year Built & Square Feet */}
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
                      Year Built
                    </label>
                    <input
                      type="number"
                      value={formData.yearBuilt || new Date().getFullYear()}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          yearBuilt: parseInt(e.target.value),
                        })
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
                      Square Feet
                    </label>
                    <input
                      type="number"
                      value={formData.squareFeet || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          squareFeet: parseInt(e.target.value),
                        })
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

                {/* Estimated Value */}
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
                    Estimated Value
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedValue || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedValue: parseFloat(e.target.value),
                      })
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
                    {editingId ? 'Update' : 'Add'} Property
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

export default MultiHome;