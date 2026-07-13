import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '@/lib/constants';
import { CelestialToggle } from '@/components/ui/CelestialToggle';
import resumePdf from '@/Rutvik Gohel resume.pdf?url';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      // Track active section for nav highlighting
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-border shadow-warm-sm py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group"
        >
          <span className="font-sans text-lg font-bold tracking-tight text-ink group-hover:text-peach transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-peach shadow-[0_0_8px_var(--peach)]" />
        </button>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.section}
                onClick={(e) => handleNavClick(e, item.section)}
                className={`relative font-sans text-xs uppercase tracking-wider font-semibold transition-colors duration-300 py-1 ${
                  isActive ? 'text-peach' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-peach rounded"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions: CelestialToggle + Resume */}
        <div className="flex items-center gap-4">
          <CelestialToggle />
          
          <a
            href={resumePdf}
            download="Rutvik_Gohel_Resume.pdf"
            className="inline-flex items-center gap-2 border border-border bg-bg hover:border-peach hover:text-peach text-ink font-sans text-xs font-semibold px-4 py-2 rounded-full shadow-warm-sm transition-all duration-300"
          >
            <Download size={12} />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
