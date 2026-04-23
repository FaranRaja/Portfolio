import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, GitFork, Link, Send, CheckCircle } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formspree.io/f/xjgjrnan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error('failed');
      }
    } catch {
      window.open(
        `mailto:${personal.email}?subject=Portfolio Contact from ${form.name}&body=${form.message}`
      );
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: GitFork, label: 'GitHub', href: personal.github },
    { icon: Link, label: 'LinkedIn', href: personal.linkedin },
    { icon: Mail, label: 'Email', href: `mailto:${personal.email}` },
  ];

  return (
    <section id="contact" className="py-32 relative" ref={ref}>
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] bg-accent/4 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">05 / Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-text">
            Let's talk
          </h2>
          <p className="text-muted font-body mt-4 max-w-lg">
            Whether you have an internship opportunity, a project idea, or just want to connect — my inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="border-gradient rounded-2xl p-12 bg-card text-center"
              >
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-text mb-2">Message sent!</h3>
                <p className="text-muted font-body text-sm">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required
                      className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3 text-sm text-text font-body placeholder-muted/50 focus:outline-none focus:border-accent/40 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    placeholder="What's on your mind?"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3 text-sm text-text font-body placeholder-muted/50 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-accent rounded-xl font-body font-medium text-white hover:bg-accent/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {sending ? 'Sending...' : <><span>Send message</span> <Send size={15} /></>}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-display font-semibold text-text mb-4">Direct contact</p>
              <div className="space-y-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 text-muted hover:text-text transition-colors font-body text-sm"
                >
                  <Mail size={15} className="text-accent" />
                  {personal.email}
                </a>
                <p className="flex items-center gap-3 text-muted font-body text-sm">
                  <span className="text-accent text-xs font-mono">TEL</span>
                  {personal.phone}
                </p>
              </div>
            </div>

            <div>
              <p className="font-display font-semibold text-text mb-4">Find me online</p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-white/10 rounded-xl text-muted hover:text-text hover:border-accent/30 hover:bg-accent/5 transition-all"
                    title={s.label}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-gradient rounded-2xl p-6 bg-card">
              <p className="text-xs font-mono text-muted mb-2">Response time</p>
              <p className="font-display font-bold text-text text-lg">Within 24 hours</p>
              <p className="text-xs text-muted/60 font-mono mt-1">Mon – Fri, Islamabad time</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
