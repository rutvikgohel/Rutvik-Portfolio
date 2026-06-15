import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Download, Mail, ExternalLink, User, Briefcase, Code, GraduationCap, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, [onClose]);

  const commands: Command[] = [
    {
      id: 'about',
      label: 'About Rutvik',
      description: 'Who I am and what I do',
      icon: <User size={16} />,
      action: () => scrollTo('about'),
      category: 'Navigate',
    },
    {
      id: 'experience',
      label: 'Experience',
      description: 'TretaGen & Novanectar Services',
      icon: <Briefcase size={16} />,
      action: () => scrollTo('experience'),
      category: 'Navigate',
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'Job Portal, School & Pharmacy Systems',
      icon: <Code size={16} />,
      action: () => scrollTo('projects'),
      category: 'Navigate',
    },
    {
      id: 'skills',
      label: 'Skills',
      description: '.NET Core, React.js, PostgreSQL & more',
      icon: <Code size={16} />,
      action: () => scrollTo('skills'),
      category: 'Navigate',
    },
    {
      id: 'education',
      label: 'Education',
      description: 'MCA — Indus University (8.45 CGPA)',
      icon: <GraduationCap size={16} />,
      action: () => scrollTo('education'),
      category: 'Navigate',
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Get in touch',
      icon: <Mail size={16} />,
      action: () => scrollTo('contact'),
      category: 'Navigate',
    },
    {
      id: 'resume',
      label: 'Download Resume',
      description: 'Get Rutvik\'s latest resume PDF',
      icon: <Download size={16} />,
      action: () => {
        onClose();
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = 'Rutvik_Gohel_Resume.pdf';
        a.click();
      },
      category: 'Actions',
      shortcut: '⌘R',
    },
    {
      id: 'email',
      label: 'Send Email',
      description: PERSONAL_INFO.email,
      icon: <Mail size={16} />,
      action: () => {
        onClose();
        window.open(`mailto:${PERSONAL_INFO.email}`);
      },
      category: 'Actions',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      description: 'linkedin.com/in/rutik-gohel-a8215a340',
      icon: <ExternalLink size={16} />,
      action: () => {
        onClose();
        window.open(PERSONAL_INFO.linkedin, '_blank');
      },
      category: 'Actions',
    },
    {
      id: 'phone',
      label: 'Call Rutvik',
      description: PERSONAL_INFO.phone,
      icon: <Phone size={16} />,
      action: () => {
        onClose();
        window.open(`tel:${PERSONAL_INFO.phone}`);
      },
      category: 'Actions',
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  const groups = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelected(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selected]) {
        filtered[selected].action();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selected, onClose]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 z-[10000] w-full max-w-lg px-4"
            style={{ translateX: '-50%' }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={16} className="text-white/40 flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
                />
                <kbd className="px-2 py-1 text-xs text-white/30 bg-white/5 rounded border border-white/10">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2 scrollbar-none">
                {Object.entries(groups).map(([category, cmds]) => (
                  <div key={category}>
                    <p className="px-4 py-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                      {category}
                    </p>
                    {cmds.map((cmd) => {
                      const currentIndex = flatIndex++;
                      return (
                        <button
                          key={cmd.id}
                          onClick={cmd.action}
                          onMouseEnter={() => setSelected(currentIndex)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100 ${
                            selected === currentIndex
                              ? 'bg-primary/10 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className={`flex-shrink-0 ${selected === currentIndex ? 'text-primary' : 'text-white/40'}`}>
                            {cmd.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{cmd.label}</p>
                            <p className="text-xs text-white/40 truncate">{cmd.description}</p>
                          </div>
                          {cmd.shortcut && (
                            <kbd className="px-2 py-1 text-xs text-white/30 bg-white/5 rounded border border-white/10">
                              {cmd.shortcut}
                            </kbd>
                          )}
                          {selected === currentIndex && (
                            <ArrowRight size={14} className="text-primary flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="px-4 py-8 text-center text-white/30 text-sm">
                    No results for "{query}"
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↵</kbd>
                  Select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
