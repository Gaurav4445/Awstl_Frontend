'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, Trash2, MapPin, Users, DollarSign, Edit2 } from 'lucide-react';

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

const MultiHome: React.FC<MultiHomeProps> = ({ isDarkMode }) => {
  const [homes, setHomes] = useState<HomeData[]>([
    {
      id: 1,
      name: 'Main Residence',
      address: '123 Oak Street, Springfield, IL',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2015,
      squareFeet: 3500,
      estimatedValue: 450000,
      members: 3,
    },
    {
      id: 2,
      name: 'Vacation Home',
      address: '456 Beach Ave, Miami, FL',
      type: 'Condo',
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2018,
      squareFeet: 1200,
      estimatedValue: 350000,
      members: 2,
    },
  ]);

  const [selectedHome, setSelectedHome] = useState<HomeData | null>(homes[0]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'House' as const,
    bedrooms: 1,
    bathrooms: 1,
    yearBuilt: new Date().getFullYear(),
    squareFeet: 1000,
    estimatedValue: 0,
  });

  const bgColor = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const borderColor = isDarkMode ? '#475569' : '#e2e8f0';
  const inputBg = isDarkMode ? '#1e293b' : '#f8fafc';

  const handleAddHome = () => {
    if (!formData.name.trim()) return;

    const newHome: HomeData = {
      id: editingId || Date.now(),
      ...formData,
      members: 1,
    };

    if (editingId) {
      setHomes(homes.map(h => h.id === editingId ? newHome : h));
      setEditingId(null);
    } else {
      setHomes([...homes, newHome]);
    }

    setFormData({
      name: '',
      address: '',
      type: 'House',
      bedrooms: 1,
      bathrooms: 1,
      yearBuilt: new Date().getFullYear(),
      squareFeet: 1000,
      estimatedValue: 0,
    });
    setShowForm(false);
  };

  const handleDeleteHome = (id: number) => {
    setHomes(homes.filter(h => h.id !== id));
    if (selectedHome?.id === id) setSelectedHome(homes[0]);
  };

  const handleEditHome = (home: HomeData) => {
    setFormData({
      name: home.name,
      address: home.address,
      type: home.type,
      bedrooms: home.bedrooms,
      bathrooms: home.bathrooms,
      yearBuilt: home.yearBuilt,
      squareFeet: home.squareFeet,
      estimatedValue: home.estimatedValue,
    });
    setEditingId(home.id);
    setShowForm(true);
  };

  const getHomeIcon = (type: string) => {
    const icons: Record<string, string> = {
      House: '🏠',
      Apartment: '🏢',
      Condo: '🏘️',
      Other: '🏗️',
    };
    return icons[type] || '🏠';
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: '24px',
      height: '100%',
    }}>
      {/* Sidebar - Homes List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          background: `linear-gradient(135deg, ${bgColor} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
          borderRadius: '16px',
          border: `2px solid ${borderColor}`,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
      >
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: textColor,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Home size={20} style={{ color: '#10b981' }} />
            My Homes ({homes.length})
          </h3>
        </div>

        {/* Homes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {homes.map(home => (
            <motion.button
              key={home.id}
              onClick={() => setSelectedHome(home)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: selectedHome?.id === home.id
                  ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
                  : isDarkMode ? '#1e293b' : '#f8fafc',
                color: selectedHome?.id === home.id ? 'white' : textColor,
                border: selectedHome?.id === home.id
                  ? '2px solid #10b981'
                  : `2px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                {getHomeIcon(home.type)}
              </div>
              <p style={{
                fontSize: '14px',
                fontWeight: '600',
                margin: 0,
                marginBottom: '4px',
              }}>
                {home.name}
              </p>
              <p style={{
                fontSize: '11px',
                opacity: 0.8,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <MapPin size={12} />
                {home.type}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Add Home Button */}
        <motion.button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px',
          }}
        >
          <Plus size={18} />
          Add Home
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Form or Details */}
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: `linear-gradient(135deg, ${bgColor} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
                borderRadius: '16px',
                border: `2px solid #10b981`,
                padding: '32px',
              }}
            >
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: textColor,
                marginBottom: '24px',
                fontFamily: '"Playfair Display", serif',
              }}>
                {editingId ? 'Edit Home' : 'Add New Home'}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Home Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Main House"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Year Built
                  </label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Square Feet
                  </label>
                  <input
                    type="number"
                    value={formData.squareFeet}
                    onChange={(e) => setFormData({ ...formData, squareFeet: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: textColor }}>
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button
                  onClick={handleAddHome}
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
                  {editingId ? 'Update Home' : 'Add Home'}
                </motion.button>
                <motion.button
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    background: borderColor,
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
            </motion.div>
          ) : selectedHome ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Home Details Card */}
              <div style={{
                background: `linear-gradient(135deg, ${bgColor} 0%, ${isDarkMode ? '#1e293b' : '#f8fafc'} 100%)`,
                borderRadius: '16px',
                border: `2px solid ${borderColor}`,
                padding: '32px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '24px',
                }}>
                  <div>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                      {getHomeIcon(selectedHome.type)}
                    </div>
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: textColor,
                      margin: 0,
                      fontFamily: '"Playfair Display", serif',
                      marginBottom: '8px',
                    }}>
                      {selectedHome.name}
                    </h2>
                    <p style={{
                      fontSize: '14px',
                      color: secondaryText,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: 0,
                    }}>
                      <MapPin size={16} />
                      {selectedHome.address}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <motion.button
                      onClick={() => handleEditHome(selectedHome)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Edit2 size={16} />
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteHome(selectedHome.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Trash2 size={16} />
                      Delete
                    </motion.button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                  marginTop: '24px',
                }}>
                  {[
                    { label: 'Type', value: selectedHome.type, icon: '🏘️' },
                    { label: 'Bedrooms', value: selectedHome.bedrooms, icon: '🛏️' },
                    { label: 'Bathrooms', value: selectedHome.bathrooms, icon: '🚿' },
                    { label: 'Year Built', value: selectedHome.yearBuilt, icon: '📅' },
                    { label: 'Sq Ft', value: selectedHome.squareFeet.toLocaleString(), icon: '📐' },
                    { label: 'Value', value: `$${selectedHome.estimatedValue.toLocaleString()}`, icon: '💰' },
                    { label: 'Members', value: selectedHome.members, icon: '👥' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        background: isDarkMode ? '#1e293b' : '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                        {stat.icon}
                      </div>
                      <p style={{
                        fontSize: '12px',
                        color: secondaryText,
                        margin: 0,
                        marginBottom: '4px',
                      }}>
                        {stat.label}
                      </p>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: textColor,
                        margin: 0,
                      }}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MultiHome;