import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function AuroraBackground() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-10" />

      {/* Primary aurora blob - blue, follows mouse */}
      <motion.div
        className="aurora-layer"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.16) 0%, transparent 70%)',
          top: '5%',
          left: '15%',
        }}
        animate={{
          x: normalizedX * 30,
          y: normalizedY * 20,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Secondary aurora blob - purple */}
      <motion.div
        className="aurora-layer"
        style={{
          width: 550,
          height: 550,
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.14) 0%, transparent 70%)',
          top: '25%',
          right: '5%',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Tertiary aurora blob - cyan */}
      <motion.div
        className="aurora-layer"
        style={{
          width: 450,
          height: 450,
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          bottom: '15%',
          left: '35%',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Small accent orbs */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{ top: '30%', left: '20%' }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-secondary"
        style={{ top: '60%', right: '25%' }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent"
        style={{ bottom: '30%', left: '15%' }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(3,7,18,0.6) 100%)',
        }}
      />
    </div>
  );
}
