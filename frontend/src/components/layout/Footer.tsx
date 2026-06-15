import { motion } from 'framer-motion';
import { Heart, Linkedin, Github, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '@/lib/constants';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#030712]">
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-layer aurora-1 opacity-30" style={{ animation: 'aurora 12s ease-in-out infinite' }} />
      </div>

      <div className="section-container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-sm">
                RG
              </div>
              <div>
                <p className="font-bold text-white">{PERSONAL_INFO.name}</p>
                <p className="text-xs text-white/40">{PERSONAL_INFO.role}</p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Building scalable web applications with enterprise-grade architecture. Based in Ahmedabad, open to opportunities worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.section}
                  onClick={() => document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-white/50 hover:text-white transition-colors text-left py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Contact</p>
            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-primary/60" />
                {PERSONAL_INFO.email}
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-primary/60" />
                {PERSONAL_INFO.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin size={14} className="text-primary/60" />
                {PERSONAL_INFO.location}
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 text-white/50 hover:text-primary transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 text-white/50 hover:text-accent transition-all duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            © {currentYear} {PERSONAL_INFO.name}. Built with
            <Heart size={12} className="text-red-500 fill-red-500" />
            using React + .NET
          </p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/70 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Back to top
            <ArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
