import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Monitor, Database, Code2, ChevronRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { SKILL_CATEGORIES } from '@/lib/constants';
import type { SkillCategory } from '@/types';

const CATEGORY_ICONS = { Server, Monitor, Database, Code2 };

function proficiencyLabel(level: number): string {
  if (level >= 85) return 'Expert';
  if (level >= 70) return 'Advanced';
  if (level >= 50) return 'Proficient';
  return 'Learning';
}

function proficiencyColor(level: number): string {
  if (level >= 85) return '#3B82F6';
  if (level >= 70) return '#8B5CF6';
  if (level >= 50) return '#06B6D4';
  return '#F59E0B';
}

function SkillNode({
  skill,
  index,
}: {
  skill: { name: string; level: number; color: string; description: string; relatedSkills?: string[] };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const label = proficiencyLabel(skill.level);
  const labelColor = proficiencyColor(skill.level);
  const filledBlocks = Math.round(skill.level / 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative p-4 rounded-xl cursor-pointer select-none transition-all duration-300"
        style={{
          backgroundColor: open ? `${skill.color}12` : 'rgba(13,21,38,0.7)',
          border: `1px solid ${open ? `${skill.color}35` : 'rgba(30,41,59,0.7)'}`,
          boxShadow: open ? `0 8px 28px ${skill.color}18, 0 0 0 1px ${skill.color}20` : 'none',
        }}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Skill name + proficiency label */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-white/90 text-sm font-bold">{skill.name}</p>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: `${labelColor}15`,
                color: labelColor,
                border: `1px solid ${labelColor}25`,
              }}
            >
              {label}
            </span>
            <span className="text-xs font-mono font-bold" style={{ color: skill.color }}>
              {skill.level}%
            </span>
          </div>
        </div>

        {/* Skill level bars — thicker (h-2) */}
        <div className="flex items-center gap-1.5 mb-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-2 rounded-full"
              style={{
                backgroundColor: i < filledBlocks ? skill.color : 'rgba(255,255,255,0.06)',
                boxShadow: i < filledBlocks ? `0 0 6px ${skill.color}50` : 'none',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 + i * 0.07, duration: 0.4 }}
            />
          ))}
        </div>

        {/* Inline description on hover/click */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-white/55 text-xs leading-relaxed">{skill.description}</p>
              {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skill.relatedSkills.map((r) => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{ backgroundColor: `${skill.color}15`, color: skill.color, border: `1px solid ${skill.color}20` }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('backend');
  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-dots opacity-[0.04]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Skills</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            Technology
            <br />
            <span className="gradient-text">ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl leading-relaxed text-sm sm:text-base"
          >
            A full-stack toolkit spanning backend systems, frontend interfaces, databases, and software engineering principles.
          </motion.p>
        </div>

        {/* ── MOBILE: horizontal category tabs ── */}
        <div className="lg:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon as keyof typeof CATEGORY_ICONS] ?? Code2;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold flex-shrink-0 transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? `${cat.color}18` : 'rgba(13,21,38,0.7)',
                    border: `1px solid ${isActive ? cat.color + '40' : 'rgba(30,41,59,0.7)'}`,
                    color: isActive ? cat.color : 'rgba(255,255,255,0.45)',
                    boxShadow: isActive ? `0 4px 16px ${cat.color}20` : 'none',
                  }}
                >
                  <Icon size={14} />
                  {cat.label}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: isActive ? `${cat.color}25` : 'rgba(255,255,255,0.06)',
                      color: isActive ? cat.color : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-4 mt-3">
                  <div className="grid grid-cols-1 gap-3">
                    {active.skills.map((skill, i) => (
                      <SkillNode key={skill.name} skill={skill} index={i} />
                    ))}
                  </div>
                  <p className="text-white/25 text-xs mt-4 leading-relaxed text-center">
                    Hover or tap any skill to see details
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── DESKTOP: two-panel layout ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Left: Category nav */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-3 space-y-1">
              {SKILL_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.icon as keyof typeof CATEGORY_ICONS] ?? Code2;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="w-full text-left group"
                  >
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? `${category.color}14` : 'transparent',
                        border: `1px solid ${isActive ? category.color + '35' : 'transparent'}`,
                        boxShadow: isActive ? `0 4px 20px ${category.color}15` : 'none',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
                        style={{
                          backgroundColor: isActive ? `${category.color}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isActive ? category.color + '40' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: isActive ? `0 0 16px ${category.color}25` : 'none',
                        }}
                      >
                        <Icon size={18} style={{ color: isActive ? category.color : 'rgba(255,255,255,0.35)' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm transition-colors ${isActive ? 'text-white' : 'text-white/55'}`}>
                          {category.label}
                        </p>
                        <p className="text-white/30 text-xs">{category.skills.length} technologies</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: isActive ? `${category.color}22` : 'rgba(255,255,255,0.06)',
                            color: isActive ? category.color : 'rgba(255,255,255,0.25)',
                          }}
                        >
                          {category.skills.length}
                        </span>
                        <ChevronRight
                          size={14}
                          className="transition-all duration-300"
                          style={{
                            color: isActive ? category.color : 'rgba(255,255,255,0.2)',
                            transform: isActive ? 'translateX(2px)' : 'translateX(0)',
                          }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </GlassCard>
          </motion.div>

          {/* Right: Skills panel */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard className="p-6 sm:p-8 h-full">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Panel header */}
                    <div className="flex items-center gap-3 mb-7 pb-5" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${active.color}18`,
                          border: `1px solid ${active.color}35`,
                          boxShadow: `0 0 20px ${active.color}20`,
                        }}
                      >
                        {(() => {
                          const Icon = CATEGORY_ICONS[active.icon as keyof typeof CATEGORY_ICONS] ?? Code2;
                          return <Icon size={20} style={{ color: active.color }} />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{active.label}</h3>
                        <p className="text-white/40 text-sm">{active.skills.length} core technologies · Hover to explore</p>
                      </div>
                      {/* Proficiency legend */}
                      <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                        {[
                          { label: 'Expert', color: '#3B82F6' },
                          { label: 'Advanced', color: '#8B5CF6' },
                          { label: 'Proficient', color: '#06B6D4' },
                        ].map((p) => (
                          <div key={p.label} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                            <span style={{ color: p.color }}>{p.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {active.skills.map((skill, i) => (
                        <SkillNode key={skill.name} skill={skill} index={i} />
                      ))}
                    </div>

                    <div
                      className="mt-6 p-4 rounded-xl"
                      style={{ backgroundColor: `${active.color}07`, border: `1px solid ${active.color}15` }}
                    >
                      <p className="text-white/40 text-xs leading-relaxed">
                        {active.id === 'backend' && 'Server-side expertise with C# and .NET Core — building scalable REST APIs, clean architectures, and maintainable enterprise systems.'}
                        {active.id === 'frontend' && 'React-first frontend development with strong HTML/CSS fundamentals — building responsive, accessible, and performant user interfaces.'}
                        {active.id === 'database' && 'Relational database design with PostgreSQL and SQL Server — normalized schemas, complex queries, and Entity Framework integration.'}
                        {active.id === 'engineering' && "SOLID principles and Clean Architecture as a foundation — writing code that's testable, maintainable, and a pleasure for future developers to read."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>

        {/* Bottom: All skills at a glance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-14"
        >
          <p className="text-xs font-bold text-white/25 uppercase tracking-widest mb-5 text-center">
            Complete skillset at a glance
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SKILL_CATEGORIES.flatMap((cat) =>
              cat.skills.map((skill) => (
                <motion.span
                  key={skill.name}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold border cursor-default transition-all duration-200"
                  style={{
                    backgroundColor: `${skill.color}08`,
                    borderColor: `${skill.color}22`,
                    color: `${skill.color}bb`,
                  }}
                >
                  {skill.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
