import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D card tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Springs for smooth tilt transition
  const springX = useSpring(tiltX, { damping: 25, stiffness: 200 });
  const springY = useSpring(tiltY, { damping: 25, stiffness: 200 });

  // Map offsets to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]); // Inverse Y to tilt toward cursor
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(x);
    tiltY.set(y);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section ref={sectionRef} id="about" className="relative pt-12 pb-16 md:pt-24 md:pb-24 border-b border-border">
      {/* Current Status Band (Now) */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="border-y border-border bg-bg-alt/20 py-4 px-6 md:px-12 mb-16 md:mb-24"
      >
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-[auto_repeat(4,minmax(0,1fr))] items-start gap-4 md:gap-8">
          {/* Now label */}
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-peach md:min-h-[18px]">
            <span className="relative inline-flex items-center justify-center h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-peach/50"></span>
              <span className="relative rounded-full bg-peach h-1 w-1"></span>
            </span>
            <span>Now · Jul '26</span>
          </div>
          {/* Building */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-muted">Building</span>
            <span className="font-serif text-sm font-semibold italic text-ink leading-tight">School Management Portals</span>
            <span className="text-[11px] leading-snug text-ink-muted">Role-Based Access Control systems</span>
          </div>
          {/* Reading */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-muted">Reading</span>
            <span className="font-serif text-sm font-semibold italic text-ink leading-tight">Clean Architecture</span>
            <span className="text-[11px] leading-snug text-ink-muted">Robert C. Martin</span>
          </div>
          {/* Studying */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-muted">Exploring</span>
            <span className="font-serif text-sm font-semibold italic text-ink leading-tight">CQRS & MediatR Patterns</span>
            <span className="text-[11px] leading-snug text-ink-muted">Event sourcing & system design</span>
          </div>
          {/* Last Shipped */}
          <div className="flex flex-col text-left">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-muted">Last Shipped</span>
            <span className="font-serif text-sm font-semibold italic text-ink leading-tight">Pharmacy Operations API</span>
            <span className="text-[11px] leading-snug text-ink-muted">Secure JWT clinical workflows</span>
          </div>
        </div>
      </motion.div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-16 text-left"
        >
          <div className="eyebrow mb-4">
            <span className="num">01</span>
            <span className="rule"></span>
            <span>Background & Working Style</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-ink">
            A software engineer <span className="italic text-peach">who thinks in systems</span>
          </h2>
        </motion.div>

        {/* Marquee disciplines list */}
        <div className="mb-12 border-y border-border py-4">
          <div className="marquee-track">
            <div className="mq-rail">
              <div className="mq-group">
                {['Production React', 'ASP.NET Core', 'PostgreSQL', 'C# Backend', 'TypeScript', 'Clean Architecture', 'SOLID Principles', 'Database Schema Design', 'Entity Framework', 'REST API Design'].map((item) => (
                  <span key={item} className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                    <span>{item}</span>
                    <span className="text-peach">•</span>
                  </span>
                ))}
              </div>
              <div className="mq-group" aria-hidden="true">
                {['Production React', 'ASP.NET Core', 'PostgreSQL', 'C# Backend', 'TypeScript', 'Clean Architecture', 'SOLID Principles', 'Database Schema Design', 'Entity Framework', 'REST API Design'].map((item) => (
                  <span key={item + '-dup'} className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                    <span>{item}</span>
                    <span className="text-peach">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          {/* Left Column: Narrative description */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <p className="drop-cap text-lg leading-relaxed text-ink">
              {PERSONAL_INFO.bio[0]} I enjoy crafting the clean interfaces users rely on daily, alongside the rigorous backend patterns and schema boundaries that ensure security and durability under the hood.
            </p>
            <p className="text-base leading-relaxed text-ink-muted">
              {PERSONAL_INFO.bio[1]} Over the course of my projects, I've designed role-based portals for school administrations, clinical inventories for local pharmacies, and modern job search applications.
            </p>
            <p className="text-base leading-relaxed text-ink-muted">
              {PERSONAL_INFO.bio[2]} I am drawn to environments where developers take full ownership of the lifecycle: modeling data, designing component APIs, structuring testing boundaries, and refining details. Currently expanding my expertise in Clean Architecture, CQRS, and type-safe frontends.
            </p>
            
            {/* Signature line */}
            <div className="flex items-center gap-4 border-t border-dashed border-border pt-6 mt-4">
              <span className="font-mono text-peach">/</span>
              <span className="font-serif text-xl font-semibold italic text-ink">{PERSONAL_INFO.name}</span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-ink-muted uppercase">· Software Engineer</span>
            </div>
          </motion.div>

          {/* Right Column: Graduation Vitals Card */}
          <motion.aside
            initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full flex flex-col gap-6 lg:pl-6"
          >
            {/* Profile frame with user image (3D Tilt Container) */}
            <div className="perspective-1000 w-full">
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative overflow-hidden rounded-lg aspect-[4/5] border border-border cursor-pointer preserve-3d"
              >
                <img
                  src="/rutvik-graduation.jpg"
                  alt={`${PERSONAL_INFO.name} portrait`}
                  className="w-full h-full object-cover pointer-events-none"
                  style={{ filter: 'var(--portrait-filter)' }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: 'var(--portrait-tint)', mixBlendMode: 'multiply' }}
                />
              </motion.div>
            </div>

            {/* Vitals Label */}
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2 mt-4">
              <span className="font-serif text-lg font-bold text-ink">Vitals</span>
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-ink-muted">Vol. 01 · '26</span>
            </div>

            {/* Vitals items list */}
            <dl className="flex flex-col gap-4">
              <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-peach">Currently</dt>
                <dd className="flex flex-col text-left">
                  <span className="font-serif text-sm font-semibold italic text-ink">Full Stack Developer</span>
                  <span className="text-[12px] leading-snug text-ink-muted">TretaGen · ASP.NET Core, React, PostgreSQL</span>
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-peach">Previously</dt>
                <dd className="flex flex-col text-left">
                  <span className="font-serif text-sm font-semibold italic text-ink">Web Developer Trainee</span>
                  <span className="text-[12px] leading-snug text-ink-muted">Novanectar Services · HTML, CSS, JS Portal Development</span>
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-peach">Based in</dt>
                <dd className="flex flex-col text-left">
                  <span className="font-serif text-sm font-semibold italic text-ink">Ahmedabad, India</span>
                  <span className="text-[12px] leading-snug text-ink-muted">MCA Graduate, Indus University</span>
                </dd>
              </div>
              <div className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b border-border pb-3">
                <dt className="font-mono text-[9px] tracking-[0.22em] uppercase text-peach">Open to</dt>
                <dd className="flex flex-col text-left">
                  <span className="font-serif text-sm font-semibold italic text-ink">Full-time & Freelance roles</span>
                  <span className="text-[12px] leading-snug text-ink-muted">Product-oriented, scalable software workflows</span>
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
