import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { PROJECTS, TECH_MARQUEE } from '@/lib/constants';
import type { Project } from '@/types';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
      />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Projects</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            Products I've built
            <br />
            <span className="gradient-text">from the ground up</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-2xl leading-relaxed"
          >
            Every project is a case study in solving real business problems — multi-portal systems, healthcare platforms, and recruitment tools built with enterprise-grade architecture.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-16 border-t border-white/5"
        >
          <p className="text-center text-xs text-white/25 uppercase tracking-widest font-semibold mb-8">
            Technologies across all projects
          </p>
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 mx-6 text-sm text-white/25 font-medium whitespace-nowrap"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
