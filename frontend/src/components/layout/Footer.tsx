import { Heart, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg py-12">
      <div className="section-container relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright info */}
        <p className="font-mono text-[10px] tracking-wider text-ink-muted flex items-center gap-1">
          © {currentYear} {PERSONAL_INFO.name}. Built with
          <Heart size={10} className="text-peach fill-peach" />
          using React + .NET
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted hover:text-peach transition-colors duration-300 group"
        >
          Back to top
          <span className="p-1.5 rounded-full border border-border group-hover:border-peach/50 transition-colors">
            <ArrowUp size={10} />
          </span>
        </button>
      </div>
    </footer>
  );
}
