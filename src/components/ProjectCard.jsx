import { useState } from 'react'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { name, desc, tech, stars, link, color, icon } = project

  return (
    <div
      className={`${styles.card} ${hovered ? styles.hovered : ''}`}
      style={{
        '--card-color': color,
        borderColor: hovered ? `${color}55` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 20px 60px ${color}20` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.topBar} style={{ opacity: hovered ? 1 : 0 }} />

      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.desc}>{desc}</p>

      <div className={styles.tags}>
        {tech.map(t => (
          <span
            key={t}
            className={styles.tag}
            style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <a href={link} target="_blank" rel="noopener noreferrer"
          className={styles.link} style={{ color }}>
          View on GitHub <span className={styles.arrow}>→</span>
        </a>
        {stars > 0 && <span className={styles.stars}>⭐ {stars}</span>}
      </div>
    </div>
  )
}
