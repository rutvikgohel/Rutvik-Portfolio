import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Eye } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

const PROJECT_NUMBERS = ['01', '02', '03'];

export function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { ref, glareRef, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({
    maxTilt: 5,
    scale: 1.02,
    glareOpacity: 0.06,
  });

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        className="relative group rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
        style={{
          background: 'linear-gradient(145deg, #0D1526 0%, #0A0F1E 100%)',
          border: `1px solid ${hovered ? `${project.color}45` : 'rgba(30,41,59,0.7)'}`,
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${project.color}25, 0 0 60px ${project.color}12`
            : '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        }}
        onClick={() => onOpenModal(project)}
      >
        {/* Glare overlay */}
        <div ref={glareRef} className="absolute inset-0 pointer-events-none z-10 rounded-2xl" />

        {/* Large project number — watermark */}
        <span
          className="project-num select-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}, rgba(255,255,255,0.1))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: hovered ? 0.07 : 0.035,
            transition: 'opacity 0.35s ease',
          }}
        >
          {PROJECT_NUMBERS[index] ?? `0${index + 1}`}
        </span>

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}40, transparent)`,
          }}
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top glow blob */}
        <motion.div
          className="absolute -top-16 -left-8 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${project.color}18 0%, transparent 70%)` }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.2 : 0.8 }}
          transition={{ duration: 0.5 }}
        />

        {/* Card content */}
        <div className="relative z-10 p-6 flex-1 flex flex-col">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `${project.color}18`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-white/30 bg-white/5 px-2 py-1 rounded">{project.year}</span>
            </div>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.15 : 1 }}
              transition={{ duration: 0.25 }}
              className="transition-colors"
              style={{ color: hovered ? project.color : 'rgba(255,255,255,0.2)' }}
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-white font-black text-xl sm:text-2xl mb-1.5 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm font-semibold mb-4" style={{ color: project.color }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
            {project.description.length > 140
              ? project.description.slice(0, 140) + '…'
              : project.description}
          </p>

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all duration-200"
                style={{
                  backgroundColor: `${project.color}0A`,
                  borderColor: `${project.color}22`,
                  color: `${project.color}bb`,
                }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white/35 border border-white/10 bg-white/5">
                +{project.tech.length - 5} more
              </span>
            )}
          </div>

          {/* Status + separator */}
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  project.status === 'Completed' ? '#10B981'
                  : project.status === 'Maintained' ? project.color
                  : '#F59E0B',
                boxShadow:
                  project.status === 'Completed' ? '0 0 6px rgba(16,185,129,0.5)'
                  : `0 0 6px ${project.color}50`,
              }}
            />
            <span className="text-xs text-white/40 font-semibold">{project.status}</span>
          </div>

          {/* Actions — full button for CTA */}
          <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.07]">
            {/* Primary CTA: filled */}
            <button
              onClick={(e) => { e.stopPropagation(); onOpenModal(project); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex-1 justify-center"
              style={{
                background: hovered ? `${project.color}22` : `${project.color}12`,
                border: `1px solid ${hovered ? project.color + '50' : project.color + '28'}`,
                color: project.color,
                boxShadow: hovered ? `0 4px 16px ${project.color}25` : 'none',
              }}
            >
              <Eye size={13} />
              View Case Study
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 p-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.45)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
                }}
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 p-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                }}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
