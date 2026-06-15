import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'words' | 'chars' | 'lines';
  once?: boolean;
}

const charVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  type = 'words',
  once = true,
}: AnimatedTextProps) {
  if (type === 'chars') {
    const chars = text.split('');
    return (
      <motion.span
        className={cn('inline-block', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        aria-label={text}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            custom={i + delay / 0.03}
            variants={charVariants}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  const words = text.split(' ');
  return (
    <motion.span
      className={cn('inline', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            custom={i + delay / stagger}
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

export function GradientHeading({ children, className, as: Tag = 'h2' }: GradientHeadingProps) {
  return (
    <Tag
      className={cn(
        'gradient-text font-bold tracking-tight',
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-primary/10 border border-primary/20 text-primary',
        'text-xs font-semibold tracking-widest uppercase',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </motion.div>
  );
}
