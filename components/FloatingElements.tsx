'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  isDarkMode: boolean;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ isDarkMode }) => {
  const elements = [
    { emoji: '🏠', x: 10, y: 20, duration: 6, delay: 0 },
    { emoji: '🔧', x: 85, y: 70, duration: 8, delay: 1 },
    { emoji: '✨', x: 75, y: 15, duration: 7, delay: 0.5 },
    { emoji: '💡', x: 15, y: 75, duration: 9, delay: 1.5 },
    { emoji: '🛠️', x: 90, y: 40, duration: 7, delay: 0.8 },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {elements.map((element, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: '60px',
            opacity: 0.15,
            zIndex: 1,
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;