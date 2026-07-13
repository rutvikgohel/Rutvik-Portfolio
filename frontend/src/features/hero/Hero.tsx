import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth movement easing
  const springX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  // Map mouse positions to translation values for different parallax layers
  const gridX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const gridY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const starX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const starY = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  const textX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const textY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden border-b border-border"
    >
      {/* Editorial Grid overlay (Parallax Layer 1) */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-x-[-40px] inset-y-[-40px] grid-bg opacity-30 z-0 pointer-events-none"
      />

      {/* Abstract Sun/Moon sky visual container */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Day/Sunset sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-peach/5 via-bg-alt/20 to-bg transition-opacity duration-1000 dark:opacity-0" />
        {/* Night sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-peach/10 via-[#10121a]/60 to-[#0b0c10] opacity-0 transition-opacity duration-1000 dark:opacity-100" />
        
        {/* Editorial constellation background (Parallax Layer 2) */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ x: starX, y: starY }}
          className="absolute right-[5%] top-[12%] h-[30%] w-[35%] opacity-60 text-peach/30 dark:text-peach/40"
        >
          <line x1="15" y1="60" x2="30" y2="45" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 1" />
          <line x1="30" y1="45" x2="45" y2="58" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 1" />
          <line x1="45" y1="58" x2="60" y2="42" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 1" />
          <line x1="60" y1="42" x2="75" y2="55" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 1" />
          
          <circle cx="15" cy="60" r="1" fill="currentColor" className="np-star" />
          <circle cx="30" cy="45" r="0.8" fill="currentColor" className="np-star" style={{ animationDelay: '0.4s' }} />
          <circle cx="45" cy="58" r="1.2" fill="currentColor" className="np-star" style={{ animationDelay: '0.8s' }} />
          <circle cx="60" cy="42" r="0.9" fill="currentColor" className="np-star" style={{ animationDelay: '1.2s' }} />
          <circle cx="75" cy="55" r="1" fill="currentColor" className="np-star" style={{ animationDelay: '1.6s' }} />
        </motion.svg>
      </div>

      <div className="relative z-10 section-container w-full pt-28 pb-16 md:pt-36 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Description & Call to Actions (Parallax Layer 3) */}
        <motion.div
          style={{ x: textX, y: textY }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="eyebrow mb-6">
            <span className="num">00</span>
            <span className="rule"></span>
            <span>{PERSONAL_INFO.role}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-ink mb-6 leading-none">
            Rutvik Gohel
          </h1>

          {/* Description */}
          <p className="font-serif text-lg md:text-xl text-ink-muted leading-relaxed max-w-xl mb-10">
            {PERSONAL_INFO.tagline} I build production ASP.NET Core backends, React interfaces, and enterprise systems that streamline workflows and solve complex business operations.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group relative inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bg transition-colors duration-300 hover:bg-peach"
            >
              Get in touch
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center border border-border px-6 py-3.5 text-sm font-semibold rounded-full hover:border-peach transition-colors"
            >
              View Selected Work
            </a>
          </div>
        </motion.div>

        {/* Right Column: Selected Proof Statistics Panel */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full mt-10 lg:mt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0"
        >
          <div className="flex flex-col gap-6">
            {/* Subsection header */}
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase">
              <span>Selected Proof</span>
              <span className="h-px w-12 bg-border"></span>
              <span>Enterprise Scale</span>
            </div>

            {/* Grid statistics */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-ink">3+</span>
                <span className="font-mono text-[9px] leading-snug tracking-[0.18em] text-ink-muted uppercase">Major Projects Delivered</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-ink">1+</span>
                <span className="font-mono text-[9px] leading-snug tracking-[0.18em] text-ink-muted uppercase">Years experience</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-ink">8.45</span>
                <span className="font-mono text-[9px] leading-snug tracking-[0.18em] text-ink-muted uppercase">MCA CGPA</span>
              </div>
            </div>

            <p className="text-sm md:text-base text-ink-muted leading-relaxed italic">
              "Building robust web portals for TretaGen and Novanectar, integrating secure systems, database schema designs, and automated application tracking workflows."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
