import { useRef, useCallback } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glareOpacity?: number;
}

export function useTilt<T extends HTMLElement>({
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glareOpacity = 0.1,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const tiltX = y * maxTilt;
      const tiltY = x * maxTilt;

      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
      el.style.transition = 'transform 0.1s ease';

      if (glareRef.current) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`;
      }
    },
    [maxTilt, perspective, scale, glareOpacity]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

    if (glareRef.current) {
      glareRef.current.style.background = 'transparent';
    }
  }, []);

  return { ref, glareRef, onMouseMove, onMouseLeave };
}
