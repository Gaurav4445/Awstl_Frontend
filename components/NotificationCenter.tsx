'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface NotificationCenterProps {
  isDarkMode: boolean;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'AC Filter Changed',
      message: 'Successfully marked as completed',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 2,
      type: 'warning',
      title: 'Task Due Soon',
      message: 'Check roof gutters in 2 days',
      timestamp: new Date(Date.now() - 30 * 60000),
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Reminder',
      message: 'Time to inspect HVAC system',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
    },
  ]);

  const bgColor = isDarkMode ? '#334155' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const borderColor = isDarkMode ? '#475569' : '#e2e8f0';

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: '#10b981' };
      case 'warning':
        return { icon: AlertCircle, color: '#f59e0b' };
      case 'info':
        return { icon: Info, color: '#3b82f6' };
      default:
        return { icon: Bell, color: '#64748b' };
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'relative',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: textColor,
          fontSize: '24px',
        }}
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {notifications.length}
          </motion.div>
        )}
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '50px',
              right: 0,
              width: '380px',
              background: bgColor,
              borderRadius: '12px',
              border: `1px solid ${borderColor}`,
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 300,
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${borderColor}`,
              background: isDarkMode ? '#1e293b' : '#f8fafc',
              borderRadius: '12px 12px 0 0',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: textColor,
              }}>
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: textColor,
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notif) => {
                  const { icon: Icon, color } = getNotificationIcon(notif.type);
                  return (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        padding: '16px',
                        borderBottom: `1px solid ${borderColor}`,
                        display: 'flex',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = isDarkMode ? '#475569' : '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      <Icon size={20} style={{ color, flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: textColor,
                          marginBottom: '4px',
                        }}>
                          {notif.title}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: isDarkMode ? '#cbd5e1' : '#64748b',
                          marginBottom: '4px',
                        }}>
                          {notif.message}
                        </p>
                        <p style={{
                          fontSize: '11px',
                          color: isDarkMode ? '#94a3b8' : '#94a3b8',
                        }}>
                          {formatTime(notif.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notif.id);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: textColor,
                          padding: '4px',
                          opacity: 0.5,
                        }}
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: isDarkMode ? '#cbd5e1' : '#64748b',
              }}>
                <p>No notifications yet</p>
              </div>
            )}

            {/* Clear All Button */}
            {notifications.length > 0 && (
              <div style={{
                padding: '12px 16px',
                borderTop: `1px solid ${borderColor}`,
                textAlign: 'center',
              }}>
                <button
                  onClick={() => setNotifications([])}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;