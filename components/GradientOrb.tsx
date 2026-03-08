'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientOrbProps {
  color: string;
  size: number;
  blur: number;
  top: string;
  left: string;
  animationDuration: number;
  opacity?: number;
}

const GradientOrb: React.FC<GradientOrbProps> = ({
  color,
  size,
  blur,
  top,
  left,
  animationDuration,
  opacity = 0.2,
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 0.5, opacity],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: '50%',
        filter: `blur(${blur}px)`,
        top,
        left,
        zIndex: 0,
      }}
    />
  );
};

export default GradientOrb;