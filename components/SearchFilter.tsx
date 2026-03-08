'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterRoom: string;
  setFilterRoom: (room: string) => void;
  categories: string[];
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

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterRoom,
  setFilterRoom,
  categories,
  rooms,
  isDarkMode,
}) => {
  const SPRING = {
    smooth: { type: "spring" as const, stiffness: 300, damping: 35 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
      style={{
        background: COLORS.background,
        borderRadius: '16px',
        padding: 'clamp(20px, 4vw, 28px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
        border: `1px solid ${COLORS.border}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <Sparkles size={20} style={{ color: COLORS.primary }} />
        <h3
          style={{
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '700',
            color: COLORS.textDark,
            margin: 0,
          }}
        >
          Find Tasks
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(clamp(150px, 100%, 250px), 1fr))',
          gap: 'clamp(12px, 2vw, 16px)',
        }}
      >
        {/* Search Input */}
        <motion.div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: COLORS.textLight,
              pointerEvents: 'none',
            }}
          />
          <motion.input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.01 }}
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: `1px solid ${COLORS.border}`,
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              background: COLORS.background,
              color: COLORS.textDark,
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                COLORS.primary;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${COLORS.primary}20`;
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          />
        </motion.div>

        {/* Category Select */}
        <motion.select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          style={{
            padding: '12px 16px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
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
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </motion.select>

        {/* Room Select */}
        <motion.select
          value={filterRoom}
          onChange={(e) => setFilterRoom(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          style={{
            padding: '12px 16px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
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
          <option value="all">All Rooms</option>
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </motion.select>
      </div>
    </motion.div>
  );
};

export default SearchFilter;