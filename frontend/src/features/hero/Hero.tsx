import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin, ChevronRight, MapPin } from 'lucide-react';
import { AuroraBackground } from './components/AuroraBackground';
import { FloatingTechElements } from './components/FloatingTechElements';
import { PERSONAL_INFO } from '@/lib/constants';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.9 + i * 0.04,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  let charIndex = 0;
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split('').map((char) => {
            const idx = charIndex++;
            return (
              <motion.span key={idx} custom={idx} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const { ref: btnRef2, onMouseMove: mm2, onMouseLeave: ml2 } = useMagneticEffect<HTMLAnchorElement>({ strength: 20 });

  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <AuroraBackground />
      <FloatingTechElements />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 section-container w-full flex flex-col items-center text-center pt-24 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 sm:mb-10"
          style={{
            background: 'rgba(15,23,42,0.85)',
            border: '1px solid rgba(59,130,246,0.25)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs font-semibold text-white/80 tracking-wide">Open to new opportunities</span>
          <span className="text-primary/50 text-xs hidden sm:inline">·</span>
          <span className="hidden sm:flex items-center gap-1 text-xs text-white/40 font-mono">
            <MapPin size={10} />
            Ahmedabad, India
          </span>
        </motion.div>

        {/* Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 160, damping: 18 }}
          className="relative mb-8 sm:mb-10"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto">
            {/* Blurred glow layer behind */}
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-110 opacity-50"
              style={{ background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)' }}
            />
            {/* Spinning conic-gradient ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)',
                padding: '2.5px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full" style={{ background: '#030712' }} />
            </motion.div>
            {/* Inner avatar */}
            <div
              className="absolute inset-[3px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.18) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span className="text-3xl sm:text-4xl font-black gradient-text select-none">RG</span>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-white/30 text-[10px] font-mono mt-2.5 tracking-[0.3em] uppercase"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] mb-6"
          initial="hidden"
          animate="visible"
          style={{ perspective: 800 }}
        >
          <div className="overflow-hidden">
            <SplitText text="I Build Software" className="block text-white" />
          </div>
          <div className="overflow-hidden mt-2">
            <SplitText text="That Scales." className="block gradient-text" />
          </div>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg text-white/50 leading-relaxed mb-12 text-balance"
        >
          Full Stack Developer at{' '}
          <span className="text-primary font-semibold">TretaGen</span>
          {' '}— crafting enterprise-grade systems with{' '}
          <span className="text-white/80 font-semibold">.NET Core + React.js</span>.
          {' '}From PostgreSQL schemas to pixel-perfect interfaces, end to end.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-12 sm:mb-16 w-full sm:w-auto"
        >
          {/* Primary: gradient + shimmer */}
          <motion.button
            onClick={scrollToProjects}
            className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-sm w-full sm:w-auto btn-shimmer"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 60%, #06B6D4 100%)',
              boxShadow: '0 4px 30px rgba(59,130,246,0.45), 0 0 0 1px rgba(59,130,246,0.25)',
            }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 8px 48px rgba(59,130,246,0.65), 0 0 0 1px rgba(59,130,246,0.55)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>

          {/* Download Resume: blue tinted outline */}
          <motion.a
            ref={btnRef2}
            href="/resume.pdf"
            download="Rutvik_Gohel_Resume.pdf"
            onMouseMove={mm2}
            onMouseLeave={ml2}
            className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm w-full sm:w-auto transition-all duration-300"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.4)',
              color: '#93C5FD',
              boxShadow: '0 0 0 0px rgba(59,130,246,0)',
            }}
            whileHover={{
              scale: 1.03,
              background: 'rgba(59,130,246,0.16)',
              borderColor: 'rgba(59,130,246,0.65)',
              boxShadow: '0 4px 24px rgba(59,130,246,0.25)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={15} />
            Download Resume
          </motion.a>

          {/* Contact Me: ghost */}
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-medium text-sm w-full sm:w-auto transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.45)',
            }}
            whileHover={{
              scale: 1.02,
              background: 'rgba(255,255,255,0.07)',
              borderColor: 'rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.85)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={15} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social links — with labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.95, duration: 0.6 }}
          className="flex items-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <div className="h-px w-8 sm:w-12 bg-white/10" />
          <motion.a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#93C5FD' }}
            whileHover={{ scale: 1.05, background: 'rgba(59,130,246,0.16)', borderColor: 'rgba(59,130,246,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Linkedin size={14} />
            <span className="hidden sm:block">LinkedIn</span>
          </motion.a>
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.6)' }}
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.9)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={14} />
            <span className="hidden sm:block">GitHub</span>
          </motion.a>
          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#67E8F9' }}
            whileHover={{ scale: 1.05, background: 'rgba(6,182,212,0.16)', borderColor: 'rgba(6,182,212,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={14} />
            <span className="hidden sm:block">Email</span>
          </motion.a>
          <div className="h-px w-8 sm:w-12 bg-white/10" />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.15, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 sm:gap-14"
        >
          {[
            { value: '1+', label: 'Year Experience', sub: 'Industry' },
            { value: '3', label: 'Major Projects', sub: 'Shipped' },
            { value: '8.45', label: 'CGPA Score', sub: 'MCA · Indus' },
          ].map((stat) => (
            <div key={stat.label} className="text-center group cursor-default">
              <p className="text-3xl sm:text-4xl font-black gradient-text stat-num leading-none mb-1.5 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-white/60 leading-tight">{stat.label}</p>
              <p className="text-[9px] sm:text-[10px] text-white/25 font-mono uppercase tracking-wider mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2.6, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Scroll</span>
        <ArrowDown size={14} />
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}
