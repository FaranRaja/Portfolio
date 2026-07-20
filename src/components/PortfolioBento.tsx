import { Suspense, lazy } from 'react';
import { MapPin, Mail, GitFork, Link, ExternalLink } from 'lucide-react';
import { personal, projects, skills } from '../data/portfolio';
import { BentoGrid, BentoCard } from './BentoGrid';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export default function PortfolioBento() {
  const featuredProject = projects.find(p => p.featured) || projects[0];

  return (
    <BentoGrid className="pt-24 pb-32">
      {/* 1. HERO CARD (Top Left - Large) */}
      <BentoCard colSpan="md:col-span-4 lg:col-span-8" className="min-h-[400px] lg:min-h-[500px] justify-between relative overflow-hidden group">
        <div className="z-10 relative pointer-events-none">
          <span className="inline-block text-[10px] font-mono text-accent tracking-widest uppercase mb-6 border border-white/10 rounded-full px-3 py-1 bg-white/5">
            Available for Internships
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 text-text">
            Hi, I'm <span className="text-gradient">Faran Raja</span>.
          </h1>
          <p className="text-muted font-body text-base max-w-md">
            Full Stack Web Developer & Software Engineering student at COMSATS. 
            I build modern, scalable web applications with React, Next.js, and Node.
          </p>
        </div>
        
        {/* 3D Canvas in Hero */}
        <div className="absolute right-0 bottom-0 w-full md:w-[60%] h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      </BentoCard>

      {/* 2. SKILLS TICKER (Top Right - Medium) */}
      <BentoCard colSpan="md:col-span-4 lg:col-span-4" delay={0.1} className="justify-center overflow-hidden">
        <h3 className="text-xs font-mono tracking-widest text-muted uppercase mb-6">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {skills.flatMap(s => s.items).map((skill, i) => (
            <span key={i} className="text-xs font-body px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-text/80 hover:text-white hover:border-white/20 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </BentoCard>

      {/* 3. FEATURED PROJECT (Bottom Left - Large) */}
      <BentoCard colSpan="md:col-span-4 lg:col-span-6" delay={0.2} className="group relative overflow-hidden min-h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
        
        {/* We would use an image here, but for now we'll use a placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black group-hover:scale-105 transition-transform duration-700" />
        
        <div className="z-20 relative h-full flex flex-col justify-end">
          <h3 className="text-xs font-mono tracking-widest text-accent uppercase mb-2">Featured Project</h3>
          <h2 className="text-2xl font-display font-bold text-white mb-2">{featuredProject.title}</h2>
          <p className="text-muted text-sm mb-4 line-clamp-2 max-w-sm">{featuredProject.description}</p>
          <div className="flex gap-2">
            {featuredProject.tags.slice(0,3).map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/10 rounded backdrop-blur-md text-white/80">{tag}</span>
            ))}
          </div>
        </div>
        
        <a href={featuredProject.github} target="_blank" rel="noreferrer" className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-colors">
          <ExternalLink size={16} />
        </a>
      </BentoCard>

      {/* 4. LOCATION (Middle Small) */}
      <BentoCard colSpan="md:col-span-2 lg:col-span-3" delay={0.3} className="flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[200px]">
        {/* Simple CSS Globe representation */}
        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative mb-4">
          <div className="absolute inset-0 rounded-full border border-white/10 rotate-45" />
          <div className="absolute inset-0 rounded-full border border-white/10 -rotate-45" />
          <MapPin size={20} className="text-accent" />
        </div>
        <p className="text-sm font-display font-medium text-text">Islamabad, Pakistan</p>
        <p className="text-xs text-muted font-mono mt-1">Local Time: GMT+5</p>
      </BentoCard>

      {/* 5. SOCIALS (Bottom Right Grid) */}
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 gap-4">
        <BentoCard delay={0.4} className="flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer">
          <a href={personal.github} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
            <GitFork size={24} className="text-text" />
            <span className="text-xs font-mono text-muted">GitHub</span>
          </a>
        </BentoCard>
        <BentoCard delay={0.45} className="flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer">
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
            <Link size={24} className="text-text" />
            <span className="text-xs font-mono text-muted">LinkedIn</span>
          </a>
        </BentoCard>
        <BentoCard colSpan="col-span-2" delay={0.5} className="flex flex-col items-center justify-center hover:bg-white/5 cursor-pointer">
          <a href={`mailto:${personal.email}`} className="flex flex-col items-center gap-2">
            <Mail size={24} className="text-text" />
            <span className="text-xs font-mono text-muted">{personal.email}</span>
          </a>
        </BentoCard>
      </div>
    </BentoGrid>
  );
}
