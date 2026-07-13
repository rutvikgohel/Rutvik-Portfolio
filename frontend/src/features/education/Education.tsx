import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { EDUCATION } from '@/lib/constants';
import { SectionLabel } from '@/components/shared/AnimatedText';

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} id="education" className="relative py-20 sm:py-32 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="section-container relative">
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Education</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-gray-900 mt-4 tracking-tight"
          >
            Academic foundation
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="card p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-500 font-medium">{edu.institution}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{edu.startYear} – {edu.endYear}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  <span>{edu.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {edu.highlights.slice(0, 3).map((h) => (
                  <span key={h} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
initial = {{ scale: 0, rotate: -10 }}
whileInView = {{ scale: 1, rotate: 0 }}
viewport = {{ once: true }}
transition = {{ type: 'spring', delay: 0.4 }}
className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full"
style = {{
  background: 'rgba(245,158,11,0.1)',
    border: '1px solid rgba(245,158,11,0.25)',
                            }}
                          >
                            <Award size={13} className="text-amber-400" />
                            <span className="text-amber-400 text-xs font-semibold">Academic Excellence</span>
                          </motion.div >
                        )}
                      </div >

  {/* Meta info */ }
  < div className = "flex flex-wrap gap-4 mb-6 text-sm text-white/40" >
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          <span>{edu.startYear} – {edu.endYear}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          <span>{edu.location}</span>
                        </div>
                      </div >

  {/* Highlights */ }
  < div >
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
                      </div >
                    </div >
                  </div >
                </div >
              </GlassCard >
            </motion.div >
          ))}
        </motion.div >

  {/* Bottom summary */ }
  < motion.div
initial = {{ opacity: 0, y: 30 }}
whileInView = {{ opacity: 1, y: 0 }}
viewport = {{ once: true }}
transition = {{ duration: 0.6, delay: 0.3 }}
className = "mt-12 p-6 sm:p-8 rounded-2xl"
style = {{
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
        </motion.div >
      </div >
    </section >
  );
}
