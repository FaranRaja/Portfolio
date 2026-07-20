import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Send, CheckCircle, Download } from 'lucide-react';
import { personal, projects, skills, education, experience } from '../data/portfolio';

// SVG Icons for Socials
const GithubIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>;
const LinkedinIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const GmailIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>;

// Slug mapper for simple-icons
const getTechIconUrl = (name: string) => {
  const map: Record<string, string> = {
    'React': 'react/61DAFB',
    'Next.js': 'nextdotjs/000000',
    'TypeScript': 'typescript/3178C6',
    'JavaScript': 'javascript/F7DF1E',
    'HTML5': 'html5/E34F26',
    'Tailwind CSS': 'tailwindcss/06B6D4',
    'Node.js': 'nodedotjs/339933',
    'Express.js': 'express/000000',
    'Firebase': 'firebase/FFCA28',
    'Supabase': 'supabase/3ECF8E',
    'MongoDB': 'mongodb/47A248',
    'PostgreSQL': 'postgresql/4169E1',
    'Git': 'git/F05032',
    'GitHub': 'github/181717',
    'Vite': 'vite/646CFF',
    'Vercel': 'vercel/000000',
    'VS Code': 'visualstudiocode/007ACC'
  };
  return map[name] ? `https://cdn.simpleicons.org/${map[name]}` : null;
};

