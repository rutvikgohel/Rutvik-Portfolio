import { motion } from 'framer-motion';

const TECH_ITEMS = [
  { label: 'C#', color: '#9B4F96', bg: 'rgba(155,79,150,0.08)', border: 'rgba(155,79,150,0.2)', x: '8%', y: '20%', delay: 0, size: 'sm' },
  { label: 'ASP.NET', color: '#512BD4', bg: 'rgba(81,43,212,0.08)', border: 'rgba(81,43,212,0.2)', x: '85%', y: '15%', delay: 0.5, size: 'md' },
  { label: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.06)', border: 'rgba(97,218,251,0.15)', x: '88%', y: '60%', delay: 1, size: 'md' },
  { label: 'PostgreSQL', color: '#336791', bg: 'rgba(51,103,145,0.08)', border: 'rgba(51,103,145,0.2)', x: '5%', y: '65%', delay: 1.5, size: 'md' },
  { label: 'Tailwind', color: '#06B6D4', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.15)', x: '75%', y: '38%', delay: 0.8, size: 'sm' },
  { label: 'Entity Framework', color: '#68217A', bg: 'rgba(104,33,122,0.07)', border: 'rgba(104,33,122,0.18)', x: '12%', y: '42%', delay: 1.2, size: 'sm' },
  { label: '.NET Core', color: '#512BD4', bg: 'rgba(81,43,212,0.08)', border: 'rgba(81,43,212,0.2)', x: '60%', y: '10%', delay: 0.3, size: 'sm' },
  { label: 'SOLID', color: '#F59E0B', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.15)', x: '30%', y: '78%', delay: 1.8, size: 'sm' },
];

interface TechPillProps {
  label: string;
  color: string;
  bg: string;
  border: string;
  delay: number;
  size: 'sm' | 'md';
  x: string;
  y: string;
}

function TechPill({ label, color, bg, border, delay, size, x, y }: TechPillProps) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm"
      style={{
        left: x,
        top: y,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        color,
        fontSize: size === 'sm' ? 11 : 12,
        fontWeight: 500,
        letterSpacing: '0.02em',
        boxShadow: `0 0 20px ${bg}`,
      }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delay + 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay }}
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.3,
        }}
        style={{ display: 'contents' }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export function FloatingTechElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {TECH_ITEMS.map((item) => (
        <motion.div
          key={item.label}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4 + item.delay * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay * 0.4,
          }}
          className="absolute"
          style={{ left: item.x, top: item.y }}
        >
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-medium hidden lg:flex"
            style={{
              backgroundColor: item.bg,
              border: `1px solid ${item.border}`,
              color: item.color,
              letterSpacing: '0.02em',
              boxShadow: `0 4px 20px ${item.bg}, 0 0 0 1px ${item.border}`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}
            />
            {item.label}
          </div>
        </motion.div>
      ))}

      {/* Connecting lines (subtle) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] hidden lg:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="35%" y2="50%" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="85%" y1="15%" x2="60%" y2="45%" stroke="url(#lineGrad)" strokeWidth="0.5" />
        <line x1="5%" y1="65%" x2="30%" y2="78%" stroke="url(#lineGrad)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
