import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, { stiffness: 500, damping: 30, mass: 0.5 });
  const smoothY = useSpring(rawY, { stiffness: 500, damping: 30, mass: 0.5 });

  const borderX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.8 });
  const borderY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsHidden(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleHoverStart = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
      );

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    handleHoverStart();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot pointer-events-none fixed z-[99999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Border cursor */}
      <motion.div
        className="pointer-events-none fixed z-[99998] rounded-full border border-primary/60"
        style={{
          x: borderX,
          y: borderY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 24 : 32,
          height: isHovering ? 48 : isClicking ? 24 : 32,
          borderColor: isHovering ? 'rgba(59,130,246,0.9)' : 'rgba(59,130,246,0.5)',
          opacity: isHidden ? 0 : 1,
          backgroundColor: isHovering ? 'rgba(59,130,246,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
