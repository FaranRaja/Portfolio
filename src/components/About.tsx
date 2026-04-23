import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Globe, Layers, Zap } from 'lucide-react';
import { personal } from '../data/portfolio';

const highlights = [
  { icon: Code2, label: 'Full Stack', detail: 'React · Next.js · Node.js' },
  { icon: Globe, label: 'Cloud Ready', detail: 'Firebase · Supabase' },
  { icon: Zap, label: 'AI Integrated', detail: 'Cohere API · REST' },
  { icon: Layers, label: 'MERN Stack', detail: 'MongoDB · Express' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      {/* Accent line */}
      <div className="absolute left-0 top-1/2 w-px h-32 bg-gradient-to-b from-transparent via-accent/40 to-transparent -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">01 / About</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-text">
            Who I am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="space-y-5 text-muted font-body text-base leading-relaxed">
              <p>
                I'm a <span className="text-text font-medium">Full Stack Web Developer</span> and
                Software Engineering student at{' '}
                <span className="text-accent">COMSATS University Islamabad</span>, currently in my
                third year (GPA 3.3).
              </p>
              <p>
                I build modern, scalable web applications — from polished React frontends to robust
                Node.js backends, connected to cloud infrastructure like Firebase and Supabase. I
                love incorporating AI into my projects, whether that's smart search, quiz generation,
                or real-time features.
              </p>
              <p>
                I'm actively seeking an <span className="text-text font-medium">internship</span>{' '}
                where I can contribute meaningfully and grow in a professional environment. I bring
                curiosity, strong fundamentals, and a bias for shipping.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-accent/30 rounded-full text-sm text-accent font-body hover:bg-accent/10 transition-all"
              >
                LinkedIn Profile
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/10 rounded-full text-sm text-muted font-body hover:text-text hover:border-white/20 transition-all"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="border-gradient rounded-2xl p-6 bg-card hover:glow transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <h.icon
                  size={22}
                  className="text-accent mb-4 group-hover:scale-110 transition-transform"
                />
                <p className="font-display font-semibold text-text text-sm mb-1">{h.label}</p>
                <p className="text-xs text-muted font-mono">{h.detail}</p>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              className="col-span-2 border border-white/5 rounded-2xl p-6 bg-surface flex items-center justify-around"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              {[
                { val: '3.3', label: 'GPA' },
                { val: '6', label: 'Projects' },
                { val: '4+', label: 'Tech Stacks' },
                { val: '∞', label: 'Curiosity' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-gradient">{s.val}</p>
                  <p className="text-xs text-muted font-mono mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
