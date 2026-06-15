import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { EDUCATION } from '@/lib/constants';
import { fadeInUp, staggerChildren } from '@/lib/utils';

function CGPAMeter({ cgpa, max, color }: { cgpa: number; max: number; color: string }) {
  const percentage = (cgpa / max) * 100;
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0 -rotate-90">
        {/* Background ring */}
        <circle
          cx="48"
          cy="48"
          r="36"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <motion.circle
          cx="48"
          cy="48"
          r="36"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      <div className="text-center z-10">
        <p className="text-white font-bold text-lg leading-none">{cgpa}</p>
        <p className="text-white/30 text-[10px] mt-0.5">/ {max}</p>
      </div>
    </div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-dots opacity-[0.05]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Education</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            Academic
            <br />
            <span className="gradient-text">foundation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl leading-relaxed"
          >
            A strong academic journey from BCA to MCA — building theoretical foundations that complement hands-on engineering experience.
          </motion.p>
        </div>

        <motion.div
          className="space-y-6"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {EDUCATION.map((edu, index) => (
            <motion.div key={edu.id} variants={fadeInUp}>
              <GlassCard className="group overflow-hidden hover:border-primary/20 transition-all duration-300">
                {/* Top accent */}
                <div
                  className="h-[2px] w-full"
                  style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
                />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* CGPA meter */}
                    <div className="flex-shrink-0">
                      <CGPAMeter cgpa={edu.cgpa} max={edu.maxCgpa} color={edu.color} />
                      <p className="text-center text-[10px] text-white/30 uppercase tracking-wider mt-2 font-semibold">CGPA</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap size={16} style={{ color: edu.color }} />
                            <span
                              className="text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md"
                              style={{
                                backgroundColor: `${edu.color}15`,
                                color: edu.color,
                                border: `1px solid ${edu.color}25`,
                              }}
                            >
                              {edu.field}
                            </span>
                          </div>
                          <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-white/70 font-medium text-base mt-1">{edu.institution}</p>
                        </div>

                        {/* Achievement badge for top CGPA */}
                        {edu.cgpa >= 8 && (
                          <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', delay: 0.4 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                            style={{
                              background: 'rgba(245,158,11,0.1)',
                              border: '1px solid rgba(245,158,11,0.25)',
                            }}
                          >
                            <Award size={13} className="text-amber-400" />
                            <span className="text-amber-400 text-xs font-semibold">Academic Excellence</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/40">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          <span>{edu.startYear} – {edu.endYear}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div>
                        <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Highlights</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {edu.highlights.map((highlight, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + i * 0.06 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle
                                size={13}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: edu.color }}
                              />
                              <p className="text-white/50 text-sm leading-relaxed">{highlight}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.06) 100%)',
            border: '1px solid rgba(59,130,246,0.1)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-white font-semibold text-base sm:text-lg mb-1">
                5 Years of Formal Computer Science Education
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                From BCA at Grace College to MCA at Indus University — a continuous journey of building deeper technical knowledge, culminating in a 8.45 CGPA and real-world engineering skills.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
