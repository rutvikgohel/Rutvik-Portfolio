import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Terminal, Menu, X } from 'lucide-react';
import { NAV_ITEMS, PERSONAL_INFO } from '@/lib/constants';
import { useScrollProgress, useActiveSection } from '@/hooks/useScrollProgress';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onCommandPaletteOpen: () => void;
}

export function Navbar({ onCommandPaletteOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.section));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent z-[1001] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[1000] transition-all duration-500',
          scrolled || mobileOpen
            ? 'py-3 bg-[#030712]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'py-4 sm:py-5 bg-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="relative group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-300">
              RG
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
            </div>
            <span className="font-semibold text-white/90 text-sm hidden sm:block tracking-wide">
              Rutvik Gohel
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  activeSection === item.section
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                )}
              >
                {activeSection === item.section && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/8 rounded-lg border border-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <button
              onClick={onCommandPaletteOpen}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200 text-white/40 hover:text-white/70 text-xs"
            >
              <Terminal size={14} />
              <span>Cmd</span>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] border border-white/10">
                {navigator.platform.startsWith('Mac') ? '⌘' : 'Ctrl'}+K
              </kbd>
            </button>

            {/* Resume download */}
            <motion.a
              href="/resume.pdf"
              download="Rutvik_Gohel_Resume.pdf"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-xl text-primary text-sm font-medium transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={14} />
              <span>Resume</span>
            </motion.a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] left-0 right-0 z-[999] bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="section-container py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    activeSection === item.section
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => { setMobileOpen(false); onCommandPaletteOpen(); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm"
                >
                  <Terminal size={14} />
                  Command Palette
                </button>
                <a
                  href="/resume.pdf"
                  download="Rutvik_Gohel_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <Download size={14} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
