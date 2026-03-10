import { useEffect, useState } from 'react'
import { NAV_LINKS } from './data/index.js'
import { useActiveSection, useMousePosition } from './hooks/index.js'

import Navbar   from './components/Navbar.jsx'
import Hero     from './components/Hero.jsx'
import About    from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills   from './components/Skills.jsx'
import Contact  from './components/Contact.jsx'
import Footer   from './components/Footer.jsx'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  const activeSection = useActiveSection(NAV_LINKS)
  const mouse         = useMousePosition()

  return (
    <>
      {/* Ambient cursor glow */}
      <div
        className="cursor-glow"
        style={{ top: mouse.y - 200, left: mouse.x - 200 }}
      />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Noise texture overlay */}
      <svg className="noise-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <Navbar
        links={NAV_LINKS}
        activeSection={activeSection}
        onNavClick={scrollTo}
      />

      <main>
        <Hero     onScrollTo={scrollTo} />
        <About    />
        <Projects />
        <Skills   />
        <Contact  />
      </main>

      <Footer />
    </>
  )
}
