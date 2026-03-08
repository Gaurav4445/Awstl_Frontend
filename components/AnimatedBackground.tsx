'use client';

import React from 'react';
import GradientOrb from './GradientOrb';
import FloatingElements from './FloatingElements';

interface AnimatedBackgroundProps {
  isDarkMode: boolean;
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDarkMode, children }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Animated Background Orbs */}
      <GradientOrb
        color="#10b981"
        size={300}
        blur={80}
        top="-100px"
        left="10%"
        animationDuration={8}
        opacity={0.3}
      />
      <GradientOrb
        color="#3b82f6"
        size={250}
        blur={70}
        top="30%"
        left="80%"
        animationDuration={10}
        opacity={0.25}
      />
      <GradientOrb
        color="#f59e0b"
        size={200}
        blur={60}
        top="60%"
        left="5%"
        animationDuration={12}
        opacity={0.2}
      />
      <GradientOrb
        color="#ec4899"
        size={280}
        blur={75}
        top="-50px"
        left="60%"
        animationDuration={9}
        opacity={0.15}
      />

      {/* Floating Elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <FloatingElements isDarkMode={isDarkMode} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;