import { useTypewriter } from '../hooks/index.js'
import styles from './Hero.module.css'

const ROLES = [
  'Full-Stack Developer',
  'Flutter Engineer',
  'AI Enthusiast',
  'Problem Solver',
  'Open Source Builder',
]

export default function Hero({ onScrollTo }) {
  const typed = useTypewriter(ROLES)

  return (
    <section id="Home" className={styles.hero}>
      <div className={`${styles.content} anim-fadeUp`}>
        <span className={styles.tag}>👋 Available for opportunities</span>

        <h1 className={styles.name}>
          Faran<br />Raja
        </h1>

        <div className={styles.typed}>
          {typed}
          <span className={styles.cursor} />
        </div>

        <p className={styles.bio}>
          Passionate full-stack developer and Flutter engineer based in Pakistan.
          I build intelligent, performant, and beautifully crafted digital
          products — from AI-driven apps to real-time platforms.
        </p>

        <div className={styles.buttons}>
          <button className={styles.btnPrimary} onClick={() => onScrollTo('Projects')}>
            View Projects
          </button>
          <button className={styles.btnOutline} onClick={() => onScrollTo('Contact')}>
            Get In Touch
          </button>
          <a href="/resume.pdf" download="Faran_Raja_Resume.pdf" className={styles.btnResume}>
            ↓ Resume
          </a>
        </div>
      </div>

      <div className={`${styles.ring} hero-ring`}>
        <div className={styles.ringDash} />
        <span className={styles.avatar}>🧑‍💻</span>
      </div>
    </section>
  )
}
