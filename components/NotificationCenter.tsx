'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface NotificationCenterProps {
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

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Warranty Expiring',
      message: 'AC Unit warranty expires in 30 days',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: 'success',
      title: 'Task Completed',
      message: 'You completed "Change AC Filter"',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: 3,
      type: 'info',
      title: 'Upcoming Task',
      message: 'Water heater maintenance due in 7 days',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertCircle;
      case 'success':
        return CheckCircle2;
      case 'info':
      default:
        return Clock;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' };
      case 'success':
        return { bg: '#d1fae5', border: COLORS.accent, text: '#065f46' };
      case 'info':
      default:
        return { bg: `${COLORS.primary}15`, border: COLORS.primary, text: COLORS.primary };
    }
  };

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: notifications.length > 0 ? COLORS.lightBg : 'transparent',
          border: `1px solid ${COLORS.border}`,
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          color: COLORS.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Bell size={20} />

        {/* Badge */}
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
              fontWeight: '700',
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
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={SPRING}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 12px)',
              width: 'clamp(300px, 90vw, 400px)',
              background: COLORS.background,
              borderRadius: '16px',
              border: `1px solid ${COLORS.border}`,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
              zIndex: 1000,
              maxHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: `1px solid ${COLORS.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  margin: 0,
                }}
              >
                Notifications
              </h3>
              {notifications.length > 0 && (
                <motion.button
                  onClick={clearAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: COLORS.primary,
                  }}
                >
                  Clear All
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '8px',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {notifications.map((notif, idx) => {
                    const Icon = getNotificationIcon(notif.type);
                    const colors = getNotificationColor(notif.type);

                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        transition={{ delay: idx * 0.05 }}
                        style={{
                          background: colors.bg,
                          borderLeft: `4px solid ${colors.border}`,
                          borderRadius: '8px',
                          padding: '12px',
                          marginBottom: '8px',
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Icon
                          size={18}
                          style={{
                            color: colors.text,
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />

                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: '13px',
                              fontWeight: '700',
                              color: colors.text,
                              margin: '0 0 4px 0',
                            }}
                          >
                            {notif.title}
                          </p>
                          <p
                            style={{
                              fontSize: '12px',
                              color: colors.text,
                              margin: '0 0 6px 0',
                              opacity: 0.85,
                              lineHeight: '1.4',
                            }}
                          >
                            {notif.message}
                          </p>
                          <p
                            style={{
                              fontSize: '11px',
                              color: colors.text,
                              opacity: 0.7,
                              margin: 0,
                            }}
                          >
                            {formatTime(notif.timestamp)}
                          </p>
                        </div>

                        <motion.button
                          onClick={() => dismissNotification(notif.id)}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            color: colors.text,
                            opacity: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          <X size={16} />
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                }}
              >
                <Bell
                  size={32}
                  style={{
                    color: COLORS.textLight,
                    opacity: 0.5,
                    marginBottom: '8px',
                  }}
                />
                <p
                  style={{
                    fontSize: '13px',
                    color: COLORS.textLight,
                    margin: 0,
                  }}
                >
                  No notifications yet
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;