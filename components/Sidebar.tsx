'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Home,
  Users,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  onSettingsClick: () => void;
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

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  onSettingsClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'homes', label: 'Properties', icon: Home },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={SPRING}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: isCollapsed ? '80px' : '280px',
        background: COLORS.background,
        borderRight: `1px solid ${COLORS.border}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          padding: isCollapsed ? '20px 12px' : '24px',
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <motion.div
          animate={{ scale: isCollapsed ? 1 : 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flex: 1,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '18px',
              flexShrink: 0,
            }}
          >
            H
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: COLORS.textDark,
                  margin: 0,
                }}
              >
                Home Pro
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: COLORS.textLight,
                  margin: '2px 0 0 0',
                }}
              >
                Maintenance
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: COLORS.lightBg,
            border: 'none',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            color: COLORS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </motion.button>
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`
                  : COLORS.background,
                color: isActive ? 'white' : COLORS.textDark,
                border: isActive ? 'none' : `1px solid ${COLORS.border}`,
                borderRadius: '12px',
                padding: isCollapsed ? '12px' : '14px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontWeight: isActive ? '700' : '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                width: '100%',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                boxShadow: isActive ? `0 4px 12px ${COLORS.primary}20` : 'none',
              }}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={20} style={{ flexShrink: 0 }} />
              {!isCollapsed && <span>{item.label}</span>}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          padding: '16px 8px',
          borderTop: `1px solid ${COLORS.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <motion.button
          onClick={onSettingsClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: COLORS.lightBg,
            color: COLORS.textDark,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            padding: isCollapsed ? '12px' : '14px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: '600',
            fontSize: '14px',
            width: '100%',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
          }}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings size={20} style={{ flexShrink: 0 }} />
          {!isCollapsed && <span>Settings</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;