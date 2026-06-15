import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props },
    ref
  ) => {
    const variants = {
      primary:
        'bg-primary hover:bg-blue-500 text-white shadow-lg hover:shadow-glow-primary transition-all duration-300',
      secondary:
        'bg-secondary hover:bg-violet-500 text-white shadow-lg hover:shadow-glow-secondary transition-all duration-300',
      gradient:
        'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-300',
      ghost:
        'bg-transparent hover:bg-white/5 text-white/80 hover:text-white transition-all duration-200',
      outline:
        'bg-transparent border border-white/20 hover:border-primary/60 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
      md: 'px-6 py-3 text-sm rounded-xl gap-2',
      lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'relative inline-flex items-center justify-center font-medium',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'select-none overflow-hidden',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Shimmer effect on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
