import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle, AlertCircle, Lightbulb, Layers, Target, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = project ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#030712]/90 backdrop-blur-md z-[9000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-x-24 lg:inset-y-8 z-[9001] overflow-hidden sm:rounded-2xl"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="h-full overflow-y-auto modal-scroll"
              style={{ background: '#0A0F1E', border: '1px solid rgba(30,41,59,0.8)' }}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/5"
                style={{ backdropFilter: 'blur(12px)', backgroundColor: '#0A0F1E' }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {project.id.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-white font-bold text-base sm:text-lg leading-none truncate">{project.title}</h2>
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5 truncate">{project.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:flex sm:items-center sm:gap-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all"
                    >
                      <Github size={14} />
                      <span className="hidden sm:inline text-sm">GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 sm:flex sm:items-center sm:gap-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        backgroundColor: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                      }}
                    >
                      <ExternalLink size={14} />
                      <span className="hidden sm:inline">Live Demo</span>
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* Overview */}
                <div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${project.color}15`,
                        border: `1px solid ${project.color}25`,
                        color: project.color,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                      {project.category}
                    </span>
                    <Badge variant="ghost">{project.year}</Badge>
                    <Badge
                      variant={project.status === 'Completed' ? 'primary' : project.status === 'Maintained' ? 'accent' : 'secondary'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-base leading-relaxed">{project.description}</p>
                </div>

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { key: 'problem', icon: AlertCircle, label: 'The Problem', text: project.problem, color: '#EF4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)' },
                    { key: 'solution', icon: Lightbulb, label: 'The Solution', text: project.solution, color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="p-5 rounded-xl"
                      style={{ backgroundColor: item.bg, border: `1px solid ${item.border}` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <item.icon size={15} style={{ color: item.color }} />
                        <p className="text-sm font-semibold" style={{ color: item.color }}>{item.label}</p>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: project.color }} />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {project.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-2.5 p-3 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <ArrowRight size={13} className="flex-shrink-0 mt-0.5" style={{ color: project.color }} />
                        <p className="text-white/60 text-sm leading-relaxed">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div className="p-5 rounded-xl" style={{ backgroundColor: `${project.color}06`, border: `1px solid ${project.color}15` }}>
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <Layers size={14} style={{ color: project.color }} />
                    Architecture
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{project.architecture}</p>
                </div>

                {/* Tech stack */}
                <div>
                  <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                        style={{
                          backgroundColor: `${project.color}10`,
                          borderColor: `${project.color}25`,
                          color: project.color,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Outcome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Challenges</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{project.challenges}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Outcome</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{project.outcome}</p>
                  </div>
                </div>

                {/* Future enhancements */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                    <Target size={14} className="text-accent" />
                    Future Enhancements
                  </h3>
                  <div className="space-y-2">
                    {project.future.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <p className="text-white/50 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
