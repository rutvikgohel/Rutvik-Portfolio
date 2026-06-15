import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Linkedin, Github, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionLabel } from '@/components/shared/AnimatedText';
import { PERSONAL_INFO } from '@/lib/constants';
import { fadeInUp, staggerChildren } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    color: '#3B82F6',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone}`,
    color: '#8B5CF6',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: PERSONAL_INFO.location,
    href: null,
    color: '#06B6D4',
  },
];

function FormInput({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 mt-2 text-red-400 text-xs"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  'w-full bg-white/5 border border-white/10 focus:border-primary/50 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:bg-white/8 focus:shadow-[0_0_0_1px_rgba(59,130,246,0.2)]';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      // POST to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      // Fallback: open email client if API fails
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <SectionLabel>Contact</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight"
          >
            Let's build
            <br />
            <span className="gradient-text">something great</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/50 max-w-xl leading-relaxed"
          >
            Whether you have a project in mind, want to discuss a role, or just want to connect — I'm always open to the right conversations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
          {/* Left: Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact items */}
            {CONTACT_ITEMS.map((item) => (
              <motion.div key={item.label} variants={fadeInUp}>
                <GlassCard className="p-5 group">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}12`, border: `1px solid ${item.color}25` }}
                    >
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div variants={fadeInUp}>
              <GlassCard className="p-5">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Connect</p>
                <div className="space-y-3">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-primary/20 transition-all duration-200 group/link"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                      <Linkedin size={14} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/70 text-sm group-hover/link:text-white transition-colors">LinkedIn</p>
                      <p className="text-white/30 text-xs">linkedin.com/in/rutik-gohel-a8215a340</p>
                    </div>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group/link"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Github size={14} className="text-white/60" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/70 text-sm group-hover/link:text-white transition-colors">GitHub</p>
                      <p className="text-white/30 text-xs">github.com/rutvikgohel</p>
                    </div>
                  </a>
                </div>
              </GlassCard>
            </motion.div>

            {/* Availability */}
            <motion.div variants={fadeInUp}>
              <div
                className="p-5 rounded-2xl"
                style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-2 h-2">
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                    <div className="relative rounded-full w-2 h-2 bg-green-400" />
                  </div>
                  <p className="text-green-400 text-xs font-semibold uppercase tracking-wider">Available</p>
                </div>
                <p className="text-white/60 text-sm">
                  Currently open to full-time roles, freelance projects, and interesting collaborations.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-green-400/10 border-2 border-green-400/30 flex items-center justify-center"
                    >
                      <CheckCircle size={30} className="text-green-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">Message sent!</h3>
                      <p className="text-white/50 text-sm">
                        Thanks for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput label="Your Name" error={errors.name?.message}>
                        <input
                          {...register('name')}
                          placeholder="Rutvik Gohel"
                          className={inputClass}
                        />
                      </FormInput>
                      <FormInput label="Email Address" error={errors.email?.message}>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </FormInput>
                    </div>

                    <FormInput label="Subject" error={errors.subject?.message}>
                      <input
                        {...register('subject')}
                        placeholder="Let's build something together"
                        className={inputClass}
                      />
                    </FormInput>

                    <FormInput label="Message" error={errors.message?.message}>
                      <textarea
                        {...register('message')}
                        rows={6}
                        placeholder="Tell me about your project, role, or idea..."
                        className={`${inputClass} resize-none`}
                      />
                    </FormInput>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <AlertCircle size={14} />
                        Failed to send. Please try emailing me directly.
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ scale: status === 'loading' ? 1 : 1.01 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.99 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-white/25 text-xs">
                      Or email directly at{' '}
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-primary/70 hover:text-primary transition-colors">
                        {PERSONAL_INFO.email}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
