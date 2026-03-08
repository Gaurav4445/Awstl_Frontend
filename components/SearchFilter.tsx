'use client';

import React from 'react';
import { Search } from 'lucide-react';

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
  const cardBg = isDarkMode ? '#334155' : 'white';
  const inputBg = isDarkMode ? '#1e293b' : 'white';
  const inputBorder = isDarkMode ? '#475569' : '#e2e8f0';
  const textColor = isDarkMode ? '#f1f5f9' : '#1e293b';
  const secondaryText = isDarkMode ? '#cbd5e1' : '#94a3b8';

  return (
    <div style={{
      background: cardBg,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: `1px solid ${inputBorder}`,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}>
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '10px',
            color: secondaryText,
          }} size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '12px',
              paddingTop: '10px',
              paddingBottom: '10px',
              border: `2px solid ${inputBorder}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease',
              background: inputBg,
              color: textColor,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#10b981')}
            onBlur={(e) => (e.currentTarget.style.borderColor = inputBorder)}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `2px solid ${inputBorder}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            background: inputBg,
            color: textColor,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#10b981')}
          onBlur={(e) => (e.currentTarget.style.borderColor = inputBorder)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filterRoom}
          onChange={(e) => setFilterRoom(e.target.value)}
          style={{
            padding: '10px 12px',
            border: `2px solid ${inputBorder}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            background: inputBg,
            color: textColor,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#10b981')}
          onBlur={(e) => (e.currentTarget.style.borderColor = inputBorder)}
        >
          <option value="all">All Rooms</option>
          {rooms.map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;