import { lazy, Suspense } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load everything below the fold
const About      = lazy(() => import('./components/About'));
const Projects   = lazy(() => import('./components/Projects'));
const Skills     = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Contact    = lazy(() => import('./components/Contact'));
const Footer     = lazy(() => import('./components/Footer'));
const Chatbot    = lazy(() => import('./components/Chatbot'));

const SectionFallback = () => (
  <div className="py-32 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <Chatbot />
      </Suspense>
    </div>
  );
}
