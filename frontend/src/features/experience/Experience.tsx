import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/constants';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="experience" className="relative py-16 md:py-24 border-b border-border">
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
            <span className="num">02</span>
            <span className="rule"></span>
            <span>Experience</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-ink">
            Track record
          </h2>
        </motion.div>

        {/* Roles List */}
        <div className="flex flex-col border-t border-border">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, filter: 'blur(12px)', y: 32 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-b border-border hover:bg-bg-alt/10 transition-colors duration-300 px-4 -mx-4"
            >
              {/* Date Column */}
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-wider text-ink-muted block mb-1">
                  {exp.startDate} — {exp.endDate}
                </span>
                <span className="text-xs uppercase font-semibold text-peach tracking-widest bg-peach/10 border border-peach/20 px-2.5 py-0.5 rounded-full inline-block">
                  {exp.type}
                </span>
              </div>

              {/* Detail Column */}
              <div className="md:col-span-9 flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-serif text-xl font-bold text-ink leading-none">
                    {exp.role}
                  </h3>
                  <span className="text-ink-muted text-sm font-serif italic">at {exp.company}</span>
                </div>

                <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                <ul className="list-disc list-inside text-sm text-ink-muted space-y-1.5 mt-2 pl-2">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="font-serif font-light text-ink-muted">{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold font-mono bg-bg-alt text-ink border border-border uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
