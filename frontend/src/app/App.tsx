import { useEffect } from 'react';
import Lenis from 'lenis';

import { CelestialToggle } from '@/components/ui/CelestialToggle';
import { TocRail } from '@/components/layout/TocRail';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/features/hero/Hero';
import { About } from '@/features/about/About';
import { Experience } from '@/features/experience/Experience';
import { Projects } from '@/features/projects/Projects';
import { Skills } from '@/features/skills/Skills';
import { Contact } from '@/features/contact/Contact';

export function App() {
  useEffect(() => {
    // Set default theme from localStorage or system time
    try {
      const saved = localStorage.getItem("site-theme");
      if (saved === "dark" || saved === "light") {
        document.documentElement.dataset.theme = saved;
      } else {
        const hour = new Date().getHours();
        document.documentElement.dataset.theme = (hour >= 18 || hour < 6) ? "dark" : "light";
      }
    } catch (e) {
      document.documentElement.dataset.theme = "light";
    }

    // Lenis smooth scroll
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
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-ink antialiased">
      {/* Warm wash grain background overlay */}
      <div className="warm-wash" aria-hidden="true" />

      {/* Floating Section Progress Sidebar Rail */}
      <TocRail />

      {/* Floating back-to-top header pill */}
      <Navbar />

      {/* Page Content sections */}
      <main id="main" className="relative focus:outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Simple elegant footer */}
      <Footer />
    </div>
  );
}
