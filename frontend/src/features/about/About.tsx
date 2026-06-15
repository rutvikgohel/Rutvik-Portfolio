import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Database, Server, Sparkles, Coffee, BookOpen, Target, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { PERSONAL_INFO, STATS, SOFT_SKILLS } from '@/lib/constants';
import { fadeInUp, staggerChildren } from '@/lib/utils';

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const isFloat = value.includes('.');

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(value);
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;
      setDisplayed(isFloat ? current.toFixed(2) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, isFloat]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayed}{suffix}
    </span>
  );
}

const STRENGTH_ITEMS = [
  {
    icon: Server,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    glow: 'rgba(59,130,246,0.15)',
    title: 'Backend Architect',
    desc: 'ASP.NET Core, C#, clean API design with SOLID principles and proper separation of concerns.',
  },
  {
    icon: Code2,
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.25)',
    glow: 'rgba(6,182,212,0.15)',
    title: 'Frontend Developer',
    desc: 'React.js with TypeScript, Tailwind CSS — building responsive, accessible UIs with modern practices.',
  },
  {
    icon: Database,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.25)',
    glow: 'rgba(139,92,246,0.15)',
    title: 'Database Engineer',
    desc: 'PostgreSQL and SQL Server with Entity Framework Core — schema design, queries, and optimization.',
  },
  {
    icon: Target,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.15)',
    title: 'Problem Solver',
    desc: 'Breaking down complex requirements into clean, maintainable solutions with real business value.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-[0.05]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.07) 0%, transparent 60%)' }}
      />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>About Me</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            The developer behind
            <br />
            <span className="gradient-text">the keyboard</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 items-start">
          {/* Left: Story */}
          <motion.div
            className="lg:col-span-3 space-y-6 sm:space-y-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* First paragraph as pull quote */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-5"
              style={{ borderLeft: '3px solid rgba(59,130,246,0.5)' }}
            >
              <p className="text-white/80 leading-relaxed text-base sm:text-lg font-medium">
                {PERSONAL_INFO.bio[0]}
              </p>
            </motion.div>

            {PERSONAL_INFO.bio.slice(1).map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeInUp}
                className="text-white/55 leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Soft skills */}
            <motion.div variants={fadeInUp}>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Mindset card */}
            <motion.div
              variants={fadeInUp}
              className="p-5 sm:p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 100%)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}
                >
                  <Sparkles size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1.5">My Engineering Mindset</p>
                  <p className="text-white/55 text-sm leading-relaxed">
                    I approach every project as a product engineer — I don't just write code, I think about system design, performance, user experience, and maintainability. Clean architecture isn't a preference; it's a non-negotiable.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stats + Strengths */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats grid — bigger numbers */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <GlassCard className="p-5 sm:p-6 group hover:border-primary/25 transition-all duration-300 text-center">
                    <div className="text-4xl sm:text-5xl font-black gradient-text stat-num mb-2 leading-none group-hover:scale-105 transition-transform duration-300">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/80 text-sm font-semibold">{stat.label}</p>
                    <p className="text-white/35 text-xs mt-1 leading-snug">{stat.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Strength cards — bigger icons, gradient fills */}
            <motion.div
              className="space-y-3"
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {STRENGTH_ITEMS.map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <GlassCard className="group cursor-default overflow-hidden">
                    <div className="p-4 flex items-start gap-4">
                      {/* Larger icon box */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: item.bg,
                          border: `1px solid ${item.border}`,
                          boxShadow: `0 0 16px ${item.glow}`,
                        }}
                      >
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm font-bold mb-1">{item.title}</p>
                        <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                        style={{ color: item.color }}
                      />
                    </div>
                    {/* Bottom color accent on hover */}
                    <div
                      className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                    />
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Currently section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-5 hover:border-green-400/20 transition-all duration-300">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="relative w-2.5 h-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-green-400" />
                  </div>
                  <p className="text-xs font-bold text-green-400/80 uppercase tracking-widest">Currently Active</p>
                </div>
                <div className="space-y-3.5">
                  {[
                    { icon: Coffee, color: '#3B82F6', label: 'Building at', highlight: 'TretaGen' },
                    { icon: BookOpen, color: '#8B5CF6', label: 'Exploring', highlight: 'Clean Architecture & CQRS' },
                    { icon: Target, color: '#06B6D4', label: 'Open to', highlight: 'challenging full-stack roles' },
                  ].map(({ icon: Icon, color, label, highlight }) => (
                    <div key={label} className="flex items-start gap-2.5 group/item">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                      >
                        <Icon size={13} style={{ color }} />
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">
                        {label}{' '}
                        <span className="text-white/90 font-semibold">{highlight}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
