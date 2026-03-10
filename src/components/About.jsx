import styles from './About.module.css'

const STATS = [
  ['6+', 'Projects Built'],
  ['3+', 'Years Coding'],
  ['100%', 'Commitment'],
]

export default function About() {
  return (
    <section id="About" className={styles.section}>
      <p className={styles.label}>About Me</p>
      <div className={styles.divider} />

      <div className={styles.inner}>
        <h2 className={styles.title}>
          Crafting code<br />with purpose.
        </h2>

        <p className={styles.text}>
          I'm <strong>Faran Raheel Raja</strong> — a developer who loves turning complex
          ideas into elegant software. With hands-on experience across mobile (Flutter),
          web (React / TypeScript), and backend (Python / Node.js), I bring a
          full-spectrum perspective to every project.
        </p>

        <p className={styles.text} style={{ marginTop: '20px' }}>
          From building <strong className={styles.accent}>AI-powered educational platforms</strong> to
          real-time chat apps and streaming services, I'm constantly pushing the limits
          of what can be built. I believe great software is a blend of clean code,
          thoughtful design, and genuine user empathy.
        </p>

        <div className={styles.stats}>
          {STATS.map(([num, label]) => (
            <div key={label} className={styles.statBox}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
