import { SOCIAL, CONTACT_EMAIL } from '../data/index.js'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="Contact" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Get In Touch</p>
        <div className={styles.divider} />

        <h2 className={styles.title}>
          Let's build<br />something great.
        </h2>

        <p className={styles.bio}>
          Whether you have a project idea, a collaboration in mind, or just want
          to say hello — my inbox is always open.
        </p>

        <a href={`mailto:${CONTACT_EMAIL}`} className={styles.emailBtn}>
          {CONTACT_EMAIL}
        </a>

        <div className={styles.socials}>
          {SOCIAL.map(({ label, icon, bg, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              style={{ background: bg }}
            >
              <span className={styles.socialIcon}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
