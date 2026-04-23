import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GitFork, ExternalLink, Star } from "lucide-react";;
import { projects } from '../data/portfolio';

function ProjectCard({ project, index, featured }: { project: typeof projects[0]; index: number; featured?: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl border border-white/5 bg-card overflow-hidden transition-all duration-300 hover:border-accent/20 hover:glow ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}88, transparent)` }} />

      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${project.color}08, transparent 60%)` }}
      />

      <div className={`p-6 ${featured ? 'lg:p-8' : ''} relative z-10`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            {featured && (
              <span className="inline-flex items-center gap-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3">
                <Star size={10} fill="currentColor" /> Featured
              </span>
            )}
            <h3 className={`font-display font-bold text-text ${featured ? 'text-2xl' : 'text-lg'}`}>
              {project.title}
            </h3>
            <p className="text-sm text-muted font-mono mt-1">{project.subtitle}</p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 rounded-lg text-muted hover:text-text transition-colors"
            >
              <GitFork size={15} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/10 rounded-lg text-muted hover:text-text transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        <p className={`text-muted font-body text-sm leading-relaxed mb-5 ${featured ? 'max-w-2xl' : ''}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/8 bg-surface text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">02 / Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-text">
            Things I've built
          </h2>
          <p className="text-muted font-body mt-4 max-w-xl">
            A selection of web applications — from AI-powered platforms to real-time communication tools.
          </p>
        </motion.div>

        {/* Featured */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} featured />
          ))}
        </div>

        {/* Rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://github.com/FaranRaja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted font-body border border-white/10 rounded-full px-6 py-3 hover:text-text hover:border-white/20 transition-all"
          >
            <GitFork size={15} /> View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
