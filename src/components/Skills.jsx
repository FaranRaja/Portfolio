import { SKILLS } from '../data/index.js'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="Skills" className={styles.section}>
      <p className={styles.label}>Tech Stack</p>
      <div className={styles.divider} />
      <h2 className={styles.title}>
        Tools of the<br />trade.
      </h2>

      <div className={styles.grid}>
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category} className={styles.card}>
            <h3 className={styles.catName}>{category}</h3>
            <div className={styles.pills}>
              {items.map(skill => (
                <span key={skill} className={styles.pill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