// Reusable pill button
const PillButton = ({ children, href, className = "", primary = false, onClick, type = "button", disabled = false }: any) => {
  const baseClasses = `inline-flex items-center gap-2 justify-center font-display font-black text-lg px-8 py-4 rounded-full border-4 border-border neo-shadow transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-shadow)] ${primary ? 'bg-text text-text-light' : 'bg-surface text-text hover:bg-accent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  if (href) {
    return (
      <a href={href} target={href.startsWith('#') ? "_self" : "_blank"} rel="noreferrer" className={baseClasses}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
};

// Marquee component for big section titles
const Marquee = ({ text, bg = "bg-accent" }: { text: string, bg?: string }) => (
  <div className={`w-full overflow-hidden ${bg} border-y-4 border-border py-4 flex whitespace-nowrap -rotate-1 scale-105 my-24 shadow-[0_4px_0_var(--color-shadow)]`}>
    <motion.div
      animate={{ x: [0, -1035] }}
      transition={{ ease: "linear", duration: 10, repeat: Infinity }}
      className="flex font-display font-black text-5xl md:text-6xl uppercase tracking-tighter text-border"
    >
      {[...Array(8)].map((_, i) => (
        <span key={i} className="mx-8">{text} •</span>
      ))}
    </motion.div>
  </div>
);

export default function MarketingLayout() {
  // Fun vibrant colors for projects
  const sectionColors = ['bg-[#e9c0e9]', 'bg-[#d2e823]', 'bg-[#7bd0e1]', 'bg-[#ff9a9e]', 'bg-[#a1c4fd]', 'bg-[#fbc2eb]'];

  // Contact Form State
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
      window.open(`mailto:${personal.email}?subject=Portfolio Contact from ${form.name}&body=${form.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-[#1e2330]">
      
      {/* Sticky Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-surface rounded-full border-4 border-border p-3 flex items-center justify-between neo-shadow transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-shadow)]">
        
        {/* Left: Logo */}
        <div className="flex-1 flex items-center gap-3 pl-4">
          <div className="w-12 h-12 bg-accent rounded-full border-4 border-border flex items-center justify-center font-black text-2xl text-[#1e2330]">F</div>
          <span className="font-display font-black text-2xl text-text hidden sm:block tracking-tight">faran.dev</span>
        </div>
        
        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex justify-center items-center gap-8">
          {['About', 'Experience', 'Projects', 'Skills'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-display font-black text-xl text-text hover:-translate-y-1 transition-transform hover:text-accent2">
              {item}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-3 pr-2">
          <a href={personal.github} target="_blank" className="p-3 bg-card border-4 border-border rounded-full text-[#1e2330] transition-all hover:translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-shadow)] hover:bg-accent"><GithubIcon /></a>
          <a href={personal.linkedin} target="_blank" className="p-3 bg-accent border-4 border-border rounded-full text-[#1e2330] transition-all hover:translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0_var(--color-shadow)] hover:bg-card"><LinkedinIcon /></a>
          <PillButton href="#contact" className="hidden sm:flex py-3 px-8 text-base" primary>Contact Me</PillButton>
        </div>
      </nav>

      {/* Hero Section (Sand bg) */}
      <section className="pt-48 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tighter mb-8 text-text">
            Build <br/>
            ideas. <br/>
            <span className="inline-block bg-accent px-4 py-2 border-4 border-border rounded-[2rem] neo-shadow rotate-[-2deg] mt-2 text-[#1e2330]">Faster.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl font-bold max-w-md mb-10 text-text/80 leading-relaxed">
            Hi, I'm {personal.name}. A {personal.title} building scalable applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <PillButton primary href="/resume.pdf">Download CV <Download size={20} /></PillButton>
            <PillButton href={personal.github} className="hidden sm:flex">View GitHub</PillButton>
          </div>
        </motion.div>

        {/* Abstract CSS Graphic instead of AI Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: 'spring' }}
          className="relative w-full aspect-square max-w-md mx-auto mt-12 lg:mt-0"
        >
          {/* Main Card */}
          <div className="absolute inset-0 bg-[#e9c0e9] rounded-[3rem] border-4 border-border neo-shadow flex flex-col items-center justify-center p-8 text-center -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-40 h-40 bg-accent rounded-[2rem] border-4 border-border mb-8 neo-shadow overflow-hidden flex items-center justify-center">
              <span className="font-display font-black text-[100px] text-[#1e2330] leading-none mt-4">F</span>
            </div>
            <h2 className="font-display font-black text-4xl text-[#1e2330] mb-4">@FaranRaja</h2>
            <p className="font-body font-black text-xl text-text bg-surface border-4 border-border px-6 py-3 rounded-full neo-shadow shadow-[0_4px_0_var(--color-shadow)]">Full Stack Dev</p>
          </div>
          
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -left-10 bg-surface w-28 h-28 rounded-2xl border-4 border-border neo-shadow flex items-center justify-center text-text"><Code size={48} /></motion.div>
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute -bottom-10 -right-10 bg-accent w-32 h-32 rounded-[2.5rem] border-4 border-border neo-shadow flex items-center justify-center text-[#1e2330] font-black text-3xl">MERN</motion.div>
        </motion.div>
      </section>

      <Marquee text="About Me" bg="bg-[#a1c4fd]" />

      {/* About Section */}
      <section id="about" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="bg-surface border-4 border-border rounded-[3rem] p-10 md:p-16 neo-shadow hover:-translate-y-2 hover:shadow-[10px_10px_0_var(--color-shadow)] transition-all duration-300">
          <h2 className="font-display font-black text-5xl md:text-6xl mb-8">Who am I?</h2>
          <p className="font-body text-2xl leading-relaxed text-text font-bold">
            {personal.summary}
          </p>
        </div>
      </section>

      <Marquee text="Education & Experience" bg="bg-accent" />

      {/* Experience / Education Section */}
      <section id="experience" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="space-y-12">
          
          {experience.map((exp: any, index: number) => (
             <motion.div 
               key={`exp-${index}`}
               initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
               className="bg-[#7bd0e1] border-4 border-border rounded-[2.5rem] p-8 md:p-12 neo-shadow flex flex-col md:flex-row justify-between gap-8 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-shadow)] transition-all duration-300 text-[#1e2330]"
             >
               <div>
                 <h3 className="font-display font-black text-4xl mb-4 leading-tight">{exp.title}</h3>
                 <p className="font-body font-black text-2xl opacity-80">{exp.company}</p>
               </div>
               <div className="md:text-right">
                 <span className="inline-block bg-surface text-text border-4 border-border rounded-full px-6 py-2 font-black text-xl neo-shadow mb-6 whitespace-nowrap">
                   {exp.period}
                 </span>
                 <p className="font-body max-w-md font-bold text-xl opacity-90">{exp.description}</p>
               </div>
             </motion.div>
          ))}

          {education.map((edu: any, index: number) => (
            <motion.div 
              key={`edu-${index}`}
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-surface border-4 border-border rounded-[2.5rem] p-8 md:p-12 neo-shadow flex flex-col md:flex-row justify-between gap-8 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-shadow)] transition-all duration-300"
            >
              <div>
                <h3 className="font-display font-black text-4xl mb-4 leading-tight">{edu.degree}</h3>
                <p className="font-body font-black text-2xl text-text/70">{edu.institution}</p>
              </div>
              <div className="md:text-right">
                <span className="inline-block bg-[#e9c0e9] text-[#1e2330] border-4 border-border rounded-full px-6 py-2 font-black text-xl neo-shadow mb-6 whitespace-nowrap">
                  {edu.period}
                </span>
                <p className="font-body max-w-md font-bold text-xl text-text/80">{edu.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Marquee text="Featured Projects" bg="bg-[#ff9a9e]" />

      {/* Projects Section */}
      <section id="projects" className="py-12 px-6 max-w-[95%] xl:max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => {
            const cardBg = sectionColors[i % sectionColors.length];
            return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`${cardBg} text-[#1e2330] rounded-[3.5rem] p-8 border-4 border-border neo-shadow flex flex-col h-full hover:-translate-y-2 hover:shadow-[12px_12px_0_var(--color-shadow)] transition-all duration-300`}
            >
              <div className="w-full aspect-video rounded-[2.5rem] border-4 border-border mb-8 overflow-hidden bg-surface flex flex-col relative neo-shadow">
                 <div className="w-full h-10 bg-border flex items-center px-4 gap-2">
                   <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-surface"></div>
                   <div className="w-3 h-3 bg-accent rounded-full border-2 border-surface"></div>
                   <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-surface"></div>
                 </div>
                 <div className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
                    {i % 3 === 0 && <div className="absolute w-24 h-24 bg-accent rounded-full -top-4 -left-4 border-4 border-border mix-blend-multiply opacity-80" />}
                    {i % 3 === 1 && <div className="absolute w-full h-12 bg-[#7bd0e1] -rotate-12 border-y-4 border-border opacity-50" />}
                    {i % 3 === 2 && <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(var(--color-text) 3px, transparent 3px)', backgroundSize: '15px 15px', opacity: 0.1 }}></div>}
                    
                    <h3 className="font-display font-black text-3xl text-center text-text z-10">{project.title}</h3>
                 </div>
              </div>

              <h3 className="font-display font-black text-4xl mb-4 leading-none">{project.title}</h3>
              <p className="font-body font-bold text-lg mb-8 opacity-90 flex-grow leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-sm font-black px-4 py-2 bg-surface text-text border-4 border-border rounded-full shadow-[2px_2px_0_var(--color-shadow)]">{tag}</span>
                ))}
              </div>

              <a href={project.github} target="_blank" className="w-full py-5 rounded-full border-4 border-border font-black text-xl text-center shadow-[4px_4px_0_var(--color-shadow)] bg-text text-text-light hover:bg-border hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-shadow)] transition-all">
                View Repository
              </a>
            </motion.div>
          )})}
        </div>
      </section>

      <Marquee text="My Tech Stack" bg="bg-accent" />

      {/* Skills Section */}
      <section id="skills" className="py-12 px-6 max-w-5xl mx-auto mb-20">
        <div className="flex flex-wrap justify-center gap-6">
          {skills.flatMap(s => s.items).map((skill, i) => {
             const iconUrl = getTechIconUrl(skill);
             return (
               <motion.div 
                 key={skill}
                 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                 className="flex items-center gap-3 px-8 py-4 bg-surface border-4 border-border rounded-full text-text font-black font-display text-2xl neo-shadow hover:-translate-y-2 hover:bg-accent hover:text-[#1e2330] transition-all hover:shadow-[8px_8px_0_var(--color-shadow)]"
               >
                 {iconUrl && <img src={iconUrl} alt={skill} className="w-8 h-8 object-contain" />}
                 {skill}
               </motion.div>
             );
          })}
        </div>
      </section>

      <Marquee text="Contact Me" bg="bg-[#fbc2eb]" />

      {/* Contact Section */}
      <section id="contact" className="py-12 px-6 max-w-5xl mx-auto mb-32">
        <div className="bg-surface border-4 border-border rounded-[3rem] p-10 md:p-16 neo-shadow hover:-translate-y-1 transition-transform">
          <h2 className="font-display font-black text-5xl md:text-6xl mb-10">Let's build together.</h2>
          
          {sent ? (
            <div className="bg-accent border-4 border-border rounded-3xl p-12 text-center text-[#1e2330] shadow-[6px_6px_0_var(--color-shadow)]">
              <CheckCircle size={64} className="mx-auto mb-6" />
              <h3 className="font-display font-black text-4xl mb-4">Message sent!</h3>
              <p className="font-body font-bold text-xl">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-display font-black text-xl mb-3">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg border-4 border-border rounded-2xl px-6 py-4 font-bold text-lg placeholder-text/40 focus:outline-none focus:border-accent neo-shadow-hover focus:shadow-[6px_6px_0_var(--color-shadow)] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-display font-black text-xl mb-3">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg border-4 border-border rounded-2xl px-6 py-4 font-bold text-lg placeholder-text/40 focus:outline-none focus:border-accent neo-shadow-hover focus:shadow-[6px_6px_0_var(--color-shadow)] transition-all"
                    placeholder="john@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-display font-black text-xl mb-3">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bg border-4 border-border rounded-2xl px-6 py-4 font-bold text-lg placeholder-text/40 focus:outline-none focus:border-accent neo-shadow-hover focus:shadow-[6px_6px_0_var(--color-shadow)] transition-all resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full md:w-auto bg-text text-text-light font-display font-black text-2xl px-12 py-5 border-4 border-border rounded-full neo-shadow-hover hover:-translate-y-2 transition-all disabled:opacity-50 flex items-center justify-center gap-4 hover:shadow-[8px_8px_0_var(--color-shadow)]"
              >
                {sending ? 'Sending...' : 'Send Message'} <Send size={24} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text border-t-8 border-border py-16 text-center px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-6">
            <a href={personal.github} target="_blank" className="p-4 bg-surface rounded-full border-4 border-border text-text hover:-translate-y-2 hover:bg-[#e9c0e9] hover:shadow-[4px_4px_0_var(--color-shadow)] transition-all"><GithubIcon /></a>
            <a href={personal.linkedin} target="_blank" className="p-4 bg-surface rounded-full border-4 border-border text-text hover:-translate-y-2 hover:bg-accent hover:shadow-[4px_4px_0_var(--color-shadow)] transition-all"><LinkedinIcon /></a>
            <a href={`mailto:${personal.email}`} className="p-4 bg-surface rounded-full border-4 border-border text-text hover:-translate-y-2 hover:bg-[#7bd0e1] hover:shadow-[4px_4px_0_var(--color-shadow)] transition-all"><GmailIcon /></a>
          </div>
          <p className="font-mono font-bold text-text-light/50">© {new Date().getFullYear()} {personal.name}</p>
        </div>
      </footer>
    </div>
  );
}
