import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, MapPin } from 'lucide-react';
import { education } from '../data/portfolio';

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">04 / Experience</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-text">
            My journey
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education timeline */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={16} className="text-accent" />
              <p className="font-display font-semibold text-text text-sm uppercase tracking-widest">Education</p>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <motion.div
                className="absolute left-4 top-0 w-px bg-gradient-to-b from-accent/60 to-transparent"
                initial={{ height: 0 }}
                animate={inView ? { height: '100%' } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <div className="space-y-10">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="relative pl-12"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border flex items-center justify-center ${
                      edu.current
                        ? 'border-accent/60 bg-accent/10'
                        : 'border-white/10 bg-surface'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${edu.current ? 'bg-accent' : 'bg-muted'}`} />
                    </div>

                    <div className="border-gradient rounded-xl p-5 bg-card">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-text text-sm leading-snug">
                          {edu.institution}
                        </h3>
                        {edu.current && (
                          <span className="flex-shrink-0 text-xs font-mono text-accent bg-accent/10 rounded-full px-2 py-0.5 border border-accent/20">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-accent/80 font-mono mb-1">{edu.degree}</p>
                      <p className="text-xs text-muted font-mono">{edu.period}</p>
                      <p className="text-xs text-muted/70 font-mono mt-2 border-t border-white/5 pt-2">{edu.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — seeking internship CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-accent" />
              <p className="font-display font-semibold text-text text-sm uppercase tracking-widest">Status</p>
            </div>

            {/* Currently card */}
            <div className="border-gradient rounded-2xl p-8 bg-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-green-400">Open to opportunities</span>
                </div>
                <h3 className="font-display text-xl font-bold text-text mb-3">
                  Seeking an Internship
                </h3>
                <p className="text-muted font-body text-sm leading-relaxed mb-6">
                  I'm a 3rd-year Software Engineering student actively looking for internship roles in
                  web development, full-stack engineering, or frontend development. Available
                  immediately.
                </p>
                <a
                  href="#contact"
                  className="inline-block px-5 py-2.5 bg-accent rounded-full text-sm text-white font-body font-medium hover:bg-accent/80 transition-all"
                >
                  Get in touch
                </a>
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Location', val: 'Islamabad, PK' },
                { label: 'Availability', val: 'Immediate' },
                { label: 'Work type', val: 'Onsite / Remote' },
                { label: 'Focus', val: 'Web Dev' },
              ].map((f) => (
                <div key={f.label} className="border border-white/5 rounded-xl p-4 bg-surface">
                  <p className="text-xs text-muted font-mono mb-1">{f.label}</p>
                  <p className="text-sm font-display font-semibold text-text">{f.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
