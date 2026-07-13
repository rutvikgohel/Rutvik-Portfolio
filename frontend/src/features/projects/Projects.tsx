import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Sparkles } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Springs for smoothing
  const springX = useSpring(tiltX, { damping: 30, stiffness: 200 });
  const springY = useSpring(tiltY, { damping: 30, stiffness: 200 });

  // Translation values
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

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
    <div className="perspective-1000 w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="card p-6 md:p-8 bg-bg-alt/10 border-border hover:border-peach/30 transition-all duration-300 preserve-3d cursor-pointer shadow-warm-sm"
      >
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Column: Context, Narrative details */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Status & Category info */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-widest text-peach uppercase bg-peach/10 border border-peach/20 px-2.5 py-0.5 rounded-full">
                {project.category}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">
                {project.year} · {project.status}
              </span>
            </div>

            {/* Title & Sub */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink leading-tight mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-ink-muted italic font-light">
                {project.subtitle}
              </p>
            </div>

            {/* Narrative text blocks */}
            <div className="flex flex-col gap-4 mt-2">
              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                  The Problem
                </span>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                  The Solution
                </span>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                  Technical Challenges & Details
                </span>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed italic">
                  {project.challenges}
                </p>
              </div>

              <div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                  System Architecture
                </span>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Code Action links, Feature lists & Stack tags */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 lg:border-l border-border/40">
            {/* Header / Actions link */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted">
                Build Specs
              </span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-border px-3 py-1 rounded-full hover:border-peach hover:text-peach transition-all duration-300 text-[10px] font-semibold font-mono"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={11} />
                  Codebase
                </a>
              )}
            </div>

            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted block mb-2">
                Core Features
              </span>
              <ul className="list-disc list-inside text-[11px] text-ink-muted space-y-1.5 pl-1 leading-relaxed">
                {project.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="font-serif">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted block mb-2">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[9px] font-mono bg-bg-alt border border-border uppercase tracking-wide text-ink-muted font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted block mb-2">
                Future Roadmap
              </span>
              <ul className="list-disc list-inside text-[10px] text-ink-muted/80 space-y-1 pl-1 leading-normal">
                {project.future.map((fut, idx) => (
                  <li key={idx}>
                    <span className="font-serif">{fut}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-16 md:py-24 border-b border-border">
      <div className="section-container relative z-10 text-left">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="eyebrow mb-4">
            <span className="num">03</span>
            <span className="rule"></span>
            <span>Work & Projects</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-ink">
            Selected builds
          </h2>
        </motion.div>

        {/* Projects list (fully static details) */}
        <div className="flex flex-col gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
