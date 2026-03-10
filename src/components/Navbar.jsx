import styles from './Navbar.module.css'

export default function Navbar({ links, activeSection, onNavClick }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>FR.</div>

      <ul className={styles.links}>
        {links.map(link => (
          <li
            key={link}
            className={`${styles.link} ${activeSection === link ? styles.active : ''}`}
            onClick={() => onNavClick(link)}
          >
            {link}
            {activeSection === link && <span className={styles.indicator} />}
          </li>
        ))}
      </ul>
    </nav>
  )
}
