import { motion } from 'framer-motion';
import { Mail, GitFork, Link, Play, Code, LayoutTemplate } from 'lucide-react';
import { personal, projects } from '../data/portfolio';
import { LinkButton } from './LinkButton';

export default function LinktreeLayout() {
  // Map icons for projects
  const getProjectIcon = (title: string) => {
    if (title.includes('Stream')) return <Play size={20} />;
    if (title.includes('AI') || title.includes('Detection')) return <Code size={20} />;
    return <LayoutTemplate size={20} />;
  };

  return (
    <div className="min-h-screen bg-bg text-text py-20 px-4 relative overflow-hidden flex flex-col items-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <main className="w-full max-w-[600px] relative z-10 flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl"
        >
          <span className="font-display font-bold text-4xl text-white">F</span>
        </motion.div>

        {/* Header Text */}
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl font-bold text-white mb-2 text-center"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-muted text-center max-w-md mb-8 leading-relaxed"
        >
          {personal.summary.split('.')[0]}. {/* Just take the first sentence for brevity */}
        </motion.p>

        {/* Links Stack */}
        <div className="w-full space-y-4 flex flex-col">
          
          <motion.h3 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xs font-mono tracking-widest text-muted uppercase mt-4 mb-2 pl-2"
          >
            Featured Projects
          </motion.h3>

          {projects.map((project, index) => (
            <LinkButton
              key={project.id}
              href={project.github}
              title={project.title}
              subtitle={project.subtitle}
              icon={getProjectIcon(project.title)}
              delay={0.4 + (index * 0.1)}
              featured={project.featured}
            />
          ))}

          <motion.h3 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-xs font-mono tracking-widest text-muted uppercase mt-8 mb-2 pl-2"
          >
            Connect
          </motion.h3>

          <LinkButton
            href={personal.github}
            title="GitHub"
            subtitle="Check out my open source code"
            icon={<GitFork size={20} />}
            delay={0.9}
          />
          <LinkButton
            href={personal.linkedin}
            title="LinkedIn"
            subtitle="Let's connect professionally"
            icon={<Link size={20} />}
            delay={1.0}
          />
          <LinkButton
            href={`mailto:${personal.email}`}
            title="Email Me"
            subtitle={personal.email}
            icon={<Mail size={20} />}
            delay={1.1}
          />
        </div>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 text-xs font-mono text-muted/50 pb-8"
      >
        © {new Date().getFullYear()} {personal.name}
      </motion.footer>
    </div>
  );
}
