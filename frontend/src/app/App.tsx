import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { Loader } from '@/features/loader/Loader';
import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Experience } from '@/features/experience/Experience';
import { Projects } from '@/features/projects/Projects';
import { Skills } from '@/features/skills/Skills';
import { Education } from '@/features/education/Education';
import { Contact } from '@/features/contact/Contact';

export function App() {
  const [loaded, setLoaded] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Init smooth scroll
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [loaded]);

  // Command palette shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (!loaded) document.body.style.overflow = 'hidden';
  }, [loaded]);

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main content */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Custom cursor (desktop only) */}
            <CustomCursor />

            {/* Command palette */}
            <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

            {/* Toast notifications */}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#0F172A',
                  color: '#fff',
                  border: '1px solid #1E293B',
                  fontSize: '13px',
                  borderRadius: '12px',
                },
              }}
            />

            {/* Navigation */}
            <Navbar onCommandPaletteOpen={() => setCmdOpen(true)} />

            {/* Page sections */}
            <main className="relative">
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Education />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
