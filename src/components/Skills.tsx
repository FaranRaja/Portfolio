import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolio';

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-32 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">03 / Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-text">
            My toolkit
          </h2>
          <p className="text-muted font-body mt-4 max-w-xl">
            Technologies I work with to build end-to-end web applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
              className="border-gradient rounded-2xl p-6 bg-card group hover:glow transition-all duration-300"
              whileHover={{ y: -4 }}
            >
              <p className="font-display font-bold text-text text-sm mb-5 uppercase tracking-widest">
                {group.category}
              </p>
              <div className="space-y-3">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.12 + ii * 0.06 + 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    <span className="text-sm font-mono text-muted group-hover:text-text/80 transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling tech marquee */}
        <motion.div
          className="mt-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex gap-6 animate-[marquee_20s_linear_infinite]">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Firebase',
              'Supabase', 'MongoDB', 'Tailwind', 'Git', 'Vite', 'WebSockets',
              'REST API', 'PostgreSQL', 'JavaScript', 'HTML5',
              // Repeat for seamless loop
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Firebase',
            ].map((tech, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-xs font-mono text-muted/40 border border-white/5 rounded-full px-4 py-1.5 bg-surface"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
