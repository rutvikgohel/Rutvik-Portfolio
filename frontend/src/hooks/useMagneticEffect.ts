import { useRef, useCallback } from 'react';

interface MagneticEffectOptions {
  strength?: number;
  ease?: number;
}

export function useMagneticEffect<T extends HTMLElement>({
  strength = 30,
  ease = 0.15,
}: MagneticEffectOptions = {}) {
  const ref = useRef<T>(null);
  const animFrameRef = useRef<number>(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      targetX.current = ((e.clientX - centerX) / rect.width) * strength;
      targetY.current = ((e.clientY - centerY) / rect.height) * strength;

      const animate = () => {
        currentX.current += (targetX.current - currentX.current) * ease;
        currentY.current += (targetY.current - currentY.current) * ease;

        el.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;

        if (
          Math.abs(currentX.current - targetX.current) > 0.1 ||
          Math.abs(currentY.current - targetY.current) > 0.1
        ) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      };

      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(animate);
    },
    [strength, ease]
  );

  const onMouseLeave = useCallback(() => {
    targetX.current = 0;
    targetY.current = 0;

    const el = ref.current;
    if (!el) return;

    const animate = () => {
      currentX.current += (0 - currentX.current) * ease;
      currentY.current += (0 - currentY.current) * ease;

      el.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;

      if (Math.abs(currentX.current) > 0.1 || Math.abs(currentY.current) > 0.1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        el.style.transform = 'translate(0px, 0px)';
      }
    };

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  }, [ease]);

  return { ref, onMouseMove, onMouseLeave };
}
