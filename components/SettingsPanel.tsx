'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, Bell, Mail, MessageSquare, Settings2 } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
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

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onDarkModeToggle,
}) => {
  const [settings, setSettings] = React.useState({
    pushNotifications: true,
    soundNotifications: true,
    emailReminders: true,
    smsReminders: false,
    weekStartDay: 'Monday',
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

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
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 99,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 500, opacity: 0 }}
            transition={SPRING}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100vh',
              width: 'clamp(280px, 80vw, 400px)',
              background: COLORS.background,
              borderLeft: `1px solid ${COLORS.border}`,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 100,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${COLORS.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  margin: 0,
                }}
              >
                Settings
              </h2>
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

            {/* Content */}
            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Appearance Section */}
              <section>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Sun size={18} style={{ color: COLORS.primary }} />
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: COLORS.textDark,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Appearance
                  </h3>
                </div>

                <div
                  style={{
                    background: COLORS.lightBg,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: COLORS.textDark,
                        margin: 0,
                      }}
                    >
                      Dark Mode
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: COLORS.textLight,
                        margin: '4px 0 0 0',
                      }}
                    >
                      Coming soon
                    </p>
                  </div>
                  <motion.button
                    onClick={onDarkModeToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '50px',
                      height: '28px',
                      borderRadius: '14px',
                      border: 'none',
                      background: isDarkMode ? COLORS.accent : COLORS.border,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '2px',
                      position: 'relative',
                    }}
                  >
                    <motion.div
                      animate={{ x: isDarkMode ? 22 : 0 }}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '12px',
                        background: 'white',
                        position: 'absolute',
                      }}
                    />
                  </motion.button>
                </div>
              </section>

              {/* Notifications Section */}
              <section>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Bell size={18} style={{ color: COLORS.primary }} />
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: COLORS.textDark,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Notifications
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    {
                      key: 'pushNotifications',
                      label: 'Push Notifications',
                      desc: 'Get desktop alerts',
                    },
                    {
                      key: 'soundNotifications',
                      label: 'Sound Alerts',
                      desc: 'Play notification sounds',
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.key}
                      style={{
                        background: COLORS.lightBg,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: COLORS.textDark,
                            margin: 0,
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: '12px',
                            color: COLORS.textLight,
                            margin: '2px 0 0 0',
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <motion.button
                        onClick={() =>
                          toggleSetting(item.key as keyof typeof settings)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: '50px',
                          height: '28px',
                          borderRadius: '14px',
                          border: 'none',
                          background: settings[
                            item.key as keyof typeof settings
                          ]
                            ? COLORS.accent
                            : COLORS.border,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                          position: 'relative',
                        }}
                      >
                        <motion.div
                          animate={{
                            x: settings[item.key as keyof typeof settings]
                              ? 22
                              : 0,
                          }}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '12px',
                            background: 'white',
                            position: 'absolute',
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Communication Section */}
              <section>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Mail size={18} style={{ color: COLORS.primary }} />
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: COLORS.textDark,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Communication
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    {
                      key: 'emailReminders',
                      label: 'Email Reminders',
                      desc: 'Task reminders via email',
                    },
                    {
                      key: 'smsReminders',
                      label: 'SMS Reminders',
                      desc: 'Task reminders via text',
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.key}
                      style={{
                        background: COLORS.lightBg,
                        borderRadius: '12px',
                        padding: '12px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: COLORS.textDark,
                            margin: 0,
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: '12px',
                            color: COLORS.textLight,
                            margin: '2px 0 0 0',
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <motion.button
                        onClick={() =>
                          toggleSetting(item.key as keyof typeof settings)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          width: '50px',
                          height: '28px',
                          borderRadius: '14px',
                          border: 'none',
                          background: settings[
                            item.key as keyof typeof settings
                          ]
                            ? COLORS.accent
                            : COLORS.border,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px',
                          position: 'relative',
                        }}
                      >
                        <motion.div
                          animate={{
                            x: settings[item.key as keyof typeof settings]
                              ? 22
                              : 0,
                          }}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '12px',
                            background: 'white',
                            position: 'absolute',
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Preferences Section */}
              <section>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <Settings2 size={18} style={{ color: COLORS.primary }} />
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: COLORS.textDark,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Preferences
                  </h3>
                </div>

                <div
                  style={{
                    background: COLORS.lightBg,
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: COLORS.textDark,
                      marginBottom: '8px',
                    }}
                  >
                    Week Starts On
                  </label>
                  <select
                    value={settings.weekStartDay}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        weekStartDay: e.target.value,
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      background: COLORS.background,
                      color: COLORS.textDark,
                      boxSizing: 'border-box',
                    }}
                  >
                    <option>Sunday</option>
                    <option>Monday</option>
                    <option>Saturday</option>
                  </select>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '20px 24px',
                borderTop: `1px solid ${COLORS.border}`,
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  color: COLORS.textLight,
                  margin: 0,
                }}
              >
                Version 1.0.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;