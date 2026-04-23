import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Link, ArrowDown, ExternalLink } from 'lucide-react';
import { personal } from '../data/portfolio';

// Lazy-load the heavy 3D canvas — only downloads Three.js after page paint
const HeroCanvas = lazy(() => import('./HeroCanvas'));

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDeleting(false); setWordIdx(w => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

// Simple CSS-only fallback shown while Three.js loads
function CanvasFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-4 rounded-full border border-accent/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
        <div className="absolute inset-8 rounded-full bg-accent/10 border border-accent/40 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-accent font-mono text-xs">&lt;/&gt;</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(personal.roles);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#7c6aff 1px, transparent 1px), linear-gradient(90deg, #7c6aff 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-mono text-accent tracking-[0.3em] uppercase mb-6 border border-accent/20 rounded-full px-4 py-1.5 bg-accent/5">
              Available for Internships
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-text">Hi, I'm</span>
            <span className="block text-gradient">Faran Raja</span>
          </motion.h1>

          <motion.div className="flex items-center gap-3 mb-8 h-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className="text-muted font-body text-lg">I am</span>
            <span className="font-display text-xl font-semibold text-accent min-w-[220px]">
              {typed}<span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p className="text-muted font-body text-base leading-relaxed max-w-lg mb-10"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            Software Engineering student at COMSATS University, building full-stack web apps with
            the MERN stack, Next.js, and AI integrations. Open to real-world opportunities.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-10"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            
          </motion.div>

          
        </div>

        {/* 3D canvas — lazy loaded after text renders */}
        <motion.div className="relative h-[400px] lg:h-[500px]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
          <Suspense fallback={<CanvasFallback />}>
            <HeroCanvas />
          </Suspense>

          <motion.div className="absolute top-8 -left-4 bg-card border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-accent backdrop-blur pointer-events-none"
            animate={{ y: [0, -7, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            Next.js + TypeScript
          </motion.div>
          <motion.div className="absolute bottom-16 -left-2 bg-card border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-accent2 backdrop-blur pointer-events-none"
            animate={{ y: [0, 7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            Firebase · Supabase
          </motion.div>
          <motion.div className="absolute top-1/3 -right-4 bg-card border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-purple-300 backdrop-blur pointer-events-none"
            animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            MERN Stack
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted pointer-events-none"
        animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
