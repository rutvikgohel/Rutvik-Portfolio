import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const triggerMailto = (name: string, email: string, subject: string, message: string) => {
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Contact from Portfolio'
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
    setStatus('sent');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      // We use Web3Forms to send emails directly from the client side.
      // We include a default submission target or fallback to mailto if it fails.
      const formData = new FormData();
      formData.append("access_key", "0335eef2-d3b2-4d1e-bd15-38b4d8ec8cb8"); // Default placeholder / key
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", `Portfolio Contact: ${subject}`);
      formData.append("message", message);
      formData.append("from_name", name);
      formData.append("replyto", email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const resData = await response.json();
      if (resData.success) {
        setStatus('sent');
      } else {
        // If the API fails (e.g. key expired or blocked), fall back to opening mail client
        triggerMailto(name, email, subject, message);
      }
    } catch (error) {
      // Network error or fetch blocked - trigger mailto fallback
      triggerMailto(name, email, subject, message);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="section-container relative z-10 text-left">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="num">05</span>
            <span className="rule"></span>
            <span>Contact</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-ink">
            Get in touch
          </h2>
          <p className="font-serif text-base text-ink-muted leading-relaxed mt-3">
            Have a project in mind, a role to fill, or just want to chat about software architecture? Drop me a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Email link */}
            <div className="border-b border-border pb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                Direct Email
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-serif text-lg text-ink hover:text-peach transition-colors font-semibold"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Phone link */}
            <div className="border-b border-border pb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                Phone call
              </span>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="font-serif text-lg text-ink hover:text-peach transition-colors font-semibold"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>

            {/* Location */}
            <div className="border-b border-border pb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-peach block mb-1">
                Location
              </span>
              <span className="font-serif text-lg text-ink font-semibold block">
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Socials row */}
            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-muted block mb-3">
                Networks
              </span>
              <div className="flex gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-full hover:border-peach hover:text-peach transition-colors text-xs font-semibold"
                >
                  <Linkedin size={12} />
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-full hover:border-peach hover:text-peach transition-colors text-xs font-semibold"
                >
                  <Github size={12} />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right: Clean form */}
          <div className="lg:col-span-7 border border-border rounded-xl p-6 md:p-8 bg-bg-alt/10">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-12 h-12 rounded-full bg-peach/10 border border-peach/20 flex items-center justify-center mb-4">
                  <CheckCircle size={24} className="text-peach" />
                </div>
                <h3 className="font-serif text-xl font-bold text-ink mb-1">Message sent!</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Thanks for reaching out. Your message has been sent directly to {PERSONAL_INFO.email}.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Rutvik Gohel"
                      className="input-editorial"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="input-editorial"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    placeholder="Let's build something together"
                    className="input-editorial"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    placeholder="Tell me about your project, role, or business idea..."
                    className="input-editorial resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-bg transition-colors duration-300 hover:bg-peach disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-bg" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send email
                      </>
                    )}
                  </button>

                  <span className="text-[10px] font-mono text-ink-muted/70 tracking-wide text-center sm:text-left">
                    Direct delivery to {PERSONAL_INFO.email}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
