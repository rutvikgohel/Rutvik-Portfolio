import { useRef } from 'react';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { Server, Monitor, Database, Settings } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Server,
  Monitor,
  Database,
  Code2: Settings,
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="skills" className="relative py-16 md:py-24 border-b border-border">
      <div className="section-container relative z-10 text-left">
        {/* Header */}
        <div className="mb-12">
          <div className="eyebrow mb-4">
            <span className="num">04</span>
            <span className="rule"></span>
            <span>Toolkit</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-ink">
            Technologies &amp; practices
          </h2>
          <p className="font-serif text-base text-ink-muted leading-relaxed max-w-xl mt-3">
            A full-stack toolkit spanning database structure, backend APIs, client interfaces, and software engineering principles.
          </p>
        </div>

        {/* Categories Tabular Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Settings;
            return (
              <div
                key={cat.id}
                className="border border-border rounded-xl p-6 md:p-8 bg-bg-alt/10 hover:border-peach/30 transition-all duration-300"
              >
                {/* Category title */}
                <div className="flex items-center gap-3 mb-6 border-b border-border/60 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-peach/10 flex items-center justify-center text-peach">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-ink uppercase tracking-wider">
                    {cat.label}
                  </h3>
                </div>

                {/* Skills list table */}
                <div className="flex flex-col gap-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-1 border-b border-border/30 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-baseline">
                        <span className="font-sans text-sm font-semibold text-ink">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-peach">
                          Level: {skill.level}%
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed font-light">
                        {skill.description}
                      </p>
                      {skill.relatedSkills && skill.relatedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {skill.relatedSkills.map((rs) => (
                            <span
                              key={rs}
                              className="text-[9px] font-mono text-ink-muted uppercase tracking-wide bg-bg-alt px-1.5 py-0.5 rounded border border-border/40"
                            >
                              {rs}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
