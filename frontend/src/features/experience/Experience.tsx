import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, CheckCircle, Briefcase } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { EXPERIENCES } from '@/lib/constants';
import { fadeInUp, staggerChildren } from '@/lib/utils';

export function Experience() {
  const [expanded, setExpanded] = useState<string>('tretagen');

  return (
    <section id="experience" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Experience</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            Professional
            <br />
            <span className="gradient-text">journey so far</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl leading-relaxed"
          >
            From an internship building real products to a full-time role shipping scalable enterprise applications — each role has sharpened my craft.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[1.875rem] top-12 bottom-12 w-[2px] hidden md:block rounded-full"
            style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(139,92,246,0.4), rgba(6,182,212,0.2), transparent)' }}
          />

          <motion.div
            className="space-y-5"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {EXPERIENCES.map((exp, index) => {
              const isExpanded = expanded === exp.id;
              return (
                <motion.div key={exp.id} variants={fadeInUp} className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-[1.25rem] top-7 hidden md:flex items-center justify-center">
                    <div
                      className="w-[18px] h-[18px] rounded-full border-[2.5px] flex-shrink-0 z-10 relative flex items-center justify-center"
                      style={{
                        borderColor: exp.color,
                        backgroundColor: isExpanded ? exp.color : 'rgba(3,7,18,0.9)',
                        boxShadow: isExpanded ? `0 0 12px ${exp.color}60, 0 0 24px ${exp.color}30` : 'none',
                      }}
                    >
                      {exp.current && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: exp.color }}
                          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <GlassCard
                    className="group overflow-hidden transition-all duration-300"
                    style={{
                      boxShadow: isExpanded
                        ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${exp.color}20`
                        : '0 4px 24px rgba(0,0,0,0.3)',
                    } as React.CSSProperties}
                  >
                    {/* Accent bar */}
                    <div
                      className="h-[2px] w-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${exp.color}, rgba(${exp.color},0) transparent)`,
                        opacity: isExpanded ? 1 : 0.35,
                      }}
                    />

                    <button
                      onClick={() => setExpanded(isExpanded ? '' : exp.id)}
                      className="w-full text-left p-5 sm:p-7"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        {/* Company logo */}
                        <div
                          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center font-bold flex-shrink-0 text-sm transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${exp.color}18`,
                            border: `1.5px solid ${exp.color}35`,
                            color: exp.color,
                            boxShadow: `0 4px 16px ${exp.color}20`,
                          }}
                        >
                          {exp.company.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Role + badges */}
                          <div className="flex items-start gap-2 flex-wrap mb-1.5">
                            <h3 className="text-white font-bold text-base sm:text-xl leading-snug">{exp.role}</h3>
                            <Badge variant={exp.type === 'Full-time' ? 'primary' : 'secondary'}>
                              {exp.type}
                            </Badge>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-400/10 border border-green-400/25 text-green-400 text-xs font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                Current
                              </span>
                            )}
                          </div>

                          {/* Company + meta */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-3">
                            <p className="font-bold text-sm sm:text-base" style={{ color: exp.color }}>{exp.company}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/40">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                <span>{exp.startDate} – {exp.endDate}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin size={12} />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
                        </div>

                        {/* Expand indicator */}
                        <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                            style={{
                              background: isExpanded ? `${exp.color}18` : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${isExpanded ? exp.color + '35' : 'rgba(255,255,255,0.08)'}`,
                            }}
                          >
                            <ChevronDown size={14} style={{ color: isExpanded ? exp.color : 'rgba(255,255,255,0.4)' }} />
                          </motion.div>
                          <span className="text-[9px] text-white/25 font-mono uppercase tracking-wider hidden sm:block">
                            {isExpanded ? 'Less' : 'More'}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mx-5 sm:mx-7 mb-7 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
                              {/* Achievements */}
                              <div className="p-5 sm:p-6">
                                <div className="flex items-center gap-2 mb-4">
                                  <Briefcase size={13} style={{ color: exp.color }} />
                                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Key Contributions</p>
                                </div>
                                <ul className="space-y-3">
                                  {exp.achievements.map((achievement, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.06, duration: 0.4 }}
                                      className="flex items-start gap-2.5 group/li"
                                    >
                                      <CheckCircle
                                        size={14}
                                        className="flex-shrink-0 mt-0.5"
                                        style={{ color: exp.color }}
                                      />
                                      <p className="text-white/60 text-sm leading-relaxed group-hover/li:text-white/80 transition-colors">{achievement}</p>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>

                              {/* Tech stack */}
                              <div className="p-5 sm:p-6">
                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Tech Stack Used</p>
                                <div className="flex flex-wrap gap-2">
                                  {exp.tech.map((tech, i) => (
                                    <motion.span
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.05 }}
                                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-default transition-all duration-200 hover:scale-105"
                                      style={{
                                        backgroundColor: `${exp.color}12`,
                                        borderColor: `${exp.color}30`,
                                        color: exp.color,
                                      }}
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
