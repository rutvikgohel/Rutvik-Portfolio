import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<'init' | 'reveal' | 'exit'>('init');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout1 = setTimeout(() => setPhase('reveal'), 400);
    const timeout2 = setTimeout(() => setPhase('exit'), 2200);
    const timeout3 = setTimeout(onComplete, 2800);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(current, 100));
    }, 80);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearInterval(interval);
    };
  }, [onComplete]);

  const letters = ['R', 'G'];

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-80 h-80 rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Cinematic bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-black origin-top"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === 'reveal' ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ height: '50%' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-black origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: phase === 'reveal' ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ height: '50%' }}
          />

          {/* Initials */}
          <div className="relative flex items-center gap-1 z-10">
            {letters.map((letter, i) => (
              <motion.div
                key={letter}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="text-[7rem] font-black tracking-tighter leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {letter}
                </span>
              </motion.div>
            ))}

            {/* Glow under initials */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.5) 0%, transparent 70%)' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </div>

          {/* Name and title */}
          <motion.div
            className="text-center mt-6 z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <p className="text-white/40 text-sm font-medium tracking-[0.3em] uppercase">
              Rutvik Gohel
            </p>
            <p className="text-white/20 text-xs tracking-[0.2em] uppercase mt-1 font-mono">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-center text-white/20 text-[10px] font-mono mt-2 tracking-widest">
              {Math.round(progress)}%
            </p>
          </motion.div>

          {/* Corner decorations */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-6 h-6 border-white/20 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
