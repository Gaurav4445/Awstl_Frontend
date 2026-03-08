'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Palette, Mail, Clock } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onDarkModeToggle,
}) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailReminders: true,
    smsReminders: false,
    soundEnabled: true,
    autoComplete: false,
    weekStartDay: 'Monday',
  });

  const bgColor = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#64748b';
  const inputBg = isDarkMode ? '#1e293b' : '#f8fafc';
  const borderColor = isDarkMode ? '#475569' : '#e2e8f0';
  const accentColor = '#10b981';

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const settingsGroups = [
    {
      icon: Palette,
      title: 'Appearance',
      color: '#ec4899',
      settings: [
        { key: 'notifications', label: 'Dark Mode', toggle: true, isMain: true }
      ]
    },
    {
      icon: Bell,
      title: 'Notifications',
      color: '#3b82f6',
      settings: [
        { key: 'notifications', label: 'Push Notifications' },
        { key: 'soundEnabled', label: 'Sound Effects' },
      ]
    },
    {
      icon: Mail,
      title: 'Communication',
      color: '#f59e0b',
      settings: [
        { key: 'emailReminders', label: 'Email Reminders' },
        { key: 'smsReminders', label: 'SMS Reminders' },
      ]
    },
    {
      icon: Clock,
      title: 'Preferences',
      color: '#8b5cf6',
      settings: [
        { key: 'autoComplete', label: 'Auto-complete Tasks' },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 200,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100vh',
              width: '420px',
              background: bgColor,
              borderLeft: `1px solid ${borderColor}`,
              boxShadow: isDarkMode
                ? '0 20px 50px rgba(0, 0, 0, 0.4)'
                : '0 20px 50px rgba(0, 0, 0, 0.15)',
              zIndex: 201,
              overflowY: 'auto',
            }}
          >
            {/* Header with Gradient */}
            <div style={{
              padding: '32px 24px',
              background: `linear-gradient(135deg, ${accentColor} 0%, #14b8a6 100%)`,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}>
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: 0,
                  fontFamily: '"Playfair Display", serif',
                }}>
                  Settings
                </h2>
                <p style={{
                  fontSize: '12px',
                  opacity: 0.9,
                  margin: '4px 0 0 0',
                }}>
                  Customize your experience
                </p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Settings Content */}
            <div style={{ padding: '24px' }}>
              {settingsGroups.map((group, groupIdx) => {
                const Icon = group.icon;
                return (
                  <motion.div
                    key={groupIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIdx * 0.1 }}
                    style={{ marginBottom: '32px' }}
                  >
                    {/* Group Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                    }}>
                      <div style={{
                        background: `${group.color}20`,
                        padding: '12px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={20} style={{ color: group.color }} />
                      </div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: textColor,
                        margin: 0,
                      }}>
                        {group.title}
                      </h3>
                    </div>

                    {/* Settings */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}>
                      {group.settings.map((setting, settingIdx) => {
                        const isMain = setting.isMain;
                        const isNotificationsSetting = setting.key === 'notifications' && isMain;

                        return (
                          <motion.div
                            key={settingIdx}
                            whileHover={{ scale: 1.02 }}
                            style={{
                              background: isDarkMode
                                ? '#1e293b'
                                : '#f8fafc',
                              border: `2px solid ${borderColor}`,
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = group.color;
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${group.color}20`;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor = borderColor;
                              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            }}
                            onClick={() => {
                              if (isNotificationsSetting) {
                                onDarkModeToggle();
                              } else {
                                toggleSetting(setting.key as keyof typeof settings);
                              }
                            }}
                          >
                            <label style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: textColor,
                              cursor: 'pointer',
                            }}>
                              {setting.label}
                            </label>
                            <ToggleSwitch
                              value={isNotificationsSetting ? isDarkMode : settings[setting.key as keyof typeof settings]}
                              isDarkMode={isDarkMode}
                              color={group.color}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}

              {/* Week Start Preference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: '32px' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}>
                  <div style={{
                    background: '#06b6d420',
                    padding: '12px',
                    borderRadius: '12px',
                  }}>
                    <Clock size={20} style={{ color: '#06b6d4' }} />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: textColor,
                    margin: 0,
                  }}>
                    Calendar
                  </h3>
                </div>

                <div style={{
                  background: isDarkMode ? '#1e293b' : '#f8fafc',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '12px',
                  padding: '16px',
                }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: textColor,
                  }}>
                    Week Starts On
                  </label>
                  <select
                    value={settings.weekStartDay}
                    onChange={(e) => setSettings({ ...settings, weekStartDay: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `2px solid ${borderColor}`,
                      borderRadius: '8px',
                      background: inputBg,
                      color: textColor,
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = accentColor;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accentColor}30`;
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = borderColor;
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    <option>Monday</option>
                    <option>Sunday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </motion.div>

              {/* Footer Spacer */}
              <div style={{ height: '32px' }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Beautiful Toggle Switch Component
interface ToggleSwitchProps {
  value: boolean;
  isDarkMode: boolean;
  color: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, isDarkMode, color }) => {
  return (
    <motion.div
      animate={{
        background: value ? color : (isDarkMode ? '#475569' : '#cbd5e1'),
      }}
      style={{
        width: '56px',
        height: '32px',
        borderRadius: '16px',
        background: value ? color : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: value ? `0 0 20px ${color}40` : 'none',
      }}
    >
      <motion.div
        animate={{
          x: value ? 24 : 2,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '14px',
          background: 'white',
          position: 'absolute',
          top: '2px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      />
    </motion.div>
  );
};

export default SettingsPanel;