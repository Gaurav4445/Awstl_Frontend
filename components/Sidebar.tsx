'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard, CheckSquare, Calendar, Home, Users, Settings, Bell } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isDarkMode, onSettingsClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const bgColor = isDarkMode ? '#1e293b' : 'white';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const hoverBg = isDarkMode ? '#334155' : '#f1f5f9';
  const activeBg = '#10b981';
  const borderColor = isDarkMode ? '#334155' : '#e2e8f0';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'homes', label: 'My Homes', icon: Home },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Home },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      style={{
        background: bgColor,
        borderRight: `1px solid ${borderColor}`,
        width: isCollapsed ? '80px' : '280px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        transition: 'width 0.3s ease',
        zIndex: 100,
      }}
    >
      {/* Header with Logo + Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        {!isCollapsed && (
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: textColor,
            fontFamily: '"Playfair Display", serif',
          }}>
            HM Pro
          </h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: textColor,
            padding: '8px',
          }}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: isActive ? activeBg : 'transparent',
                color: isActive ? 'white' : textColor,
                border: 'none',
                borderRadius: '12px',
                padding: isCollapsed ? '12px' : '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: isCollapsed ? '0' : '12px',
                transition: 'all 0.3s ease',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <Icon size={20} />
              {!isCollapsed && <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.label}</span>}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Settings */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderTop: `1px solid ${borderColor}`,
        paddingTop: '20px',
      }}>
        <motion.button
          onClick={onSettingsClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            color: textColor,
            border: 'none',
            borderRadius: '12px',
            padding: isCollapsed ? '12px' : '12px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: isCollapsed ? '0' : '12px',
            transition: 'all 0.3s ease',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = hoverBg;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          <Settings size={20} />
          {!isCollapsed && <span style={{ fontSize: '14px', fontWeight: '600' }}>Settings</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;