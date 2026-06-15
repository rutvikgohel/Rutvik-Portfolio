import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glowColor?: string;
  hover?: boolean;
  gradient?: boolean;
  children: React.ReactNode;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, glowColor, hover = true, gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden',
          'bg-[#0F172A]/60 backdrop-blur-xl',
          'border border-[#1E293B]/80',
          hover && 'transition-all duration-300 hover:border-primary/30 hover:bg-[#0F172A]/80',
          gradient && 'border-gradient-subtle',
          className
        )}
        style={{
          boxShadow: glow
            ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(${glowColor || '59,130,246'},0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        {...props}
      >
        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)`,
          }}
        />
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
