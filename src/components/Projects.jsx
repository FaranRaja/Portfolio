import { PROJECTS } from '../data/index.js'
import ProjectCard from './ProjectCard.jsx'
import styles from './Projects.module.css'

export default function Projects() {
  return (
    <section id="Projects" className={styles.section}>
      <p className={styles.label}>Featured Work</p>
      <div className={styles.divider} />
      <h2 className={styles.title}>
        Projects that<br />speak louder.
      </h2>

      <div className={styles.grid}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <div className={styles.cta}>
        <a
          href="https://github.com/FaranRaja"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          View All on GitHub →
        </a>
      </div>
    </section>
  )
}
